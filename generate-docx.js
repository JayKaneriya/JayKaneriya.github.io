const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, Table, TableRow, TableCell, WidthType, VerticalAlign,
  ShadingType, convertInchesToTwip, PageOrientation, Header, Footer,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
  PageNumber, NumberFormat, TabStopType, TabStopPosition, UnderlineType,
  LineRuleType
} = require("docx");
const fs = require("fs");

// ===================== HELPERS =====================
const ACCENT = "2D3A8C";    // dark blue
const DIM    = "718096";
const MUTED  = "4A5568";
const INK    = "1A1A2E";
const RULE   = "D4D8E8";

const h = (text, opts = {}) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 200, after: 80 },
  border: { bottom: { color: RULE, space: 1, style: BorderStyle.SINGLE, size: 6 } },
  children: [
    new TextRun({ text: text.toUpperCase(), bold: true, size: 19, color: ACCENT, font: "Inter" }),
  ],
  ...opts,
});

const body = (text, opts = {}) => new Paragraph({
  spacing: { after: 40 },
  children: [new TextRun({ text, size: 21, color: MUTED, font: "Calibri" })],
  ...opts,
});

const bullet = (text) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 30 },
  children: [new TextRun({ text, size: 20, color: MUTED, font: "Calibri" })],
});

const bold = (text) => new TextRun({ text, bold: true, color: INK, font: "Calibri", size: 20 });
const dim  = (text) => new TextRun({ text, color: DIM,  font: "Calibri", size: 18, italics: true });

