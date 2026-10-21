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

  function digitsOnly(mobile) {
    return String(mobile || '').replace(/\D/g, '');
  }

  function isValidEmail(email) {
    var e = String(email || '').trim();
    if (!e || e.length > 254) return false;
    if (!EMAIL_RE.test(e)) return false;
    var local = e.split('@')[0];
    if (local.length > 64) return false;
    return true;
  }

  function isValidMobile(mobile) {
    var digits = digitsOnly(mobile);
    if (digits.length < 10 || digits.length > 15) return false;
    if (/^(\d)\1+$/.test(digits)) return false;
    return true;
  }

  /** Prefer E.164-style value sent to CRM. */
  function normalizeMobile(mobile) {
    var digits = digitsOnly(mobile);
    if (digits.length === 10 && /^[6-9]/.test(digits)) {
      return '+91' + digits;
    }
    if (digits.length > 10) {
      return '+' + digits;
    }
    return digits;
  }

  function validateLeadContact(email, mobile_number) {
    var trimmedEmail = String(email || '').trim();
    var trimmedMobile = String(mobile_number || '').trim();

    if (!isValidEmail(trimmedEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (!isValidMobile(trimmedMobile)) {
      return {
        ok: false,
        error:
          'Please enter a valid mobile number (10–15 digits; include country code if outside India).',
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
