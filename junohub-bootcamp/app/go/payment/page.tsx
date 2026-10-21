'use client';

import { useEffect } from 'react';

export default function PaymentRedirect() {
  useEffect(() => {
    window.location.replace('https://pages.razorpay.com/junohub');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF0]">
      <p className="font-mono text-[#2D3319]/70">Redirecting to secure payment...</p>
    </div>
  );
}
