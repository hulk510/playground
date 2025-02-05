'use client'
import { ModeToggle } from '@repo/ui/mode-toggle'
import { Onboarding } from '@repo/ui/onboarding'
import { SearchInput } from '@repo/ui/searchInput'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/shadcn/card'

import type { Link } from '@repo/ui/types'
import { Button } from '@repo/ui/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'
const LINKS: Link[] = []

export default function Page(): JSX.Element {
  const [query, setQuery] = useState('')
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)

  const handleSelectLink = (link: Link) => {
    setSelectedLink(link)
    setQuery('')
  }

  const filteredLinks = LINKS.filter(
    (link) =>
      link.title.toLowerCase().includes(query.toLowerCase()) ||
      link.description.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className='min-h-screen'>
      <div className='container mx-auto flex w-8 flex-col items-center justify-start gap-4 p-24'>
        <ModeToggle />
        <div className='space-y-4'>
          <Onboarding />
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Please Type Something...'
            lists={filteredLinks}
            onSelect={(lists) => {
              handleSelectLink(lists)
            }}
          />
        </div>
        {selectedLink !== null && (
          <div className='mt-4 space-y-4'>
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
              className='w-80'
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
        )}
      </div>
      {selectedLink === null && (
        <div className='w-full overflow-x-hidden'>
          <motion.div
            className='m-4 flex w-full'
            initial={{ opacity: 0 }}
            animate={{ x: ['150%', '-150%'], opacity: 1 }}
            transition={{
              x: {
                duration: 50,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {/* TODO: feature flagを追加してfeatureのものだけ表示するようにする */}
            {LINKS.map((link) => (
              <Card
                title={link.title}
                className='mx-4 w-80 flex-shrink-0 overflow-hidden'
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
        </div>
      )}
      {/* TODO: girdで全てリストアップして表示する */}
    </main>
  )
}
