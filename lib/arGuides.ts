import type { IconName } from "@/components/Icon";

// Aesthetic Record & LeadAR how-to guides (/aesthetic-record-leadar-guides), batch 1, added 2026-11-22.
// Derrick approved the series 2026-11-22. Rules for anyone editing these:
// - Make Aesthetic Record and LeadAR look good ("get even more out of it"). Never frame them as broken or hard.
// - Never imply a partnership, certification or endorsement. Keep GUIDE_INDEPENDENCE on every page.
// - No HIPAA-compliant claims.
// - Every menu name and click path comes from Aesthetic Record's public Learning Lab (learn.aestheticrecord.com)
//   or Aesthetic Record's LeadAR pages, listed in each guide's `sources`. If you can't find a step there,
//   describe it at the level you can verify and add it to Derrick's VERIFY list. Don't invent UI.
// - Don't name the platform LeadAR runs on (repo CLAUDE.md: no platform names on the site).
// - No prices here.

export const GUIDES_HUB = {
  path: "/aesthetic-record-leadar-guides",
  metaTitle: "Aesthetic Record & LeadAR Guides for Medspas",
  metaDescription:
    "Step-by-step Aesthetic Record and LeadAR guides for medspas: online booking, review requests, memberships, abandoned bookings, missed call text back and patient win-back.",
  eyebrow: "Aesthetic Record & LeadAR Guides",
  h1: "Aesthetic Record & LeadAR How-To Guides",
  heroSub:
    "Step-by-step help from Derrick and Kelsey, who spent five years each at Aesthetic Record. Each guide follows Aesthetic Record's own help center and links to the article it came from.",
};

export const GUIDES_UPDATED = "2026-11-22";
export const GUIDES_UPDATED_LABEL = "Updated Nov 2026";

export const GUIDE_INDEPENDENCE =
  "RGVPM is independent and not affiliated with Aesthetic Record. Aesthetic Record and LeadAR are trademarks of their respective owners. Menus can change after we publish; Aesthetic Record's Learning Lab has the latest steps.";

export type GuideAuthor = "derrick" | "kelsey";

export const GUIDE_AUTHORS: Record<GuideAuthor, { name: string; photo: string; role: string; line: string }> = {
  derrick: {
    name: "Derrick Tamez",
    photo: "/founders/derrick.jpg",
    role: "Founder & CEO",
    line: "Five years at Aesthetic Record, from sales specialist to Sales Operations Manager. Helped launch and grow LeadAR.",
  },
  kelsey: {
    name: "Kelsey Tamez",
    photo: "/founders/kelsey.jpg",
    role: "Co-Founder",
    line: "Five years at Aesthetic Record, from training engineer to client success coach to Senior Strategic Account Manager.",
  },
};

export interface GuideStepGroup {
  heading: string;
  intro?: string;
  steps: string[];
  note?: string;
}

export interface Guide {
  slug: string;
  icon: IconName;
  title: string;
  metaTitle: string;
  description: string;
  author: GuideAuthor;
  /** 2–3 sentence direct answer shown at the top. */
  answer: string;
  intro: string;
  stepGroups: GuideStepGroup[];
  tips: { heading: string; items: string[] };
  help: string[];
  faqs: { q: string; a: string }[];
  /** The public pages every step above came from. */
  sources: { label: string; url: string }[];
  /** 60-second screen-recorded walkthrough. Empty until Derrick or Kelsey records it. */
  video: { title: string; embedUrl?: string };
  related: string[];
}

const LAB = "https://learn.aestheticrecord.com/en/articles";

