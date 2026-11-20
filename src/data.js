// All site content lives here, so wording changes don't touch the components.
import wexxaroDocs from './assets/projects/wexxaro-docs.jpg';
import detector from './assets/projects/detector.jpg';
import loop from './assets/projects/loop.jpg';
import cornerShop from './assets/projects/corner-shop.jpg';
import taskflow from './assets/projects/taskflow.jpg';
import kagglePython from './assets/certs/kaggle-python.jpg';
import kagglePythonThumb from './assets/certs/kaggle-python-thumb.jpg';
import sololearnGenai from './assets/certs/sololearn-genai.jpeg';
import sololearnMl from './assets/certs/sololearn-ml.jpeg';
import sololearnLlms from './assets/certs/sololearn-llms.jpeg';

export const EMAIL = 'danielugbomaht@gmail.com';
export const GITHUB = 'https://github.com/Ugbomah-d';

export const nav = [
  { href: '#quocreo', label: 'Quocreo' },
  { href: '#work', label: 'Projects' },
  { href: '#path', label: 'Experience' },
  { href: '#certs', label: 'Certificates' },
];

export const hero = {
  role: 'Software Engineer, Backend and Machine Learning',
  first: 'Daniel Timinepre',
  last: 'Ugbomah',
  intro:
    "I build backends and put trained models behind clean APIs. At Quocreo I've shipped features across Wexxaro, the company's workplace suite, and Prospeaker, an AI speaking coach.",
};

export const facts = [
  { label: 'Based in', value: 'Abuja, Nigeria' },
  { label: 'Education', value: 'B.Sc. Software Engineering, Babcock University' },
  { label: 'Availability', value: 'Open to NYSC placement and relocation' },
];

export const quocreo = {
  role: 'Software engineering intern, May 2026 to now',
  lede:
    'Quocreo is the software company behind Wexxaro. I joined in May on Prospeaker, a speaking-practice app, then moved onto Wexxaro, first getting it ready for launch and then building features in its apps.',
  facts: [
    { label: 'Work items delivered', value: '179' },
    { label: 'Commits to Wexxaro', value: '380+' },
    { label: 'Products worked on', value: 'Wexxaro, Prospeaker, data tools' },
  ],
  wexxaro: {
    lede:
      'A workplace suite a company can run on its own servers: mail, documents, meetings, files, project tracking and an AI agent behind one sign-in.',
    role: 'August 2026 to now. The top contributor to Drive, with large contributions to Docs and Platform.',
    shot: {
      src: wexxaroDocs,
      alt: 'The Wexxaro Docs desktop app home screen, with buttons for a new document, sheet, deck or Markdown file and a row of templates.',
      caption: 'Wexxaro Docs, the desktop office app',
    },
    suite: [
      { name: 'Drive', text: 'Resumable uploads up to 5 GiB that survive a dropped connection or a reload, with time-remaining estimates. Folder sharing where editors can add and move files inside a share. Shares that pause while an item is in trash and come back on restore. Switching between accounts.' },
      { name: 'Docs', text: 'Read-only document, spreadsheet and slide viewers that other apps can embed, which accept files only from approved pages. Hardening for the desktop app: each tab reaches only the files it was given, and AI API keys never leave the main process.' },
      { name: 'Platform', text: "Multipart object storage, with each upload verified before it's stored. Permissions that flow down from parent folders. The suite's own video and audio player. A redesign of the admin console, including light and dark modes." },
      { name: 'Flow, Launch Readiness', text: 'Tested the project tracker feature by feature before launch. I logged and fixed bugs in mobile layouts, invitations, account verification and file downloads, and shipped the first week of fixes to staging.' },
      { name: 'Mail and Assist', text: 'A reworked mail interface with a new light and dark palette. In the AI agent, formatted replies and one-tap follow-up suggestions.' },
    ],
    stack: 'Go, TypeScript, React, Electron, Playwright',
    live: [
      { label: 'Drive', href: 'https://drive.wexxaro.com' },
      { label: 'Docs', href: 'https://docs.wexxaro.com' },
      { label: 'Flow', href: 'https://flow.wexxaro.com' },
      { label: 'Meet', href: 'https://meet.wexxaro.com' },
      { label: 'Assist', href: 'https://assist.wexxaro.com' },
      { label: 'Admin console', href: 'https://platform.wexxaro.com' },
    ],
  },
  stops: [
    {
      title: 'Prospeaker',
      intro: 'An app that builds confidence in everyday speaking. I worked across the whole practice loop:',
      ticks: [
        'Recording with a live volume and pace meter, playback and re-recording.',
        'AI analysis: transcription, then feedback on clarity, confidence, filler words, repetition, vocabulary and topic relevance.',
        'A learning path of 25+ exercise categories, from job interviews to tongue twisters, each in six rounds.',
        'Streaks, badges, weekly and global leaderboards, 1v1 speaking battles, and a daily challenge with a fresh prompt.',
        'Speaker profiles, follows, likes and @mentions, plus streak reminders and weekly progress emails.',
      ],
      when: 'May to July 2026',
      what: 'AI speaking coach',
    },
    {
      title: 'Data and Analytics',
      intro: "Groundwork for the company's data products:",
      ticks: [
        "A documented, rate-limited scraper for power-station data that respects each site's robots.txt and terms.",
        'A geocoded dataset with confidence flags, exported as GeoJSON for a mapping product.',
        'SQL queries mapped to product features, plus statistics and hypothesis-testing notebooks.',
        'An anomaly detection function, and a written trace of how data moves through the backend.',
      ],
      when: 'June to July 2026',
      what: 'Analytics track',
    },
  ],
};

