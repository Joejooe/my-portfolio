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

export const skills = ['Vue', 'Tailwindcss', 'JavaScript', 'HTML & CSS', 'React', 'REST APIs', 'Responsive design']
