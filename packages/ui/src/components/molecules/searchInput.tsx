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
      className='flex border border-gray-300 rounded-xl w-full bg-white shadow-md flex-col'
    >
      <div className='flex gap-2 p-4'>
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
          className='w-full h-full outline-none'
          placeholder={placeholder}
        />
      </div>
      {value.length > 0 && lists.length > 0 && (
        <ul className='text-gray-800 rounded-xl'>
          {lists.map((link) => (
            <li
              key={link.title}
              className='text-md hover:bg-gray-100 last:hover:rounded-b-xl cursor-pointer px-6 py-2'
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