export const GUIDES: Guide[] = [
  {
    slug: "aesthetic-record-online-booking-setup",
    icon: "calendar",
    title: "How to Set Up Online Booking in Aesthetic Record",
    metaTitle: "How to Set Up Online Booking in Aesthetic Record",
    description:
      "Turn on Aesthetic Record online booking for your clinic, providers and services, set your booking rules, customize the page, and share your booking link on your website and Google.",
    author: "kelsey",
    answer:
      "Online booking in Aesthetic Record switches on in three places: your clinic (Settings > Manage Clinics), each provider (Settings > Teammates > Users) and each service (Appointments > wrench icon > Smart Configuration > Services). After that, set your booking rules and page design under Smart Configuration > Booking Portal, then copy your booking link from Domain Configuration and add it to your website, Instagram bio and Google Business Profile.",
    intro:
      "Aesthetic Record's booking portal lets patients pick a provider, book, pay deposits and buy memberships, packages and eGift Cards in one visit. Most practices we worked with had booking on but only part of it set up. Walk through these six sections in order and you'll have every piece working.",
    stepGroups: [
      {
        heading: "1. Turn on online booking for your clinic",
        steps: [
          "In Aesthetic Record on the web, click the Settings gear in the top right.",
          "Click Manage Clinics, then click Edit next to your clinic.",
          "Check Clinic Available for Online Booking. Pick eCommerce only instead if you want patients to buy packages, memberships and eGift Cards online without booking.",
          "Add anything patients should know before they arrive, like parking. If you're a mobile or concierge practice, you can hide the clinic map and address.",
          "Click Save. With more than one location, use Display Order for Booking Portal on the Manage Clinics page to set the order patients see.",
        ],
      },
      {
        heading: "2. Turn on your providers",
        steps: [
          "Go to Settings > Teammates > Users and click Edit next to the provider.",
          "Add a photo for the booking page.",
          "Under Work as Provider, set Is available in Online Booking for Customers to Yes.",
          "Edit the display name and bio patients will read, then save.",
        ],
        note: "Patients only see open times that fit each provider's schedule, so check provider schedules too.",
      },
      {
        heading: "3. Turn on each service",
        steps: [
          "Click Appointments, then the wrench icon, then Smart Configuration > Services.",
          "Open a service and turn on Is this service available for Online Booking?",
          "For treatments you want patients to see but not book online, such as ones that need a consult first, use the display-only option. Patients will see the service and a prompt to call you.",
        ],
      },
      {
        heading: "4. Set your booking rules",
        steps: [
          "Go to Appointments > wrench icon > Smart Configuration > Booking Portal > Settings.",
          "Pick your booking increments (10, 15 or 30 minutes). These set the start times patients see. They don't add buffer time.",
          "Set a minimum lead time, such as 1 hour or 24 hours, so nobody books a slot you can't prepare for.",
          "Decide whether to show the Book with First Available button.",
          "Turn on Manage Appointments through Customer portal if you want patients to cancel or reschedule on their own.",
        ],
      },
      {
        heading: "5. Make the page look like your practice",
        steps: [
          "Under Booking Portal, click Web Configuration.",
          "Write your Practice Introduction & Description. It shows under the Book an Appointment tab and has a 50-character limit.",
          "Check the tabs you want patients to see. If you sell memberships, eGift Cards or promotions, check those boxes.",
          "Add your GA4 Measurement ID so you can see booking page traffic in Google Analytics.",
          "Add the phone number, website and email you want public, then click Theme to set your colors.",
        ],
      },
      {
        heading: "6. Copy your booking link and share it",
        steps: [
          "Go to Appointments > wrench icon > Smart Configuration > Booking Portal > Domain Configuration.",
          "Copy the link under Booking URLs for Clinics. With several locations, the All Clinics Url shows every clinic on one page.",
          "To use your practice name in the link, click the edit icon. Do this before you share it: once you change it, the old link stops working.",
          "Paste the link on your website's Book buttons, your Instagram and Facebook bios, and your Google Business Profile's booking or appointment link section.",
        ],
      },
    ],
    tips: {
      heading: "Get even more out of your booking page",
      items: [
        "Take deposits on long appointments. In Smart Configuration > Services, set Does This Service Require a Deposit? to Yes. The deposit lands in the patient's wallet for checkout.",
        "Turn on a cancellation policy. Under Smart Configuration > Other Settings, toggle on the policy, add your fee and time frame. It needs AR Pay, and patients agree to it in a pop-up when they book.",
        "Sell packages online. In Settings, go to POS > Promotions, open a package or BOGO and check Available on Booking Portal. Dollar-off and percent-off discounts can't show on the booking page.",
        "Ask for date of birth at booking if you need it: Appointments > Smart Configuration > Other Settings > DOB Policy.",
      ],
    },
    help: [
      "If you'd like a second set of eyes before you share your link, or you want the booking page connected to a new website, that's what we do. We'll go through your clinic, provider and service settings with you and point out what's worth turning on.",
    ],
    faqs: [
      {
        q: "Why isn't my service showing on Aesthetic Record online booking?",
        a: "Check three switches: Clinic Available for Online Booking on the clinic (Settings > Manage Clinics > Edit), Is available in Online Booking for Customers on at least one provider who performs the service, and Is this service available for Online Booking? on the service itself. Also make sure that provider has schedule time open.",
      },
      {
        q: "Where do I find my Aesthetic Record booking link?",
        a: "Go to Appointments > wrench icon > Smart Configuration > Booking Portal > Domain Configuration. Your clinic links are under Booking URLs for Clinics, and the All Clinics Url covers every location.",
      },
      {
        q: "Can patients cancel or reschedule on their own?",
        a: "Yes, if you turn on Manage Appointments through Customer portal under Smart Configuration > Booking Portal > Settings. Leave it off if you'd rather they call you.",
      },
      {
        q: "Can I add my Aesthetic Record booking link to Google?",
        a: "Yes. Aesthetic Record's help center explains pasting your booking URL into the booking or appointment link section of your Google Business Profile. Google decides where and whether that link option appears.",
      },
      {
        q: "Can patients buy memberships and gift cards on the booking page?",
        a: "Yes. Turn on the membership's Do you want to show this membership on Patient Portal? toggle, set eGift Cards to Available For Purchase On Booking Portal, and check those tabs in Web Configuration. Retail products can't be sold online through the booking page.",
      },
    ],
    sources: [
      { label: "Setup Your Online Booking & eCommerce Portal", url: `${LAB}/9237239-setup-your-online-booking-ecommerce-portal` },
      { label: "Enable/Disable Online Booking for Clinics, Providers, or Services", url: `${LAB}/9237326-enable-disable-online-booking-for-clinics-providers-or-services` },
      { label: "Update Booking Increments, Lead Time, \"Book with First Available\"", url: `${LAB}/9237837-update-booking-increments-lead-time-book-with-first-available-and-patient-s-ability-to-cancel-or-reschedule` },
      { label: "View and Manage your Online Booking URL and the Patient Portal URL", url: `${LAB}/13766265-view-and-manage-your-online-booking-url-and-the-patient-portal-url` },
      { label: "Service Deposits (Prepayments for a Service)", url: `${LAB}/9251983-service-deposits-prepayments-for-a-service` },
      { label: "Create or Manage Your Cancellation Policy", url: `${LAB}/9237230-create-or-manage-your-cancellation-policy` },
    ],
    video: { title: "Kelsey sets up Aesthetic Record online booking in 60 seconds" },
    related: ["aesthetic-record-abandoned-bookings-leads-tab", "aesthetic-record-memberships-setup"],
  },
  {
    slug: "aesthetic-record-review-requests",
    icon: "users",
    title: "How to Send Google Review Requests From Aesthetic Record",
    metaTitle: "How to Send Google Review Requests From Aesthetic Record",
    description:
      "Send your Google review link to patients after every appointment with Aesthetic Record's survey email and text, and see where LeadAR's review tools fit in.",
    author: "kelsey",
    answer:
      "Aesthetic Record sends your review link in the survey email and text that goes out after an appointment. Paste your Google review link under Appointments > wrench icon > Smart Configuration > Communication > Survey for both email and text, then attach a survey to each service. Aesthetic Record only sends that message for services with a survey attached.",
    intro:
      "Reviews decide a lot of first visits, and the best time to ask is right after the appointment while the patient still feels great. Aesthetic Record can send the ask for you every time, with no one at the front desk having to remember.",
    stepGroups: [
      {
        heading: "1. Get your Google review link",
        steps: [
          "Sign in to the Google account that manages your Google Business Profile.",
          "Create a Google link (or QR code) that asks customers for a review. Google's Business Profile help center walks through it.",
          "Copy the link. You'll paste it into Aesthetic Record next. A Yelp link works the same way.",
        ],
      },
      {
        heading: "2. Create a survey",
        steps: [
          "In Aesthetic Record on the web, go to Settings > Surveys > Create Survey.",
          "Name the survey and add a short question, such as how the visit went. Pick an answer type for each question.",
          "Save it.",
        ],
      },
      {
        heading: "3. Attach the survey to your services",
        steps: [
          "Go to Appointments > wrench icon > Smart Configuration > Services.",
          "Open a service and scroll to Surveys at the bottom.",
          "Pick your survey and when it should send: right after the service, a few hours later or the next day. Save, then repeat for each service.",
        ],
        note: "Skip this step and the review message won't send for that service.",
      },
      {
        heading: "4. Add your review link to the survey message",
        steps: [
          "Go to Appointments > wrench icon > Smart Configuration > Communication > Survey.",
          "Paste your review link under URL, give it a title like Google Review, and click Save.",
          "Open the Text Message tab and do the same so patients get the link by text, too.",
          "Keep the survey snippets in both the email and the text. They pull in the survey for the service the patient booked.",
        ],
      },
      {
        heading: "5. Test it",
        steps: [
          "Book a test appointment for yourself on a service with the survey attached, check it out, and confirm the email and text arrive with your review link.",
        ],
      },
    ],
    tips: {
      heading: "Get more reviews, the right way",
      items: [
        "Ask every patient. A steady flow of honest reviews reads better to new patients than a burst of perfect ones.",
        "Never trade a discount or freebie for a review. Google prohibits offering incentives in exchange for reviews.",
        "Reply to every review, and keep replies general. Don't mention treatments or confirm that someone is your patient.",
        "Patients who choose Do Not Disturb on your booking page won't receive surveys, so a few patients will never get the ask. That's expected.",
        "On LeadAR, Aesthetic Record describes AI-powered review tools that automatically request Google reviews after an appointment. If you have LeadAR, ask your LeadAR team to show you how it fits with the survey message so patients don't get asked twice.",
      ],
    },
    help: [
      "Want your review requests, Google Business Profile and website all working together? We set up the ask, build out your Google profile, and reply to reviews in your voice. Start with a 15-minute call.",
    ],
    faqs: [
      {
        q: "Why didn't my patient get a review request from Aesthetic Record?",
        a: "Three usual reasons: the service they booked has no survey attached, the patient chose Do Not Disturb, or the survey communication is toggled off under Smart Configuration > Communication. Check those in that order.",
      },
      {
        q: "Can Aesthetic Record send Google and Yelp review links?",
        a: "Yes. The Survey communication has room for review links, and Aesthetic Record's help article uses Google and Yelp as its examples.",
      },
      {
        q: "When should a review request go out?",
        a: "You choose when you attach the survey to a service: right after the service, a few hours later or the next day. Same day works well for quick treatments. Next day suits treatments where results take a moment to show.",
      },
      {
        q: "Can I offer patients a discount for leaving a review?",
        a: "No. Google's review policy prohibits offering free or discounted goods or services in exchange for reviews.",
      },
      {
        q: "Does LeadAR send review requests too?",
        a: "Aesthetic Record's LeadAR page describes AI-powered review tools that automatically request Google reviews after an appointment. If you use both, pick one to send the ask so patients get one request.",
      },
    ],
    sources: [
      { label: "Add Social Media Review Links to Emails and SMS", url: `${LAB}/9238467-add-social-media-review-links-to-emails-and-sms` },
      { label: "Configuring & Managing Communication Options for Patient Appointments", url: `${LAB}/9238504-configuring-managing-communication-options-for-patient-appointments` },
      { label: "Surveys: Sending out automated future service reminders", url: `${LAB}/9251311-surveys-sending-out-automated-future-service-reminders` },
      { label: "Do Not Disturb Consent FAQs", url: `${LAB}/9248153-do-not-disturb-consent-faqs` },
      { label: "LeadAR (Aesthetic Record)", url: "https://www.aestheticrecord.com/leadar/" },
      { label: "Google Business Profile: tips to get more reviews and review policy", url: "https://support.google.com/business/answer/3474122" },
    ],
    video: { title: "Kelsey adds a Google review link to Aesthetic Record in 60 seconds" },
    related: ["aesthetic-record-online-booking-setup", "aesthetic-record-reactivate-lapsed-patients"],
  },
  {
    slug: "aesthetic-record-memberships-setup",
    icon: "shield",
    title: "How to Set Up and Sell Memberships in Aesthetic Record",
    metaTitle: "How to Set Up Memberships in Aesthetic Record",
    description:
      "Build a membership in Aesthetic Record: the agreement, the membership type, online sign-up, decline texts and coupon codes, plus ideas to sell more of them.",
    author: "kelsey",
    answer:
      "Create the membership agreement first (Settings > Clinical Documentation > Patient Paperwork > Membership Agreements), because Aesthetic Record won't save a membership without one. Then build the membership under Settings > POS > Patient Loyalty: turn on the program, click Add new type, and set the fee, billing frequency and perks. Turn on self-enrollment and the patient portal toggle so patients can join online.",
    intro:
      "Memberships turn one-time visits into a monthly relationship, and Aesthetic Record handles the billing, wallet credits and agreements for you. The setup has a few settings that are easy to miss, so here's the full order we used with clinics.",
    stepGroups: [
      {
        heading: "1. Write the membership agreement",
        steps: [
          "In Aesthetic Record on the web, open Settings and click Clinical Documentation > Patient Paperwork.",
          "Open the Membership Agreements tab and click Create Agreement.",
          "Type or paste your terms, or upload a file. Make them detailed; the agreement helps you if a charge is ever disputed.",
          "Give it a name you'll recognize and save. Signed agreements save to each patient's Documents automatically.",
        ],
      },
      {
        heading: "2. Turn on your membership program",
        steps: [
          "Go to Settings > POS > Patient Loyalty (it may read Client Loyalty, depending on your account's wording).",
          "Click Edit and switch the toggle to enable the membership program.",
          "Add a program name, like \"[Your Practice] Loyalty\", and the thank-you message patients see on their enrollment invoice. Save.",
        ],
      },
      {
        heading: "3. Build each membership",
        steps: [
          "Click Add new type and name the membership, such as a tier (Gold, Silver) or a type (VIP Club).",
          "Set a blanket discount if members save on everything, or leave it empty and set member prices in Inventory instead.",
          "Choose Payment Frequency: Monthly, Yearly or Both.",
          "Add a One-Time Setup Fee if you want one, then the Monthly or Yearly Membership Fee.",
          "Select the agreement from step 1 and pick a color. Members get a colored star next to their name on the web and the app.",
          "Turn on Do you want to add the membership fee to Patient's wallet? for a \"beauty bank\" style membership, where each payment becomes credit to spend.",
          "Add any free monthly products or services at the bottom. They have to exist in Inventory first.",
          "Save before you leave the window.",
        ],
      },
      {
        heading: "4. Let patients join online",
        steps: [
          "In the membership, turn on the self-enroll toggle so patients can join from their patient portal.",
          "Turn on Do you want to show this membership on Patient Portal? and write the Membership Description for Booking Portal.",
          "In Appointments > wrench icon > Smart Configuration > Booking Portal > Web Configuration, check the memberships tab so it shows on your booking page.",
        ],
      },
      {
        heading: "5. Turn on decline texts and emails",
        steps: [
          "Go to Settings > POS > Client Loyalty and click Edit on the decline communications.",
          "Toggle the email and text message on. Use the template or write your own, then preview and save.",
        ],
        note: "These go out on the first day a card declines, which gives the patient two days to update their card before the membership churns.",
      },
    ],
    tips: {
      heading: "Sell more memberships",
      items: [
        "Launch with a coupon. Under Membership Discount Coupons, click Add Coupon, set a percent or dollar amount and an expiration date, and promote the code for a limited time.",
        "Offer a minimum commitment. Turn on Does this membership require a minimum time commitment? to set 1 to 12 months and an early cancellation fee.",
        "Find your members fast. In the Patients tab, create a filter for patients who are members, by membership type, and send them member-only news.",
        "Sign up patients at checkout, while they're happy with today's results. Enroll from their profile under Membership Plan > Add Membership, on the web or the iPad app.",
      ],
    },
    help: [
      "Pricing a membership and building the agreement are the parts owners ask us about most. We can help you set it up in Aesthetic Record, then put it on your website and in front of the right patients.",
    ],
    faqs: [
      {
        q: "What happens when a member's card declines in Aesthetic Record?",
        a: "Aesthetic Record tries the card again over the next two days. After three failed attempts, the membership churns. If you turn on Membership Decline SMS & Email, the patient hears about it on day one, and they can update their card in their patient portal under Payment Methods.",
      },
      {
        q: "Can patients cancel their membership online?",
        a: "Yes. On the Patient Loyalty page, the Allow 1 Click Cancellation on Patient Portal list includes every clinic by default. Remove a clinic from the list if its patients shouldn't cancel on their own.",
      },
      {
        q: "Can I pause a patient's membership?",
        a: "Yes. Open their profile, go to Membership Plan > Show Details, choose Hold Membership and pick the number of months. It resumes on its own when the hold ends.",
      },
      {
        q: "Can I charge a sign-up fee and waive it sometimes?",
        a: "Yes. Set a One-Time Setup Fee on the membership. When you enroll a patient in person, you can check Waive Setup Fee. Patients who join on their own through the portal pay it.",
      },
      {
        q: "Why can't I save my new membership?",
        a: "Aesthetic Record needs a membership agreement attached before it will save. Create one under Settings > Clinical Documentation > Patient Paperwork > Membership Agreements first.",
      },
    ],
    sources: [
      { label: "Creating Your Client Loyalty Programs (Memberships)", url: `${LAB}/9289291-creating-your-client-loyalty-programs-memberships` },
      { label: "Create a Membership Agreement & Attach It to a Membership", url: `${LAB}/9237289-create-a-membership-agreement-attach-it-to-a-membership` },
      { label: "Enroll, Edit, Cancel, or Put the Membership on Hold", url: `${LAB}/9237151-enroll-edit-cancel-or-put-the-membership-on-hold` },
      { label: "Enable Membership Decline SMS & Email", url: `${LAB}/9462430-enable-membership-decline-sms-email` },
      { label: "Filtering the Patient List", url: `${LAB}/9948462-filtering-the-patient-list` },
      { label: "Setup Your Online Booking & eCommerce Portal", url: `${LAB}/9237239-setup-your-online-booking-ecommerce-portal` },
    ],
    video: { title: "Kelsey builds an Aesthetic Record membership in 60 seconds" },
    related: ["aesthetic-record-online-booking-setup", "aesthetic-record-reactivate-lapsed-patients"],
  },
  {
    slug: "aesthetic-record-abandoned-bookings-leads-tab",
    icon: "target",
    title: "How to Follow Up on Abandoned Online Bookings in Aesthetic Record",
    metaTitle: "Abandoned Online Bookings in Aesthetic Record: The Leads Tab",
    description:
      "Use Aesthetic Record's Leads tab to see who started booking online but didn't finish, then book, text or add them to your patient list so they sync with LeadAR.",
    author: "derrick",
    answer:
      "Aesthetic Record saves people who start your online booking but don't finish. Once someone gets through the first page and the text verification step, they appear in the Leads tab with Online Booking as the source. From there your team can book them, text them or add them to your patient list. The Leads tab comes with the AR Accelerator plan.",
    intro:
      "Somebody who opens your booking page and types in their phone number wants to come in. Maybe the baby woke up or the time they wanted was taken. Aesthetic Record moved patient contact info to the start of the booking flow so you can catch these people and finish the booking for them.",
    stepGroups: [
      {
        heading: "1. Open the Leads tab",
        steps: [
          "In Aesthetic Record on the web, click Leads across the top. A badge shows when new leads arrive.",
          "Check the Location column if you have more than one clinic. It shows which clinic they tried to book.",
          "Check the Source column. Online Booking means an abandoned booking; other sources come from connected lead tools.",
        ],
        note: "Only people who aren't already in your system show here. Aesthetic Record matches on phone number, so an existing patient who abandons a booking won't appear.",
      },
      {
        heading: "2. Work each lead",
        intro: "Each row has four actions on the far right.",
        steps: [
          "Calendar icon: book the appointment. The Appointments screen opens with their info filled in, and they leave the Leads table once booked.",
          "Message icon: text them from your 2-way inbox. Aesthetic Record shows a red eye icon after you send, so your team knows someone reached out. They stay in the table until you book them, add them or delete them. This needs the 2-way inbox turned on.",
          "Checkmark: add them to your patient list without booking. Use this for someone who wants to come in later. It also syncs them to LeadAR or another connected lead tool.",
          "X: delete the lead. Use this when an existing patient booked with a new phone number, so you don't create a duplicate profile.",
        ],
      },
      {
        heading: "3. Track how many you win back",
        steps: [
          "Add your GA4 Measurement ID under Appointments > wrench icon > Smart Configuration > Booking Portal > Web Configuration to see traffic to your booking page.",
          "Go to Business Insights > Patient / Client Reports > Lead Conversion to see every lead that entered the table in a date range, which ones converted, and your conversion ratio.",
        ],
      },
    ],
    tips: {
      heading: "Follow-up that books",
      items: [
        "Reach out the same day. Someone who started booking this morning still remembers why.",
        "Keep the first text short and helpful: \"Hi, this is [Practice]. Looks like your booking didn't go through. Want us to grab a time for you?\"",
        "Offer two specific times instead of asking when they're free.",
        "Check the Leads tab at a set time each day so the badge never piles up.",
        "If they don't want to book yet, use the checkmark. They join your patient list and LeadAR, where your follow-up campaigns can reach them later.",
      ],
    },
    help: [
      "We helped build the lead side of this world, and we can set up the whole path for you: website and ads sending people to your booking page, the Leads tab worked every day, and LeadAR follow-up for anyone who isn't ready yet.",
    ],
    faqs: [
      {
        q: "Why isn't someone showing in my Aesthetic Record Leads tab?",
        a: "Either they're already a patient (Aesthetic Record matches on phone number), or they didn't finish the first page of online booking through the text verification step. Leads only appear after that step.",
      },
      {
        q: "Does a lead leave the table after I text them?",
        a: "No. Aesthetic Record keeps them in the Leads table, marked with a red eye icon, until you book them, add them to your patient list or delete them.",
      },
      {
        q: "Which Aesthetic Record plan includes the Leads tab?",
        a: "Aesthetic Record's help article says the Leads tab feature for abandoned bookings is available on the AR Accelerator subscription plan.",
      },
      {
        q: "How do Aesthetic Record leads get into LeadAR?",
        a: "When you add a lead to your patient list with the checkmark, or a new patient comes in through a booked appointment or manual entry, Aesthetic Record syncs them to LeadAR. Leads from LeadAR's marketing channels show up in the Aesthetic Record Leads tab.",
      },
      {
        q: "Can other lead sources feed the Leads tab?",
        a: "Yes. Aesthetic Record's Integrated Leads tab connects approved lead partners. Vendors that aren't listed can contact partnerships@aestheticrecord.com.",
      },
    ],
    sources: [
      { label: "Utilizing the Leads Tab to Manage Abandoned Bookings", url: `${LAB}/9246524-utilizing-the-leads-tab-to-manage-abandoned-bookings` },
      { label: "Integrated Leads Tab", url: `${LAB}/9247679-integrated-leads-tab` },
      { label: "LeadAR (Aesthetic Record)", url: "https://www.aestheticrecord.com/leadar/" },
      { label: "Setup Your Online Booking & eCommerce Portal", url: `${LAB}/9237239-setup-your-online-booking-ecommerce-portal` },
    ],
    video: { title: "Derrick works the Aesthetic Record Leads tab in 60 seconds" },
    related: ["leadar-missed-call-text-back", "aesthetic-record-online-booking-setup"],
  },
  {
    slug: "leadar-missed-call-text-back",
    icon: "phone",
    title: "Missed Call Text Back in LeadAR: Setup and What to Say",
    metaTitle: "LeadAR Missed Call Text Back: Setup and Message Examples",
    description:
      "How missed call text back works in LeadAR, what to do before it can send, and ready-to-use text messages for medspas that miss a call.",
    author: "derrick",
    answer:
      "Missed call text back sends an automatic text to anyone who calls your LeadAR number and doesn't reach you, so the conversation keeps going until your team calls back. Before LeadAR can send texts, your number needs A2P 10DLC registration, which LeadAR says takes 2 to 5 business days. After that, you turn it on in LeadAR's phone settings, write a short message and test it from your own phone.",
    intro:
      "Calls get missed at every busy medspa: injectors are with patients and the front desk is checking someone out. A text that lands within a minute tells the caller you saw them and gives them a way to book right now. LeadAR puts that text, the reply and the rest of the conversation in one inbox.",
    stepGroups: [
      {
        heading: "1. Get your number cleared to text",
        steps: [
          "Register your LeadAR number through A2P 10DLC. The LeadAR team guides you through it when you subscribe, and approval takes 2 to 5 business days.",
          "Add the DNS records LeadAR gives you if you'll also send email.",
          "Download the My LeadAR app (Apple App Store or Google Play) so your team can call and text from a phone or iPad.",
        ],
        note: "Until registration is approved, carriers can block your texts, including missed call texts.",
      },
      {
        heading: "2. Make sure calls reach your LeadAR number",
        steps: [
          "Use your LeadAR number as the number on your website, Google Business Profile and ads, or have the LeadAR team route your main line to it.",
          "Call it from a personal phone and confirm the call rings your team in the app or on desktop.",
        ],
      },
      {
        heading: "3. Turn on missed call text back",
        steps: [
          "In LeadAR, open Settings and go to your phone settings.",
          "Find Missed Call Text Back, turn it on and write your message (examples below).",
          "Check how long a call rings before it counts as missed. Long enough for your team to grab it, short enough that the text lands while the caller still has their phone in hand.",
          "Send a test to your own phone and save.",
        ],
        note: "Menu names can differ by account. If you don't see the setting, ask the LeadAR team at info@MyleadAR.com or through live chat on Aesthetic Record's website.",
      },
      {
        heading: "4. Answer the replies",
        steps: [
          "Replies land in LeadAR's one inbox with your calls, texts, emails and social messages.",
          "Assign the conversation to a team member so one person owns the callback.",
        ],
      },
    ],
    tips: {
      heading: "What to text back after a missed call",
      items: [
        "Booking-first: \"Hi, this is [Practice]! Sorry we missed your call. Are you looking to book? You can grab a time here: [booking link]. Reply STOP to opt out.\"",
        "Question-first: \"Hi, this is [Practice]. We're with a patient and missed your call. Text us your question here and we'll get right back to you.\"",
        "After hours: \"Thanks for calling [Practice]! We're closed right now and will text you first thing tomorrow. Book anytime: [booking link].\"",
        "Keep it under 160 characters when you can. Longer texts split into more segments.",
        "Leave treatment details and anything personal out of the first text. Your team can cover that on the callback.",
      ],
    },
    help: [
      "Derrick helped launch LeadAR, and setting up the phone, text and follow-up side is a big part of what we do for practices. We can set up missed call text back with your team and connect it to your website and booking page.",
    ],
    faqs: [
      {
        q: "What is LeadAR?",
        a: "LeadAR is Aesthetic Record's lead management and marketing platform. It brings calls, texts, emails, social messages and chat into one inbox, adds follow-up automations and review tools, and syncs contacts with Aesthetic Record.",
      },
      {
        q: "What should a missed call text say?",
        a: "Say who you are, say sorry you missed them, and give one easy next step: a booking link or an invitation to text their question. Add opt-out wording like \"Reply STOP to opt out.\"",
      },
      {
        q: "Why isn't my missed call text sending?",
        a: "The most common reason is that your number's A2P 10DLC registration isn't approved yet. Ask the LeadAR team to check your registration and confirm the feature is on.",
      },
      {
        q: "Does it text someone who calls twice?",
        a: "It can. Ask the LeadAR team how your account handles repeat calls from the same person so a caller doesn't get the same text twice in a few minutes.",
      },
      {
        q: "Do we still need to call people back?",
        a: "Yes. The text keeps the caller engaged and often gets them to book on their own, and your team's callback covers everything else.",
      },
    ],
    sources: [
      { label: "FAQs for LeadAR's StARt Plan Integration", url: `${LAB}/11978424-faqs-for-leadar-s-start-plan-integration` },
      { label: "LeadAR (Aesthetic Record)", url: "https://www.aestheticrecord.com/leadar/" },
      { label: "Do Not Disturb Consent FAQs (text segments and opt-outs)", url: `${LAB}/9248153-do-not-disturb-consent-faqs` },
      { label: "Configuring & Managing Communication Options (SMS segments)", url: `${LAB}/9238504-configuring-managing-communication-options-for-patient-appointments` },
    ],
    video: { title: "Derrick turns on missed call text back in LeadAR in 60 seconds" },
    related: ["aesthetic-record-abandoned-bookings-leads-tab", "aesthetic-record-reactivate-lapsed-patients"],
  },
  {
    slug: "aesthetic-record-reactivate-lapsed-patients",
    icon: "megaphone",
    title: "How to Win Back Lapsed Patients With Aesthetic Record and LeadAR",
    metaTitle: "Reactivate Lapsed Patients With Aesthetic Record and LeadAR",
    description:
      "Find patients who haven't been back with Aesthetic Record's Business Insights reports, reach them with LeadAR, and set up future service reminders so fewer patients lapse.",
    author: "derrick",
    answer:
      "Start in Aesthetic Record: Business Insights > Patients > Create Report > Patient has not visited in X days lists everyone who hasn't been in during the window you choose. Send that list a personal offer by text and email through LeadAR, which can turn Aesthetic Record reports into LeadAR lists. Then set up future service reminder surveys so fewer patients lapse next time.",
    intro:
      "Your patient list holds a lot of people who loved their last visit and just haven't rebooked. Aesthetic Record can tell you exactly who they are and what they had done, and LeadAR can reach them.",
    stepGroups: [
      {
        heading: "1. Pull your lapsed patient list",
        steps: [
          "In Aesthetic Record on the web, click Business Insights at the top, then Patients.",
          "Click Create Report and choose Patient has not visited in X days.",
          "Set the number of days and click Submit. Review the results, then save or export them.",
          "For a sharper list, try Patient has had X and not Y, for example patients who had a consultation but never booked the treatment.",
        ],
      },
      {
        heading: "2. Or build a saved filter",
        steps: [
          "Click Patients, then Filters > New Filter.",
          "Name it, set a date range, and narrow by clinic, products, provider or membership.",
          "Click Save & Apply. To export, click Import/Export and choose Export as CSV or Export as Excel.",
        ],
      },
      {
        heading: "3. Reach them with LeadAR",
        steps: [
          "Send the report to LeadAR. Aesthetic Record's LeadAR page describes Report Sharing: sending Aesthetic Record reports to a LeadAR client list to create smart lists or add clients to a workflow.",
          "Send a text and email campaign to that list. Texts need your A2P 10DLC registration approved, and email needs LeadAR's DNS records in place.",
          "Watch replies in LeadAR's one inbox and book people as they answer.",
        ],
        note: "Ask your LeadAR team to show you Report Sharing in your account the first time.",
      },
      {
        heading: "4. Keep the next group from lapsing",
        steps: [
          "Go to Settings > Surveys > Create Survey and write a simple Yes/No question, such as \"Have you booked your next appointment yet?\"",
          "Go to Appointments > wrench icon > Smart Configuration > Services, open a service, and attach the survey at the bottom with a send time.",
          "Customize the thank-you page under Smart Configuration > Communication > Survey. Patients see a Create Appointment button there, so tell them to use it.",
        ],
      },
    ],
    tips: {
      heading: "Win-back offers that work",
      items: [
        "Match the window to the treatment. Pick a number of days that fits how often patients usually repeat that treatment at your practice.",
        "Write like a person. \"We miss you, [first name]\" from your practice beats a generic promo blast.",
        "Give a reason to come in this month: a limited-time offer, a new provider or a new treatment.",
        "Leave out patients who chose Do Not Disturb. Aesthetic Record marks them on their profile.",
        "Run it again every month, so it becomes a routine.",
      ],
    },
    help: [
      "We can build your lapsed-patient lists, write the messages and set up the LeadAR follow-up, then run it every month so returning patients keep coming back.",
    ],
    faqs: [
      {
        q: "How do I find patients who haven't come back in Aesthetic Record?",
        a: "Go to Business Insights > Patients > Create Report and choose Patient has not visited in X days. Set the number of days and submit.",
      },
      {
        q: "How many days counts as a lapsed patient?",
        a: "It depends on the treatment. Use a window that fits how often patients usually repeat that treatment at your practice, and run separate lists for different treatments.",
      },
      {
        q: "Can I send an Aesthetic Record report to LeadAR?",
        a: "Yes. Aesthetic Record's LeadAR page describes Report Sharing, which sends Aesthetic Record reports to a LeadAR client list to create smart lists or add clients to a workflow.",
      },
      {
        q: "Can I export my patient list from Aesthetic Record?",
        a: "Yes. In the Patients tab, choose the columns you want with the + sign, then click Import/Export and pick Export as CSV or Export as Excel.",
      },
      {
        q: "Will patients who opted out get my win-back texts?",
        a: "They shouldn't. Patients who choose Do Not Disturb stop getting nearly all communications from your practice, so leave them off campaign lists.",
      },
    ],
    sources: [
      { label: "Business Insights > Patient Reports in Aesthetic Record", url: `${LAB}/11403560-business-insights-patient-reports-in-aesthetic-record` },
      { label: "Filtering the Patient List", url: `${LAB}/9948462-filtering-the-patient-list` },
      { label: "Import or Export Your Patient List", url: `${LAB}/9251301-import-or-export-your-patient-list` },
      { label: "Surveys: Sending out automated future service reminders", url: `${LAB}/9251311-surveys-sending-out-automated-future-service-reminders` },
      { label: "FAQs for LeadAR's StARt Plan Integration", url: `${LAB}/11978424-faqs-for-leadar-s-start-plan-integration` },
      { label: "LeadAR (Aesthetic Record)", url: "https://www.aestheticrecord.com/leadar/" },
      { label: "Do Not Disturb Consent FAQs", url: `${LAB}/9248153-do-not-disturb-consent-faqs` },
    ],
    video: { title: "Derrick pulls a lapsed-patient list in Aesthetic Record in 60 seconds" },
    related: ["aesthetic-record-review-requests", "aesthetic-record-memberships-setup"],
  },
];

export const guidePath = (slug: string) => `${GUIDES_HUB.path}/${slug}`;
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidePaths = () => GUIDES.map((g) => guidePath(g.slug));
