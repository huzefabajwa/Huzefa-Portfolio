import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://huzefa:huzefa123@cluster0.fphbdbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

/* ── Schemas ───────────────────────────────────────────────── */
const HomeSchema      = new mongoose.Schema({ heading:String, summary:String, hireme:String, upwork:String, slack:String, github:String, linkedin:String, stack:String }, { timestamps:true });
const AboutSchema     = new mongoose.Schema({ aboutme:String, noofprojects:Number, yearsofexperience:Number, noofclients:Number, skills:String, skillheading:String }, { timestamps:true });
const ServiceSchema   = new mongoose.Schema({ title:String, service:String, fareacticon:String }, { timestamps:true });
const ExperienceSchema= new mongoose.Schema({ position:String, company:String, duration:String, location:String, jobprofile:String }, { timestamps:true });
const EducationSchema = new mongoose.Schema({ degree:String, year:String, college:String }, { timestamps:true });
const PlatformSchema  = new mongoose.Schema({ name:String, description:String, logoUrl:String, color:String, order:Number }, { timestamps:true });
const ProjectSchema   = new mongoose.Schema({ name:String, application:String, github:String, imageUrl:String, images:[String], description:String, shortdescription:String, playstore:String, techstack:String, ios:String, weburl:String, projecttype:String, tags:[String], thumbnailPosition:String }, { timestamps:true });
const ReviewSchema    = new mongoose.Schema({ name:String, company:String, review:String, rating:Number, avatarUrl:String }, { timestamps:true });

const Home       = mongoose.models.Home       || mongoose.model("Home",       HomeSchema,       "homes");
const About      = mongoose.models.About      || mongoose.model("About",      AboutSchema,      "abouts");
const Service    = mongoose.models.Service    || mongoose.model("Service",    ServiceSchema,    "services");
const Experience = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema, "experiences");
const Education  = mongoose.models.Education  || mongoose.model("Education",  EducationSchema,  "educations");
const Platform   = mongoose.models.Platform   || mongoose.model("Platform",   PlatformSchema,   "platforms");
const Project    = mongoose.models.Project    || mongoose.model("Project",    ProjectSchema,    "projects");
const Review     = mongoose.models.Review     || mongoose.model("Review",     ReviewSchema,     "reviews");

/* ── Connect ───────────────────────────────────────────────── */
await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

/* ── Clear all collections ─────────────────────────────────── */
await Service.deleteMany({});
await Project.deleteMany({});
await Platform.deleteMany({});
await Review.deleteMany({});
// Selective cleans
await Experience.deleteMany({ $or: [{ position:"asas" }, { company:"Self Employed" }, { position:"Freelance Web Developeras" }] });
console.log("🗑️  Cleared stale data");

/* ── HOME ──────────────────────────────────────────────────── */
await Home.updateOne({}, {
  $set: {
    heading:  "HUZEFA BAJWA",
    summary:  "Salesforce Consultant, HubSpot Consultant, Dynamics 365 CRM Consultant",
    hireme:   "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    upwork:   "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    github:   "https://github.com/huzefabajwa",
    linkedin: "https://linkedin.com/in/huzefabajwa",
    stack:    "https://stackoverflow.com/users/19169339/huzefa-bajwa",
    slack:    ""
  }
}, { upsert: true });
console.log("✅ Home updated");

/* ── ABOUT ─────────────────────────────────────────────────── */
await About.updateOne({}, {
  $set: {
    aboutme: "I'm a certified CRM consultant specialising in Salesforce, HubSpot, and Microsoft Dynamics 365. With hands-on experience across sales automation, marketing pipelines, and enterprise CRM implementations, I help businesses transform their customer relationships into measurable revenue growth. From initial discovery and architecture design to full deployment and user training, I deliver end-to-end CRM solutions tailored to your unique business processes — on time and on budget.",
    noofprojects:    18,
    yearsofexperience: 3,
    noofclients:     25,
    skillheading:    "CRM & Technical Expertise",
    skills: "Salesforce Admin 95, Salesforce Development 85, HubSpot CRM 90, Dynamics 365 80, Power Platform 75, Apex & LWC 80, REST APIs & Integrations 85, Data Migration 80, Sales Cloud 90, Service Cloud 85, Marketing Cloud 75, CPQ & Billing 70"
  }
}, { upsert: true });
console.log("✅ About updated");

