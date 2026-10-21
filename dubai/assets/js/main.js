// Modal functions
function openConsultationForm() {
    const modal = document.getElementById('consultation-modal');
    // Legacy: previously set Zoho iframe src. Now using Tally embed; nothing to set.
    // Keep resilient if old iframe exists in DOM from cache or partial deploy.
    const iframe = document.getElementById('iframewin');
    if (iframe) {
        iframe.removeAttribute('src');
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeConsultationForm() {
    const modal = document.getElementById('consultation-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Chat placeholder (WhatsApp disabled; Crisp via GTM will handle chat)
function openChat() {}
document.getElementById('consultation-modal').addEventListener('click', function(e) {
    if (e.target === this) closeConsultationForm();
});// Set a fixed deadline when the script loads
const countdownDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from when script loads

function updateCountdown() {
  const now = new Date();
  const timeDiff = countdownDeadline.getTime() - now.getTime();
  
  console.log('Countdown update:', {
    now: now.toISOString(),
    deadline: countdownDeadline.toISOString(),
    timeDiff: timeDiff
  });
  
  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    console.log('Time left:', { days, hours, minutes, seconds });
    
    // Update the countdown display
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");
    
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
  } else {
    // If deadline has passed, set to 0
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");
    
    if (daysEl) daysEl.textContent = 0;
    if (hoursEl) hoursEl.textContent = 0;
    if (minutesEl) minutesEl.textContent = 0;
    if (secondsEl) secondsEl.textContent = 0;
  }
}function initTestimonialsCarousel(){const testimonials=[{name:"David Bharath",achievement:"Duolingo Score: 120",quote:"The Duolingo exam training was an incredible experience. The faculty provided immense support, helping me understand the exam criteria thoroughly. My good score helped me join my dream college and build my best career.",image:"images/testimonial-images/david_bharath_a485e61b05.png"},{name:"Mansi Patel",achievement:"GRE Score: 324",quote:"I'm extremely happy with my GRE coaching experience! Thanks to their well-structured program and dedicated trainers, I achieved a GRE score of 324. The interactive classes and supportive learning environment made a significant difference.",image:"images/testimonial-images/mansi_patel_12a137c1db.png"},{name:"Jigar Dhamnani",achievement:"Visa & Enrollment Complete",quote:"I was able to get my Visa on time and was able to enroll in my chosen university. The entire process was handled efficiently and I received timely support.",image:"images/testimonial-images/jigar_d68902b121.png"},{name:"Arjun Kanani",achievement:"SAT Score: 1510",quote:"I scored 1510 in SAT with the guidance of Kanan International. Their coaching program was outstanding with several mock tests and doubt clearing sessions. I learnt effective strategies that made all the difference.",image:"images/testimonial-images/arjun_kanani_d33c1d9f82.png"},{name:"Tulsiben Patel",achievement:"Visa Approved Successfully",quote:"It was a great experience and helpful as I got to learn something new about my abroad journey. The whole process was smooth and I received excellent guidance throughout.",image:"images/testimonial-images/tulsiben_patel.png"},{name:"Patel",achievement:"GRE Score: 323",quote:"It rarely happens that you can prepare with accomplished faculties, world-class infrastructure & such personal level training. Customized schedule where we not only learn the course but also create a mindset for the exam environment.",image:"images/testimonial-images/patel_b8320e4b92.png"},{name:"Harsh Panchal",achievement:"PTE Score: 74",quote:"My PTE preparation was exceptionally smooth and straightforward. The counsellor and RM were highly supportive. The mock tests and KYS sessions helped me identify my mistakes and improve upon them.",image:"images/testimonial-images/harsh_panchal_pte_review_e698d1f35d.png"},{name:"Jayaant",achievement:"IELTS Score: 8.5",quote:"The experience was excellent! Their outstanding study materials and expert coaching helped me achieve an overall score of 8.5, with a perfect 9.0 in listening. Thanks to Kanan.co for their exceptional support.",image:"images/testimonial-images/jayaant_ielts_review_9c9c03d388.png"},{name:"Joshi",achievement:"IELTS Score: 8.5",quote:"The faculty thoroughly knows what they are teaching. Online lectures are fantastic and they solve doubts promptly. Sectional tests and mock exams helped me achieve a score of 8.5.",image:"images/testimonial-images/joshi_5582513c24.png"},{name:"Avisha Sanjay Kumar Patel",achievement:"Admission Secured",quote:"I've got admission for my desired course. I thank Kanan for their great support and hospitality services. The entire process was handled professionally.",image:"images/testimonial-images/Avisha_Sanjay_Kumar_Patel_659ae3be6e.png"}],grid=document.getElementById("testimonials-grid"),dotsContainer=document.getElementById("testimonial-dots"),prevBtn=document.getElementById("prev-testimonial"),nextBtn=document.getElementById("next-testimonial");let currentSlide=0;function renderTestimonials(){if(!grid)return;grid.innerHTML="";for(let i=0;i<3;i++){const testimonialIndex=(currentSlide+i)%testimonials.length,t=testimonials[testimonialIndex],card=document.createElement("div");card.className="bg-white rounded-2xl p-8 shadow-lg",card.innerHTML=`<div class="flex items-center space-x-4 mb-6"><img src="${t.image}" alt="${t.name}" class="w-16 h-16 rounded-full object-cover"><div><div class="font-bold text-gray-900 font-heading">${t.name}</div><div class="text-sm text-blue-600 font-medium font-body">${t.achievement}</div></div></div><p class="text-gray-700 text-lg leading-relaxed font-body">"${t.quote}"</p>`,grid.appendChild(card)}}function renderDots(){if(!dotsContainer)return;dotsContainer.innerHTML="";for(let i=0;i<testimonials.length;i++){const dot=document.createElement("button");dot.className=`w-3 h-3 rounded-full transition-colors ${i===currentSlide?"bg-blue-600":"bg-gray-300"}`,dot.setAttribute("aria-label",`Go to testimonial ${i+1}`),dot.setAttribute("aria-pressed",i===currentSlide),dot.setAttribute("role","tab"),dot.addEventListener("click",()=>{currentSlide=i,renderTestimonials(),renderDots()}),dotsContainer.appendChild(dot)}}function nextSlide(){currentSlide=(currentSlide+1)%testimonials.length,renderTestimonials(),renderDots()}function prevSlide(){currentSlide=(currentSlide-1+testimonials.length)%testimonials.length,renderTestimonials(),renderDots()}prevBtn&&prevBtn.addEventListener("click",prevSlide),nextBtn&&nextBtn.addEventListener("click",nextSlide),renderTestimonials(),renderDots(),setInterval(nextSlide,4000)}function toggleFAQ(index){const faq=document.getElementById(`faq-${index}`),button=document.querySelector(`[onclick="toggleFAQ(${index})"]`),icon=button.querySelector("svg");faq&&(faq.classList.toggle("hidden"),icon&&(icon.style.transform=faq.classList.contains("hidden")?"rotate(0deg)":"rotate(180deg)"))}document.addEventListener("DOMContentLoaded",function(){updateCountdown(),setInterval(updateCountdown,1000),initTestimonialsCarousel(),window.renderIcon&&(window.renderIcon("hero-icon-1","graduation-cap","w-4 h-4 sm:w-5 sm:h-5 text-blue-600"),window.renderIcon("hero-icon-2","dollar-sign","w-4 h-4 sm:w-5 sm:h-5 text-green-600"),window.renderIcon("hero-icon-3","check-circle","w-3 h-3 sm:w-4 sm:h-4 text-green-500"),window.renderIcon("hero-icon-4","users","w-4 h-4 sm:w-5 sm:h-5 text-purple-600"),window.renderIcon("impact-icon-1","users","w-14 h-14 text-blue-200"),window.renderIcon("impact-icon-2","award","w-14 h-14 text-green-300"),window.renderIcon("impact-icon-3","map-pin","w-14 h-14 text-purple-300"),window.renderIcon("impact-icon-4","globe","w-14 h-14 text-orange-300"),window.renderIcon("dubai-icon-1","plane","w-6 h-6"),window.renderIcon("dubai-icon-2","dollar-sign","w-6 h-6"),window.renderIcon("dubai-icon-3","graduation-cap","w-6 h-6"),window.renderIcon("dubai-icon-4","building","w-6 h-6"),window.renderIcon("dubai-icon-5","shield","w-6 h-6"),window.renderIcon("dubai-icon-6","globe","w-6 h-6"),window.renderIcon("footer-icon-1","map-pin","w-4 h-4"),window.renderIcon("footer-icon-2","phone","w-4 h-4"),window.renderIcon("footer-icon-3","mail","w-4 h-4"))});