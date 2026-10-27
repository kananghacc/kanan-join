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

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
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

      var thankYou = form.dataset.thankYou;
      if (thankYou) {
        window.location.href = thankYou;
      }
    } catch (err) {
      setFormError(form, err.message || 'Something went wrong. Please try again.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
      }
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
      bindFieldClearOnInput(form);
      form.addEventListener('submit', handleLeadSubmit);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKananLeadForms);
  } else {
    initKananLeadForms();
  }
})();
