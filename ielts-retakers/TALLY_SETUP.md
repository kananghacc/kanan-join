# Tally Form Setup Instructions

## Overview
The quiz now collects leads via Tally.so instead of PDF downloads. This allows automatic email delivery and better lead management.

## What Was Changed
- ✅ Added phone number field to email capture page
- ✅ Removed PDF download button
- ✅ Added Tally submission on quiz completion
- ✅ Shows "Check Your Email" message instead
- ✅ All quiz data is submitted to Tally as hidden fields

## Tomorrow: Create Your Tally Form

### Step 1: Create New Tally Form
1. Go to https://tally.so
2. Click "Create new form"
3. Give it a name like "IELTS Quiz Leads"

### Step 2: Add These Fields (In This Order)

#### Visible Fields (User Fills):
1. **Name** - Short text, Required
2. **Email** - Email field, Required
3. **Phone** - Phone field, Required

#### Hidden Fields (Auto-filled from quiz):
4. **practice1** - Short text, Hidden
5. **practice2** - Short text, Hidden
6. **practice3** - Short text, Hidden
7. **practice4** - Short text, Hidden
8. **practice5** - Short text, Hidden
9. **practice6** - Short text, Hidden
10. **practice7** - Short text, Hidden
11. **practice8** - Short text, Hidden
12. **practice9** - Short text, Hidden
13. **practice10** - Short text, Hidden
14. **currentSituation** - Short text, Hidden
15. **desiredOutcome** - Short text, Hidden
16. **biggestObstacle** - Short text, Hidden
17. **preferredSolution** - Short text, Hidden
18. **additionalInfo** - Long text, Hidden
19. **targetBand** - Short text, Hidden
20. **timeline** - Short text, Hidden
21. **weakSection** - Short text, Hidden
22. **studyTime** - Short text, Hidden
23. **obstacle** - Short text, Hidden

### Step 3: Configure Form Settings

#### General Settings:
- ✅ Enable "Allow pre-filling via URL parameters"
- ✅ Set form to "Always open" (not limited responses)

#### Notifications:
1. Click "Notifications" tab
2. Enable "Email respondent"
3. Set up email template with quiz results
4. You can use Tally's merge fields like {{name}}, {{targetBand}}, etc.

Example email template:
```
Hi {{name}},

Thanks for completing the IELTS quiz!

Your Results:
- Target Band: {{targetBand}}
- Timeline: {{timeline}}
- Focus Areas: {{weakSection}}
- Study Time: {{studyTime}}

[Add your personalized study plan here]

Best regards,
Kanan Team
```

#### Integrations (Optional):
- Connect to Google Sheets for backup
- Connect to your CRM
- Set up Zapier automation

### Step 4: Get Your Form ID
1. After creating the form, look at the URL
2. It will be something like: `https://tally.so/r/3E988L`
3. Copy the ID part: `3E988L`

### Step 5: Update the Code
1. Open: `src/config/tally.ts`
2. Replace `REPLACE_WITH_FORM_ID` with your actual form ID
3. Save the file

```typescript
export const TALLY_CONFIG = {
  formId: '3E988L', // ← Replace with your actual ID
  // ... rest of config
};
```

### Step 6: Test It!
1. Run `npm run dev`
2. Complete the quiz
3. Check that:
   - Phone number field shows up
   - Form submits to Tally
   - Email is received
   - Data appears in Tally dashboard

## Alternative: Use Existing Form from Another Page

If you want to use the same form from `spoken-english-for-college-students`:

1. Find the form ID in that page's HTML (look for `data-tally-src`)
2. Update `src/config/tally.ts` with that ID
3. Add the hidden fields listed above to that existing form
4. Make sure field names match exactly

## Troubleshooting

### Form not submitting?
- Check browser console for errors
- Make sure form ID is correct
- Verify "Allow pre-filling" is enabled in Tally

### Email not received?
- Check spam folder
- Verify email notification is enabled in Tally
- Test with a different email address

### Wrong data in fields?
- Check that field names in Tally match exactly with `src/config/tally.ts`
- Field names are case-sensitive!

## Files Modified

- `src/config/tally.ts` - Tally configuration (UPDATE THIS)
- `src/components/EmailCapture.tsx` - Added phone field
- `src/components/Quiz.tsx` - Added Tally submission
- `src/components/ResultsPage.tsx` - Removed PDF, added email confirmation
- `src/utils/tallySubmit.ts` - Handles Tally submission
- `src/utils/pdfGenerator.ts` - Added phone field to interface

## Questions?
Contact Claude for help updating the form ID or troubleshooting issues.
