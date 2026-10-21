import jsPDF from 'jspdf';
import { QuizAnswers } from '../components/Quiz';

// Removed unused formatArrayToString function

// Extended type for processed quiz answers with derived properties
export interface ProcessedQuizAnswers extends QuizAnswers {
  targetBand: string;
  timeline: string;
  weakSection: string[];
  studyTime: string;
  obstacle: string[];
  phone?: string; // Added phone number field
}

// Helper function to process quiz answers and derive the properties needed for PDF generation
export function processQuizAnswers(answers: QuizAnswers): ProcessedQuizAnswers {
  // Compute derived properties from raw quiz answers
  const processedAnswers: ProcessedQuizAnswers = {
    ...answers,
    // Target band - derive from desired outcome or use a default
    targetBand: answers.desiredOutcome?.includes('university') || answers.desiredOutcome?.includes('professional') ? '7.0' :
                answers.desiredOutcome?.includes('immigration') ? '6.5' : '7.0',

    // Timeline - derive from practice questions or use a default
    timeline: (answers.practice1?.includes('never') || answers.practice8?.includes('never')) ? '1-4 weeks' :
              (answers.practice1?.includes('regularly') && answers.practice8?.includes('thoroughly')) ? '2-3 months' : '1-2 months',

    // Weak sections - derive from practice questions that indicate weaknesses
    weakSection: [
      ...(answers.practice1?.includes('never') || answers.practice6?.includes('Never') ? ['Writing'] : []),
      ...(answers.practice2?.includes('never') || answers.practice7?.includes('never') ? ['Speaking'] : []),
      ...(answers.practice4?.includes('Only one accent') || answers.practice5?.includes('never') ? ['Listening'] : []),
      ...(answers.practice8?.includes('never') || answers.practice9?.includes('never') ? ['Reading'] : [])
    ].length > 0 ? [
      ...(answers.practice1?.includes('never') || answers.practice6?.includes('Never') ? ['Writing'] : []),
      ...(answers.practice2?.includes('never') || answers.practice7?.includes('never') ? ['Speaking'] : []),
      ...(answers.practice4?.includes('Only one accent') || answers.practice5?.includes('never') ? ['Listening'] : []),
      ...(answers.practice8?.includes('never') || answers.practice9?.includes('never') ? ['Reading'] : [])
    ] : ['Writing', 'Speaking'], // Default if no clear weaknesses

    // Study time - derive from practice regularity
    studyTime: (answers.practice1?.includes('regularly') && answers.practice8?.includes('thoroughly')) ? '2-3 hours' :
               (answers.practice1?.includes('Sometimes') || answers.practice8?.includes('Sometimes')) ? '1-2 hours' : '30-60 minutes',

    // Obstacles - derive from biggest obstacles and other indicators
    obstacle: (() => {
      const obstacles = [];
      
      // Handle multiple obstacles from user selection
      if (Array.isArray(answers.biggestObstacle)) {
        // Multiple obstacles selected
        if (answers.biggestObstacle.includes('Time constraints')) {
          obstacles.push('Time management during the test');
        }
        if (answers.biggestObstacle.includes('Specific skill weaknesses')) {
          obstacles.push('Vocabulary limitations');
        }
        if (answers.biggestObstacle.includes('Test anxiety')) {
          obstacles.push('Test anxiety and confidence');
        }
        if (answers.biggestObstacle.includes('Lack of structured study plan')) {
          obstacles.push('Lack of structured approach');
        }
        if (answers.biggestObstacle.includes('Limited resources')) {
          obstacles.push('Limited study resources');
        }
      } else if (typeof answers.biggestObstacle === 'string') {
        // Single obstacle selected (backward compatibility)
        if (answers.biggestObstacle.includes('Time constraints')) {
          obstacles.push('Time management during the test');
        }
        if (answers.biggestObstacle.includes('Specific skill weaknesses')) {
          obstacles.push('Vocabulary limitations');
        }
        if (answers.biggestObstacle.includes('Test anxiety')) {
          obstacles.push('Test anxiety and confidence');
        }
        if (answers.biggestObstacle.includes('Lack of structured study plan')) {
          obstacles.push('Lack of structured approach');
        }
        if (answers.biggestObstacle.includes('Limited resources')) {
          obstacles.push('Limited study resources');
        }
      }
      
      // Add inferred obstacles from practice patterns
      if (answers.practice3?.includes('Limited variety') || answers.practice9?.includes('never')) {
        obstacles.push('Poor grammar');
      }
      
      // Return obstacles or default if none detected
      return obstacles.length > 0 ? obstacles : ['Time management during the test', 'Poor grammar'];
    })()
  };

  return processedAnswers;
}

