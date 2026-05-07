import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Kimberly Garmoe',
  description: 'Information architect and technical writer focused on knowledge systems for AI.',
}

const experience = [
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Senior Technical Writer',
    period: 'October 2022 – January 2026',
    location: 'Seattle, WA',
    description: [
      'Documented cryptographic and identity infrastructure used in regulated and high-assurance environments, with a focus on key management, signing, encryption, and trust boundaries.',
      'Began in the Protocols, Libraries & Algorithms group, documenting cryptographic libraries, Cryptographic Computing, and FIPS-related material.',
      'Later covered AWS Secrets Manager, Key Management Service, Payment Cryptography, CloudHSM, Certificate Manager, and Private Certificate Authority.',
      'Led taxonomy and information architecture work for cryptography and technical content teams, designing durable structures for complex, evolving systems.',
      'Built AI-assisted editing tools to enforce clarity, correctness, and consistency at scale.',
    ],
  },
  {
    company: 'Tecton',
    role: 'Senior Technical Writer',
    period: 'April 2022 – July 2022',
    location: 'United States',
    description: [
      'Individual contributor for machine learning feature store documentation.',
      'Collaborated with UX to create short, readable UI content.',
      'Improved documentation design, architecture, and delivery.',
    ],
  },
  {
    company: 'Chef Software',
    role: 'Manager, Technical Writing → Sr. Technical Writer',
    period: 'December 2016 – March 2022',
    location: 'Seattle, WA',
    description: [
      'Led the consolidation of product documentation from several microsites into a single website while maintaining source files in separate GitHub repositories.',
      'Managed a global team in a rapidly changing environment.',
      'The consolidated site featured federated search and automation for reference material — ensuring content stayed current, correct, and complete.',
    ],
  },
  {
    company: 'The Seattle Public Library',
    role: 'Reference Librarian',
    period: 'May 2015 – February 2016',
    location: 'Seattle, WA',
    description: [
      "Identified and interpreted user needs; provided reference, readers' advisory, computer, database, and referral services.",
    ],
  },
  {
    company: 'UCLA',
    role: 'Collections Development Assistant & Instructor',
    period: '1998 – 2010',
    location: 'Los Angeles, CA',
    description: [
      'Applied subject matter expertise and analysis of metadata and circulation data to large-scale purchasing decisions at a research-one academic library.',
      'Developed and taught courses in history and the humanities, including From Gutenberg to Google: Media Revolutions in Comparative Perspectives.',
      'Conducted research, grant writing, and translation work in English, German, and Dutch.',
    ],
  },
]

const education = [
  { school: 'University of British Columbia', degree: 'MLIS — Library & Information Science', years: '2012–2014' },
  { school: 'University of California, Los Angeles', degree: 'MA, CPhil (ABD) — European History', years: '' },
  { school: 'Coding Dojo', degree: 'Full Stack Developer', years: '' },
  { school: 'Seattle University', degree: 'BA — History', years: '' },
]

const skills = [
  'Knowledge Management', 'Taxonomy & Ontology', 'Information Architecture',
  'Technical Writing', 'BigTable', 'Apache Kafka', 'Python', 'JavaScript', 'Ruby',
]
const languages = ['English (native)', 'German (professional working)', 'Dutch (reading)']
const certifications = [
  'Advanced Programming in Python',
  "Professional Librarian's Life Certificate",
  'Certificate in Python Programming',
]

export default function AboutPage() {
  return (
    <main className="px-8 py-16 max-w-5xl mx-auto">

      {/* Narrative summary */}
      <section className="mb-20">
        <div className="border-t-[3px] border-accent pt-6 mb-8">
          <p className="font-display text-label uppercase text-text-muted mb-4">About</p>
          <h1 className="font-display text-heading text-text-primary">Kimberly Garmoe</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div>
            <p className="font-display text-label uppercase text-text-muted">Seattle, WA</p>
            <p className="font-display text-label uppercase text-text-muted mt-2">
              <a href="mailto:kagarmoe@gmail.com" className="hover:text-accent transition-colors">
                Contact
              </a>
            </p>
            <p className="font-display text-label uppercase text-text-muted mt-2">
              <a href="https://linkedin.com/in/kimberlygarmoe" className="hover:text-accent transition-colors">
                LinkedIn ↗
              </a>
            </p>
            <p className="font-display text-label uppercase text-text-muted mt-2">
              <a href="https://github.com/kagarmoe" className="hover:text-accent transition-colors">
                GitHub ↗
              </a>
            </p>
          </div>
          <div className="font-body text-body text-text-muted space-y-4">
            <p>
              I&apos;m an information architect expanding into knowledge systems for AI, with a foundation
              in taxonomy and structured content, refreshed by my MLIS background, and current work
              focused on ontology, retrieval, graphs, and knowledge-centered AI systems.
            </p>
            <p>
              My background spans complex technical domains, including security, cryptography, payments,
              and identity systems. I&apos;m particularly strong in information architecture, taxonomy, and
              content governance for environments where clarity, correctness, and long-term
              maintainability matter.
            </p>
            <p>
              I&apos;m interested in the structures AI systems need in order to retrieve, reason over, and
              use knowledge well. This next phase of my work connects information architecture with
              ontology, retrieval, graphs, and RAG. I&apos;m motivated by work that treats documentation
              and knowledge structures as infrastructure: precise, resilient, and designed to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Experience</p>
        </div>
        <div className="space-y-16">
          {experience.map(({ company, role, period, location, description }) => (
            <div key={company} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
              <div>
                <p className="font-display text-label uppercase text-text-muted leading-relaxed">
                  {period}
                </p>
                <p className="font-display text-label text-text-muted mt-1 normal-case tracking-normal">
                  {location}
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl text-text-primary mb-1">{company}</h2>
                <p className="font-display text-label uppercase text-text-muted mb-4">{role}</p>
                <ul className="font-body text-body text-text-muted space-y-2 list-none p-0">
                  {description.map((item, i) => (
                    <li key={i} className="before:content-['—'] before:mr-2 before:text-text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Education</p>
        </div>
        <div className="space-y-8">
          {education.map(({ school, degree, years }) => (
            <div key={school} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
              <div>
                {years && (
                  <p className="font-display text-label uppercase text-text-muted">{years}</p>
                )}
              </div>
              <div>
                <h3 className="font-display text-lg text-text-primary mb-1">{school}</h3>
                <p className="font-display text-label text-text-muted normal-case tracking-normal">{degree}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Languages */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Skills & Languages</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div>
            <p className="font-display text-label uppercase text-text-muted">Technical</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <span
                key={skill}
                className="font-display text-label uppercase text-text-muted border border-surface px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16 mt-8">
          <div>
            <p className="font-display text-label uppercase text-text-muted">Languages</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map(lang => (
              <span key={lang} className="font-body text-body text-text-muted">{lang}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-20">
        <div className="border-t border-surface pt-8 mb-12">
          <p className="font-display text-label uppercase text-text-muted">Certifications</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16">
          <div />
          <ul className="font-body text-body text-text-muted space-y-2 list-none p-0">
            {certifications.map(cert => (
              <li key={cert} className="before:content-['—'] before:mr-2 before:text-text-muted">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  )
}
