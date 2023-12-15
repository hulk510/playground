import { Card, Title } from '@repo/ui';
import styles from './page.module.css';

const LINKS = [
  {
    title: 'Kuma UI',
    href: '/kuma-ui',
    description: '🐻',
  },
];

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Title />
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
