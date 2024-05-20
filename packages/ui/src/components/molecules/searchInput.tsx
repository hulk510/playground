import { motion } from 'framer-motion';
import Image from 'next/image';
import searchIcon from '../../../public/assets/search.svg';

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
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
      className='flex items-center gap-2 p-4 border border-gray-300 rounded-xl w-full h-14 bg-white shadow-md'
    >
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
    </motion.div>
  );
}
