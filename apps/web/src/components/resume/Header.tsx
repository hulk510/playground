'use client'

import { Button } from '@repo/ui/ui/button'
import { motion } from 'framer-motion'
import { Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='border-b'
    >
      <nav className='container mx-auto flex h-16 items-center justify-between px-4'>
        <motion.div whileHover={{ scale: 1.05 }} className='text-xl font-bold'>
          Haruka Daddy
        </motion.div>

        {/* Desktop Navigation */}
        <div className='hidden items-center gap-6 md:flex'>
          <a
            href='/playground'
            className='hover:text-primary transition-colors'
          >
            Playground
          </a>
          <a href='/posts' className='hover:text-primary transition-colors'>
            Posts
          </a>
          <a href='/tags' className='hover:text-primary transition-colors'>
            Tags
          </a>
          <a href='/about' className='hover:text-primary transition-colors'>
            About
          </a>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='ml-2'
          >
            {isDark ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className='flex items-center gap-2 md:hidden'>
          <Button variant='ghost' size='icon' onClick={toggleTheme}>
            {isDark ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className='h-5 w-5' />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='border-b px-4 py-2 md:hidden'
        >
          <div className='flex flex-col space-y-2'>
            <a
              href='/playground'
              className='hover:text-primary transition-colors'
            >
              Playground
            </a>
            <a href='/posts' className='hover:text-primary transition-colors'>
              Posts
            </a>
            <a href='/tags' className='hover:text-primary transition-colors'>
              Tags
            </a>
            <a href='/about' className='hover:text-primary transition-colors'>
              About
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
