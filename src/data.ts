export interface Project {
  title: string
  summary: string
  tags: string[]
  live: { label: string; href: string }
  repo: { label: string; href: string }
}

export const projects: Project[] = [
  {
    title: 'Movie Database Website',
    summary:
      'A React web app for searching movies, viewing details and marking favorites. It pulls real-time data from an external movie API, showing off REST API work and component-based architecture.',
    tags: ['React', 'REST API', 'JavaScript'],
    live: { label: 'Live demo', href: 'https://joejooe.github.io/movie-web-project' },
    repo: { label: 'GitHub (private API key)', href: 'https://github.com/Joejooe/movie-web-project' },
  },
  {
    title: 'Mini Desktop Simulation',
    summary:
      'A desktop environment built with Java and JavaFX for a university project. It ships Chrume (a mock browser with preset sites like RUtube.net and RUtify.net), a Notepad, a file manager and a mini photo editor — exploring UI design, state management and file handling.',
    tags: ['Java', 'JavaFX', 'UI Design'],
    live: {
      label: 'View project',
      href: 'https://drive.google.com/file/d/1jaL5_onnQe5S3beRoZ8GEYBGevuU0rsQ/view?usp=sharing',
    },
    repo: { label: 'GitHub', href: 'https://github.com/Joejooe/ApplicationProgram' },
  },
  {
    title: 'Short Film Promotion Website',
    summary:
      "A static, responsive site built with only HTML and CSS to promote a university short film. The focus is visual design and layout: synopsis, poster and credits in a clean format.",
    tags: ['HTML', 'CSS', 'Responsive'],
    live: { label: 'Live demo', href: 'https://joejooe.github.io/WebsitePromosi' },
    repo: { label: 'GitHub', href: 'https://github.com/Joejooe/WebsitePromosi' },
  },
]

export const links = {
  whatsapp: 'https://wa.me/628127445656',
  github: 'https://github.com/Joejooe',
  linkedin: 'https://www.linkedin.com/in/joe-abednego-273818383/',
}

export const internship = {
  role: 'Front-End Developer Intern',
  company: 'Superspring',
  department: 'Products & Solutions Department',
  duration: '1-Year Internship',
  summary:
    'Contributed to the development, maintenance, and improvement of various company websites and web applications. Worked primarily with Vue.js, JavaScript, TypeScript, and Tailwind CSS while collaborating with backend developers on API integration and application functionality.',
  highlights: [
    {
      title: 'Driver App (Progressive Web Application)',
      points: [
        'Developed a logistics-focused PWA for a collaborative project between two companies.',
        'Implemented order management and map-based delivery route visualization.',
        'Built features for delivery photo documentation and operational expense reporting.',
        'Developed truck maintenance and routine inspection tracking features.',
      ],
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
  { label: 'Frameworks', items: ['Vue.js', 'Nuxt.js'] },
  { label: 'Languages', items: ['JavaScript', 'TypeScript'] },
  { label: 'Styling', items: ['Tailwind CSS'] },
  { label: 'Integration', items: ['REST API Integration', 'Frontend-Backend Collaboration'] },
  { label: 'Development', items: ['Progressive Web Apps (PWA)', 'Responsive Web Design'] },
  { label: 'Tools', items: ['Git', 'Bun', 'Vite'] },
]
