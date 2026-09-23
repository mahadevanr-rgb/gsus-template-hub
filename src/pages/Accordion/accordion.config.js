import {
  Heart,
  Users,
  User,
  Glasses,
  ThumbsUp,
  FileText,
  Wallet,
  Users2,
  Banknote,
} from "lucide-react";

export const numberedFaqItems = [
  {
    id: "01",
    title: "What is ATS and why does it matter?",
    content:
      "ATS stands for Applicant Tracking System — software used by companies to filter resumes. If your resume isn't ATS-optimized, it may never be seen. Our tool ensures a 100% ATS score.",
  },
  {
    id: "02",
    title: "What happens after 7 days on the free plan?",
    content:
      "After your 7-day trial ends, your account transitions to the free starter tier with basic formatting tools, or you can choose to upgrade to Pro for unlimited exports and live ATS scoring.",
  },
  {
    id: "03",
    title: "Can I use my own domain name?",
    content:
      "Yes! You can easily link custom domains to host your online interactive resume and portfolio with automatic SSL certificates.",
  },
  {
    id: "04",
    title: "Is the payment one-time or monthly?",
    content:
      "We offer flexible pricing: you can choose between a cost-effective annual subscription or a month-to-month plan with no lock-in contracts.",
  },
  {
    id: "05",
    title: "Will I need to code or design anything?",
    content:
      "No coding or design skills required. Our intuitive drag-and-drop builder and pre-optimized ATS templates handle all formatting and compliance automatically.",
  },
];

export const filterSections = [
  {
    id: "company",
    title: "Company",
    options: [
      { id: "google", label: "Google" },
      { id: "microsoft", label: "Microsoft" },
      { id: "apple", label: "Apple" },
      { id: "amazon", label: "Amazon" },
      { id: "meta", label: "Meta" },
    ],
  },
  {
    id: "industry",
    title: "Industry",
    options: [
      { id: "aerospace", label: "Aerospace" },
      { id: "food", label: "Food" },
      { id: "mining", label: "Mining" },
      { id: "music", label: "Music" },
      { id: "transportation", label: "Transportation" },
    ],
    defaultSelected: ["aerospace", "food", "mining", "music", "transportation"],
  },
  {
    id: "department",
    title: "Department",
    options: [
      { id: "engineering", label: "Engineering" },
      { id: "design", label: "Product & Design" },
      { id: "marketing", label: "Marketing" },
      { id: "sales", label: "Sales & BD" },
      { id: "operations", label: "Operations" },
    ],
  },
  {
    id: "employees",
    title: "Employees",
    options: [
      { id: "1-10", label: "1-10 Employees" },
      { id: "11-50", label: "11-50 Employees" },
      { id: "51-200", label: "51-200 Employees" },
      { id: "201-1000", label: "201-1000 Employees" },
      { id: "1000+", label: "1000+ Enterprise" },
    ],
  },
];

export const simpleFaqItems = [
  {
    id: "faq-1",
    question: "How does Easy Accordion improve website content organization?",
    answer:
      "Easy Accordion organizes lengthy content into responsive collapsible rows, reducing page scroll and cognitive load for site visitors while improving accessibility.",
  },
  {
    id: "faq-2",
    question: "How can I customize the accordion design and layout easily?",
    answer:
      "You can customize colors, typography, borders, chevron animations, icons, and padding through simple React props and standard Tailwind CSS classes.",
  },
  {
    id: "faq-3",
    question: "Does Easy Accordion work with any WordPress theme?",
    answer:
      "Yes, it is designed with clean modular semantics and scoped styles that prevent CSS conflicts with any theme or parent container.",
  },
  {
    id: "faq-4",
    question: "Is Easy Accordion optimized for site speed and performance?",
    answer:
      "Built using CSS Grid rows and zero external JS runtime dependencies, it guarantees 60fps animations with minimal bundle size (~1.5 KB).",
  },
  {
    id: "faq-5",
    question: "Does Easy Accordion support Gutenberg and page builders?",
    answer:
      "Full compatibility with popular page builders and modern React framework components through standard export contracts.",
  },
  {
    id: "faq-6",
    question: "How do I upgrade to Easy Accordion Pro features?",
    answer:
      "Upgrade seamlessly within the dashboard to unlock nested accordions, multi-column layouts, and server-side search indexing.",
  },
];

export const iconAccordionItems = [
  {
    id: "health-profile",
    label: "Health Profile",
    icon: Heart,
    content:
      "View and manage your vital health records, medical assessments, and clinical history.",
  },
  {
    id: "group-section",
    label: "Group Section",
    icon: Users,
    content:
      "Manage departmental group allocations, shared access roles, and team policies.",
  },
  {
    id: "mobility",
    label: "Mobility",
    icon: User,
    content:
      "Configure mobility assistance requirements, transport options, and physical accommodations.",
  },
  {
    id: "optometry",
    label: "Optometry",
    icon: Glasses,
    content:
      "Review optical vision prescriptions, eyewear coverage limits, and examination records.",
  },
  {
    id: "result",
    label: "Result",
    icon: ThumbsUp,
    content:
      "Comprehensive score overview, evaluation milestones, and verified certifications.",
  },
];

