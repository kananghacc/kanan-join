(function () {
  function resolveSubmitUrl() {
    var url = typeof window.KANAN_CRM_SUBMIT_URL === 'string' ? window.KANAN_CRM_SUBMIT_URL : '';
    if (!url || url.indexOf('__CRM_SUBMIT_URL__') !== -1) {
      return '/api/submit-lead';
    }
    return url;
  }

  function getFieldWrapper(form, fieldName) {
    var input = form.querySelector('[name="' + fieldName + '"]');
    if (!input) return null;
    return input.closest('.kanan-field') || input.parentElement;
  }

  function ensureFieldErrorEl(wrapper) {
    var el = wrapper.querySelector('.kanan-field-error');
    if (!el) {
      el = document.createElement('div');
      el.className = 'kanan-field-error';
      el.setAttribute('role', 'alert');
      wrapper.appendChild(el);
    }
    return el;
  }

  function setFieldError(form, fieldName, message) {
    var wrapper = getFieldWrapper(form, fieldName);
    if (!wrapper) return;
    var input = form.querySelector('[name="' + fieldName + '"]');
    var errorEl = ensureFieldErrorEl(wrapper);
    if (message) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
      wrapper.classList.add('kanan-field--error');
      if (input) input.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
      wrapper.classList.remove('kanan-field--error');
      if (input) input.removeAttribute('aria-invalid');
    }
  }

  function setFormError(form, message) {
    var errorEl = form.querySelector('.kanan-form-error');
    if (!errorEl) return;
    if (message) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    } else {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }

  function clearFieldErrors(form) {
    form.querySelectorAll('.kanan-field-error').forEach(function (el) {
      el.textContent = '';
      el.classList.remove('show');
    });
    form.querySelectorAll('.kanan-field--error').forEach(function (el) {
      el.classList.remove('kanan-field--error');
    });
    form.querySelectorAll('[name][aria-invalid="true"]').forEach(function (el) {
      if (form.contains(el)) el.removeAttribute('aria-invalid');
    });
    setFormError(form, '');
  }

  var SUBMISSION_SESSION_KEY = 'kanan_recent_lead_submit';
  var DEDUP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

  function getRecentSubmission() {
    try {
      var raw = sessionStorage.getItem(SUBMISSION_SESSION_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (Date.now() - data.timestamp < DEDUP_WINDOW_MS) {
        return data;
      }
      sessionStorage.removeItem(SUBMISSION_SESSION_KEY);
      return null;
    } catch (_) {
      return null;
    }
  }

  function recordSubmission(mobile, email, thankYouUrl) {
    try {
      sessionStorage.setItem(
        SUBMISSION_SESSION_KEY,
        JSON.stringify({
          mobile: mobile,
          email: email,
          thankYou: thankYouUrl || '',
          timestamp: Date.now(),
        })
      );
    } catch (_) {}
  }

  function lockAllFormsOnPage(buttonText) {
    document.querySelectorAll('[data-kanan-lead-form]').forEach(function (f) {
      f.dataset.kananSubmitting = '1';
      var btn = f.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
        if (!btn.dataset.originalText) {
          btn.dataset.originalText = btn.textContent;
        }
        if (buttonText) {
          btn.textContent = buttonText;
        }
      }
    });
  }

  function unlockAllFormsOnPage() {
    document.querySelectorAll('[data-kanan-lead-form]').forEach(function (f) {
      delete f.dataset.kananSubmitting;
      var btn = f.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = false;
        btn.style.pointerEvents = '';
        if (btn.dataset.originalText) {
          btn.textContent = btn.dataset.originalText;
        }
      }
    });
  }

  function restoreSubmitButton(form) {
    delete form.dataset.kananSubmitting;
    var submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    submitBtn.disabled = false;
    submitBtn.style.pointerEvents = '';
    if (submitBtn.dataset.originalText) {
      submitBtn.textContent = submitBtn.dataset.originalText;
    }
  }

  function resetLeadForm(form) {
    if (!form || typeof form.reset !== 'function') return;
    form.reset();
    clearFieldErrors(form);
    restoreSubmitButton(form);
  }

  function resetAllLeadForms() {
    document.querySelectorAll('[data-kanan-lead-form]').forEach(resetLeadForm);
  }

  function validateLeadFields(form, name, email, mobile_number, remarks) {
    clearFieldErrors(form);
    var valid = true;
    var V = window.KananLeadValidation;

    if (!name) {
      setFieldError(form, 'name', 'Please enter your full name.');
      valid = false;
    }

    if (!mobile_number) {
      setFieldError(form, 'mobile_number', 'Mobile number is required.');
      valid = false;
    } else if (V && V.isValidMobile && !V.isValidMobile(mobile_number)) {
      setFieldError(form, 'mobile_number', 'Please enter a valid 10-digit mobile number.');
      valid = false;
    }

    if (!email) {
      setFieldError(form, 'email', 'Email is required.');
      valid = false;
    } else if (V && V.isValidEmail && !V.isValidEmail(email)) {
      setFieldError(form, 'email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!remarks) {
      setFieldError(form, 'remarks', 'Please complete this field.');
      valid = false;
    }

    return valid;
  }

  // Only the landing slug is sent; campaign UTMs are resolved on the server from crm-lead-routing.json
  var LANDING_SLUG_DATASET_KEY = 'utmSourceUrl';

  async function handleLeadSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;

    // Guard 1: Prevent parallel/double clicks if ANY form on the page is submitting
    if (form.dataset.kananSubmitting === '1' || document.querySelector('[data-kanan-submitting="1"]')) {
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var formData = new FormData(form);
    var name = String(formData.get('name') || '').trim();
    var email = String(formData.get('email') || '').trim();
    var mobile_number = String(formData.get('mobile_number') || '').trim();
    var remarks = String(formData.get('remarks') || '').trim();

    if (!validateLeadFields(form, name, email, mobile_number, remarks)) {
      return;
    }

    var contactCheck = window.KananLeadValidation && window.KananLeadValidation.validateLeadContact;
    if (contactCheck) {
      var validated = contactCheck(email, mobile_number);
      if (!validated.ok) {
        var field = validated.field || (validated.error && validated.error.toLowerCase().indexOf('email') !== -1 ? 'email' : 'mobile_number');
        setFieldError(form, field, validated.error);
        return;
      }
      email = validated.email;
      mobile_number = validated.mobile_number;
    }

    var thankYou = form.dataset.thankYou || '';

    // Guard 2: Cross-form & Back-button deduplication
    // If the visitor already submitted with this exact mobile/email within 10 minutes:
    var recent = getRecentSubmission();
    if (recent && (recent.mobile === mobile_number || recent.email === email)) {
      lockAllFormsOnPage('Redirecting...');
      if (thankYou || recent.thankYou) {
        window.location.href = thankYou || recent.thankYou;
        return;
      }
    }

    // Immediately lock ALL forms on the page to prevent concurrent hero/modal submissions
    lockAllFormsOnPage('Submitting...');

    var payload = {
      name: name,
      email: email,
      mobile_number: mobile_number,
      remarks: remarks,
    };

    var landingSlug = form.dataset[LANDING_SLUG_DATASET_KEY];
    if (landingSlug != null && String(landingSlug).trim() !== '') {
      payload.utm_source_url = String(landingSlug).trim();
    }

    try {
      var response = await fetch(resolveSubmitUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      var result = null;
      try {
        result = await response.json();
      } catch (_) {
        result = null;
      }

      if (!response.ok) {
        throw new Error((result && result.error) || 'Something went wrong. Please try again.');
      }

      // Record successful submission in sessionStorage for session-wide deduplication
      recordSubmission(mobile_number, email, thankYou);

      // Keep all submit buttons locked with Redirecting state
      lockAllFormsOnPage('Redirecting...');

      // Clear input values
      document.querySelectorAll('[data-kanan-lead-form]').forEach(function (f) {
        if (typeof f.reset === 'function') f.reset();
        clearFieldErrors(f);
      });

      if (thankYou) {
        window.location.href = thankYou;
      }
    } catch (err) {
      setFormError(form, err.message || 'Something went wrong. Please try again.');
      unlockAllFormsOnPage();
    }
  }

  function bindFieldClearOnInput(form) {
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      if (!input.name) return;
      input.addEventListener('input', function () {
        setFieldError(form, input.name, '');
      });
    });
  }

  function initKananLeadForms() {
    document.querySelectorAll('[data-kanan-lead-form]').forEach(function (form) {
      if (form.dataset.kananBound === '1') return;
      form.dataset.kananBound = '1';
      // Avoid browser restoring previously submitted values on back navigation.
      form.setAttribute('autocomplete', 'off');
      bindFieldClearOnInput(form);
      form.addEventListener('submit', handleLeadSubmit);
    });
  }

  // Clear restored values when the user returns via browser Back (bfcache or history),
  // but if they already submitted recently, keep forms disabled and alert them if they try again.
  window.addEventListener('pageshow', function (event) {
    var nav = typeof performance !== 'undefined' && performance.getEntriesByType
      ? performance.getEntriesByType('navigation')[0]
      : null;
    if (event.persisted || (nav && nav.type === 'back_forward')) {
      resetAllLeadForms();
      var recent = getRecentSubmission();
      if (recent) {
        lockAllFormsOnPage('Submitted');
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKananLeadForms);
  } else {
    initKananLeadForms();
  }
})();
