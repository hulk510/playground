'use client';
import { FloatAnimation } from '@repo/sandbox';
import { Card, Onboarding, SearchInput } from '@repo/ui';
import { Link } from '@repo/ui/src/components/molecules/searchInput';
import { useState } from 'react';

const LINKS: Link[] = [
  {
    id: 1,
    title: 'Kuma UI',
    href: '/kuma-ui',
    description: '🐻',
  },
  {
    id: 2,
    title: 'React Hook Form and Material UI',
    href: '/hook-form-and-material',
    description:
      'react hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial uireact hook formとmaterial ui',
  },
  {
    id: 3,
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
    <main className='container mx-auto flex flex-col justify-between items-center p-24 min-h-screen'>
      <div className='flex items-center justify-center flex-col gap-3'>
        <Onboarding />
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Please Type Something...'
          lists={filteredLinks}
          onSelect={(lists) => {
            handleSelectLink(lists);
          }}
        />
        {selectedLink && (
          <div className='flex flex-col mt-8 max-w-md w-full gap-4'>
            <button
              type='button'
              onClick={() => setSelectedLink(null)}
              className='bg-red-500 items-start text-white rounded-md p-2 hover:bg-red-600 w-24'
            >
              やり直す
            </button>
            <Card
              href={selectedLink.href}
              key={selectedLink.title}
              title={selectedLink.title}
            >
              {selectedLink.description}
            </Card>
          </div>
        )}
      </div>
      {query.length === 0 && !selectedLink && <FloatAnimation />}
      {/* 検索で選択された */}
    </main>
  );
}
