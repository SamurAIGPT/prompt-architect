"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import FooterSection from "@/components/FooterSection";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import confetti from "canvas-confetti";

function PricingPageContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (success === "true") {
      setNotification({
        type: "success",
        message: "Payment successful! Your credits have been credited to your account. Let's build some elite prompts!",
      });

      // Trigger celebratory confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else if (canceled === "true") {
      setNotification({
        type: "canceled",
        message: "Payment checkout was canceled. If you need any help, please contact our support team.",
      });
    }
  }, [success, canceled]);

  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-zinc-100 font-sans">
      <Navbar />

      <main className="flex-1 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {notification && (
          <div className="max-w-3xl mx-auto mb-10">
            {notification.type === "success" ? (
              <div className="p-5 rounded-2xl bg-emerald-600/10 border border-emerald-500/35 text-emerald-300 flex items-start gap-4">
                <FaCheckCircle className="w-6 h-6 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-white mb-1">Thank you for your purchase!</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-red-600/10 border border-red-500/35 text-red-300 flex items-start gap-4">
                <FaTimesCircle className="w-6 h-6 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <h4 className="font-bold text-white mb-1">Checkout Canceled</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <PricingSection />
      </main>

      <FooterSection />
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-zinc-300">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide text-zinc-400">Loading pricing...</p>
      </div>
    }>
      <PricingPageContent />
    </Suspense>
  );
}
