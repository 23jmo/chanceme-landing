"use client";

import { motion } from "framer-motion";
import { fadeInUp, popIn } from "@/components/framer-animations";
import { Sparkles, Zap, Target, CheckCircle2 } from "lucide-react";

// Feature card component with glassmorphic styling
function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden p-6 md:p-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={popIn}
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: `
          0 1px 3px rgba(0, 0, 0, 0.05),
          0 8px 24px rgba(0, 0, 0, 0.04)
        `,
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <Icon className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        {/* Features list */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function FeatureSection() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description:
        "Get intelligent suggestions that understand your unique story and background.",
      features: [
        "Context-aware feedback",
        "Personalized recommendations",
        "Style consistency checks",
      ],
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Receive instant feedback and edits as you write, without any delays.",
      features: [
        "Real-time processing",
        "Instant suggestions",
        "Quick iteration cycles",
      ],
    },
    {
      icon: Target,
      title: "School-Specific",
      description:
        "Tailored guidance based on what each university is looking for.",
      features: [
        "Admissions insights",
        "School preferences",
        "Competitive analysis",
      ],
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-16 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl tracking-tighter md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed to help you write essays that stand out
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

