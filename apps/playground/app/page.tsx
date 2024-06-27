'use client';
import { FloatAnimation } from '@repo/sandbox';
import { ModeToggle } from '@repo/ui/molecules/mode-toggle';
import { SearchInput } from '@repo/ui/molecules/searchInput';
import { Onboarding } from '@repo/ui/organism/onboarding';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/shadcn/card';

import type { Link } from '@repo/ui/types';
import { Button } from '@repo/ui/ui/button';
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
    <main className='container mx-auto flex min-h-screen flex-col items-center justify-start gap-8 p-24'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <ModeToggle />
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
        <div className='mt-8 flex w-full max-w-md flex-col gap-4'>
          <Button
            type='button'
            onClick={() => setSelectedLink(null)}
            variant='destructive'
            className='w-24'
          >
            やり直す
          </Button>
          <Card
            title={selectedLink.title}
            className='w-full'
            key={selectedLink.id}
          >
            <CardHeader>
              <CardTitle className='text-lg'>{selectedLink.title}</CardTitle>
              <CardDescription className='line-clamp-4'>
                {selectedLink.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <a href={selectedLink.href}>Go to Link</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <motion.div
          className='mt-8 flex w-full'
          initial={{ x: '150%' }}
          animate={{ x: ['150%', '-150%'] }}
          transition={{
            x: {
              duration: 50,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
            },
          }}
        >
          {/* TODO: feature flagを追加してfeatureのものだけ表示するようにする */}
          {LINKS.map((link) => (
            <Card
              title={link.title}
              className='mx-4 w-80 flex-shrink-0'
              key={link.id}
            >
              <CardHeader>
                <CardTitle className='text-lg'>{link.title}</CardTitle>
                <CardDescription className='line-clamp-4'>
                  {link.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      )}
      <FloatAnimation />
      {/* TODO: girdで全てリストアップして表示する */}
    </main>
  );
}
