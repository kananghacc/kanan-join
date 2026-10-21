/**
 * Email and mobile validation for Kanan CRM lead forms (browser + Node).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.KananLeadValidation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var EMAIL_RE =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  var INDIAN_MOBILE_RE = /^[6-9]\d{9}$/;

  function digitsOnly(mobile) {
    return String(mobile || '').replace(/\D/g, '');
  }

  function tenDigitMobile(mobile) {
    var digits = digitsOnly(mobile);
    if (digits.length === 12 && digits.indexOf('91') === 0 && INDIAN_MOBILE_RE.test(digits.slice(2))) {
      return digits.slice(2);
    }
    if (digits.length === 11 && digits.charAt(0) === '0' && INDIAN_MOBILE_RE.test(digits.slice(1))) {
      return digits.slice(1);
    }
    return digits;
  }

  function isValidEmail(email) {
    var e = String(email || '').trim();
    if (!e || e.length > 254) return false;
    if (!EMAIL_RE.test(e)) return false;
    var local = e.split('@')[0];
    if (local.length > 64) return false;
    return true;
  }

  /** Exactly 10 digits; Indian mobile (starts with 6–9). */
  function isValidMobile(mobile) {
    var digits = tenDigitMobile(mobile);
    if (digits.length !== 10) return false;
    if (!INDIAN_MOBILE_RE.test(digits)) return false;
    if (/^(\d)\1+$/.test(digits)) return false;
    return true;
  }

  function normalizeMobile(mobile) {
    var digits = tenDigitMobile(mobile);
    if (INDIAN_MOBILE_RE.test(digits)) {
      return '+91' + digits;
    }
    return digitsOnly(mobile);
  }

  function validateLeadContact(email, mobile_number) {
    var trimmedEmail = String(email || '').trim();
    var trimmedMobile = String(mobile_number || '').trim();

    if (!trimmedEmail) {
      return { ok: false, error: 'Email is required.', field: 'email' };
    }
    if (!isValidEmail(trimmedEmail)) {
      return { ok: false, error: 'Please enter a valid email address.', field: 'email' };
    }
    if (!trimmedMobile) {
      return { ok: false, error: 'Mobile number is required.', field: 'mobile_number' };
    }
    if (!isValidMobile(trimmedMobile)) {
      return {
        ok: false,
        error: 'Please enter a valid 10-digit mobile number.',
        field: 'mobile_number',
      };
    }
    return {
      ok: true,
      email: trimmedEmail,
      mobile_number: normalizeMobile(trimmedMobile),
    };
  }

  return {
    isValidEmail: isValidEmail,
    isValidMobile: isValidMobile,
    normalizeMobile: normalizeMobile,
    validateLeadContact: validateLeadContact,
  };
});
