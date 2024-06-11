import { motion } from 'framer-motion';
import Image from 'next/image';
import searchIcon from '../../../public/assets/search.svg';

export interface Link {
  id: number;
  title: string;
  href: string;
  description: string;
}

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  lists: Link[];
  onSelect: (link: Link) => void;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  lists,
  onSelect,
}: SearchInputProps): JSX.Element {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 2,
        ease: 'easeInOut',
      }}
      className='ui-flex ui-border ui-border-gray-300 ui-rounded-xl ui-w-full ui-bg-white ui-shadow-md ui-flex-col ui-bg-glow-conic'
    >
      <div className='ui-flex ui-gap-2 ui-p-4'>
        <Image
          src={searchIcon}
          priority
          alt='check icon.'
          width={16}
          height={16}
        />
        <input
          type='text'
          value={value}
          onChange={onChange}
          className='ui-w-full ui-h-full ui-outline-none'
          placeholder={placeholder}
        />
      </div>
      {value.length > 0 && lists.length > 0 && (
        <ul className='ui-text-gray-800 ui-rounded-xl'>
          {lists.map((link) => (
            <li
              key={link.title}
              className='ui-text-md hover:ui-bg-gray-100 last:hover:ui-rounded-b-xl ui-cursor-pointer ui-px-6 ui-py-2'
            >
              <button type='button' onClick={() => onSelect(link)}>
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