export const projects = [
  {
    title: 'Detector',
    sub: 'Rice leaf disease detection',
    body: [
      'Upload a photo of a rice leaf and get a diagnosis: bacterial blight, blast, brown spot or tungro. A ResNet18 network pulls features from the image and a trained SVM makes the call.',
      'I built the Flask API behind it: eight documented endpoints for sign-in, prediction, scan history and account deletion. The model loads once at startup so each scan stays fast. A teammate built the Next.js front end against my API docs.',
    ],
    stack: 'Python, Flask, PyTorch, scikit-learn, SQLAlchemy, JWT',
    links: [{ label: 'Code on GitHub', href: 'https://github.com/Ugbomah-d/Rice-leaf-detection' }],
    shot: { src: detector, alt: "Detector's home screen with sample scans: totals for scans and high-severity results, and a latest-activity list of Blast, Bacterial Blight and Brown Spot detections with confidence scores." },
  },
  {
    title: 'Loop',
    sub: 'Feedback and messaging platform',
    body: [
      'A place for teams to trade messages and review notes, with feedback shown apart from ordinary chat. Messages arrive in real time over Socket.IO.',
      'The Flask back end handles sign-up and sign-in with Flask-Login, hashes passwords with Werkzeug, protects forms with CSRF tokens, and stores users and feedback in MongoDB.',
    ],
    stack: 'Python, Flask, Flask-Login, Socket.IO, MongoDB, JavaScript',
    links: [{ label: 'Code on GitHub', href: 'https://github.com/Ugbomah-d/Feedback-Platform' }],
    shot: { src: loop, alt: "Loop's messaging dashboard: a conversation list on the left and a chat with feedback-tagged messages on the right." },
  },
  {
    title: 'Corner Shop',
    sub: 'Online shop with checkout',
    body: [
      'A small store where you sign in with Google, fill a cart and pay on delivery. The server checks every price again before an order is saved, and a confirmation email goes out through Mailgun.',
      'Products and orders live in Supabase Postgres, with row-level security so each person sees only their own orders.',
    ],
    stack: 'Next.js 15, TypeScript, Supabase, Google OAuth, Mailgun',
    links: [
      { label: 'Open the shop', href: 'https://corner-shop-ugbomah.vercel.app' },
      { label: 'Code on GitHub', href: 'https://github.com/Ugbomah-d/corner-shop' },
    ],
    shot: { src: cornerShop, alt: "Corner Shop's storefront: a dark banner reading Everyday goods, delivered to your door, above four product cards priced in naira." },
  },
  {
    title: 'TaskFlow',
    sub: 'Personal productivity app',
    body: [
      'A task manager you can install on your phone. Capture ideas and promote them to tasks, then get reminders by push notification or email, plus a daily digest. A scheduled job on the server decides when each reminder is due.',
      'It also has its own MCP server, so Claude can list, create and update your tasks and ideas as a connector.',
    ],
    stack: 'React, TypeScript, TanStack Start, Supabase, FastAPI, Web Push, Resend, MCP',
    links: [],
    shot: { src: taskflow, alt: "TaskFlow's dashboard with sample tasks: counts for overdue, today and upcoming, then tasks with due times, tags and priority badges." },
  },
];

