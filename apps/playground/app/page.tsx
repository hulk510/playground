'use client';
import { FloatAnimation } from '@repo/sandbox';
import { Card, Onboarding, SearchInput } from '@repo/ui';
import { useState } from 'react';
import styles from './page.module.css';

type Link = {
  title: string;
  href: string;
  description: string;
};

const LINKS: Link[] = [
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
  const [query, setQuery] = useState('');
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  const handleSelectLink = (link: Link) => {
    setSelectedLink(link);
    setQuery('');
  };

  const filteredLinks = LINKS.filter(
    (link) =>
      link.title.toLowerCase().includes(query.toLowerCase()) ||
      link.description.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className={styles.main}>
      <div className='flex items-center justify-center flex-col gap-3'>
        <Onboarding />
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Please Type Something...'
        />
        {query.length > 0 && filteredLinks.length > 0 && (
          <ul className='w-full rounded-xl border border-gray-200 bg-gray-50 px-8 py-4 mt-1 flex flex-col '>
            {filteredLinks.map((link) => (
              <li
                key={link.title}
                className='w-full text-md py-2 px-4 border-t border-gray-200 first:border-t-0 border-dashed text-gray-800 hover:bg-gray-100 cursor-pointer'
              >
                <button onClick={() => handleSelectLink(link)}>
                  {link.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {query.length === 0 && <FloatAnimation />}

      {/* 検索で選択された */}
      {selectedLink && (
        <Card
          className={styles.card}
          href={selectedLink.href}
          key={selectedLink.title}
          title={selectedLink.title}
        >
          {selectedLink.description}
        </Card>
      )}
    </main>
  );
}
