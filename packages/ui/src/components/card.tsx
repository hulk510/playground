interface CardProps {
  /**
   * タイトルの説明
   */
  title: string;
  /**
   * children description
   */
  children: React.ReactNode;
  /**
   * href
   */
  href: string;
}

export function Card({ title, children, href }: CardProps): JSX.Element {
  return (
    <a className='border rounded-xl p-8 hover:bg-gray-100 w-full' href={href}>
      <h2 className='text-lg'>{title}</h2>
      <p className='text-sm text-gray-500'>{children}</p>
    </a>
  );
}
