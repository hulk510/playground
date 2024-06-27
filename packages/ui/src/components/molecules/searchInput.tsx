import { Link } from '#types';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
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
      className='ui-flex ui-border ui-rounded-xl ui-w-full ui-shadow-md ui-flex-col'
    >
      <div className='ui-flex ui-gap-2 ui-p-2 lg:ui-p-4'>
        <MagnifyingGlassIcon className='ui-w-6 ui-h-6' />
        <input
          type='text'
          value={value}
          onChange={onChange}
          className='ui-w-full ui-h-full ui-outline-none ui-bg-background'
          placeholder={placeholder}
        />
      </div>
      {value.length > 0 && lists.length > 0 && (
        <ul className='ui-rounded-xl'>
          {lists.map((link) => (
            <li
              key={link.title}
              className='ui-text-md hover:ui-bg-accent last:hover:ui-rounded-b-xl ui-cursor-pointer ui-px-6 ui-py-2'
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
