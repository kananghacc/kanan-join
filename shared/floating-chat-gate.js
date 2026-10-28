/**
 * Keep GTM WATI + Crisp floats only on allowlisted landings.
 * WATI DOM: #whatsapp-chat-widget, .wa-widget-send-button, .wa-chat-bubble, .wa-chat-box
 * Crisp: client.crisp.chat + #crisp-chatbox
 */
(function () {
  var ALLOWED_PREFIXES = ['/study-french-learning', '/ielts-online-training'];

  function normalizePath(pathname) {
    var p = String(pathname || '/').split('?')[0].split('#')[0];
    if (p.length > 1 && p.charAt(p.length - 1) === '/') {
      p = p.slice(0, -1);
    }
    return p || '/';
  }

  function isAllowed(pathname) {
    var path = normalizePath(pathname);
    for (var i = 0; i < ALLOWED_PREFIXES.length; i++) {
      var prefix = ALLOWED_PREFIXES[i];
      if (path === prefix || path.indexOf(prefix + '/') === 0) {
        return true;
      }
    }
    return false;
  }

  if (isAllowed(window.location.pathname)) {
    return;
  }

  function noopWati() {}
  try {
    Object.defineProperty(window, 'CreateWhatsappChatWidget', {
      configurable: true,
      enumerable: false,
      get: function () {
        return noopWati;
      },
      set: function () {},
    });
  } catch (_) {
    window.CreateWhatsappChatWidget = noopWati;
  }

  window.$crisp = window.$crisp || [];
  window.CRISP_READY_TRIGGER = function () {
    try {
      window.$crisp.push(['do', 'chat:hide']);
      window.$crisp.push(['do', 'chat:close']);
    } catch (_) {}
  };
  try {
    window.$crisp.push(['do', 'chat:hide']);
    window.$crisp.push(['do', 'chat:close']);
  } catch (_) {}

  var HIDE =
    'display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;';

  var style = document.createElement('style');
  style.id = 'kanan-floating-chat-gate';
  style.textContent = [
    '#whatsapp-chat-widget, #whatsapp-chat-widget *,',
    '.wa-widget-send-button, .wa-chat-bubble, .wa-chat-bubble-text,',
    '.wa-chat-bubble-close-button, .wa-chat-box, .wa-chat-box-visible,',
    '[class^="wa-"], [class*=" wa-"],',
    '#crisp-chatbox, .crisp-client,',
    'iframe[src*="crisp.chat"], iframe[src*="clare.ai"], iframe[src*="wati"] {',
    '  ' + HIDE,
    '}',
  ].join('\n');

  function mountStyle() {
    if (document.getElementById('kanan-floating-chat-gate')) return;
    (document.head || document.documentElement).appendChild(style);
  }

  function hideEl(el) {
    if (!el || el.nodeType !== 1) return;
    if (el.id === 'kanan-floating-chat-gate') return;
    if (el.getAttribute && el.getAttribute('data-kanan-chat-hidden') === '1') return;
    try {
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      el.setAttribute('aria-hidden', 'true');
      el.setAttribute('data-kanan-chat-hidden', '1');
    } catch (_) {}
  }

  function isChatNode(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.id === 'kanan-floating-chat-gate') return false;
    var id = String(node.id || '');
    var cls = String(node.className || '');
    var src = String((node.getAttribute && node.getAttribute('src')) || '');
    if (id === 'whatsapp-chat-widget' || id.indexOf('crisp') !== -1) return true;
    if (/(^|\s)wa-/.test(cls) || /crisp/i.test(cls)) return true;
    if (/watiWidget|clare\.ai|client\.crisp\.chat/i.test(src)) return true;
    return false;
  }

  function scrubNode(node) {
    if (!node || node.nodeType !== 1) return;
    if (isChatNode(node)) {
      if (node.tagName === 'SCRIPT') {
        try {
          node.remove();
        } catch (_) {
          hideEl(node);
        }
      } else {
        hideEl(node);
      }
    }
    if (!node.querySelectorAll) return;
    var nested = node.querySelectorAll(
      '#whatsapp-chat-widget, .wa-widget-send-button, .wa-chat-bubble, .wa-chat-box, [class^="wa-"], [class*=" wa-"], #crisp-chatbox, .crisp-client, iframe[src*="crisp.chat"], iframe[src*="clare.ai"], script[src*="watiWidget"], script[src*="clare.ai"], script[src*="client.crisp.chat"]'
    );
    for (var i = 0; i < nested.length; i++) {
      var el = nested[i];
      if (el.tagName === 'SCRIPT') {
        try {
          el.remove();
        } catch (_) {
          hideEl(el);
        }
      } else {
        hideEl(el);
      }
    }
  }

  function scrubDocument() {
    scrubNode(document.body || document.documentElement);
  }

  var scheduled = false;
  function scheduleScrub() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () {
      scheduled = false;
      scrubDocument();
      try {
        window.$crisp.push(['do', 'chat:hide']);
      } catch (_) {}
    }, 0);
  }

  function startObserver() {
    if (!window.MutationObserver || !document.documentElement) return;
    var obs = new MutationObserver(function (mutations) {
      var found = false;
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType !== 1) continue;
          if (node.id === 'kanan-floating-chat-gate') continue;
          if (isChatNode(node) || (node.querySelector && node.querySelector('#whatsapp-chat-widget, .wa-widget-send-button, .wa-chat-bubble, #crisp-chatbox, .crisp-client'))) {
            scrubNode(node);
            found = true;
          }
        }
      }
      if (found) scheduleScrub();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  mountStyle();
  if (document.body) {
    scrubDocument();
    startObserver();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      mountStyle();
      scrubDocument();
      startObserver();
    });
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    scrubDocument();
    try {
      window.$crisp.push(['do', 'chat:hide']);
    } catch (_) {}
    if (tries >= 40) clearInterval(timer);
  }, 500);
})();
