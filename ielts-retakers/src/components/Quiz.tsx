import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { QuizQuestion } from './QuizQuestion';
import { EmailCapture } from './EmailCapture';
import { ResultsPage } from './ResultsPage';
import { processQuizAnswers, ProcessedQuizAnswers } from '../utils/pdfGenerator';
import { submitToTally } from '../utils/tallySubmit';
export interface QuizAnswers {
  // Best Practice Questions (10)
  practice1: string;
  practice2: string;
  practice3: string;
  practice4: string;
  practice5: string;
  practice6: string;
  practice7: string;
  practice8: string;
  practice9: string;
  practice10: string;
  // Lead Qualifying Questions (5)
  currentSituation: string;
  desiredOutcome: string;
  biggestObstacle: string;
  preferredSolution: string;
  additionalInfo: string;
  // Contact Info
  email?: string;
  name?: string;
  // Derived properties for PDF generation (computed from quiz answers)
  targetBand?: string;
  timeline?: string;
  weakSection?: string[];
  studyTime?: string;
  obstacle?: string[];
}
export function Quiz({
  onBack
}: {
  onBack: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<ProcessedQuizAnswers>({
    // Best Practice Questions
    practice1: '',
    practice2: '',
    practice3: '',
    practice4: '',
    practice5: '',
    practice6: '',
    practice7: '',
    practice8: '',
    practice9: '',
    practice10: '',
    // Lead Qualifying Questions
    currentSituation: '',
    desiredOutcome: '',
    biggestObstacle: '',
    preferredSolution: '',
    additionalInfo: '',
    // Derived properties (will be computed when quiz is completed)
    targetBand: '7.0',
    timeline: '1-2 months',
    weakSection: ['Writing', 'Speaking'],
    studyTime: '1-2 hours',
    obstacle: ['Time management during the test', 'Poor grammar']
  });
  // SOP Format: 10 Best Practices Questions + 5 Lead Qualifying Questions
  const bestPracticeQuestions = [
    {
      id: 'practice1',
      question: 'Do you practice IELTS writing tasks under timed conditions?',
      options: ['Yes, regularly', 'Sometimes', 'No, never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice2', 
      question: 'Do you record yourself speaking to identify pronunciation issues?',
      options: ['Yes, regularly', 'Sometimes', 'No, never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice3',
      question: 'Do you use a variety of linking words in your writing and speaking?',
      options: ['Yes, extensively', 'Some variety', 'Limited variety'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice4',
      question: 'Do you practice listening with different accents (British, Australian, American)?',
      options: ['Yes, all accents', 'Some accents', 'Only one accent'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice5',
      question: 'Do you read academic articles to improve reading speed and vocabulary?',
      options: ['Yes, regularly', 'Sometimes', 'No, never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice6',
      question: 'Do you plan your writing tasks before starting to write?',
      options: ['Always', 'Sometimes', 'Never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice7',
      question: 'Do you practice speaking with a timer to manage your response time?',
      options: ['Yes, regularly', 'Sometimes', 'No, never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice8',
      question: 'Do you review and analyze your mistakes after practice tests?',
      options: ['Yes, thoroughly', 'Sometimes', 'No, never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice9',
      question: 'Do you use paraphrasing techniques in all four sections?',
      options: ['Yes, consistently', 'Sometimes', 'No, never'],
      multiSelect: false,
      category: 'best_practice'
    },
    {
      id: 'practice10',
      question: 'Do you practice with official IELTS materials and past papers?',
      options: ['Yes, exclusively', 'Mix of official and unofficial', 'Mostly unofficial materials'],
      multiSelect: false,
      category: 'best_practice'
    }
  ];

  const leadQualifyingQuestions = [
    {
      id: 'currentSituation',
      question: 'What is your current IELTS situation?',
      options: ['Never taken IELTS', 'Taken before, scored below target', 'Taken before, close to target', 'Retaking to improve score'],
      multiSelect: false,
      category: 'lead_qualifying'
    },
    {
      id: 'desiredOutcome',
      question: 'What do you want to achieve in the next 90 days?',
      options: ['Pass IELTS for immigration', 'Get higher score for university admission', 'Improve for professional certification', 'Just want to improve my English'],
      multiSelect: false,
      category: 'lead_qualifying'
    },
    {
      id: 'biggestObstacle',
      question: 'What are your biggest obstacles to achieving your target band? (Select all that apply)',
      options: ['Time constraints', 'Lack of structured study plan', 'Specific skill weaknesses', 'Test anxiety', 'Limited resources'],
      multiSelect: true,
      category: 'lead_qualifying'
    },
    {
      id: 'preferredSolution',
      question: 'What type of support would help you most?',
      options: ['Self-study with guidance', 'Group coaching program', '1-on-1 tutoring', 'Intensive bootcamp', 'Online course with community'],
      multiSelect: false,
      category: 'lead_qualifying'
    },
    {
      id: 'additionalInfo',
      question: 'Is there anything else we need to know about your IELTS goals?',
      options: ['Open text input'],
      multiSelect: false,
      category: 'lead_qualifying',
      isTextInput: true
    }
  ];

  const questions = [...bestPracticeQuestions, ...leadQualifyingQuestions];
  const handleAnswer = (answer: string | string[]) => {
    const currentQuestion = questions[currentStep];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(questions.length); // Move to email capture
    }
  };
  const handleEmailSubmit = (email: string, name: string, phone: string) => {
    const updatedAnswers = {
      ...answers,
      email,
      name,
      phone
    };

    // Process the answers to add derived properties for PDF generation and results display
    const processedAnswers = processQuizAnswers(updatedAnswers);

    // Submit to Tally.so
    try {
      submitToTally(processedAnswers);
      console.log('Successfully submitted to Tally');
    } catch (error) {
      console.error('Error submitting to Tally:', error);
      // Continue showing results even if Tally submission fails
    }

    setAnswers(processedAnswers);
    setCurrentStep(questions.length + 1); // Move to results
  };
  const progress = (currentStep + 1) / (questions.length + 1) * 100;

  if (currentStep === questions.length + 1) {
    return <ResultsPage answers={answers} onBack={onBack} />;
  }

  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-soft-lg border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 md:px-12 py-8 border-b border-neutral-200 bg-gradient-to-b from-white to-neutral-50/50">
            <button
              onClick={onBack}
              className="text-brand hover:text-brand-dark inline-flex items-center gap-2 mb-6 font-medium transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to home
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Your Personalized IELTS Assessment
            </h2>
            <p className="text-neutral-600">
              {currentStep < 10 
                ? "Let's assess your current study practices (Questions 1-10)"
                : "Now tell us about your goals and situation (Questions 11-15)"
              }
            </p>

            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm font-medium text-neutral-600 mb-3">
                <span>
                  Question {currentStep + 1} of {questions.length}
                  {currentStep < 10 ? ' (Best Practices)' : ' (Your Goals)'}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand to-brand h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 md:px-12 py-12 md:py-16">
            {currentStep < questions.length ? (
              <QuizQuestion
                question={questions[currentStep].question}
                options={questions[currentStep].options}
                onAnswer={handleAnswer}
                selectedAnswer={answers[questions[currentStep].id as keyof QuizAnswers] as string | string[]}
                multiSelect={questions[currentStep].multiSelect}
                isTextInput={questions[currentStep].isTextInput}
              />
            ) : (
              <EmailCapture onSubmit={handleEmailSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}