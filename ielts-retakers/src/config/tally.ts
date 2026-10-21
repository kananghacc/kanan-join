// Tally.so Form Configuration
// Update this with your actual Tally form ID when ready

export const TALLY_CONFIG = {
  // TODO: Replace with actual Tally form ID (e.g., '3E988L')
  formId: 'REPLACE_WITH_FORM_ID',

  // Tally form URL will be: https://tally.so/r/{formId}
  getFormUrl: () => `https://tally.so/r/${TALLY_CONFIG.formId}`,

  // Field mapping for hidden fields in Tally form
  // These should match the field IDs in your Tally form
  fieldMapping: {
    // User-entered fields (visible)
    name: 'name',
    email: 'email',
    phone: 'phone',

    // Quiz answers (hidden fields)
    practice1: 'practice1',
    practice2: 'practice2',
    practice3: 'practice3',
    practice4: 'practice4',
    practice5: 'practice5',
    practice6: 'practice6',
    practice7: 'practice7',
    practice8: 'practice8',
    practice9: 'practice9',
    practice10: 'practice10',

    currentSituation: 'currentSituation',
    desiredOutcome: 'desiredOutcome',
    biggestObstacle: 'biggestObstacle',
    preferredSolution: 'preferredSolution',
    additionalInfo: 'additionalInfo',

    // Derived/computed fields (hidden)
    targetBand: 'targetBand',
    timeline: 'timeline',
    weakSection: 'weakSection',
    studyTime: 'studyTime',
    obstacle: 'obstacle',
  }
};

/*
TALLY FORM SETUP INSTRUCTIONS:
================================

When creating your Tally form, add these fields:

VISIBLE FIELDS (User fills out):
1. Name (Short text, required)
2. Email (Email field, required)
3. Phone (Phone field, required)

HIDDEN FIELDS (Pre-filled from quiz):
4. practice1 - practice10 (Short text, hidden)
5. currentSituation (Short text, hidden)
6. desiredOutcome (Short text, hidden)
7. biggestObstacle (Short text, hidden)
8. preferredSolution (Short text, hidden)
9. additionalInfo (Long text, hidden)
10. targetBand (Short text, hidden)
11. timeline (Short text, hidden)
12. weakSection (Short text, hidden)
13. studyTime (Short text, hidden)
14. obstacle (Short text, hidden)

TALLY SETTINGS TO CONFIGURE:
- Enable "Allow pre-filling via URL parameters"
- Set up email notification to send results to user
- Configure auto-responder with quiz results
- Export to Google Sheets (optional)

EXAMPLE TALLY FORM URL WITH PRE-FILLED DATA:
https://tally.so/r/YOUR_FORM_ID?name=John&email=john@example.com&targetBand=7.5&...

*/
