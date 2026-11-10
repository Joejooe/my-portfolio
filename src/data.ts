import gpsShot from './assets/images/work/gps.png'
import dekkaLiveShot from './assets/images/work/dekkalive.png'
import bioShot from './assets/images/work/bio.png'

export interface Project {
  title: string
  summary: string
  tags: string[]
  context?: string
  live: { label: string; href: string }
  repo?: { label: string; href: string }
  /** screenshot of the live site */
  image?: string
  /** browser window for desktop sites, phone for mobile-first pages */
  frame?: 'browser' | 'phone'
  /** short URL shown in the frame's address bar */
  url?: string
}

export const projects: Project[] = [
  {
    title: 'Customer Gathering Registration',
    summary:
      'Event registration website for GPS.id corporate gatherings and business events, paired with an admin dashboard for QR code ticket scanning, attendee validation and attendance tracking.',
    tags: ['Vue.js', 'Tailwind CSS', 'REST API'],
    context: 'Built at Superspring',
    live: { label: 'Visit site', href: 'https://gps.id/custgathering/' },
    image: gpsShot,
    frame: 'browser',
    url: 'gps.id/custgathering',
  },
  {
    title: 'Dekka Live Product Showcase',
    summary:
      'A new product showcase section built for the Dekka Live product launch, presenting the product and its features on the Dekka website.',
    tags: ['React', 'Tailwind CSS', 'Responsive'],
    context: 'Built at Superspring',
    live: { label: 'Visit site', href: 'https://dekka.id/dekkalive' },
    image: dekkaLiveShot,
    frame: 'browser',
    url: 'dekka.id/dekkalive',
  },
  {
    title: 'Dekka Bio Link Page',
    summary:
      "Fixed and improved Dekka's Linktree-style landing page, the hub that routes visitors from social media to the company's products and channels.",
    tags: ['HTML', 'JavaScript', 'Tailwind CSS'],
    context: 'Built at Superspring',
    live: { label: 'Visit site', href: 'https://www.dekka.id/bio/' },
    image: bioShot,
    frame: 'phone',
    url: 'dekka.id/bio',
  },
  // Personal projects (hidden for now)
  // {
  //   title: 'Movie Database Website',
  //   summary:
  //     'A React web app for searching movies, viewing details and marking favorites. It pulls real-time data from an external movie API, showing off REST API work and component-based architecture.',
  //   tags: ['React', 'REST API', 'JavaScript'],
  //   live: { label: 'Live demo', href: 'https://joejooe.github.io/movie-web-project' },
  //   repo: { label: 'GitHub (private API key)', href: 'https://github.com/Joejooe/movie-web-project' },
  // },
  // {
  //   title: 'Mini Desktop Simulation',
  //   summary:
  //     'A desktop environment built with Java and JavaFX for a university project. It ships Chrume (a mock browser with preset sites like RUtube.net and RUtify.net), a Notepad, a file manager and a mini photo editor — exploring UI design, state management and file handling.',
  //   tags: ['Java', 'JavaFX', 'UI Design'],
  //   live: {
  //     label: 'View project',
  //     href: 'https://drive.google.com/file/d/1jaL5_onnQe5S3beRoZ8GEYBGevuU0rsQ/view?usp=sharing',
  //   },
  //   repo: { label: 'GitHub', href: 'https://github.com/Joejooe/ApplicationProgram' },
  // },
  // {
  //   title: 'Short Film Promotion Website',
  //   summary:
  //     "A static, responsive site built with only HTML and CSS to promote a university short film. The focus is visual design and layout: synopsis, poster and credits in a clean format.",
  //   tags: ['HTML', 'CSS', 'Responsive'],
  //   live: { label: 'Live demo', href: 'https://joejooe.github.io/WebsitePromosi' },
  //   repo: { label: 'GitHub', href: 'https://github.com/Joejooe/WebsitePromosi' },
  // },
]

export const links = {
  whatsapp: 'https://wa.me/628127445656',
  github: 'https://github.com/Joejooe',
  linkedin: 'https://www.linkedin.com/in/joe-abednego-273818383/',
}

export const contacts = [
  { label: 'WhatsApp', handle: '+62 812 7445 656', href: links.whatsapp, icon: 'fa-whatsapp' },
  { label: 'GitHub', handle: 'github.com/Joejooe', href: links.github, icon: 'fa-github' },
  { label: 'LinkedIn', handle: 'in/joe-abednego', href: links.linkedin, icon: 'fa-linkedin' },
]

export const internship = {
  role: 'Front-End Developer Intern',
  company: 'Superspring',
  department: 'Products & Solutions Department',
  duration: '1-Year Internship',
  summary:
    'Contributed to the development, maintenance, and improvement of various company websites and web applications. Worked primarily with Vue.js, React, JavaScript, TypeScript, and Tailwind CSS while collaborating with backend developers on API integration and application functionality.',
  highlights: [
    {
      title: 'Driver App (Progressive Web Application)',
      points: [
        'Developed a logistics-focused PWA for a collaborative project between two companies.',
        'Implemented order management and map-based delivery route visualization.',
        'Built features for delivery photo documentation and operational expense reporting.',
        'Developed truck maintenance and routine inspection tracking features.',
      ],
      note: 'I built a demo version of this driver app, check out the source code on GitHub.',
      link: { label: 'View on GitHub', href: 'https://github.com/Joejooe/demo-driver-apps' },
    },
    {
      title: 'Event Management System',
      points: [
        'Developed an event registration website for corporate gatherings and business events.',
        'Built an accompanying admin dashboard for QR code ticket scanning and attendee validation.',
        'Implemented attendance tracking to monitor registered attendees and event participation.',
      ],
    },
    {
      title: 'Company Website Improvements',
      points: [
        "Revamped the existing Top-Up section of the company's website.",
        'Developed a new product showcase section for a product launch.',
        "Fixed and improved the company's Linktree-style landing page.",
      ],
    },
  ],
}

export const skillGroups = [
  { label: 'Frameworks', items: ['Vue.js', 'React', 'Nuxt.js'] },
  { label: 'Languages', items: ['JavaScript', 'TypeScript'] },
  { label: 'Styling', items: ['Tailwind CSS'] },
  { label: 'Integration', items: ['REST API Integration', 'Frontend-Backend Collaboration'] },
  { label: 'Development', items: ['Progressive Web Apps (PWA)', 'Responsive Web Design'] },
  { label: 'Tools', items: ['Git', 'Bun', 'Vite'] },
]
