"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col" data-oid="0icltgn">
      <Header data-oid="1q:uc2f" />
      <main className="flex-1" data-oid="aye:c7b">
        <HeroSection data-oid="jtjr-r6" />
        <FeaturesSection data-oid="hqp73zy" />
        <TestimonialsSection data-oid="d4m4y:s" />
        <PricingSection data-oid="62cfrr7" />
        <CtaSection data-oid="d0-p0cm" />
      </main>
      <Footer data-oid="d15mtmk" />
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="5eopmhb"
    >
      <div
        className="container flex h-16 items-center justify-between"
        data-oid=":8jhjj-"
      >
        <div className="flex items-center gap-2" data-oid="xb2rvn_">
          <Link href="/" className="flex items-center gap-2" data-oid="7vww410">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="StreamLine Logo"
              width={32}
              height={32}
              className="rounded"
              data-oid="c-zk_nd"
            />

            <span className="text-xl font-bold" data-oid="4afyidu">
              chance-me
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-oid="b:2t-g9"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" data-oid="er:rk9-" />
          ) : (
            <Menu className="h-6 w-6" data-oid="j41.dqw" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" data-oid="duhals0">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
            data-oid=".j7jo6c"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary"
            data-oid="kl.49bc"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary"
            data-oid="k_firv6"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-primary"
            data-oid=":tr.46b"
          >
            Contact
          </Link>
          <Button asChild data-oid="chcr0ea">
            <Link href="#get-started" data-oid="jm9xec6">
              Get Started
            </Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            className="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
            data-oid="k5rhjyr"
          >
            <nav className="container flex flex-col py-4" data-oid="n4235cy">
              <Link
                href="#features"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="4g-:3q4"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="9yst0xp"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="fx8lhy:"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="ry46:9d"
              >
                Contact
              </Link>
              <Button
                asChild
                className="mt-2"
                onClick={() => setIsMenuOpen(false)}
                data-oid="x6ws3hg"
              >
                <Link href="#get-started" data-oid="xtrqs3y">
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HeroSection() {
  const [currentSchool, setCurrentSchool] = useState(0);
  const schools = [
    "Harvard",
    "Columbia",
    "Princeton",
    "University of Michigan",
    "UC Davis",
    "UC Berkeley",
    "Stanford",
    "Cornell",
    "Dartmouth",
    "UChicago",
    "Georgia Tech",
    "MIT",
    "Yale",
    "Duke",
    "UCLA",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSchool((prev) => (prev + 1) % schools.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
      data-oid=":9hif2v"
    >
      <div className="container px-4 md:px-6" data-oid="1rlec:3">
        <div
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
          data-oid="775dlnk"
        >
          <div
            className="flex flex-col justify-center space-y-4"
            data-oid="r-apgj-"
          >
            <div className="space-y-2" data-oid="v5w_b1c">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                data-oid="lqrvckv"
              >
                Get your application read by 1000{" "}
                <span
                  className="animate-pulse text-amber-500 font-bold"
                  style={{
                    textShadow:
                      "0 0 10px rgba(245, 158, 11, 0.5), 0 0 20px rgba(245, 158, 11, 0.3)",
                  }}
                  data-oid="oyk_sfq"
                >
                  {schools[currentSchool]}
                </span>
                <br data-oid="d1q13d8" />
                Admissions Officers
              </h1>
              <p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                data-oid="q6zl5i2"
              >
                Multi-agent prediction to determine your true chances at getting
                into college.
              </p>
            </div>
            <div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              data-oid=":hyq.u5"
            >
              <Button asChild size="lg" data-oid="-j75r4f">
                <Link href="#get-started" data-oid="kq0dqw:">
                  Get Started for Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" data-oid="1dczcqa">
                <Link href="#demo" data-oid=":avd8t0">
                  Request Demo
                </Link>
              </Button>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=550&width=550"
            width={550}
            height={550}
            alt="StreamLine Dashboard"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            data-oid="fzwqc08"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Workflow Automation",
      description:
        "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: "/placeholder.svg?height=48&width=48",
    },
    {
      title: "Team Collaboration",
      description:
        "Real-time collaboration tools that keep your team connected and productive.",
      icon: "/placeholder.svg?height=48&width=48",
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain insights into your team's performance with detailed analytics and reports.",
      icon: "/placeholder.svg?height=48&width=48",
    },
    {
      title: "Seamless Integration",
      description:
        "Connect with your favorite tools and services for a unified workflow experience.",
      icon: "/placeholder.svg?height=48&width=48",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      data-oid="_oze_fd"
    >
      <div className="container px-4 md:px-6" data-oid="8po5upc">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid=".xrlcno"
        >
          <div className="space-y-2" data-oid="n27ou6s">
            <div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              data-oid="3-o45i."
            >
              Features
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="7a53uv:"
            >
              Everything You Need to Succeed
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="-dhzyxt"
            >
              chance-me provides powerful tools designed to help your team work
              smarter, not harder.
            </p>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12"
          data-oid="o8a90ht"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-4 rounded-lg border p-6 bg-background shadow-sm"
              data-oid="kb49g1w"
            >
              <Image
                src={feature.icon || "/placeholder.svg"}
                width={48}
                height={48}
                alt={feature.title}
                className="rounded-md"
                data-oid="uwpvhrq"
              />

              <div className="space-y-2" data-oid="v93291z">
                <h3 className="text-xl font-bold" data-oid=".veok6x">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-oid="sc.ps2p">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "chance-me has transformed how our team works. We've cut our project delivery time in half!",
      author: "Sarah Johnson",
      role: "Product Manager, TechCorp",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "The automation features alone have saved us countless hours of manual work. Absolutely worth every penny.",
      author: "Michael Chen",
      role: "CTO, GrowthStartup",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "Our team collaboration has improved dramatically since we started using chance-me. Highly recommended!",
      author: "Emily Rodriguez",
      role: "Team Lead, InnovateDesign",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ];

  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32"
      data-oid="srlgjjz"
    >
      <div className="container px-4 md:px-6" data-oid=".6m-8bj">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="6zw6ny0"
        >
          <div className="space-y-2" data-oid="2hamel:">
            <div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              data-oid="059i.d0"
            >
              Testimonials
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="9mj:67-"
            >
              Trusted by Teams Worldwide
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="50nz6pp"
            >
              Don't just take our word for it. See what our customers have to
              say about chance-me.
            </p>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          data-oid="a01o835"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg border p-6 shadow-sm"
              data-oid="zgm9e4m"
            >
              <div className="space-y-4" data-oid="tbfmrre">
                <p className="text-muted-foreground italic" data-oid="okdnn5e">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4" data-oid="fwrf-lf">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    width={64}
                    height={64}
                    alt={testimonial.author}
                    className="rounded-full"
                    data-oid="2ol:8uk"
                  />

                  <div data-oid="z.ho9u:">
                    <h4 className="font-semibold" data-oid="rapc.v:">
                      {testimonial.author}
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="_zeg89y"
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      description:
        "Perfect for individuals and small teams just getting started.",
      features: [
        "Up to 5 team members",
        "Basic workflow automation",
        "Standard support",
        "1GB storage",
      ],
    },
    {
      name: "Professional",
      price: "$29",
      description:
        "Ideal for growing teams that need more power and flexibility.",
      features: [
        "Up to 20 team members",
        "Advanced automation",
        "Priority support",
        "10GB storage",
        "Advanced analytics",
      ],

      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description:
        "For large organizations with complex needs and dedicated support.",
      features: [
        "Unlimited team members",
        "Custom workflow solutions",
        "24/7 dedicated support",
        "Unlimited storage",
        "Advanced security features",
        "Custom integrations",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
      data-oid="p92syg_"
    >
      <div className="container px-4 md:px-6" data-oid="je5wdcp">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="88_pxyv"
        >
          <div className="space-y-2" data-oid="zt5ok4r">
            <div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              data-oid="u3nh-my"
            >
              Pricing
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="cvsu3__"
            >
              Simple, Transparent Pricing
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="i0_t1iy"
            >
              Choose the plan that's right for your team. All plans include a
              14-day free trial.
            </p>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          data-oid="nev45vk"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border p-6 shadow-sm ${
                plan.popular
                  ? "border-primary bg-background relative"
                  : "bg-background"
              }`}
              data-oid="vpy3iax"
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                  data-oid="e8-oa_1"
                >
                  Most Popular
                </div>
              )}
              <div className="space-y-4" data-oid="6bslla-">
                <h3 className="text-2xl font-bold" data-oid="5l7jprp">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1" data-oid="u6jkjik">
                  <span className="text-4xl font-bold" data-oid=":q.w4b_">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground" data-oid="nsuzsrj">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground" data-oid="sqbwgho">
                  {plan.description}
                </p>
              </div>
              <div className="mt-6 space-y-4" data-oid="cltg8st">
                <ul className="space-y-2" data-oid="lt0tj0x">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2"
                      data-oid="28g27bt"
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-primary"
                        data-oid="wk4x:sc"
                      />

                      <span data-oid="1wvpw2-">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary text-primary-foreground" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  data-oid="5mm4gz_"
                >
                  Get Started
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="get-started"
      className="w-full py-12 md:py-24 lg:py-32"
      data-oid="tatk69j"
    >
      <div className="container px-4 md:px-6" data-oid="mhoskbz">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="4u2s46q"
        >
          <div className="space-y-2" data-oid="uj7ykej">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="okbcm1f"
            >
              Ready to Transform Your Workflow?
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="znm57ch"
            >
              Join thousands of teams that use chance-me to boost productivity
              and streamline collaboration.
            </p>
          </div>
          <div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            data-oid="8d9mbur"
          >
            <Button size="lg" className="gap-1" data-oid="4gnbhw2">
              Get Started Now
              <ArrowRight className="h-4 w-4" data-oid="xilmw3d" />
            </Button>
            <Button variant="outline" size="lg" data-oid="3iyq7y0">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="w-full border-t bg-background py-6 md:py-12"
      data-oid="4wm2s9f"
    >
      <div className="container px-4 md:px-6" data-oid="w8o5gsm">
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-4"
          data-oid="402tdcb"
        >
          <div className="space-y-4" data-oid="nms_64x">
            <Link
              href="/"
              className="flex items-center gap-2"
              data-oid="p9:awq."
            >
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="chance-me Logo"
                width={32}
                height={32}
                className="rounded"
                data-oid="emdv_p6"
              />

              <span className="text-xl font-bold" data-oid="cz.ll52">
                chance-me
              </span>
            </Link>
            <p className="text-sm text-muted-foreground" data-oid="hvck7s3">
              Empowering teams to work smarter, not harder.
            </p>
            <div className="flex gap-4" data-oid="ie3u82e">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="f-4hnn1"
              >
                <Twitter className="h-5 w-5" data-oid="z43pf8b" />

                <span className="sr-only" data-oid="8__j_b1">
                  Twitter
                </span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="0xl6yyo"
              >
                <Facebook className="h-5 w-5" data-oid="rbcr.fe" />

                <span className="sr-only" data-oid="yd9cmdn">
                  Facebook
                </span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="ritt5k9"
              >
                <Instagram className="h-5 w-5" data-oid="a66.mnw" />

                <span className="sr-only" data-oid="d8q9n9:">
                  Instagram
                </span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="p:8kgg6"
              >
                <Linkedin className="h-5 w-5" data-oid="17xqxgg" />

                <span className="sr-only" data-oid="95bxhgy">
                  LinkedIn
                </span>
              </Link>
            </div>
          </div>
          <div className="space-y-4" data-oid="sjv.3-f">
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              data-oid="hl8h_uc"
            >
              Product
            </h4>
            <ul className="space-y-2" data-oid="20-yydm">
              <li data-oid="_7l8ci8">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="mm824v."
                >
                  Features
                </Link>
              </li>
              <li data-oid="w3gscfl">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="gksk8_k"
                >
                  Pricing
                </Link>
              </li>
              <li data-oid="5gn8hgk">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="4u5h3.l"
                >
                  Integrations
                </Link>
              </li>
              <li data-oid="hb5jzbv">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid=":x-fzp3"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4" data-oid="hhn:j.q">
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              data-oid="vyd4ybc"
            >
              Company
            </h4>
            <ul className="space-y-2" data-oid="gas.5k6">
              <li data-oid="hi:er__">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="qp8zld5"
                >
                  About
                </Link>
              </li>
              <li data-oid="j3xhay0">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="8yphmdi"
                >
                  Blog
                </Link>
              </li>
              <li data-oid="intzgrf">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="-v_6zu2"
                >
                  Careers
                </Link>
              </li>
              <li data-oid="wv91esm">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="fjzok9."
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4" data-oid="jcobsvl">
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              data-oid="j9fik45"
            >
              Legal
            </h4>
            <ul className="space-y-2" data-oid="n6oq07g">
              <li data-oid="rkcsf9u">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="cmdlmub"
                >
                  Terms
                </Link>
              </li>
              <li data-oid="zalsb5_">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="rp7m.tw"
                >
                  Privacy
                </Link>
              </li>
              <li data-oid="1wtnhsw">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="4uzgq.3"
                >
                  Cookies
                </Link>
              </li>
              <li data-oid="1s4k4no">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="2:w71te"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"
          data-oid="-f37u3."
        >
          &copy; {new Date().getFullYear()} chance-me. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
