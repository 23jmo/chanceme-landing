"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
} from "@/components/framer-animations";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "quarterly">("monthly");

  const plans = [
    {
      name: "Free",
      price: "Free",
      priceNote: "",
      description: "All essential features.",
      buttonText: "Get started",
      buttonVariant: "outline" as const,
      features: [
        "Limited agent quotas",
        "Limited agent models",
        "Basic draft functionality",
        "Access to core features",
      ],
    },
    {
      name: "Pro",
      price: "15",
      priceNote: "/ month",
      description: "Unlimited access.",
      buttonText: "Subscribe",
      buttonVariant: "default" as const,
      features: [
        "Everything in Free, plus...",
        "Higher agent quotas",
        "Access to higher tier models",
        "Unlimited drafts",
        "Priority support",
      ],
    },
    {
      name: "Pro Quarterly",
      price: "10",
      priceNote: "/ month",
      description: "Billed quarterly (save $5/month).",
      buttonText: "Subscribe",
      buttonVariant: "default" as const,
      features: [
        "Everything in Pro",
        "Same features as Pro",
        "Billed every 3 months",
        "Save $5/month",
      ],
      highlight: billingPeriod === "quarterly",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex min-h-screen flex-col bg-cover bg-no-repeat pt-16"
      style={{
        backgroundImage: "url('/absbg.png')",
        backgroundPosition: "center 20%",
      }}
    >
      <Navbar />
      <motion.main
        className="flex-1 w-full max-w-full"
        variants={staggerContainer}
      >
        <motion.section
          id="pricing"
          className="w-full py-16 md:py-24 lg:py-32"
          variants={fadeInUp}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center text-center mb-12"
              variants={fadeInUp}
            >
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                variants={fadeInUp}
              >
                Start for free
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
                variants={fadeInUp}
              >
                Whether you're using Chance Me for college essays, supplements, or just curious, it's free to use.
              </motion.p>
              
              {/* Billing Toggle */}
              <motion.div
                className="flex items-center gap-4 bg-white rounded-full p-1 border border-gray-200 shadow-sm"
                variants={fadeInUp}
              >
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingPeriod === "monthly"
                      ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-black shadow-md shadow-yellow-500/30"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod("quarterly")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingPeriod === "quarterly"
                      ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-black shadow-md shadow-yellow-500/30"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Quarterly
                </button>
              </motion.div>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-lg border ${
                    plan.highlight
                      ? "border-yellow-400 shadow-lg shadow-yellow-400/20"
                      : "border-gray-200 shadow-sm"
                  } p-6 md:p-8 flex flex-col`}
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-2">
                      {plan.price === "Free" ? (
                        <span className="text-4xl font-bold text-gray-900">Free</span>
                      ) : (
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                          <span className="text-lg text-gray-600 ml-1">{plan.priceNote}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  </div>

                  <Button
                    className={`w-full mb-6 rounded-full ${
                      plan.buttonVariant === "outline"
                        ? "border-yellow-400 text-gray-900 hover:bg-yellow-50"
                        : "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 text-black hover:shadow-lg hover:shadow-yellow-400/50"
                    }`}
                    variant={plan.buttonVariant}
                    onClick={() => window.open("https://tally.so/r/nGk2jj", "_blank")}
                  >
                    {plan.buttonText}
                  </Button>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.main>
    </motion.div>
  );
}

