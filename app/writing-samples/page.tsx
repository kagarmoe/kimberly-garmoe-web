import { Page, PageHeader } from '@/components/layout/PageHeader'

export const metadata = {
  title: 'Technical writing samples',
  description: 'Published technical writing by Kimberly Garmoe.',
}

const samples = [
  {
    title: 'Chef Automate API Documentation',
    href: 'https://docs.chef.io/automate/api',
    description:
      'API reference generated from an OpenAPI specification derived from source code and code comments, kept synchronized with implementation.',
  },
  {
    title: 'AWS CloudHSM Client Migration',
    href: 'https://docs.aws.amazon.com/cloudhsm/latest/userguide/client-sdk-migration.html',
    description:
      'Security-sensitive client upgrade docs: production-safe sequencing, validation, and recovery across PKCS #11, OpenSSL, KSP, and JCE.',
  },
]

export default function WritingSamplesPage() {
  return (
    <Page>
      <PageHeader eyebrow="Samples" title="Technical writing" subtitle="Published documentation I wrote." />
      <ul className="list-none m-0 p-0 space-y-10 max-w-prose">
        {samples.map(({ title, href, description }) => (
          <li key={href}>
            <h2 className="font-display font-extrabold text-title text-ink mb-2">
              <a href={href}>{title} ↗</a>
            </h2>
            <p className="text-ink-muted">{description}</p>
          </li>
        ))}
      </ul>
    </Page>
  )
}
