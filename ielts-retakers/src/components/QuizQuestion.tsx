import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string | string[]) => void;
  selectedAnswer?: string | string[];
  multiSelect?: boolean;
  isTextInput?: boolean;
}

export function QuizQuestion({
  question,
  options,
  onAnswer,
  selectedAnswer,
  multiSelect = false,
  isTextInput = false
}: QuizQuestionProps) {
  const [tempSelections, setTempSelections] = useState<string[]>(
    Array.isArray(selectedAnswer) ? selectedAnswer : []
  );
  const [textInput, setTextInput] = useState<string>(
    typeof selectedAnswer === 'string' ? selectedAnswer : ''
  );

  const handleSingleSelect = (option: string) => {
    onAnswer(option);
  };

  const handleMultiSelect = (option: string) => {
    setTempSelections(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleContinue = () => {
    if (tempSelections.length > 0) {
      onAnswer(tempSelections);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onAnswer(textInput.trim());
    }
  };

  const isSelected = (option: string) => {
    if (multiSelect) {
      return tempSelections.includes(option);
    }
    return selectedAnswer === option;
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Question */}
      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-10 text-center leading-tight">
        {question}
      </h3>

      {multiSelect && (
        <p className="text-sm text-neutral-600 mb-6 text-center font-medium">
          Select all that apply
        </p>
      )}

      {/* Options or Text Input */}
      {isTextInput ? (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Tell us anything else about your IELTS goals, challenges, or what you hope to achieve..."
            className="w-full p-6 rounded-2xl border-2 border-neutral-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 resize-none transition-all duration-200 text-base"
            rows={4}
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim()}
            className={`w-full py-4 px-6 rounded-full font-semibold text-base transition-all duration-200 ${
              textInput.trim()
                ? 'bg-brand text-white hover:bg-brand-dark shadow-soft hover:shadow-md'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => multiSelect ? handleMultiSelect(option) : handleSingleSelect(option)}
              className={`group w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left flex items-center justify-between ${
                isSelected(option)
                  ? 'border-brand-500 bg-brand-50 shadow-soft'
                  : 'border-neutral-200 hover:border-brand-300 hover:bg-neutral-50 bg-white'
              }`}
            >
              <span className={`font-medium text-base md:text-lg ${
                isSelected(option) ? 'text-brand-900' : 'text-neutral-900'
              }`}>
                {option}
              </span>
              {isSelected(option) ? (
                <div className="flex-shrink-0 w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              ) : (
                <div className="flex-shrink-0 w-6 h-6 border-2 border-neutral-300 rounded-full group-hover:border-brand-400 transition-colors" />
              )}
            </button>
          ))}
        </div>
      )}

      {multiSelect && (
        <button
          onClick={handleContinue}
          disabled={tempSelections.length === 0}
          className={`mt-8 w-full py-4 px-6 rounded-full font-semibold text-base transition-all duration-200 ${
            tempSelections.length > 0
              ? 'bg-brand text-white hover:bg-brand-dark shadow-soft hover:shadow-md'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          Continue ({tempSelections.length} selected)
        </button>
      )}
    </div>
  );
}