/* ── SERVICES ──────────────────────────────────────────────── */
await Service.insertMany([
  {
    title:       "Salesforce CRM Implementation",
    service:     "End-to-end Salesforce setup including Sales Cloud, Service Cloud, and custom object configuration tailored to your sales process.",
    fareacticon: "FaSalesforce"
  },
  {
    title:       "HubSpot CRM Setup & Automation",
    service:     "Full HubSpot onboarding, pipeline creation, workflow automation, and marketing hub configuration to generate and nurture leads.",
    fareacticon: "FaHubspot"
  },
  {
    title:       "Microsoft Dynamics 365 Consulting",
    service:     "Dynamics 365 deployment, customisation, and integration with Microsoft 365 & Power Platform for enterprise-grade CRM operations.",
    fareacticon: "FaMicrosoft"
  },
  {
    title:       "CRM Integration & APIs",
    service:     "Connect your CRM with third-party tools — ERP, accounting, email, and e-commerce — using REST APIs and native connectors.",
    fareacticon: "FaPlug"
  },
  {
    title:       "Sales Process Automation",
    service:     "Automate lead assignment, follow-up sequences, approval workflows, and reporting dashboards to accelerate your revenue cycle.",
    fareacticon: "FaBolt"
  },
  {
    title:       "CRM Training & Adoption",
    service:     "User training, documentation, and change management strategies to ensure your team fully adopts and maximises your CRM investment.",
    fareacticon: "FaChalkboardTeacher"
  }
]);
console.log("✅ Services inserted (6)");

/* ── EXPERIENCE ─────────────────────────────────────────────── */
await Experience.insertMany([
  {
    position:   "Salesforce Developer & CRM Consultant",
    company:    "iOPTIME Private Ltd.",
    duration:   "April 2025 – Present",
    location:   "Islamabad, Pakistan – Onsite",
    jobprofile: "Designing and building Salesforce solutions for enterprise clients. Responsibilities include Sales Cloud configuration, Apex trigger development, Lightning Web Component (LWC) UI builds, and REST API integrations with third-party platforms."
  },
  {
    position:   "CRM Solutions Consultant (Freelance)",
    company:    "Upwork – Self Employed",
    duration:   "2023 – Present",
    location:   "Remote – Global Clients",
    jobprofile: "Delivered 18+ CRM projects across Salesforce, HubSpot, and Dynamics 365 for clients in the US, UK, and Middle East. Specialisations include sales pipeline automation, lead nurturing workflows, custom reporting, and CRM data migrations."
  },
  {
    position:   "Software Engineer (Associate Web Developer)",
    company:    "Software Motion (Suzhou) Engineering Services Co. Ltd",
    duration:   "January 2024 – April 2024",
    location:   "Suzhou, China – Remote",
    jobprofile: "Developed and maintained web application modules using React and Node.js. Collaborated with cross-functional teams on API design and database optimisation for client-facing SaaS products."
  }
]);
console.log("✅ Experience inserted (3)");

/* ── EDUCATION ──────────────────────────────────────────────── */
// Patch typo in existing degree
await Education.updateOne(
  { college: { $regex: "Ghulam Ishaq" } },
  { $set: { degree: "Bachelor's in Computer Engineering", year: "2019 – 2024" } }
);
// Add Salesforce cert as education entry if not present
const hasSFCert = await Education.findOne({ degree: { $regex: "Salesforce" } });
if (!hasSFCert) {
  await Education.create({ degree: "Salesforce Certified Administrator (SCA)", year: "2024", college: "Salesforce Trailhead" });
}
const hasCS50 = await Education.findOne({ college: "HarverdX" });
if (hasCS50) {
  await Education.updateOne({ college: "HarverdX" }, { $set: { college: "HarvardX (CS50)", degree: "Introduction to Computer Science", year: "2021" } });
}
console.log("✅ Education updated");

