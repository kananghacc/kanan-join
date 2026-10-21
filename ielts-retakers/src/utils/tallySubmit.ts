import { TALLY_CONFIG } from '../config/tally';
import { ProcessedQuizAnswers } from './pdfGenerator';

/**
 * Submits quiz data to Tally.so form
 * Uses URL pre-filling method (no API key needed)
 */
export function submitToTally(answers: ProcessedQuizAnswers): void {
  // Build URL with pre-filled parameters
  const baseUrl = TALLY_CONFIG.getFormUrl();
  const params = new URLSearchParams();

  // Add user-entered fields
  if (answers.name) params.append(TALLY_CONFIG.fieldMapping.name, answers.name);
  if (answers.email) params.append(TALLY_CONFIG.fieldMapping.email, answers.email);
  if (answers.phone) params.append(TALLY_CONFIG.fieldMapping.phone, answers.phone);

  // Add quiz answers (hidden fields)
  params.append(TALLY_CONFIG.fieldMapping.practice1, answers.practice1);
  params.append(TALLY_CONFIG.fieldMapping.practice2, answers.practice2);
  params.append(TALLY_CONFIG.fieldMapping.practice3, answers.practice3);
  params.append(TALLY_CONFIG.fieldMapping.practice4, answers.practice4);
  params.append(TALLY_CONFIG.fieldMapping.practice5, answers.practice5);
  params.append(TALLY_CONFIG.fieldMapping.practice6, answers.practice6);
  params.append(TALLY_CONFIG.fieldMapping.practice7, answers.practice7);
  params.append(TALLY_CONFIG.fieldMapping.practice8, answers.practice8);
  params.append(TALLY_CONFIG.fieldMapping.practice9, answers.practice9);
  params.append(TALLY_CONFIG.fieldMapping.practice10, answers.practice10);

  params.append(TALLY_CONFIG.fieldMapping.currentSituation, answers.currentSituation);
  params.append(TALLY_CONFIG.fieldMapping.desiredOutcome, answers.desiredOutcome);
  params.append(TALLY_CONFIG.fieldMapping.biggestObstacle, answers.biggestObstacle);
  params.append(TALLY_CONFIG.fieldMapping.preferredSolution, answers.preferredSolution);
  params.append(TALLY_CONFIG.fieldMapping.additionalInfo, answers.additionalInfo);

  // Add derived/computed fields (hidden)
  if (answers.targetBand) {
    params.append(TALLY_CONFIG.fieldMapping.targetBand, answers.targetBand);
  }
  if (answers.timeline) {
    params.append(TALLY_CONFIG.fieldMapping.timeline, answers.timeline);
  }
  if (answers.weakSection && answers.weakSection.length > 0) {
    params.append(TALLY_CONFIG.fieldMapping.weakSection, answers.weakSection.join(', '));
  }
  if (answers.studyTime) {
    params.append(TALLY_CONFIG.fieldMapping.studyTime, answers.studyTime);
  }
  if (answers.obstacle && answers.obstacle.length > 0) {
    params.append(TALLY_CONFIG.fieldMapping.obstacle, answers.obstacle.join(', '));
  }

  // Open Tally form in new tab with pre-filled data
  const fullUrl = `${baseUrl}?${params.toString()}`;

  // Submit via hidden iframe to avoid popup blockers
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = fullUrl;
  document.body.appendChild(iframe);

  // Auto-submit the form after a brief delay
  setTimeout(() => {
    const form = iframe.contentWindow?.document.querySelector('form');
    if (form) {
      form.submit();
    }
    // Clean up after submission
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  }, 500);
}

/**
 * Alternative: Open Tally form in popup (if you want user to see the form)
 */
export function openTallyForm(answers: ProcessedQuizAnswers): void {
  const baseUrl = TALLY_CONFIG.getFormUrl();
  const params = new URLSearchParams();

  // Same parameter building as above...
  if (answers.name) params.append(TALLY_CONFIG.fieldMapping.name, answers.name);
  if (answers.email) params.append(TALLY_CONFIG.fieldMapping.email, answers.email);
  if (answers.phone) params.append(TALLY_CONFIG.fieldMapping.phone, answers.phone);

  // Add all quiz data...
  params.append(TALLY_CONFIG.fieldMapping.practice1, answers.practice1);
  params.append(TALLY_CONFIG.fieldMapping.practice2, answers.practice2);
  params.append(TALLY_CONFIG.fieldMapping.practice3, answers.practice3);
  params.append(TALLY_CONFIG.fieldMapping.practice4, answers.practice4);
  params.append(TALLY_CONFIG.fieldMapping.practice5, answers.practice5);
  params.append(TALLY_CONFIG.fieldMapping.practice6, answers.practice6);
  params.append(TALLY_CONFIG.fieldMapping.practice7, answers.practice7);
  params.append(TALLY_CONFIG.fieldMapping.practice8, answers.practice8);
  params.append(TALLY_CONFIG.fieldMapping.practice9, answers.practice9);
  params.append(TALLY_CONFIG.fieldMapping.practice10, answers.practice10);
  params.append(TALLY_CONFIG.fieldMapping.currentSituation, answers.currentSituation);
  params.append(TALLY_CONFIG.fieldMapping.desiredOutcome, answers.desiredOutcome);
  params.append(TALLY_CONFIG.fieldMapping.biggestObstacle, answers.biggestObstacle);
  params.append(TALLY_CONFIG.fieldMapping.preferredSolution, answers.preferredSolution);
  params.append(TALLY_CONFIG.fieldMapping.additionalInfo, answers.additionalInfo);

  if (answers.targetBand) params.append(TALLY_CONFIG.fieldMapping.targetBand, answers.targetBand);
  if (answers.timeline) params.append(TALLY_CONFIG.fieldMapping.timeline, answers.timeline);
  if (answers.weakSection) params.append(TALLY_CONFIG.fieldMapping.weakSection, answers.weakSection.join(', '));
  if (answers.studyTime) params.append(TALLY_CONFIG.fieldMapping.studyTime, answers.studyTime);
  if (answers.obstacle) params.append(TALLY_CONFIG.fieldMapping.obstacle, answers.obstacle.join(', '));

  const fullUrl = `${baseUrl}?${params.toString()}`;

  // Open in new tab
  window.open(fullUrl, '_blank', 'noopener,noreferrer');
}
