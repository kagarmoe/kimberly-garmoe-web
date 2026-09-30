import type { Metadata } from 'next'
import { Page, PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'About',
  description: 'Turning messy technical information into knowledge people and AI systems can actually use.',
}

const intro = [
  "I'm interested in a deceptively difficult problem: how do we turn messy technical information into knowledge that people and AI systems can actually use?",
  'I spent much of my career doing this for humans. At AWS and Chef, I worked inside complex infrastructure environments, including cryptography, identity, security, infrastructure automation, APIs, and developer tooling, figuring out how systems actually worked and turning that understanding into usable technical knowledge.',
  "Now I'm applying the same problem-solving approach to AI systems: knowledge representation, retrieval and RAG, knowledge graphs, ontology, evaluation, and agentic workflows.",
  "My recent work includes building data pipelines in Spark and Databricks; experimenting with small local LLMs and retrieval systems; and developing projects around extracting structured knowledge from software and enterprise information environments. I'm particularly interested in the layer between raw information and an AI application: how knowledge is derived, represented, retrieved, evaluated, and kept trustworthy enough to use.",
  "I bring an unusual combination of technical writing, library science, software and information work, and years of experience collaborating directly with engineers on difficult systems. I'm increasingly interested in customer-facing technical roles where I can understand a customer's environment, identify the real problem, and help them make complex technology work in practice. I like the space between product, engineering, and the people actually trying to use what we build.",
]

const interests = [
  'Agentic AI', 'AI solutions', 'Knowledge systems', 'RAG & retrieval',
  'Knowledge graphs', 'Ontology', 'Evaluation', 'Developer infrastructure',
]

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
      'The consolidated site featured federated search and automation for reference material, ensuring content stayed current, correct, and complete.',
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
  'Technical Writing', 'Spark', 'Databricks', 'BigTable', 'Apache Kafka', 'Python', 'JavaScript', 'Ruby',
]
const languages = ['English (native)', 'German (professional working)', 'Dutch (reading)']
const certifications = [
  'Advanced Programming in Python',
  "Professional Librarian's Life Certificate",
  'Certificate in Python Programming',
]

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-20">
      <div className="border-t border-line pt-6 mb-10">
        <p className="label text-ink-muted">{label}</p>
      </div>
      {children}
    </section>
  )
}

const row = 'grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16'

export default function AboutPage() {
  return (
    <Page>
        <PageHeader eyebrow="About" title="Kimberly Garmoe" subtitle="Messy in, usable out." />

        <section className="mb-20">
          <div className={row}>
            <div className="space-y-6">
              <div>
                <p className="label text-ink-muted mb-1">Based in</p>
                <p>Seattle, WA</p>
              </div>
              <div>
                <p className="label text-ink-muted mb-1">Find me</p>
                <ul className="list-none m-0 p-0 space-y-1">
                  <li><a href="mailto:kagarmoe@gmail.com">Email ↗</a></li>
                  <li><a href="https://linkedin.com/in/kimberlygarmoe">LinkedIn ↗</a></li>
                  <li><a href="https://github.com/kagarmoe">GitHub ↗</a></li>
                </ul>
              </div>
              <div>
                <p className="label text-ink-muted mb-1">Open to</p>
                <p>Customer-facing technical roles</p>
              </div>
            </div>
            <div className="space-y-5 text-ink max-w-prose">
              {intro.map((p, i) => (
                <p key={i} className={i === 0 ? 'font-display font-medium text-xl md:text-2xl leading-snug tracking-tight' : ''}>
                  {p}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {interests.map(t => (
                  <span key={t} className="label text-ink border border-ink px-2.5 py-1.5">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Section label="Experience">
          <div className="space-y-14">
            {experience.map(({ company, role, period, location, description }) => (
              <div key={company} className={row}>
                <div className="font-mono text-[0.8rem] text-ink-muted leading-relaxed">
                  <p>{period}</p>
                  <p>{location}</p>
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-title text-ink mb-1">{company}</h2>
                  <p className="label text-ink-muted mb-4">{role}</p>
                  <ul className="space-y-2 list-none p-0 max-w-prose">
                    {description.map((item, i) => (
                      <li key={i} className="pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-gold">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Education">
          <div className="space-y-8">
            {education.map(({ school, degree, years }) => (
              <div key={school} className={row}>
                <p className="font-mono text-[0.8rem] text-ink-muted">{years}</p>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-ink mb-1">{school}</h3>
                  <p className="text-ink-muted">{degree}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Skills & Languages">
          <div className={row}>
            <p className="label text-ink-muted">Technical</p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="label text-ink border border-line px-2.5 py-1.5">{skill}</span>
              ))}
            </div>
          </div>
          <div className={`${row} mt-8`}>
            <p className="label text-ink-muted">Languages</p>
            <p className="text-ink-muted">{languages.join(' · ')}</p>
          </div>
        </Section>

        <Section label="Certifications">
          <div className={row}>
            <div />
            <ul className="space-y-2 list-none p-0">
              {certifications.map(cert => (
                <li key={cert} className="pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-gold">{cert}</li>
              ))}
            </ul>
          </div>
        </Section>
    </Page>
  )
}
