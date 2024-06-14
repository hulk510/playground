'use client';
import { FloatAnimation } from '@repo/sandbox';
import { Card, Onboarding, SearchInput } from '@repo/ui';
import type { Link } from '@repo/ui/types';
import { motion } from 'framer-motion';
import { useState } from 'react';
const LINKS: Link[] = [
  {
    id: 1,
    title: 'Hello World, Kuma UI',
    href: '/kuma-ui',
    description: '🐻',
  },
  {
    id: 2,
    title: 'React Hook Form and Material UI',
    href: '/hook-form-and-material',
    description:
      'A simple form with validation using react-hook-form and material-ui',
  },
  {
    id: 3,
    title: 'Framer Motion',
    href: '/framer-motion',
    description: 'Interactive animations for the web',
  },
  {
    id: 4,
    title: 'Prisma Todo App',
    href: '/todo',
    description: 'sample prisma client',
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
    <main className='container mx-auto flex flex-col justify-start items-center p-24 min-h-screen gap-8'>
      <div className='flex items-center justify-center flex-col'>
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
      </div>
      {selectedLink ? (
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
      ) : (
        <motion.div
          className='flex mt-16 w-full gap-4 overflow-hidden'
          animate={{ x: ['200%', '-200%'] }}
          transition={{
            x: {
              duration: 50,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          {LINKS.map((link) => (
            <Card href={link.href} key={link.title} title={link.title}>
              {link.description}
            </Card>
          ))}
        </motion.div>
      )}
      <FloatAnimation />
    </main>
  );
}
