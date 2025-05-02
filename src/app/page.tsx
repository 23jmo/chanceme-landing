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
import { useState } from "react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col" data-oid="s38r_9t">
      <Header data-oid="iowl1fm" />
      <main className="flex-1" data-oid=".tm9brk">
        <HeroSection data-oid="69h5c__" />
        <FeaturesSection data-oid="tmos1o." />
        <TestimonialsSection data-oid="a3z1nav" />
        <PricingSection data-oid="_-q:8nq" />
        <CtaSection data-oid="3:hjip1" />
      </main>
      <Footer data-oid="ovw5i6l" />
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="h6znl6b"
    >
      <div
        className="container flex h-16 items-center justify-between"
        data-oid="dwj3avt"
      >
        <div className="flex items-center gap-2" data-oid="rf0udaz">
          <Link href="/" className="flex items-center gap-2" data-oid="_fxa9_b">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="StreamLine Logo"
              width={32}
              height={32}
              className="rounded"
              data-oid="wid:p9_"
            />

            <span className="text-xl font-bold" data-oid="-gaxsb5">
              chance-me
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-oid="wk2y00b"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" data-oid="87wr3bp" />
          ) : (
            <Menu className="h-6 w-6" data-oid="px9xvml" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" data-oid="pnq8q9d">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
            data-oid="a7rc5sf"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary"
            data-oid="4wdu2uo"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary"
            data-oid="eqduqdh"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-primary"
            data-oid=":m12kyb"
          >
            Contact
          </Link>
          <Button asChild data-oid="ksbirvc">
            <Link href="#get-started" data-oid="5e9ktpu">
              Get Started
            </Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            className="absolute top-16 left-0 right-0 bg-background border-b md:hidden"
            data-oid="p-ckrmy"
          >
            <nav className="container flex flex-col py-4" data-oid="r5uzwnp">
              <Link
                href="#features"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="jj._hbd"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="tunapwt"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="8g5sij1"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                data-oid="mg0vqtr"
              >
                Contact
              </Link>
              <Button
                asChild
                className="mt-2"
                onClick={() => setIsMenuOpen(false)}
                data-oid="39e9m6e"
              >
                <Link href="#get-started" data-oid="uf1_7_a">
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
  return (
    <section
      id="hero"
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
      data-oid="3bessn3"
    >
      <div className="container px-4 md:px-6" data-oid="aa_5w7_">
        <div
          className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
          data-oid="0m270hi"
        >
          <div
            className="flex flex-col justify-center space-y-4"
            data-oid="_qyiqon"
          >
            <div className="space-y-2" data-oid="po8s.lf">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                data-oid="7b0ykv9"
              >
                chance-me Your Workflow, Amplify Your Productivity
              </h1>
              <p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                data-oid="ct5.-x."
              >
                The all-in-one platform that helps teams collaborate, automate,
                and deliver results faster than ever before.
              </p>
            </div>
            <div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              data-oid="h_88:3u"
            >
              <Button asChild size="lg" data-oid="xp3egd3">
                <Link href="#get-started" data-oid="z5x7oh3">
                  Get Started for Free
                </Link>
              </Button>
              <Button variant="outline" size="lg" data-oid="99lndsm">
                <Link href="#demo" data-oid="t6sa-5y">
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
            data-oid="zofhxu2"
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
      data-oid="gz11g5z"
    >
      <div className="container px-4 md:px-6" data-oid="6_qu9io">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="klzzjx:"
        >
          <div className="space-y-2" data-oid="2bqe.iu">
            <div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              data-oid="g9bufsz"
            >
              Features
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="wamn7el"
            >
              Everything You Need to Succeed
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid=".qp0o7w"
            >
              chance-me provides powerful tools designed to help your team work
              smarter, not harder.
            </p>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:gap-12"
          data-oid="atx8n::"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-4 rounded-lg border p-6 bg-background shadow-sm"
              data-oid="2:is466"
            >
              <Image
                src={feature.icon || "/placeholder.svg"}
                width={48}
                height={48}
                alt={feature.title}
                className="rounded-md"
                data-oid="k7k_h:4"
              />

              <div className="space-y-2" data-oid="gnc1.qs">
                <h3 className="text-xl font-bold" data-oid="as.v2ex">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-oid="n-__skf">
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
      data-oid="dj2q-08"
    >
      <div className="container px-4 md:px-6" data-oid="qxka_t7">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="yw:.s_-"
        >
          <div className="space-y-2" data-oid="4nngfam">
            <div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              data-oid="vis.a2f"
            >
              Testimonials
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="xfv_2is"
            >
              Trusted by Teams Worldwide
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="k2hm.2h"
            >
              Don't just take our word for it. See what our customers have to
              say about chance-me.
            </p>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          data-oid="p1b08i4"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-lg border p-6 shadow-sm"
              data-oid="w--ja6u"
            >
              <div className="space-y-4" data-oid="q2v6ltd">
                <p className="text-muted-foreground italic" data-oid="aoj5fjy">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4" data-oid="e7e.:-j">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    width={64}
                    height={64}
                    alt={testimonial.author}
                    className="rounded-full"
                    data-oid="6bm6pz9"
                  />

                  <div data-oid="uqgl_:j">
                    <h4 className="font-semibold" data-oid="u:o-to7">
                      {testimonial.author}
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="_0rn5ey"
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
      data-oid=".nyvt8q"
    >
      <div className="container px-4 md:px-6" data-oid="y1xt-xv">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="u16tfbq"
        >
          <div className="space-y-2" data-oid="h09izsd">
            <div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              data-oid="1ms::42"
            >
              Pricing
            </div>
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="vyhjd1f"
            >
              Simple, Transparent Pricing
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="hv6s35s"
            >
              Choose the plan that's right for your team. All plans include a
              14-day free trial.
            </p>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          data-oid="j1j:5bi"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border p-6 shadow-sm ${
                plan.popular
                  ? "border-primary bg-background relative"
                  : "bg-background"
              }`}
              data-oid="25dlob6"
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                  data-oid="cq5r3b_"
                >
                  Most Popular
                </div>
              )}
              <div className="space-y-4" data-oid="4iiay44">
                <h3 className="text-2xl font-bold" data-oid="x_fx8i4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1" data-oid="o0lnc15">
                  <span className="text-4xl font-bold" data-oid="k9jxj55">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground" data-oid="6if2y9n">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground" data-oid="h-z33zz">
                  {plan.description}
                </p>
              </div>
              <div className="mt-6 space-y-4" data-oid="k6cscr0">
                <ul className="space-y-2" data-oid="-gm0280">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2"
                      data-oid="vs_jimj"
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-primary"
                        data-oid="dfn3ayk"
                      />

                      <span data-oid="clhx.gb">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary text-primary-foreground" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  data-oid=":j0da_8"
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
      data-oid="bpwqg9a"
    >
      <div className="container px-4 md:px-6" data-oid="-9e1ixn">
        <div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-oid="332vu4f"
        >
          <div className="space-y-2" data-oid="8w4kyni">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl"
              data-oid="ie2g6ug"
            >
              Ready to Transform Your Workflow?
            </h2>
            <p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              data-oid="hov21oi"
            >
              Join thousands of teams that use chance-me to boost productivity
              and streamline collaboration.
            </p>
          </div>
          <div
            className="flex flex-col gap-2 min-[400px]:flex-row"
            data-oid="r9rynoe"
          >
            <Button size="lg" className="gap-1" data-oid="zydkakj">
              Get Started Now
              <ArrowRight className="h-4 w-4" data-oid="ow._8y1" />
            </Button>
            <Button variant="outline" size="lg" data-oid="2nfjgvm">
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
      data-oid="ijgu3_a"
    >
      <div className="container px-4 md:px-6" data-oid="v7m49.p">
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-4"
          data-oid="2b0-lh9"
        >
          <div className="space-y-4" data-oid="-.vw2nk">
            <Link
              href="/"
              className="flex items-center gap-2"
              data-oid="5s.1ds_"
            >
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="chance-me Logo"
                width={32}
                height={32}
                className="rounded"
                data-oid="uoikti4"
              />

              <span className="text-xl font-bold" data-oid="070w--6">
                chance-me
              </span>
            </Link>
            <p className="text-sm text-muted-foreground" data-oid="0h86oob">
              Empowering teams to work smarter, not harder.
            </p>
            <div className="flex gap-4" data-oid="mb1a0wf">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="mo5wr7s"
              >
                <Twitter className="h-5 w-5" data-oid="jf:.fis" />

                <span className="sr-only" data-oid="-9kpby0">
                  Twitter
                </span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="m:t0.bq"
              >
                <Facebook className="h-5 w-5" data-oid="u81hukj" />

                <span className="sr-only" data-oid="xbvb08y">
                  Facebook
                </span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid=".vuvfzj"
              >
                <Instagram className="h-5 w-5" data-oid="l1-znne" />

                <span className="sr-only" data-oid="-j7021x">
                  Instagram
                </span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                data-oid="2rj1emp"
              >
                <Linkedin className="h-5 w-5" data-oid="eq-ukwb" />

                <span className="sr-only" data-oid="oagg34w">
                  LinkedIn
                </span>
              </Link>
            </div>
          </div>
          <div className="space-y-4" data-oid="9x-sdl:">
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              data-oid="u1.tub7"
            >
              Product
            </h4>
            <ul className="space-y-2" data-oid="p.p3w8l">
              <li data-oid="ath1x2a">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="kt9__8d"
                >
                  Features
                </Link>
              </li>
              <li data-oid="gbtlxzf">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="u9bhdlk"
                >
                  Pricing
                </Link>
              </li>
              <li data-oid="k0gzio2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="2vym5xd"
                >
                  Integrations
                </Link>
              </li>
              <li data-oid="oz73pfg">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="pygdvtf"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4" data-oid="cvoxvgd">
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              data-oid=":op3l74"
            >
              Company
            </h4>
            <ul className="space-y-2" data-oid="okt.tg3">
              <li data-oid=".fqkm9-">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="hkh.3ip"
                >
                  About
                </Link>
              </li>
              <li data-oid="alksi6f">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="zo7alov"
                >
                  Blog
                </Link>
              </li>
              <li data-oid="jwwzryi">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="axc-pt2"
                >
                  Careers
                </Link>
              </li>
              <li data-oid="ch7zrti">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="85niy0j"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4" data-oid="hel0cd5">
            <h4
              className="text-sm font-bold uppercase tracking-wider"
              data-oid="uxpl0jk"
            >
              Legal
            </h4>
            <ul className="space-y-2" data-oid="0trqfa_">
              <li data-oid="1u3w-.i">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="mg:zr_b"
                >
                  Terms
                </Link>
              </li>
              <li data-oid="jkjcxy5">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="q4f67ny"
                >
                  Privacy
                </Link>
              </li>
              <li data-oid="ri2-cnu">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="1_4g9k-"
                >
                  Cookies
                </Link>
              </li>
              <li data-oid="0:91qst">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-oid="t6l_zea"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"
          data-oid="dkzt4pz"
        >
          &copy; {new Date().getFullYear()} chance-me. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
