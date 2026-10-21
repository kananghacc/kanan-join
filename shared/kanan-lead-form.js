(function () {
  function resolveSubmitUrl() {
    var url = typeof window.KANAN_CRM_SUBMIT_URL === 'string' ? window.KANAN_CRM_SUBMIT_URL : '';
    if (!url || url.indexOf('__CRM_SUBMIT_URL__') !== -1) {
      return '/api/submit-lead';
    }
    return url;
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

  var UTM_DATASET_KEYS = {
    utm_source: 'utmSource',
    utm_category: 'utmCategory',
    utm_campaign: 'utmCampaign',
    lead_source: 'leadSource',
    utm_source_url: 'utmSourceUrl',
  };

  async function handleLeadSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var submitBtn = form.querySelector('button[type="submit"]');
    var formData = new FormData(form);
    var name = String(formData.get('name') || '').trim();
    var email = String(formData.get('email') || '').trim();
    var mobile_number = String(formData.get('mobile_number') || '').trim();
    var remarks = String(formData.get('remarks') || '').trim();

    setFormError(form, '');

    if (!name || !email || !mobile_number || !remarks) {
      setFormError(form, 'Please fill in all fields.');
      return;
    }

    var payload = {
      name: name,
      email: email,
      mobile_number: mobile_number,
      remarks: remarks,
    };

    Object.keys(UTM_DATASET_KEYS).forEach(function (key) {
      var v = form.dataset[UTM_DATASET_KEYS[key]];
      if (v != null && String(v).trim() !== '') {
        payload[key] = String(v).trim();
      }
    });

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

  function initKananLeadForms() {
    document.querySelectorAll('[data-kanan-lead-form]').forEach(function (form) {
      if (form.dataset.kananBound === '1') return;
      form.dataset.kananBound = '1';
      form.addEventListener('submit', handleLeadSubmit);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKananLeadForms);
  } else {
    initKananLeadForms();
  }
})();