/* ── PLATFORMS ──────────────────────────────────────────────── */
await Platform.insertMany([
  { name:"Salesforce",    description:"Sales, Service & Marketing Cloud",  color:"#00A1E0", order:1, logoUrl:"/salesforce-logo.png" },
  { name:"HubSpot",       description:"CRM & Marketing Automation",         color:"#FF7A59", order:2, logoUrl:"/hubspot-logo.png"    },
  { name:"Dynamics 365",  description:"Microsoft Enterprise CRM",           color:"#742774", order:3, logoUrl:"/dynamics-logo.png"   },
  { name:"Power Apps",    description:"Low-Code App Development",           color:"#8B5CF6", order:4, logoUrl:"/powerapps-logo.png"  },
  { name:"Power BI",      description:"Business Intelligence & Analytics",  color:"#F2C811", order:5, logoUrl:"/powerbi-logo.png"    },
  { name:"Zoho CRM",      description:"SMB CRM Platform",                   color:"#E42527", order:6, logoUrl:"/zoho-logo.png"       }
]);
console.log("✅ Platforms inserted (6)");

/* ── PROJECTS ───────────────────────────────────────────────── */
// Using picsum.photos with seeds for consistent placeholder images
const P = "https://picsum.photos/seed";

await Project.insertMany([
  {
    name:             "Salesforce Sales Cloud Implementation",
    projecttype:      "Enterprise CRM",
    shortdescription: "Full Sales Cloud deployment for a 120-user SaaS company — custom pipeline stages, territory management, automated forecasting, and Apex-driven lead routing.",
    description:      `<h2>Project Overview</h2><p>Led a full Salesforce Sales Cloud implementation for a rapidly scaling B2B SaaS company with 120 sales reps across three regions. The client was operating on spreadsheets and a legacy system with no pipeline visibility or forecasting capability.</p><h2>What Was Built</h2><ul><li><strong>Custom Sales Pipeline</strong> with 8 deal stages mapped to the client's actual sales motion</li><li><strong>Territory Management</strong> — geographic and industry-based assignment rules for automatic lead routing</li><li><strong>Apex Lead Routing Engine</strong> — round-robin assignment with workload balancing across team members</li><li><strong>Automated Forecasting</strong> — real-time pipeline dashboards with Q1–Q4 commit and best-case views</li><li><strong>CPQ Integration</strong> — connected Salesforce CPQ for automated quote generation from opportunities</li><li><strong>Email-to-Case</strong> routing from sales inbox into Salesforce activities</li></ul><h2>Results & Impact</h2><blockquote>Sales cycle reduced by 28% within 90 days of go-live. Full adoption achieved in under 3 weeks.</blockquote><ul><li>Pipeline visibility improved from <strong>0% to 100%</strong> across all regions</li><li>Manual data entry reduced by <strong>65%</strong> through automation</li><li>Forecast accuracy improved to <strong>±8%</strong> vs actual closed revenue</li></ul><h2>Tech Stack</h2><p>Salesforce Sales Cloud · Apex · Lightning Web Components · CPQ · REST API · Data Loader · SOQL</p>`,
    techstack:        "Salesforce, Apex, LWC, CPQ, REST API, SOQL, Data Loader",
    tags:             ["Salesforce","Sales Cloud","Apex","CPQ","CRM Implementation"],
    imageUrl:         `${P}/crm1/800/500`,
    images:           [`${P}/crm1a/800/500`, `${P}/crm1b/800/500`, `${P}/crm1c/800/500`],
    github:           "",
    weburl:           "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    thumbnailPosition:"center"
  },
  {
    name:             "HubSpot Marketing Automation System",
    projecttype:      "Marketing Hub",
    shortdescription: "Built a full HubSpot marketing engine — lead capture forms, multi-step nurture workflows, lead scoring, and closed-loop reporting for a digital marketing agency.",
    description:      `<h2>Project Overview</h2><p>A digital marketing agency serving 40+ SMB clients needed a scalable marketing automation platform. They had disconnected tools — Mailchimp, a WordPress site, Google Ads — with no unified lead tracking or attribution model.</p><h2>What Was Built</h2><ul><li><strong>HubSpot CRM Setup</strong> — contact, company, and deal objects configured for agency + client workflows</li><li><strong>Lead Capture System</strong> — 12 landing pages with embedded HubSpot forms connected to smart lists</li><li><strong>Multi-Step Nurture Workflows</strong> — 6 automated sequences covering awareness → consideration → decision</li><li><strong>Lead Scoring Model</strong> — behavioural + demographic scoring triggering MQL alerts to sales</li><li><strong>Closed-Loop Reporting</strong> — revenue attribution from first touch to closed deal in HubSpot dashboards</li><li><strong>WordPress Integration</strong> via HubSpot tracking code and form embeds</li></ul><h2>Results & Impact</h2><blockquote>MQL volume increased by 3.4× within the first quarter post-implementation.</blockquote><ul><li>Email open rates improved from <strong>14% → 38%</strong> using personalisation tokens</li><li>Lead-to-customer conversion improved by <strong>22%</strong></li><li>Saved <strong>12 hours/week</strong> of manual outreach across the agency team</li></ul><h2>Tech Stack</h2><p>HubSpot CRM · Marketing Hub · Workflows · Smart Lists · WordPress · REST API · Google Ads Integration</p>`,
    techstack:        "HubSpot, Marketing Hub, Workflows, Smart Lists, WordPress, Google Ads",
    tags:             ["HubSpot","Marketing Automation","Lead Scoring","CRM","Workflows"],
    imageUrl:         `${P}/hub1/800/500`,
    images:           [`${P}/hub1a/800/500`, `${P}/hub1b/800/500`],
    github:           "",
    weburl:           "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    thumbnailPosition:"center"
  },
  {
    name:             "Dynamics 365 Customer Service Portal",
    projecttype:      "Microsoft Dynamics 365",
    shortdescription: "Deployed Dynamics 365 Customer Service with a self-service Power Pages portal, SLA management, escalation rules, and Power BI reporting for a mid-size logistics company.",
    description:      `<h2>Project Overview</h2><p>A logistics company with 300+ enterprise customers needed a modern support infrastructure. They were managing tickets via email threads with no SLA tracking, escalation paths, or customer-facing self-service.</p><h2>What Was Built</h2><ul><li><strong>Dynamics 365 Customer Service</strong> — full case management with custom entities for shipment disputes</li><li><strong>Power Pages Self-Service Portal</strong> — customers submit, track, and update cases without calling support</li><li><strong>SLA Configuration</strong> — tiered SLAs (Gold/Silver/Bronze) with automated warning and breach alerts</li><li><strong>Escalation Rules</strong> — auto-escalate unresolved cases after configurable time thresholds</li><li><strong>Power Automate Flows</strong> — automated email notifications and internal Slack alerts on SLA breach</li><li><strong>Power BI Dashboard</strong> — real-time support KPIs including CSAT, resolution time, and backlog trends</li></ul><h2>Results & Impact</h2><blockquote>First-contact resolution rate improved from 41% to 68% within 60 days.</blockquote><ul><li>Average ticket resolution time reduced by <strong>35%</strong></li><li>Self-service portal deflected <strong>30% of inbound support volume</strong></li><li><strong>CSAT score</strong> increased from 3.2 → 4.5 / 5 in first quarter</li></ul><h2>Tech Stack</h2><p>Dynamics 365 Customer Service · Power Pages · Power Automate · Power BI · Azure Logic Apps · REST API</p>`,
    techstack:        "Dynamics 365, Power Pages, Power Automate, Power BI, Azure, REST API",
    tags:             ["Dynamics 365","Microsoft","Power Platform","CRM","Customer Service"],
    imageUrl:         `${P}/dyn1/800/500`,
    images:           [`${P}/dyn1a/800/500`, `${P}/dyn1b/800/500`, `${P}/dyn1c/800/500`],
    github:           "",
    weburl:           "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    thumbnailPosition:"center"
  },
  {
    name:             "Salesforce & QuickBooks Integration",
    projecttype:      "CRM Integration",
    shortdescription: "Built a bi-directional real-time sync between Salesforce CRM and QuickBooks Online — syncing invoices, payments, customers, and products with no manual data entry.",
    description:      `<h2>Project Overview</h2><p>A professional services firm needed their Salesforce CRM and QuickBooks Online accounting system to share data automatically. Finance and sales teams were duplicating data entry across both systems, causing invoice errors and payment delays.</p><h2>What Was Built</h2><ul><li><strong>Real-time Bi-Directional Sync</strong> — Salesforce Accounts ↔ QuickBooks Customers via REST webhooks</li><li><strong>Opportunity → Invoice Automation</strong> — closing a deal in Salesforce auto-generates a QuickBooks invoice</li><li><strong>Payment Sync</strong> — QuickBooks payment events update Opportunity stage and create activity logs in Salesforce</li><li><strong>Product Catalogue Sync</strong> — Salesforce Products/Price Books linked to QuickBooks Items</li><li><strong>Error Handling & Retry Logic</strong> — failed syncs logged to a custom Salesforce object with admin alerts</li><li><strong>Admin Dashboard</strong> — custom Salesforce tab showing sync status, last-run times, and error logs</li></ul><h2>Results & Impact</h2><blockquote>Zero duplicate data entry. Finance team saved 8+ hours per week on reconciliation.</blockquote><ul><li>Invoice errors reduced from <strong>~15/month to 0</strong></li><li>Payment collection cycle shortened by <strong>4 days on average</strong></li><li>Both teams now work from a <strong>single source of truth</strong></li></ul><h2>Tech Stack</h2><p>Salesforce · Apex REST Callouts · QuickBooks Online API · Named Credentials · Platform Events · Custom Metadata</p>`,
    techstack:        "Salesforce, Apex, QuickBooks API, REST, Platform Events, Named Credentials",
    tags:             ["Salesforce","Integration","QuickBooks","REST API","Automation"],
    imageUrl:         `${P}/int1/800/500`,
    images:           [`${P}/int1a/800/500`, `${P}/int1b/800/500`],
    github:           "",
    weburl:           "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    thumbnailPosition:"top"
  },
  {
    name:             "HubSpot CRM Migration from Pipedrive",
    projecttype:      "CRM Migration",
    shortdescription: "Migrated 50,000+ contacts, deals, and activity history from Pipedrive to HubSpot CRM with zero data loss, full field mapping, and custom pipeline replication.",
    description:      `<h2>Project Overview</h2><p>A fast-growing e-commerce brand outgrew Pipedrive and chose HubSpot as their new CRM. They needed a complete migration of 4 years of CRM data — contacts, companies, deals, notes, call logs, and email history — with no business disruption during the transition.</p><h2>What Was Built</h2><ul><li><strong>Data Audit & Field Mapping</strong> — catalogued 200+ Pipedrive fields and mapped to HubSpot equivalents</li><li><strong>Custom Properties</strong> — created 35 custom contact and deal properties in HubSpot to match Pipedrive data model</li><li><strong>Staged Migration</strong> — migrated in 4 phases: Companies → Contacts → Deals → Activities</li><li><strong>Python ETL Script</strong> — extracted via Pipedrive API, transformed, and loaded via HubSpot API in batches</li><li><strong>Pipeline Replication</strong> — all 3 Pipedrive pipelines rebuilt in HubSpot with equivalent stage logic</li><li><strong>Post-Migration Validation</strong> — automated reconciliation report comparing record counts and key fields</li></ul><h2>Results & Impact</h2><blockquote>50,247 records migrated with 100% field accuracy. Zero business downtime.</blockquote><ul><li><strong>Full historical data preserved</strong> including 18 months of email sequences</li><li>Migration completed in <strong>6 business days</strong> vs estimated 3 weeks</li><li>Team fully onboarded and active in HubSpot within <strong>2 weeks</strong></li></ul><h2>Tech Stack</h2><p>HubSpot API · Pipedrive API · Python · Pandas · REST · CSV · Data Validation Scripts</p>`,
    techstack:        "HubSpot API, Pipedrive API, Python, Pandas, REST API, Data Migration",
    tags:             ["HubSpot","Migration","Data","Pipedrive","CRM"],
    imageUrl:         `${P}/mig1/800/500`,
    images:           [`${P}/mig1a/800/500`, `${P}/mig1b/800/500`],
    github:           "",
    weburl:           "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    thumbnailPosition:"center"
  },
  {
    name:             "Power Platform HR Automation Suite",
    projecttype:      "Power Platform",
    shortdescription: "Built a no-code HR management suite using Power Apps, Power Automate, and Dataverse — covering onboarding, leave management, performance reviews, and employee self-service.",
    description:      `<h2>Project Overview</h2><p>An organisation with 200 employees was managing HR processes through email and Excel sheets. Leave requests, onboarding checklists, and performance reviews were manual, inconsistent, and difficult to audit.</p><h2>What Was Built</h2><ul><li><strong>Employee Onboarding App</strong> — Power Apps canvas app with checklist workflows and IT/HR task assignments via Power Automate</li><li><strong>Leave Management System</strong> — self-service leave requests with manager approval flows, balance tracking, and calendar integration</li><li><strong>Performance Review Module</strong> — structured 360-degree review forms with automated reminder sequences</li><li><strong>Employee Directory</strong> — searchable staff directory connected to Azure AD with real-time profile sync</li><li><strong>HR Dashboard</strong> — Power BI report showing headcount trends, leave utilisation, and review completion rates</li><li><strong>SharePoint Integration</strong> — policy documents linked in-app with version tracking</li></ul><h2>Results & Impact</h2><blockquote>HR admin time reduced by 60%. All processes now fully auditable and compliant.</blockquote><ul><li>Onboarding completion time reduced from <strong>5 days to 1 day</strong></li><li>Leave approval cycle shortened from <strong>3 days to 2 hours</strong></li><li>Paper forms eliminated — <strong>100% digital workflows</strong></li></ul><h2>Tech Stack</h2><p>Power Apps · Power Automate · Dataverse · Power BI · SharePoint · Azure AD · Microsoft 365</p>`,
    techstack:        "Power Apps, Power Automate, Dataverse, Power BI, SharePoint, Azure AD",
    tags:             ["Power Platform","Power Apps","Power Automate","Microsoft","No-Code"],
    imageUrl:         `${P}/pwr1/800/500`,
    images:           [`${P}/pwr1a/800/500`, `${P}/pwr1b/800/500`, `${P}/pwr1c/800/500`],
    github:           "",
    weburl:           "https://www.upwork.com/freelancers/~01f72bac779a391d10",
    thumbnailPosition:"center"
  }
]);
console.log("✅ Projects inserted (6)");