export const skills = [
  { label: 'Languages', value: 'Python, JavaScript, TypeScript, Go, SQL, HTML, CSS' },
  { label: 'Backend', value: 'Flask, REST APIs, JWT and OAuth sign-in, Socket.IO, SQLAlchemy' },
  { label: 'Data', value: 'PostgreSQL (Supabase), MongoDB, MySQL, SQLite' },
  { label: 'Front end', value: 'React, Next.js, Electron' },
  { label: 'Machine learning', value: 'PyTorch, scikit-learn, pandas, NumPy' },
  { label: 'Tools', value: 'Git, GitHub, Postman, Linux, VS Code' },
];

export const experience = [
  { when: '2022', title: 'Started at Babcock University', text: 'B.Sc. Software Engineering. Data structures, databases, networks, web development and security fundamentals.' },
  { when: '2023', title: 'Began Building Independently', text: 'Personal projects in backend development, authentication and database design. Took part in Hacktoberfest.' },
  { when: 'Mar 2026', title: 'Beyond the Rails Hackathon', text: 'Interswitch Developer Community and Enyata. Four days building across fintech, health and agriculture, with demo day in April.' },
  { when: 'Apr 2026', title: 'Software Engineering Intern, Babcock University Press', text: "Reviewed the press's web presence against international publishing standards, ran a stakeholder questionnaire, and wrote a three-phase plan to close the gaps." },
  { when: 'May 2026', title: 'Joined Quocreo as a Software Engineering Intern', text: "Built Prospeaker's recording, AI feedback and gamification features, then did data and analytics work for the company's monitoring products." },
  { when: 'Aug 2026', title: 'Moved Onto Wexxaro', text: 'Tested Flow feature by feature before launch, and fixed what I found.' },
  { when: 'Sep 2026', title: 'HNG15 Internship', text: 'Shipped Corner Shop, a store with Google sign-in and email receipts.' },
  { when: 'Now', title: 'Back on the Quocreo Team, Working on Wexxaro', text: 'Building features across the suite: resumable uploads and folder sharing in Drive, embeddable document viewers and desktop security in Docs, plus work in Platform and Mail.', now: true },
];

export const certificates = [
  { title: 'Python', issuer: 'Kaggle, February 2026', full: kagglePython, thumb: kagglePythonThumb, width: 600, height: 370, viewerTitle: 'Python, Kaggle' },
  { title: 'Generative AI in Practice', issuer: 'Sololearn, November 2025', full: sololearnGenai, thumb: sololearnGenai, width: 877, height: 619, viewerTitle: 'Generative AI in Practice, Sololearn' },
  { title: 'Machine Learning for Beginners', issuer: 'Sololearn, November 2025', full: sololearnMl, thumb: sololearnMl, width: 877, height: 619, viewerTitle: 'Machine Learning for Beginners, Sololearn' },
  { title: 'Introduction to LLMs', issuer: 'Sololearn, November 2025', full: sololearnLlms, thumb: sololearnLlms, width: 877, height: 619, viewerTitle: 'Introduction to LLMs, Sololearn' },
];

export const contact = {
  text: "I'm looking for an NYSC placement and engineering work where I can ship backend and ML systems. I'm happy to relocate.",
};
