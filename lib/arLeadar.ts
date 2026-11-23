import type { IconName } from "@/components/Icon";
import { AR_INDEPENDENCE_LINE, AR_TRADEMARKS } from "@/lib/site";

// Aesthetic Record & LeadAR consultant page (/aesthetic-record-leadar-consultant), added 2026-11-21.
// A door-opener for medspa owners who search for help with their software. Background facts come from Derrick
// (2026-11-21) and the About page; never imply a partnership with, or speak for, Aesthetic Record. Derrick: always make
// Aesthetic Record and LeadAR look good; never frame them as broken or hard to use. No prices here:
// the page links to /medspa-marketing#pricing, where prices come from the site's plan data.

export const AR_LEADAR = {
  path: "/aesthetic-record-leadar-consultant",
  metaTitle: "Aesthetic Record & LeadAR Consultant for Medspas",
  metaDescription:
    "Aesthetic Record and LeadAR help from two people who each spent five years at Aesthetic Record, plus med spa websites, Google rankings and AI tools.",
  keywordCluster: [
    "aesthetic record consultant",
    "leadar consultant",
    "aesthetic record leadar",
    "leadar setup help",
    "aesthetic record setup help",
    "medspa emr consultant",
  ],
  eyebrow: "Aesthetic Record & LeadAR",
  h1: "Aesthetic Record & LeadAR Help From People Who Worked There",
  heroSub:
    "We each spent five years at Aesthetic Record. Derrick helped launch and grow LeadAR. Kelsey trained clinics and managed their accounts. Now we build medspa websites, get them found on Google, and set up AI that works with the software you already use.",
};

export const AR_LEADAR_INTRO = {
  heading: "Built to Do a Lot. We Help You Use All of It.",
  body: [
    "Aesthetic Record is a leading software platform for the aesthetics industry, and LeadAR brings your leads, follow-up texts and emails into the same world. Your bookings, memberships, packages and new client conversations can all live in one place. That's a big advantage most businesses don't have.",
    "The practices that get the most from it are the ones with every piece set up: forms connected, follow-up turned on, and a team that knows where to look. Busy clinics don't always have time for that. We spent years helping practices do exactly this, so we can show you where to start."
  ],
};

export const AR_LEADAR_TEAM = [
  {
    name: "Derrick Tamez, MBA",
    role: "Founder & CEO",
    photo: "/founders/derrick.jpg",
    text: "Derrick spent five years at Aesthetic Record. He started as a sales specialist, worked his way up to Sales Operations Manager, and helped launch and grow LeadAR, the lead management and marketing side of the business.",
  },
  {
    name: "Kelsey Tamez",
    role: "Co-Founder",
    photo: "/founders/kelsey.jpg",
    text: "Kelsey spent five years at Aesthetic Record. She started as a training engineer, became a client success coach, and grew into a Senior Strategic Account Manager, working with hundreds of clinic owners and their teams.",
  },
];

export const AR_LEADAR_HELP: { icon: IconName; title: string; text: string; href?: string }[] = [
  { icon: "chat", title: "LeadAR Follow-Up", text: "Forms, pipelines and follow-up texts and emails set up so every new lead gets a fast, friendly answer.", href: "/services/lead-management" },
  { icon: "target", title: "Leads Into the Right Place", text: "Your website forms and ads sending leads straight into LeadAR, so your team works from one list." },
  { icon: "calendar", title: "EMR Consultant", text: "A monthly call to go over your Aesthetic Record account, plus direct support when you want to make a change or try something new.", href: "/medspa-marketing#pricing" },
];

export const AR_LEADAR_SERVICES: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "globe", title: "Websites", text: "A custom site built around your treatments and your Book button, live in 8 to 10 days. We host it and keep it updated.", href: "/services/website-design" },
  { icon: "search", title: "Ranking on Google", text: "Your Google Business Profile, treatment and city pages, and a monthly report, so you show up when clients search near you.", href: "/services/local-seo" },
  { icon: "cpu", title: "AI Implementation", text: "AI that answers new inquiries right away and hands anything personal to your team, connected to the tools you already use.", href: "/services/ai-implementation" },
];

export const AR_LEADAR_STEPS = [
  { title: "Book a 15-minute call", text: "Tell us how you use Aesthetic Record and LeadAR today, and what you want them to do for you." },
  { title: "We look at your setup", text: "With access you grant, we see what you have set up today and what's worth turning on next." },
  { title: "You decide", text: "Keep it to software help, or hand us your website, Google and AI too. Every plan is month-to-month." },
];

export const AR_LEADAR_FAQS = [
  { q: "Are you part of Aesthetic Record?", a: "No. RGV Performance Marketing is an independent agency. We're proud of our five years each at Aesthetic Record and LeadAR, and we love helping practices get the most out of them, but we don't work for or speak for Aesthetic Record." },
  { q: "Can you work inside our LeadAR account?", a: "Yes. With access you grant, we can set up forms, pipelines and follow-up inside your LeadAR account, and connect your website and ads to it." },
  { q: "Do we have to use Aesthetic Record or LeadAR to work with you?", a: "No. We build websites, Google rankings, ads and AI for medspas on any software. If you do use them, we know them well and can help you get even more out of them." },
  { q: "What does an EMR consultant do?", a: "You get a monthly call to go over your account, plus direct support from our team when you want to make a change or try something new. It's an add-on to any plan, with the price published on our medspa page." },
  { q: "What does it cost?", a: "Every price is published on our medspa and pricing pages before you talk to us, and every plan is month-to-month." },
  { q: "How do you handle client information?", a: "Our Terms include a HIPAA Business Associate Addendum that applies when we create, receive, maintain or transmit protected health information on your behalf." },
];

/** Visible independence note (same sentence as /company-facts). */
export const AR_LEADAR_DISCLAIMER = `${AR_INDEPENDENCE_LINE} ${AR_TRADEMARKS}`;