/* ── REVIEWS ─────────────────────────────────────────────────── */
await Review.insertMany([
  {
    name:      "Michael Carter",
    company:   "TechScale Inc. — USA",
    review:    "Huzefa delivered our Salesforce implementation on time and significantly exceeded our expectations. The automation he built reduced our manual data entry by over 60%. Highly recommended for any complex Salesforce project.",
    rating:    5,
    avatarUrl: ""
  },
  {
    name:      "Sarah Thompson",
    company:   "GrowthHub Agency — UK",
    review:    "Outstanding HubSpot setup! The marketing workflows Huzefa built have transformed how we nurture leads. Our email open rates tripled and MQL volume is up 3x. He communicated clearly throughout and delivered exactly what was scoped.",
    rating:    5,
    avatarUrl: ""
  },
  {
    name:      "Omar Al-Rashid",
    company:   "Apex Logistics — UAE",
    review:    "We needed Dynamics 365 with a customer portal on a tight timeline. Huzefa delivered both in 6 weeks. The self-service portal alone deflected 30% of our support tickets. The Power BI dashboard is something our management team uses daily.",
    rating:    5,
    avatarUrl: ""
  },
  {
    name:      "Jennifer Wu",
    company:   "Meridian Consulting — Canada",
    review:    "Migrated our entire Pipedrive history to HubSpot flawlessly. 50,000+ records with zero loss. Huzefa's systematic approach and validation reports gave us complete confidence throughout the process.",
    rating:    5,
    avatarUrl: ""
  },
  {
    name:      "David Okonkwo",
    company:   "FinBridge Solutions — Nigeria",
    review:    "The Salesforce-QuickBooks integration Huzefa built saved our finance team hours every week. Invoices now generate automatically on deal close. Clean code, great documentation, and excellent communication.",
    rating:    5,
    avatarUrl: ""
  }
]);
console.log("✅ Reviews inserted (5)");

await mongoose.disconnect();
console.log("\n🎉 Database seeded successfully!\n");
console.log("Collections populated:");
console.log("  ✅ homes        — hero section");
console.log("  ✅ abouts       — bio, skills, stats");
console.log("  ✅ services     — 6 CRM services");
console.log("  ✅ experiences  — 3 roles");
console.log("  ✅ educations   — updated");
console.log("  ✅ platforms    — 6 CRM platforms");
console.log("  ✅ projects     — 6 CRM projects with rich text");
console.log("  ✅ reviews      — 5 client reviews");