export const formAccordionSections = [
  {
    id: "general-info",
    title: "General info",
    icon: FileText,
    required: true,
    subtitle: "Basic identity and tax filing status",
    fields: [
      {
        id: "fullName",
        name: "fullName",
        label: "Legal Full Name",
        type: "text",
        placeholder: "Jane Doe",
        required: true,
        defaultValue: "Jane Doe",
      },
      {
        id: "taxYear",
        name: "taxYear",
        label: "Tax Filing Year",
        type: "number",
        defaultValue: 2022,
        required: true,
      },
    ],
    actions: [
      {
        type: "submit",
        label: "Continue",
      },
    ],
  },
  {
    id: "income",
    title: "Income",
    icon: Wallet,
    subtitle: "Enter your annual earned income (An estimate is ok)",
    fields: [
      {
        id: "annualIncome",
        name: "annualIncome",
        label: "How much did you make from your job(s) for 2022? (An estimate is ok)",
        helperText: "How much did you make from your job(s) for 2022? (An estimate is ok)",
        type: "number",
        defaultValue: 0,
        required: true,
      },
      {
        id: "unemploymentIncome",
        name: "unemploymentIncome",
        label: "Enter your total unemployment income for the year",
        helperText: "Total amount received from state unemployment benefits in 2022.",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "federalTax",
        name: "federalTax",
        label:
          "How much was withheld for federal taxes for 2022 (including unemployment)?",
        helperText:
          "Refer to Box 2 on your Form W-2 or Box 4 on your 1099-G.",
        type: "number",
        defaultValue: 0,
      },
    ],
    actions: [
      {
        type: "submit",
        label: "Continue",
      },
    ],
  },
  {
    id: "family",
    title: "Family",
    icon: Users2,
    subtitle: "Dependents and household information",
    fields: [
      {
        id: "dependentsCount",
        name: "dependentsCount",
        label: "Number of eligible dependents claimed",
        type: "number",
        defaultValue: 0,
      },
    ],
    actions: [
      {
        type: "submit",
        label: "Continue",
      },
    ],
  },
  {
    id: "other-income",
    title: "Other income",
    icon: Banknote,
    subtitle: "Dividends, capital gains, and freelance income",
    fields: [
      {
        id: "capitalGains",
        name: "capitalGains",
        label: "Total investment and interest income",
        type: "number",
        defaultValue: 0,
      },
    ],
    actions: [
      {
        type: "submit",
        label: "Continue",
      },
    ],
  },
];

export const accordionComponents = [
  {
    id: "numbered-accordion",
    name: "Numbered FAQ Accordion",
    description:
      "High-impact FAQ accordion with large sequential numbering, circular +/- action triggers, and single-item focus.",
    tag: "FAQ",
    theme: "indigo",
    badge: "ATS FAQ",
    version: "v1.0.0",
  },
  {
    id: "filter-accordion",
    name: "Filter Selection Accordion",
    description:
      "E-commerce & directory multi-section filter accordion with dynamic live selection count badges and checkboxes.",
    tag: "Filter",
    theme: "blue",
    badge: "Filters",
    version: "v1.0.0",
  },
  {
    id: "simple-accordion",
    name: "Simple FAQ Accordion",
    description:
      "Clean minimal disclosure rows with rounded cards, smooth chevron rotation, and accessible keyboard interaction.",
    tag: "Minimal",
    theme: "purple",
    badge: "Easy FAQ",
    version: "v1.0.0",
  },
  {
    id: "icon-accordion",
    name: "Icon Navigation Accordion",
    description:
      "Compact vertical navigation list with pixel-aligned icons, circular triggers, and theme variant support.",
    tag: "Navigation",
    theme: "amber",
    badge: "Icon Nav",
    version: "v1.0.0",
  },
  {
    id: "form-accordion",
    name: "Dynamic Form Accordion",
    description:
      "Multi-section enterprise form disclosure with data-driven dynamic fields, tooltips, required badges, and state persistence.",
    tag: "Form",
    theme: "teal",
    badge: "Form",
    version: "v1.0.0",
  },
  {
    id: "accordion-primitive",
    name: "Base Accordion Primitive",
    description:
      "Accessible Compound Accordion primitives (Accordion, Item, Trigger, Content) handling single/multi state and keyboard focus.",
    tag: "Primitive",
    theme: "slate",
    badge: "Core Atom",
    version: "v1.0.0",
  },
];
