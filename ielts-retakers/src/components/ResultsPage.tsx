import { MailIcon, TargetIcon, ClockIcon, AlertTriangleIcon, CheckCircleIcon, ArrowRightIcon, BookOpenIcon, TrophyIcon, Calendar, Sparkles, Phone, MessageCircle, Zap, Brain, TrendingUp, Award, Users } from 'lucide-react';
import { ProcessedQuizAnswers } from '../utils/pdfGenerator';

interface ResultsPageProps {
  answers: ProcessedQuizAnswers;
  onBack: () => void;
}

export function ResultsPage({
  answers,
  onBack
}: ResultsPageProps) {
  const formatArrayToString = (arr: string[]) => {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr.join(' and ');
    return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
  };

  // PDF download removed - results are now emailed via Tally

  // Determine study intensity based on timeline
  const getStudyIntensity = () => {
    const timeline = answers.timeline.toLowerCase();
    if (timeline.includes('1-2 months') || timeline.includes('less than 1 month')) {
      return { level: 'Intensive', color: 'red', hours: '2-3 hours daily', description: 'Your timeline is aggressive. You need focused, intensive preparation.' };
    } else if (timeline.includes('3-4 months')) {
      return { level: 'Moderate', color: 'amber', hours: '1.5-2 hours daily', description: 'You have a reasonable timeline. Consistent daily practice is key.' };
    } else {
      return { level: 'Balanced', color: 'green', hours: '1-1.5 hours daily', description: 'You have time to build solid fundamentals gradually.' };
    }
  };

  const intensity = getStudyIntensity();

  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded-3xl p-8 md:p-12 mb-8 shadow-soft-xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <TrophyIcon className="w-12 h-12 text-white" strokeWidth={2} />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Your Personalized IELTS Roadmap
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light mb-6">
              Target: {answers.targetBand}+ Band Score in {answers.timeline}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white/90 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Based on your unique quiz responses</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-card border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center">
                <TargetIcon className="w-5 h-5 text-brand" strokeWidth={2} />
              </div>
              <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Target</p>
            </div>
            <p className="text-4xl font-bold text-neutral-900">{answers.targetBand}+</p>
            <p className="text-sm text-neutral-500 mt-1">Band Score</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent-light rounded-xl flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-accent" strokeWidth={2} />
              </div>
              <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Timeline</p>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{answers.timeline}</p>
            <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 bg-${intensity.color}-100 text-${intensity.color}-700 rounded-full text-xs font-semibold`}>
              <Zap className="w-3 h-3" />
              {intensity.level} Pace
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card border border-neutral-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpenIcon className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
              <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Daily Commitment</p>
            </div>
            <p className="text-3xl font-bold text-neutral-900">{intensity.hours.split(' ')[0]}</p>
            <p className="text-sm text-neutral-500 mt-1">{intensity.hours.split(' ').slice(1).join(' ')}</p>
          </div>
        </div>

        {/* Your Situation Analysis */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-card border border-neutral-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" strokeWidth={2} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Your Situation Analysis</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Focus Areas */}
            <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-400">
              <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
                Primary Focus Areas
              </h3>
              <p className="text-neutral-700 mb-2">
                <strong>{formatArrayToString(answers.weakSection)}</strong>
              </p>
              <p className="text-sm text-neutral-600">
                You'll need to dedicate 60-70% of your study time here
              </p>
            </div>

            {/* Current Challenges */}
            <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-400">
              <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <AlertTriangleIcon className="w-5 h-5 text-red-600" />
                Main Challenges
              </h3>
              <p className="text-neutral-700 mb-2">
                {formatArrayToString(answers.obstacle)}
              </p>
              <p className="text-sm text-neutral-600">
                Your personalized plan addresses these obstacles
              </p>
            </div>

            {/* Current Situation */}
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400">
              <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Current Situation
              </h3>
              <p className="text-neutral-700">
                {answers.currentSituation}
              </p>
            </div>

            {/* Daily Time Available */}
            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-400">
              <h3 className="font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-green-600" />
                Study Time Available
              </h3>
              <p className="text-neutral-700 mb-2">
                {answers.studyTime}
              </p>
              <p className="text-sm text-neutral-600">
                {intensity.description}
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Action Plan */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-8 shadow-card border border-neutral-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-brand" strokeWidth={2} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Your Strategic Action Plan</h2>
          </div>

          {/* Week-by-Week Breakdown */}
          <div className="space-y-6 mb-8">
            {/* Weeks 1-2 */}
            <div className="border-l-4 border-brand pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1-2
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Weeks 1-2: Foundation & Diagnosis</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Build fundamental skills and identify specific weaknesses in {answers.weakSection[0].toLowerCase()}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-brand" />
                    Daily Practice
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>• Complete 1 full {answers.weakSection[0]} task daily</li>
                    <li>• Review official IELTS band descriptors</li>
                    <li>• Identify your top 3-5 recurring errors</li>
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-brand" />
                    Weekly Goal
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>• Take 1 complete practice test</li>
                    <li>• Get feedback on 2-3 tasks</li>
                    <li>• Build a personal error log</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Weeks 3-4 */}
            <div className="border-l-4 border-accent pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3-4
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Weeks 3-4: Intensive Practice & Refinement</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Address your specific challenges: {formatArrayToString(answers.obstacle).toLowerCase()}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-accent" />
                    Daily Practice
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>• Timed practice under exam conditions</li>
                    <li>• Focus on weak question types</li>
                    <li>• Apply feedback to improve</li>
                  </ul>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-accent" />
                    Weekly Goal
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li>• Take 2 full practice tests</li>
                    <li>• See measurable improvement</li>
                    <li>• Master time management</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final Week */}
            <div className="border-l-4 border-green-500 pl-6 py-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Final Week: Mock Tests & Mental Prep</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Polish your skills and build exam-day confidence.
              </p>

              <div className="bg-neutral-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• <strong>Complete 2-3 full mock tests</strong> under strict exam conditions</li>
                  <li>• <strong>Light review only</strong> - no new material</li>
                  <li>• <strong>Mental preparation:</strong> sleep well, manage anxiety, prepare logistics</li>
                  <li>• <strong>Review your error log</strong> one final time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Success Strategies */}
          <div className="bg-gradient-to-br from-brand-light to-green-100 rounded-xl p-6 border-2 border-brand/20">
            <h3 className="font-bold text-neutral-900 mb-4 text-lg">🎯 Key Success Strategies for Your Situation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Get Expert Feedback Weekly</strong>
                  <p className="text-sm text-neutral-700 mt-1">Essential for identifying blind spots you can't see yourself</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Use Official IELTS Materials</strong>
                  <p className="text-sm text-neutral-700 mt-1">Cambridge IELTS books 15-18 for authentic practice</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Track Your Progress</strong>
                  <p className="text-sm text-neutral-700 mt-1">Keep an error log to see patterns and improvement</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircleIcon className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Practice Under Time Pressure</strong>
                  <p className="text-sm text-neutral-700 mt-1">Time management is often the difference between bands</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strong CTA Section */}
        <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded-2xl p-6 md:p-10 mb-8 shadow-lg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ready to Achieve Your {answers.targetBand}+ Band Score?
            </h2>

            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Book a <strong>FREE 30-minute strategy call</strong> with an IELTS expert who has helped 1000+ students.
              We'll review your personalized plan and answer any questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <a
                href="tel:+919228122552"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-neutral-100 text-brand rounded-full font-bold text-lg shadow-pop hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call Now - Free Consultation
              </a>

              <a
                href="https://wa.me/919228122552?text=Hi%2C%20I%20completed%20the%20IELTS%20quiz%20and%20want%20to%20discuss%20my%20study%20plan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full font-bold text-lg shadow-pop hover:shadow-lg transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>1000+ successful students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Expert IELTS trainers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Recommended Next Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-card border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Get Official Materials</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Start with Cambridge IELTS books 15-18 for authentic practice tests
              </p>
              <button className="text-brand font-semibold text-sm hover:underline flex items-center gap-1">
                Learn More <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-card border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Join Expert Coaching</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Get personalized feedback on your {answers.weakSection[0].toLowerCase()} from qualified instructors
              </p>
              <button className="text-brand font-semibold text-sm hover:underline flex items-center gap-1">
                Book a Session <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-card border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <TrophyIcon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Track Your Progress</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Use our progress tracking tools to monitor improvement and stay motivated
              </p>
              <button className="text-brand font-semibold text-sm hover:underline flex items-center gap-1">
                Get Started <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 md:p-8 text-center border-2 border-green-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <MailIcon className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">
            Check Your Email!
          </h3>
          <p className="text-lg text-neutral-700 mb-2">
            We've sent your detailed study plan to <strong>{answers.email}</strong>
          </p>
          <p className="text-sm text-neutral-600">
            Can't find it? Check your spam folder or contact us at +91 92281 22552
          </p>
        </div>
      </div>
    </div>
  );
}