// ===================== DOCUMENT =====================
const doc = new Document({
  creator: "Jay Kaneriya",
  title: "Jay Kaneriya CV 2026",
  description: "Senior Full-Stack Laravel/PHP Developer CV",
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 21, color: MUTED } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: convertInchesToTwip(8.27), height: convertInchesToTwip(11.69) },
        margin: { top: convertInchesToTwip(0.7), bottom: convertInchesToTwip(0.7), left: convertInchesToTwip(0.75), right: convertInchesToTwip(0.75) },
      },
    },
    children: [

      // ===== HEADER =====
      new Paragraph({
        spacing: { after: 40 },
        border: { bottom: { color: ACCENT, space: 6, style: BorderStyle.SINGLE, size: 18 } },
        children: [
          new TextRun({ text: "Jay Kaneriya", bold: true, size: 56, color: INK, font: "Crimson Pro, Georgia, Times New Roman" }),
        ],
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({ text: "Senior Full-Stack Laravel / PHP Developer  \u00b7  9+ Years Production Experience", size: 22, color: ACCENT, bold: true, font: "Calibri" }),
        ],
      }),
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({ text: "Rajkot, Gujarat, India (IST)", size: 19, color: DIM, font: "Calibri" }),
          new TextRun({ text: "   |   ", size: 19, color: DIM }),
          new TextRun({ text: "jay.kaneriya8@gmail.com", size: 19, color: ACCENT, font: "Calibri" }),
          new TextRun({ text: "   |   ", size: 19, color: DIM }),
          new TextRun({ text: "+91 85300 78687", size: 19, color: ACCENT, font: "Calibri" }),
          new TextRun({ text: "   |   ", size: 19, color: DIM }),
          new TextRun({ text: "jaykaneriya.github.io", size: 19, color: ACCENT, font: "Calibri" }),
          new TextRun({ text: "   |   ", size: 19, color: DIM }),
          new TextRun({ text: "linkedin.com/in/jaykaneriya", size: 19, color: ACCENT, font: "Calibri" }),
          new TextRun({ text: "   |   ", size: 19, color: DIM }),
          new TextRun({ text: "github.com/JayKaneriya", size: 19, color: ACCENT, font: "Calibri" }),
        ],
      }),

      // ===== PROFILE =====
      h("Professional Summary"),
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({ text: "Senior Full-Stack Laravel / PHP Developer with ", size: 21, color: MUTED, font: "Calibri" }),
          bold("9+ years"),
          new TextRun({ text: " shipping production web applications for education, eCommerce and SaaS. Most recently ", size: 21, color: MUTED, font: "Calibri" }),
          bold("Senior Web Application Developer at Paperly"),
          new TextRun({ text: " (Perth, Australia \u2014 remote), leading end-to-end module development on a Laravel / Vue school-management platform used daily by thousands of teachers and parents across 250+ Australian schools. Available for ", size: 21, color: MUTED, font: "Calibri" }),
          bold("remote full-time roles"),
          new TextRun({ text: " and ", size: 21, color: MUTED, font: "Calibri" }),
          bold("freelance Laravel projects"),
          new TextRun({ text: " \u2014 IST timezone with AU / EU / US overlap.", size: 21, color: MUTED, font: "Calibri" }),
        ],
      }),
      new Paragraph({
        spacing: { after: 200 },
        shading: { type: ShadingType.SOLID, color: "F0F2F8", fill: "F0F2F8" },
        border: { left: { color: ACCENT, style: BorderStyle.SINGLE, size: 18, space: 8 } },
        indent: { left: 120 },
        children: [
          bold("Core expertise: "),
          new TextRun({ text: "Laravel \u00b7 PHP 8+ \u00b7 REST APIs \u00b7 MySQL \u00b7 Vue.js \u00b7 React \u00b7 Redis \u00b7 Stripe / PayPal / Payfort \u00b7 Workflow automation", size: 20, color: MUTED, font: "Calibri" }),
        ],
      }),

      // ===== EXPERIENCE =====
      h("Work Experience"),

      // Paperly
      new Paragraph({
        spacing: { before: 80, after: 20 },
        children: [
          new TextRun({ text: "Senior Web Application Developer", bold: true, size: 26, color: INK, font: "Calibri" }),
          new TextRun({ text: "                                              ", size: 22 }),
          new TextRun({ text: "Jul 2022 \u2013 Aug 2026", bold: true, size: 20, color: ACCENT, font: "Calibri" }),
        ],
      }),
      new Paragraph({ spacing: { after: 60 }, children: [dim("Paperly  \u00b7  Perth, Western Australia (Remote)  \u00b7  EdTech SaaS")] }),
      bullet("Led end-to-end feature development on a multi-school Laravel / Vue SaaS platform used daily by thousands of teachers and parents across 250+ Australian schools."),
      bullet("Built excursion management, sports scheduling, music programs, parent-teacher interview booking, assessment calendars and digital permission forms as full production modules."),
      bullet("Delivered dynamic form builder, workflow automation engine, geolocation-based roll-call and multi-school SIS integrations from design through to deployment."),
      bullet("Designed and maintained REST API contracts and MySQL schemas; integrated third-party services in Agile sprints with the Perth team."),
      bullet("Managed production releases, permission models and data migrations; collaborated asynchronously across time zones as the sole remote senior developer."),
      new Paragraph({
        spacing: { after: 160 },
        children: [
          new TextRun({ text: "Stack: Laravel 10/11  \u00b7  Vue.js 3  \u00b7  MySQL  \u00b7  REST APIs  \u00b7  Geolocation  \u00b7  PHP 8  \u00b7  GitHub Actions", size: 18, color: ACCENT, italics: true, font: "Calibri" }),
        ],
      }),

      // Logistic Infotech
      new Paragraph({
        spacing: { before: 60, after: 20 },
        children: [
          new TextRun({ text: "Web Application Developer", bold: true, size: 26, color: INK, font: "Calibri" }),
          new TextRun({ text: "                                                              ", size: 22 }),
          new TextRun({ text: "Jul 2017 \u2013 Jun 2022", bold: true, size: 20, color: ACCENT, font: "Calibri" }),
        ],
      }),
      new Paragraph({ spacing: { after: 60 }, children: [dim("Logistic Infotech Pvt Ltd  \u00b7  Rajkot, India  \u00b7  Software Agency")] }),
      bullet("Delivered full-stack client projects across education, eCommerce, SaaS, restaurant and booking verticals for clients in Saudi Arabia, Australia, UK and India."),
      bullet("Built Laravel backends (REST APIs, RBAC, scheduled jobs) paired with Vue.js and React.js frontends and admin dashboards."),
      bullet("Integrated Stripe, PayPal, BPOINT and Payfort into production billing and checkout flows across multiple live products."),
      bullet("Shipped real-time features with Socket.io and Firebase; delivered AWS-backed infrastructure for media storage and deployment pipelines."),
      bullet("Mentored junior developers, led client estimates, ran code reviews and coordinated releases across multiple concurrent project teams."),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "Stack: Laravel  \u00b7  Vue.js  \u00b7  React.js  \u00b7  Node.js  \u00b7  MySQL  \u00b7  Socket.io  \u00b7  AWS S3  \u00b7  Firebase  \u00b7  Stripe  \u00b7  PayPal  \u00b7  BPOINT", size: 18, color: ACCENT, italics: true, font: "Calibri" }),
        ],
      }),

      // ===== PROJECTS =====
      h("Selected Projects"),

      new Paragraph({ spacing: { before: 80, after: 10 }, children: [new TextRun({ text: "Paperly \u2014 School Management Platform", bold: true, size: 23, color: INK, font: "Calibri" }), dim("   |   Professional  \u00b7  2022\u20132026  \u00b7  Australia")] }),
      new Paragraph({ spacing: { after: 40 }, children: [dim("Senior Web Application Developer  \u00b7  EdTech SaaS  \u00b7  Laravel / Vue.js")] }),
      body("K-12 school operations platform: excursions, sports, music, parent-teacher interviews, forms, workflow automation and geolocation roll-call \u2014 live at scale across 250+ Australian schools."),

      new Paragraph({ spacing: { before: 100, after: 10 }, children: [new TextRun({ text: "Megathy \u2014 On-Demand Grocery & Food Delivery", bold: true, size: 23, color: INK, font: "Calibri" }), dim("   |   Professional  \u00b7  Saudi Arabia")] }),
      new Paragraph({ spacing: { after: 40 }, children: [dim("Full Stack  \u00b7  Laravel APIs + Vue Admin + Mobile Apps")] }),
      body("Multi-store grocery and restaurant delivery for Eastern Saudi Arabia \u2014 multi-vendor catalogue, scheduled slots, collectors and drivers, Payfort payments, rewards system and live chat."),

      new Paragraph({ spacing: { before: 100, after: 10 }, children: [new TextRun({ text: "Zimdle \u2014 Customer Feedback SaaS", bold: true, size: 23, color: INK, font: "Calibri" }), dim("   |   Professional")] }),
      new Paragraph({ spacing: { after: 40 }, children: [dim("Full Stack  \u00b7  Laravel 5.3  \u00b7  Stripe  \u00b7  Analytics")] }),
      body("Private feedback collection with Stripe subscription plans, scheduled reporting, PDF generation and Twilio SMS alerts for business performance monitoring."),

      new Paragraph({ spacing: { before: 100, after: 10 }, children: [new TextRun({ text: "Exception Tracker \u2014 Observability SaaS", bold: true, size: 23, color: INK, font: "Calibri" }), dim("   |   Independent  \u00b7  In progress")] }),
      new Paragraph({ spacing: { after: 40 }, children: [dim("Personal project  \u00b7  Architecture sample")] }),
      body("Multi-tenant exception monitoring with issue grouping, SDK integrations, uptime monitors, session replay, Horizon-backed queues and Stripe billing."),

      // ===== SKILLS =====
      h("Technical Skills"),
      new Paragraph({ spacing: { after: 30 }, children: [bold("Backend:       "), new TextRun({ text: "Laravel, PHP 8+, REST APIs, MySQL, Redis, Node.js, Socket.io, JWT, OAuth, Sanctum", size: 20, color: MUTED, font: "Calibri" })] }),
      new Paragraph({ spacing: { after: 30 }, children: [bold("Frontend:      "), new TextRun({ text: "Vue.js 3, React.js, TypeScript, Tailwind CSS, Sass, Inertia.js, responsive UI", size: 20, color: MUTED, font: "Calibri" })] }),
      new Paragraph({ spacing: { after: 30 }, children: [bold("Payments:      "), new TextRun({ text: "Stripe, PayPal, BPOINT, Payfort, Razorpay, webhooks, FCM, Twilio", size: 20, color: MUTED, font: "Calibri" })] }),
      new Paragraph({ spacing: { after: 30 }, children: [bold("Cloud/DevOps:  "), new TextRun({ text: "Git, GitHub Actions, AWS S3, Linux, CI/CD, Postman, JIRA, Firebase, cPanel", size: 20, color: MUTED, font: "Calibri" })] }),
      new Paragraph({ spacing: { after: 160 }, children: [bold("Domains:       "), new TextRun({ text: "EdTech, eCommerce, SaaS, Delivery platforms, Booking, Feedback analytics, Workflow automation", size: 20, color: MUTED, font: "Calibri" })] }),

      // ===== EDUCATION =====
      h("Education"),
      new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "B.E. Computer Science & Engineering", bold: true, size: 22, color: INK, font: "Calibri" })] }),
      new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: "Gujarat Technological University  \u00b7  Rajkot, India  \u00b7  2013 \u2013 2017", size: 20, color: MUTED, font: "Calibri" })] }),

      // ===== FOOTER NOTE =====
      new Paragraph({
        spacing: { before: 300 },
        alignment: AlignmentType.CENTER,
        border: { top: { color: RULE, style: BorderStyle.SINGLE, size: 6, space: 6 } },
        children: [
          new TextRun({ text: "Availability: ", bold: true, size: 18, color: INK, font: "Calibri" }),
          new TextRun({ text: "Remote full-time roles | Freelance / contract Laravel | IST \u00b7 AU / EU / US overlap", size: 18, color: DIM, font: "Calibri" }),
          new TextRun({ text: "     |     Languages: English (Professional) \u00b7 Hindi (Professional) \u00b7 Gujarati (Native)", size: 18, color: DIM, font: "Calibri" }),
        ],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Jay_Kaneriya_CV_2026.docx", buffer);
  console.log("SUCCESS: Jay_Kaneriya_CV_2026.docx created");
}).catch(e => { console.error("ERROR:", e.message); });
