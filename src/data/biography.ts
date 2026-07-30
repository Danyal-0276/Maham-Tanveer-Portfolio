export const profile = {
  name: "Maham Tanveer",
  titles: [
    "Educator",
    "Researcher",
    "English Literature Graduate",
    "Literacy Instructor",
    "MSc Project Management Candidate",
  ],
  location: "Newcastle upon Tyne, United Kingdom",
  email: "mahamt024@gmail.com",
  phone: "+44 7778 382842",
  linkedin: "https://www.linkedin.com/in/mahamtanveer24",
  linkedinLabel: "linkedin.com/in/mahamtanveer24",
  address: "87 Castleside Road, Newcastle upon Tyne, NE15 7DR",
  bio: `Maham Tanveer is an educator, researcher, and emerging project leader whose path weaves English literature, literacy instruction, journalism, and community leadership. From the lecture halls of Lahore to postgraduate study in the North East of England, her story is one of purposeful growth—rooted in language, service, and the craft of bringing people and ideas together.`,
  shortBio: `A literature graduate turned literacy instructor and student leader, now advancing her craft through an MSc in Project Management at the University of Sunderland.`,
};

export const navChapters = [
  { id: "welcome", label: "Welcome" },
  { id: "who-i-am", label: "Who I Am" },
  { id: "journey", label: "Journey" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "leadership", label: "Leadership" },
  { id: "certificates", label: "Certificates" },
  { id: "gallery", label: "Gallery" },
  { id: "masters", label: "Master's" },
  { id: "skills", label: "Skills" },
  { id: "places", label: "Places" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

export const timeline = [
  {
    year: "2017",
    title: "Fine Arts foundations",
    detail:
      "Began Intermediate in Fine Arts at Punjab Group of Colleges, Lahore—building creative discipline and visual literacy.",
  },
  {
    year: "2020",
    title: "University begins",
    detail:
      "Started Bachelor of Science in English Language and Literature at the University of Central Punjab.",
  },
  {
    year: "2020",
    title: "Community volunteer",
    detail:
      "Volunteered with Shaukat Khanum Memorial Cancer Hospital—awareness campaigns, fundraising, and outreach.",
  },
  {
    year: "2022",
    title: "Teaching internship",
    detail:
      "Teacher’s Assistant at Nash-o-Numa Montessori and School—delivered English lessons and supported school administration.",
  },
  {
    year: "2023",
    title: "Journalism & research",
    detail:
      "Production Research Intern at Voice News—researching stories, verifying sources, and supporting live broadcast scripts.",
  },
  {
    year: "2023",
    title: "Paws and Claws",
    detail:
      "Co-founded and served as Vice President of the Paws and Claws Animal Welfare Society at UCP.",
  },
  {
    year: "2023–24",
    title: "Classroom leadership",
    detail:
      "Full-time teaching at Allied School, then Permanent Literacy Instructor at Cornerstone School and College.",
  },
  {
    year: "2024",
    title: "Graduation",
    detail:
      "Completed BS English Language and Literature at the University of Central Punjab.",
  },
  {
    year: "2026",
    title: "Master’s begins",
    detail:
      "Began MSc Project Management at the University of Sunderland (January intake, 15-month pathway).",
  },
];

export const education = [
  {
    id: "sunderland",
    institution: "University of Sunderland",
    campus: "Sir Tom Cowie Campus at St Peter’s",
    degree: "MSc Project Management",
    duration: "Jan 2026 – Expected Spring 2027",
    status: "Currently pursuing",
    highlights: [
      "Aligned with PMI and APM professional standards",
      "Focus on leadership, agile delivery, risk & quality, and research dissertation",
      "Open to graduates from any academic discipline",
    ],
    image: "/media/campus/sunderland/sunderland-1.jpg",
  },
  {
    id: "ucp",
    institution: "University of Central Punjab",
    campus: "Lahore, Pakistan",
    degree: "Bachelor of Science — English Language and Literature",
    duration: "Sep 2020 – July 2024",
    status: "Completed",
    highlights: [
      "Major in English language and literature",
      "Active in conferences, societies, and campus leadership",
      "Foundation for teaching, research, and communication practice",
    ],
    image: "/media/campus/ucp/ucp-1.jpg",
  },
  {
    id: "punjab-colleges",
    institution: "Punjab Group of Colleges",
    campus: "Lahore, Pakistan",
    degree: "Intermediate in Fine Arts",
    duration: "Sep 2017 – July 2019",
    status: "Completed",
    highlights: [
      "Creative foundations in fine arts",
      "Visual thinking and aesthetic sensibility",
    ],
    image: "/media/campus/ucp/ucp-2.jpg",
  },
];

export const experience = [
  {
    org: "Cornerstone School and College",
    location: "Lahore",
    role: "Permanent Literacy Instructor",
    dates: "Aug 2024 – Sep 2025",
    image: "/media/portrait/lecture-hall.jpg",
    responsibilities: [
      "Planned and delivered engaging English lessons for elementary students",
      "Designed lesson plans, assessments, and progress reports",
      "Integrated MS Office, Google Classroom, and digital learning tools",
      "Coordinated events, contributed to curriculum development, and mentored new staff",
    ],
    skills: ["Curriculum design", "Classroom leadership", "Digital learning"],
  },
  {
    org: "Allied School — Johar Town Campus",
    location: "Lahore",
    role: "Full-Time Teaching Position",
    dates: "Nov 2023 – Apr 2024",
    image: "/media/aesthetic/atmosphere-1.jpg",
    responsibilities: [
      "Applied differentiated strategies for diverse learning styles",
      "Integrated technology and creative resources to deepen understanding",
      "Strengthened communication, reading, and problem-solving skills",
    ],
    skills: ["Differentiated instruction", "Student engagement"],
  },
  {
    org: "Voice News — Pakistan Ki Awaaz",
    location: "Pakistan",
    role: "Production Research Intern",
    dates: "Aug 2023 – Oct 2023",
    image: "/media/aesthetic/atmosphere-2.jpg",
    responsibilities: [
      "Researched 30+ news stories and social issues for editorial use",
      "Collaborated with a 10-member production team on scripts and source verification",
      "Tracked local and international media trends under newsroom deadlines",
    ],
    skills: ["Research", "Writing", "Newsroom collaboration"],
  },
  {
    org: "Third Culture Coffee House",
    location: "Lahore",
    role: "Sales & Floor Supervisor",
    dates: "Mar 2023 – Aug 2023",
    image: "/media/aesthetic/atmosphere-3.jpg",
    responsibilities: [
      "Supervised front-of-house operations during peak hours",
      "Trained and onboarded three new team members",
      "Supported cash reconciliation, stock, and brand experience",
    ],
    skills: ["Team supervision", "Customer service", "Operations"],
  },
  {
    org: "Nash-o-Numa Montessori and School",
    location: "Lahore",
    role: "Internship — Teacher’s Assistant",
    dates: "Jun 2022 – Oct 2022",
    image: "/media/portrait/portrait-02.jpg",
    responsibilities: [
      "Delivered 10+ English lessons to Grade 1 and Grade 2 students",
      "Shadowed school coordination for scheduling and parent communication",
      "Supported academic and extracurricular activities",
    ],
    skills: ["Early literacy", "Administration support"],
  },
  {
    org: "Jasmin’s Canapes",
    location: "Newcastle upon Tyne",
    role: "Deli Assistant (Front of House)",
    dates: "Jan 2026 – Present",
    image: "/media/portrait/portrait-03.jpg",
    responsibilities: [
      "Delivers welcoming customer service in a fast-paced retail setting",
      "Supports front-of-house flow, till operations, and visual merchandising",
      "Upholds food hygiene, health & safety, and service standards",
    ],
    skills: ["UK workplace experience", "Service excellence"],
  },
  {
    org: "Shaukat Khanum Memorial Cancer Hospital",
    location: "Lahore",
    role: "Volunteer",
    dates: "Jun 2020 – Aug 2020",
    image: "/media/aesthetic/atmosphere-4.jpg",
    responsibilities: [
      "Led four awareness campaigns on healthcare and cancer prevention",
      "Assisted fundraising to support patient treatment",
      "Coordinated logistics with hospital staff and fellow volunteers",
    ],
    skills: ["Campaign organization", "Community outreach"],
  },
];

export const leadership = [
  {
    title: "Co-Founder & Vice President",
    org: "Paws and Claws Animal Welfare Society",
    place: "University of Central Punjab",
    dates: "Aug 2023 – Sep 2024",
    points: [
      "Co-founded a student-led welfare club focused on animal rights and care",
      "Partnered with local shelters for awareness drives and rescue initiatives",
      "Organized fundraising, adoption campaigns, and workshops engaging 200+ students and staff",
      "Delegated responsibilities and oversaw effective execution of club initiatives",
    ],
  },
  {
    title: "Event Organizer — Team Member",
    org: "1st International Conference on Language and Literature",
    place: "University of Central Punjab",
    dates: "June 1–2, 2023",
    points: [
      "Supported a two-day international conference for academics and students",
      "Assisted keynote sessions, panels, workshops, and paper presentations",
      "Coordinated with stage and discipline teams for smooth logistics",
    ],
  },
  {
    title: "Management Team",
    org: "International Conference on Language, Literature, and Linguistics",
    place: "Faculty of Languages and Literature, UCP",
    dates: "June 6–7, 2024",
    points: [
      "Served on the management team for Erasure, Resistance, and Innovation",
      "Supported conference operations alongside faculty organizers",
      "Strengthened event coordination, communication, and academic stewardship",
    ],
  },
];

export const certificates = [
  {
    title: "LUMS — Digital Journalism",
    issuer: "Lahore University of Management Sciences",
    date: "Jul – Aug 2023",
    image: "/media/certificates/certificate-extra-01.jpg",
    note: "Course certification in digital journalism practice",
  },
  {
    title: "Certificate of Appreciation — Great Volunteer",
    issuer: "Nashtay Walay Street Food Gala · UCP",
    date: "16 Apr 2022",
    image: "/media/certificates/nashtay-volunteer.jpg",
  },
  {
    title: "Certificate of Participation — Sketch Week",
    issuer: "Takhleeqkar Fine Arts Society · UCP",
    date: "17–19 May 2022",
    image: "/media/certificates/sketch-week.jpg",
  },
  {
    title: "Certificate of Excellence — Calligraphy Workshop",
    issuer: "Takhleeqkar · UCP",
    date: "14 Jun 2022",
    image: "/media/certificates/calligraphy-workshop.jpg",
  },
  {
    title: "Certificate of Appreciation — Farewell Decor",
    issuer: "Alumni Relations Office · Fine Art Fraternity UCP",
    date: "2020",
    image: "/media/certificates/farewell-2020.jpg",
  },
  {
    title: "1st National Conference on Linguistics and Literature",
    issuer: "Faculty of Languages and Literature · UCP",
    date: "Conference participation",
    image: "/media/certificates/linguistics-conference.jpg",
  },
  {
    title: "Conference Management Team",
    issuer: "Erasure, Resistance, and Innovation · UCP",
    date: "6–7 Jun 2024",
    image: "/media/certificates/conference-management-2024.jpg",
  },
  {
    title: "Conference Participation",
    issuer: "International Conference on Language, Literature, and Linguistics",
    date: "6–7 Jun 2024",
    image: "/media/certificates/conference-participation-2024.jpg",
  },
];

export const gallery = [
  {
    src: "/media/hero/graduation.jpg",
    caption: "This day marked the beginning of my professional journey.",
    alt: "Graduation portrait of Maham Tanveer",
  },
  {
    src: "/media/portrait/graduation-02.jpg",
    caption: "Academic milestone — University of Central Punjab.",
    alt: "Graduation moment",
  },
  {
    src: "/media/portrait/graduation-03.jpg",
    caption: "Celebrating literature, learning, and new chapters.",
    alt: "Graduation celebration",
  },
  {
    src: "/media/portrait/lecture-hall.jpg",
    caption: "Listening, learning, and growing in academic spaces.",
    alt: "Maham in a lecture hall",
  },
  {
    src: "/media/campus/ucp/ucp-1.jpg",
    caption: "University of Central Punjab — where the story deepened.",
    alt: "UCP campus",
  },
  {
    src: "/media/campus/ucp/ucp-3.jpg",
    caption: "Campus life in Lahore.",
    alt: "UCP campus grounds",
  },
  {
    src: "/media/campus/sunderland/sunderland-1.jpg",
    caption: "University of Sunderland — the Master’s chapter.",
    alt: "Sunderland campus",
  },
  {
    src: "/media/campus/sunderland/sunderland-2.jpg",
    caption: "Sir Tom Cowie Campus at St Peter’s.",
    alt: "Sunderland campus building",
  },
  {
    src: "/media/portrait/portrait-04.jpg",
    caption: "Moments that shaped confidence and presence.",
    alt: "Professional portrait",
  },
  {
    src: "/media/portrait/portrait-05.jpg",
    caption: "Teaching, service, and the quiet work of growth.",
    alt: "Portrait of Maham",
  },
  {
    src: "/media/aesthetic/atmosphere-1.jpg",
    caption: "Atmosphere and place — part of the biography.",
    alt: "Atmospheric photograph",
  },
  {
    src: "/media/aesthetic/atmosphere-5.jpg",
    caption: "Light, texture, and the spaces between chapters.",
    alt: "Aesthetic photograph",
  },
];

export const masters = {
  title: "MSc Project Management",
  institution: "University of Sunderland",
  campus: "Sir Tom Cowie Campus at St Peter’s",
  started: "January 2026",
  expected: "Spring 2027",
  progress: 50,
  pathway: "15-month January intake",
  blurb:
    "Currently pursuing an MSc designed for graduates of any discipline, aligned with the Project Management Institute (PMI) and the Association for Project Management (APM)—bridging literary insight, teaching leadership, and professional project practice.",
  focus: [
    "Project fundamentals & delivery methods (including agile)",
    "International project management",
    "Leadership, people, risk & quality",
    "Organisations, commercial issues & dissertation research",
  ],
  image: "/media/campus/sunderland/sunderland-3.jpg",
};

export const skills = [
  "Leadership",
  "Communication",
  "Teaching",
  "Research",
  "Content Creation",
  "Project Planning",
  "Public Speaking",
  "Digital Journalism",
  "Google Classroom",
  "Microsoft Office",
  "Event Management",
  "Stakeholder Engagement",
  "Project Management",
  "Risk & Quality",
  "Campaign Strategy",
  "Team Mentoring",
];

export const places = [
  {
    id: "lahore",
    name: "Lahore",
    detail: "University of Central Punjab · Teaching · Leadership · Home roots",
    x: 72,
    y: 58,
  },
  {
    id: "sunderland",
    name: "Sunderland",
    detail: "Sir Tom Cowie Campus · MSc Project Management",
    x: 28,
    y: 28,
  },
  {
    id: "newcastle",
    name: "Newcastle upon Tyne",
    detail: "Current home base in the North East of England",
    x: 26,
    y: 34,
  },
];

export const testimonials = [
  {
    role: "Principal",
    placeholder: true,
    quote:
      "A testimonial from a school principal will appear here—speaking to Maham’s classroom presence and literacy leadership.",
  },
  {
    role: "Professor",
    placeholder: true,
    quote:
      "A faculty reflection will appear here—on her academic curiosity, conference contribution, and scholarly growth.",
  },
  {
    role: "Supervisor",
    placeholder: true,
    quote:
      "A supervisor’s note will appear here—on reliability, research craft, and collaborative professionalism.",
  },
];
