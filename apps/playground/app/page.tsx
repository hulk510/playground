import { Card, Home, Title } from '@repo/ui';
import styles from './page.module.css';

const LINKS = [
  {
    title: 'Kuma UI',
    href: '/kuma-ui',
    description: '🐻',
  },
  {
    title: 'React Hook Form and Material UI',
    href: '/hook-form-and-material',
    description: 'react hook formとmaterial ui',
  },
  {
    title: 'Framer Motion',
    href: '/framer-motion',
    description: 'Interactive animations for the web',
  },
];

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Title />
      <Home />
      <h1 className='bg-blue-500 font-bold'>Playground</h1>
      <div className={styles.grid}>
        {LINKS.map(({ title, href, description }) => (
          <Card className={styles.card} href={href} key={title} title={title}>
            {description}
          </Card>
        ))}
      </div>
    </main>
  );
}