export function generatePDF(answers: QuizAnswers) {
  const processedAnswers = processQuizAnswers(answers);
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16,
    compress: true
  });

  // Ensure proper Unicode support and encoding
  doc.setProperties({
    title: 'IELTS Study Plan',
    subject: 'Personalized IELTS Study Plan',
    author: 'IELTS Success Academy',
    creator: 'IELTS Success Academy'
  });

  // Set language for better Unicode support
  doc.setLanguage('en-US');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Erik Kennedy: Double whitespace - increased margins
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;

  // Brand colors (matching our design system)
  const brandPrimary: [number, number, number] = [99, 102, 241]; // brand-600
  const brandLight: [number, number, number] = [224, 231, 255]; // brand-100
  const neutralDark: [number, number, number] = [23, 23, 23]; // neutral-900
  const neutralMedium: [number, number, number] = [115, 115, 115]; // neutral-500
  const neutralLight: [number, number, number] = [245, 245, 244]; // neutral-100
  const accentAmber: [number, number, number] = [251, 191, 36]; // amber-400

  // Clean ASCII icons (guaranteed compatibility across all PDF viewers)
  const icons = {
    star: '*',
    check: '+',
    cross: 'x',
    arrow: '->',
    sparkle: '*',
    trophy: '[T]',
    target: '[G]',
    calendar: '[C]',
    book: '[B]',
    rocket: '[R]',
    lightbulb: '[I]',
    chart: '[CH]',
    medal: '[M]',
    graduation: '[D]',
    clock: '[T]'
  };
  // ========================================
  // Page 1: Cover + Introduction (Erik Kennedy: Better hierarchy, more whitespace)
  // ========================================

  // Large header block with gradient effect and decorative elements
  doc.setFillColor(...brandPrimary);
  doc.rect(0, 0, pageWidth, 120, 'F');

  // Decorative circles
  doc.setFillColor(79, 70, 229); // Slightly darker
  doc.circle(15, 15, 20, 'F');
  doc.setFillColor(147, 51, 234); // Purple
  doc.circle(pageWidth - 15, 110, 15, 'F');

  doc.setTextColor(255, 255, 255);

  // Icon trophy
  doc.setFontSize(32);
  doc.text(icons.trophy, pageWidth / 2 - 8, 18);

  // Small label at top
  doc.setFontSize(11);
  doc.text(`PERSONALIZED IELTS STUDY PLAN`, pageWidth / 2, 30, { align: 'center' });

  // Main title - Erik Kennedy: Larger, better hierarchy
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('A Roadmap for Success', pageWidth / 2, 50, {
    align: 'center'
  });

  // Subtitle with icon
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${icons.graduation} Hello! ${answers.name || 'Student'}`, pageWidth / 2, 70, {
    align: 'center'
  });

  // Erik Kennedy: More whitespace below header
  let yPos = 140;

  // Introduction content area with light background
  doc.setTextColor(...neutralDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Based on your assessment, here is a tailored plan to help you achieve your IELTS goals.`, margin, yPos);

  yPos += 20;

  // Key highlights box - Erik Kennedy: Use color purposefully
  doc.setFillColor(...brandLight);
  doc.rect(margin - 3, yPos - 5, 3, 60, 'F'); // Accent bar
  doc.setFillColor(254, 252, 232); // Very light amber
  doc.rect(margin, yPos - 5, contentWidth, 60, 'F');

  doc.setTextColor(...neutralDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`${icons.target} Current Situation: ${processedAnswers.currentSituation}`, margin + 8, yPos + 5);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${icons.calendar} Goal (90 days): ${processedAnswers.desiredOutcome}`, margin + 8, yPos + 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${icons.book} Biggest Challenge: ${processedAnswers.biggestObstacle}`, margin + 8, yPos + 31);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${icons.lightbulb} Preferred Support: ${processedAnswers.preferredSolution}`, margin + 8, yPos + 44);

  yPos += 75;

  // Introduction text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  const introText = "We've taken into account that your test is approaching quickly and you're most concerned about specific areas. Let's get started on your journey to success!";
  const splitIntro = doc.splitTextToSize(introText, contentWidth);
  doc.text(splitIntro, margin, yPos);

  // Footer with metadata - Erik Kennedy: Make less important text "un-pop"
  doc.setFontSize(9);
  doc.setTextColor(...neutralMedium);
  doc.text('Prepared by IELTS Success Academy', pageWidth / 2, pageHeight - 30, {
    align: 'center'
  });
  doc.text(new Date().toLocaleDateString(), pageWidth / 2, pageHeight - 20, {
    align: 'center'
  });
  // ========================================
  // Page 2: Diagnostic Summary (Erik Kennedy: Fewer borders, better spacing)
  // ========================================

  doc.addPage();
  yPos = margin;

  // Decorative circles
  doc.setFillColor(...brandLight);
  doc.circle(pageWidth - 20, 20, 10, 'F');
  doc.setFillColor(224, 242, 254); // Light blue
  doc.circle(15, pageHeight - 30, 15, 'F');

  // Decorative element at top
  doc.setFillColor(...brandLight);
  doc.rect(margin - 5, yPos - 8, 3, 25, 'F');

  // Section title with icon
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.setFontSize(24);
  doc.text(icons.chart, margin + 2, yPos);
  doc.setFontSize(22);
  doc.text('Diagnostic Summary', margin + 14, yPos);

  yPos += 20; // Erik Kennedy: Doubled whitespace

  // Introduction text
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  doc.text("Here's a snapshot of your current situation. This is the foundation upon which your personalized plan is built.", margin, yPos);

  yPos += 25;

  // Profile cards with better visual separation
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  const profileItems = [
    { label: 'Current Situation', value: processedAnswers.currentSituation, highlight: true, icon: icons.target },
    { label: 'Goal (90 days)', value: processedAnswers.desiredOutcome, highlight: false, icon: icons.clock },
    { label: 'Biggest Challenge', value: processedAnswers.biggestObstacle, highlight: false, icon: icons.book },
    { label: 'Preferred Support', value: processedAnswers.preferredSolution, highlight: false, icon: icons.medal },
    { label: 'Additional Info', value: processedAnswers.additionalInfo || 'None provided', highlight: false, icon: icons.calendar }
  ];

  profileItems.forEach((item) => {
    // Light background card - Erik Kennedy: Fewer borders
    if (item.highlight) {
      doc.setFillColor(...brandLight);
    } else {
      doc.setFillColor(...neutralLight);
    }
    doc.rect(margin, yPos, contentWidth, 16, 'F');

    // Icon
    doc.setFontSize(12);
    doc.setTextColor(...brandPrimary);
    doc.text(item.icon, margin + 5, yPos + 8);

    // Label - Erik Kennedy: Make less important text "un-pop"
    doc.setTextColor(...neutralMedium);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(item.label.toUpperCase(), margin + 13, yPos + 6);

    // Value - Erik Kennedy: Make important text pop
    doc.setTextColor(...neutralDark);
    doc.setFontSize(11);
    doc.setFont('helvetica', item.highlight ? 'bold' : 'normal');
    doc.text(item.value, margin + 13, yPos + 13);

    yPos += 20; // Erik Kennedy: Better spacing
  });

  yPos += 10;

  // Summary box with accent color - Erik Kennedy: Use color purposefully
  doc.setFillColor(...accentAmber);
  doc.rect(margin - 3, yPos, 3, 35, 'F'); // Accent bar on left
  doc.setFillColor(254, 252, 232); // Very light amber
  doc.rect(margin, yPos, contentWidth, 35, 'F');

  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Your Foundation for Success', margin + 8, yPos);

  yPos += 8;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralDark);
  const summaryText = "Acknowledging these points is the first step toward a successful preparation strategy. Your personalized plan will address each of these areas systematically.";
  const splitText = doc.splitTextToSize(summaryText, contentWidth - 16);
  doc.text(splitText, margin + 8, yPos);
  // ========================================
  // Pages 3-4: Your Custom Study Roadmap (Erik Kennedy: Better hierarchy)
  // ========================================

  doc.addPage();
  yPos = margin;

  // Decorative circles
  doc.setFillColor(254, 243, 199); // Light amber
  doc.circle(pageWidth - 15, pageHeight - 40, 12, 'F');
  doc.setFillColor(...brandLight);
  doc.circle(20, 40, 8, 'F');

  // Section header with icon
  doc.setFontSize(24);
  doc.setTextColor(...neutralDark);
  doc.text(icons.rocket, margin, yPos);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Custom Study Roadmap', margin + 12, yPos);

  yPos += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  doc.text('This roadmap is designed to be realistic and effective, fitting into your daily schedule. Given your aggressive timeline of 1-4 weeks, this plan is highly intensive and focused on maximizing your score quickly.', margin, yPos);

  yPos += 25; // Erik Kennedy: Doubled whitespace

  // Phase 1: Intensive Skill Building & Strategy
  const phase1Title = 'Phase 1: Intensive Skill Building & Strategy (Week 1-2)';
  doc.setFillColor(...brandPrimary);
  doc.rect(margin, yPos, contentWidth, 14, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(icons.calendar, margin + 5, yPos + 9);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(phase1Title, margin + 13, yPos + 9);

  yPos += 20;

  doc.setTextColor(...neutralDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('This phase is all about drilling fundamental skills and mastering essential strategies for your focus areas.', margin, yPos);

  yPos += 18;

  // Daily Commitment Box
  doc.setFillColor(...accentAmber);
  doc.rect(margin - 3, yPos, 3, 25, 'F');
  doc.setFillColor(254, 252, 232);
  doc.rect(margin, yPos, contentWidth, 25, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Daily Commitment (1-2 hours):', margin + 8, yPos + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Dedicate approximately 60% of your time to Writing, 40% to Reading.', margin + 8, yPos + 16);

  yPos += 30;

  // Writing Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Writing (60-70 min):', margin, yPos);

  yPos += 15;

  const writingTasks = [
    'Practice one Task 1 (report for Academic, letter for General) and one Task 2 essay daily.',
    'Spend 20-30 minutes specifically on grammar drills. Focus on common errors like subject-verb agreement, tenses, article usage, and complex sentence structures.',
    'Use online grammar quizzes and rewrite sentences to correct errors.',
    'Review official IELTS band descriptors for Task 1 and Task 2.'
  ];

  writingTasks.forEach(task => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 4, yPos - 2, 1.5, 'F');

    const taskLines = doc.splitTextToSize(task, contentWidth - 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(taskLines, margin + 10, yPos);
    yPos += (taskLines.length * 5) + 6;
  });

  yPos += 10;

  // Reading Section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Reading (40-50 min):', margin, yPos);

  yPos += 15;

  const readingTasks = [
    'Complete 2-3 Reading passages under timed conditions (aim for 15-17 minutes per passage initially).',
    'Focus on mastering specific question types you find challenging (e.g., True/False/Not Given, Heading Matching).',
    'Learn and practice efficient skimming for main ideas and scanning for specific information.'
  ];

  readingTasks.forEach(task => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 4, yPos - 2, 1.5, 'F');

    const taskLines = doc.splitTextToSize(task, contentWidth - 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(taskLines, margin + 10, yPos);
    yPos += (taskLines.length * 5) + 6;
  });

  // Check if we need a new page for Phase 2
  if (yPos > 200) {
    doc.addPage();
    yPos = margin;
  } else {
    yPos += 15;
  }

  // Weekly Goals for Phase 1
  doc.setFillColor(...brandLight);
  doc.rect(margin - 3, yPos, 3, 50, 'F');
  doc.setFillColor(254, 252, 232);
  doc.rect(margin, yPos, contentWidth, 50, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Weekly Goal (Phase 1):', margin + 8, yPos + 8);

  yPos += 15;

  const weeklyGoals1 = [
    'Writing: Submit at least 3-4 full writing tasks for detailed feedback (if possible). Identify and consistently work on correcting your top 3-5 grammar errors.',
    'Reading: Accurately complete 80% of questions in your practice passages. Analyze every incorrect answer to understand the reasoning and where your strategy failed.'
  ];

  weeklyGoals1.forEach(goal => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 8, yPos - 2, 1.5, 'F');

    const goalLines = doc.splitTextToSize(goal, contentWidth - 20);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(goalLines, margin + 14, yPos);
    yPos += (goalLines.length * 4) + 5;
  });

  // Phase 2: Timed Integration & Mock Test Simulation
  yPos += 15;
  const phase2Title = 'Phase 2: Timed Integration & Mock Test Simulation (Week 3-4)';
  doc.setFillColor(...brandPrimary);
  doc.rect(margin, yPos, contentWidth, 14, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(icons.calendar, margin + 5, yPos + 9);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(phase2Title, margin + 13, yPos + 9);

  yPos += 20;

  doc.setTextColor(...neutralDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text("Now, it's about putting everything together under strict time constraints, directly addressing your 'Time management' obstacle.", margin, yPos);

  yPos += 18;

  // Daily Commitment Box for Phase 2
  doc.setFillColor(...accentAmber);
  doc.rect(margin - 3, yPos, 3, 25, 'F');
  doc.setFillColor(254, 252, 232);
  doc.rect(margin, yPos, contentWidth, 25, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Daily Commitment (1-2 hours):', margin + 8, yPos + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Continue intensive practice with strict timing and comprehensive review.', margin + 8, yPos + 16);

  yPos += 30;

  // Writing Section for Phase 2
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Writing (60-70 min):', margin, yPos);

  yPos += 15;

  const writingTasks2 = [
    'Continue daily practice (1 Task 1, 1 Task 2). From day one, time yourself strictly (20 min for Task 1, 40 min for Task 2).',
    'Focus on producing well-structured, coherent responses within the word limits, applying all learned grammar rules.'
  ];

  writingTasks2.forEach(task => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 4, yPos - 2, 1.5, 'F');

    const taskLines = doc.splitTextToSize(task, contentWidth - 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(taskLines, margin + 10, yPos);
    yPos += (taskLines.length * 5) + 6;
  });

  yPos += 10;

  // Reading Section for Phase 2
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Reading (40-50 min):', margin, yPos);

  yPos += 15;

  const readingTasks2 = [
    'Complete one full Reading section (3 passages, 60 minutes) under exam conditions daily.',
    'This is crucial for improving your pacing and time management. Practice transferring answers accurately.'
  ];

  readingTasks2.forEach(task => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 4, yPos - 2, 1.5, 'F');

    const taskLines = doc.splitTextToSize(task, contentWidth - 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(taskLines, margin + 10, yPos);
    yPos += (taskLines.length * 5) + 6;
  });

  yPos += 10;

  // General Section for Phase 2
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('General (10-20 min, if available):', margin, yPos);

  yPos += 15;

  const generalTasks = [
    'Review your vocabulary lists. Briefly review Listening and Speaking tips/strategies.'
  ];

  generalTasks.forEach(task => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 4, yPos - 2, 1.5, 'F');

    const taskLines = doc.splitTextToSize(task, contentWidth - 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(taskLines, margin + 10, yPos);
    yPos += (taskLines.length * 5) + 6;
  });

  // Check if we need a new page for Weekly Goals Phase 2
  if (yPos > 180) {
    doc.addPage();
    yPos = margin;
  } else {
    yPos += 15;
  }

  // Weekly Goals for Phase 2
  doc.setFillColor(...brandLight);
  doc.rect(margin - 3, yPos, 3, 55, 'F');
  doc.setFillColor(254, 252, 232);
  doc.rect(margin, yPos, contentWidth, 55, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Weekly Goal (Phase 2):', margin + 8, yPos + 8);

  yPos += 15;

  const weeklyGoals2 = [
    'Full Mock Tests: Take two full-length mock tests (all sections: Listening, Reading, Writing, Speaking) under strict exam conditions. Mimic test day as closely as possible.',
    'Error Analysis: Conduct a comprehensive error analysis for all sections of your mock tests. Pinpoint remaining grammar weaknesses, identify where you struggled with time, and adjust your strategies.',
    'Refinement: Consolidate notes on common mistakes and essential strategies. Focus on areas where you are still losing points.'
  ];

  weeklyGoals2.forEach(goal => {
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 8, yPos - 2, 1.5, 'F');

    const goalLines = doc.splitTextToSize(goal, contentWidth - 20);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...neutralDark);
    doc.text(goalLines, margin + 14, yPos);
    yPos += (goalLines.length * 4) + 5;
  });
  // ========================================
  // Page 5: Why Most Self-Study Plans Fail (Erik Kennedy: Visual hierarchy)
  // ========================================

  doc.addPage();
  yPos = margin;

  // Decorative circles
  doc.setFillColor(255, 245, 245); // Very light red
  doc.circle(pageWidth - 18, 22, 14, 'F');
  doc.setFillColor(224, 242, 254); // Light blue
  doc.circle(18, pageHeight - 28, 11, 'F');

  // Section header with icon
  doc.setFontSize(24);
  doc.setTextColor(239, 68, 68); // red color for warning
  doc.text(icons.cross, margin, yPos);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Why Most Self-Study Plans Fail', margin + 12, yPos);

  yPos += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  doc.text("Many ambitious students struggle to achieve their target band score alone. Here are common pitfalls related to your biggest obstacle(s), 'Poor grammar, Time management during the test':", margin, yPos);

  yPos += 25;

  const commonMistakes = [{
    mistake: 'Lack of Expert Feedback on Grammar',
    description: "You can't objectively identify and consistently correct your own grammar errors. Without a trained eye, you risk reinforcing incorrect sentence structures, tense usage, or vocabulary choices, making it harder to improve."
  }, {
    mistake: 'Ineffective Timed Practice',
    description: "Simply doing practice tests isn't enough. Without understanding why you're running out of time or how to effectively pace yourself through different question types, especially in Reading and Writing, you won't make significant progress. Generic timers don't provide tailored strategies."
  }, {
    mistake: 'Generic Materials & No Accountability',
    description: `Random online materials don't address your specific gap between your current level and your target band, particularly concerning your main challenges. Without accountability, it's easy to lose momentum or deviate from a structured plan, especially with your timeline constraints.`
  }];

  commonMistakes.forEach(item => {
    if (yPos > 220) {
      doc.addPage();
      yPos = margin + 10;
    }

    // Light background card - Erik Kennedy: Fewer borders
    const cardHeight = 40;
    doc.setFillColor(255, 245, 245); // Very light red
    doc.rect(margin, yPos, contentWidth, cardHeight, 'F');

    // Red accent bar - Erik Kennedy: Use color purposefully
    doc.setFillColor(239, 68, 68); // red-600
    doc.rect(margin, yPos, 3, cardHeight, 'F');

    yPos += 10;

    // Warning icon
    doc.setFontSize(14);
    doc.setTextColor(239, 68, 68);
    doc.text(icons.cross, margin + 8, yPos);

    // Title - Erik Kennedy: Make text pop
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...neutralDark);
    doc.text(item.mistake, margin + 16, yPos);

    yPos += 7;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...neutralMedium);
    const splitDesc = doc.splitTextToSize(item.description, contentWidth - 24);
    doc.text(splitDesc, margin + 16, yPos);

    yPos += cardHeight - 10 + 20; // Erik Kennedy: Doubled whitespace
  });
  // ========================================
  // Page 6: How Our Coaching Accelerates Results (Erik Kennedy: Better design)
  // ========================================

  doc.addPage();
  yPos = margin;

  // Decorative circles
  doc.setFillColor(240, 253, 244); // Light green
  doc.circle(pageWidth - 25, 25, 18, 'F');
  doc.setFillColor(...brandLight);
  doc.circle(15, pageHeight - 25, 10, 'F');

  // Section header with icon
  doc.setFontSize(24);
  doc.setTextColor(34, 197, 94); // green color for positive
  doc.text(icons.rocket, margin, yPos);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('How Our Coaching Accelerates Results', margin + 12, yPos);

  yPos += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  doc.text('This is where guided preparation makes all the difference. Our program is designed to solve these exact problems.', margin, yPos);

  yPos += 25;

  const benefits = [{
    title: 'Expert Feedback on Every Task',
    description: 'Get detailed, personalized corrections on your writing (grammar, vocabulary, coherence, task achievement) from certified trainers within 24 hours. We pinpoint your specific grammar errors and show you exactly how to fix them.'
  }, {
    title: 'Tailored Time Management Strategies',
    description: 'Our coaches work with you 1-on-1 to develop precise pacing strategies for Reading and Writing, helping you complete tasks efficiently and accurately under pressure. We analyze your performance to identify where you\'re losing time and offer targeted solutions.'
  }, {
    title: 'A Proven, Structured Plan',
    description: `We provide a step-by-step curriculum that is adjusted weekly based on your progress and specific obstacles. You'll always know what to do next, ensuring consistent, focused practice towards your target band.`
  }];

  benefits.forEach(item => {
    if (yPos > 220) {
      doc.addPage();
      yPos = margin + 10;
    }

    // Light background card with green accent - Erik Kennedy: Use color purposefully
    const cardHeight = 45;
    doc.setFillColor(240, 253, 244); // Very light green
    doc.rect(margin, yPos, contentWidth, cardHeight, 'F');

    // Green accent bar
    doc.setFillColor(34, 197, 94); // green-600
    doc.rect(margin, yPos, 3, cardHeight, 'F');

    yPos += 9;

    // Checkmark icon
    doc.setFontSize(14);
    doc.setTextColor(34, 197, 94);
    doc.text('+', margin + 8, yPos);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...neutralDark);
    doc.text(item.title, margin + 15, yPos);

    yPos += 6;

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...neutralMedium);
    const splitDesc = doc.splitTextToSize(item.description, contentWidth - 20);
    doc.text(splitDesc, margin + 15, yPos);

    yPos += cardHeight - 9 + 15; // Erik Kennedy: Better spacing
  });

  yPos += 10;

  // Testimonial box - Erik Kennedy: Use color purposefully
  doc.setFillColor(...accentAmber);
  doc.rect(margin - 3, yPos, 3, 38, 'F');
  doc.setFillColor(254, 252, 232); // Very light amber
  doc.rect(margin, yPos, contentWidth, 38, 'F');

  yPos += 10;

  // Star icon for testimonial
  doc.setFontSize(12);
  doc.setTextColor(251, 191, 36); // amber color
  doc.text(icons.star, margin + 8, yPos);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Success Story', margin + 16, yPos);

  yPos += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...neutralDark);
  const testimonial = '"I went from band 6.5 to 7.5 in just one month with personalized coaching. The feedback on my writing was game-changing!" - Sarah M.';
  const splitTestimonial = doc.splitTextToSize(testimonial, contentWidth - 24);
  doc.text(splitTestimonial, margin + 16, yPos);
  // ========================================
  // Page 7: Your Immediate Next Step (Erik Kennedy: Strong CTA, better hierarchy)
  // ========================================

  doc.addPage();
  yPos = margin;

  // Decorative circles
  doc.setFillColor(254, 243, 199); // Light amber
  doc.circle(20, 20, 12, 'F');
  doc.setFillColor(...brandLight);
  doc.circle(pageWidth - 20, pageHeight - 35, 14, 'F');

  // Section header with icon
  doc.setFontSize(24);
  doc.setTextColor(...brandPrimary);
  doc.text(icons.star, margin, yPos);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('Your Immediate Next Step', margin + 12, yPos);

  yPos += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  doc.text(`You have a plan. Now, let's put it into action. The fastest way to close the gap to your target band score is with personalized guidance, especially with your timeline and specific challenges.`, margin, yPos);

  yPos += 25;

  // Main CTA Box - Erik Kennedy: Make important elements pop
  const ctaHeight = 70;
  doc.setFillColor(...brandPrimary);
  doc.rect(margin, yPos, contentWidth, ctaHeight, 'F');

  yPos += 15;

  // Trophy icon for CTA
  doc.setFontSize(18);
  doc.text(icons.trophy, pageWidth / 2 - 45, yPos);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Ready to see how we can guarantee your progress?', pageWidth / 2, yPos, {
    align: 'center'
  });

  yPos += 15;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Book Your Free 15-Minute Band Score Consultation', pageWidth / 2, yPos, {
    align: 'center'
  });

  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('In this call, we will create a personalized coaching roadmap for you, directly addressing your grammar and time management challenges.', pageWidth / 2, yPos, {
    align: 'center'
  });

  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('We only have a few slots available this week, so book yours now!', pageWidth / 2, yPos, {
    align: 'center'
  });

  yPos += 20;

  // Website URL box - Erik Kennedy: Use color purposefully
  doc.setFillColor(...accentAmber);
  doc.rect(margin - 3, yPos, 3, 20, 'F');
  doc.setFillColor(254, 252, 232);
  doc.rect(margin, yPos, contentWidth, 20, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('www.ieltssuccessacademy.com/consult', margin + 8, yPos + 8);

  yPos += 30;

  // Additional next steps
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...neutralDark);
  doc.text('While you wait for your consultation:', margin, yPos);

  yPos += 18;

  const nextSteps = [
    'Start with Phase 1 of your study roadmap',
    'Focus on the grammar drills and timed practice',
    'Track your progress daily in a study journal'
  ];

  nextSteps.forEach((step, index) => {
    // Number circle - Erik Kennedy: Use color purposefully
    doc.setFillColor(...brandPrimary);
    doc.circle(margin + 5, yPos - 2, 5, 'F');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(`${index + 1}`, margin + 3, yPos + 1);

    // Step text - Erik Kennedy: Better line height
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...neutralDark);
    const stepLines = doc.splitTextToSize(step, contentWidth - 20);
    doc.text(stepLines, margin + 14, yPos);

    yPos += (stepLines.length * 5) + 8; // Erik Kennedy: Better spacing
  });

  // Footer - Erik Kennedy: Make less important text "un-pop"
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...neutralMedium);
  doc.text('(C) IELTS Success Academy - All rights reserved', pageWidth / 2, pageHeight - 15, {
    align: 'center'
  });

  // Save the PDF
  const safeName = answers.name || 'Student';
  doc.save(`IELTS-Study-Plan-${safeName.replace(/\s+/g, '-')}.pdf`);
}