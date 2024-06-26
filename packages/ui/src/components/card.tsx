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
    <a
      className='ui-border ui-rounded-xl ui-p-8 hover:ui-bg-accent ui-w-full'
      href={href}
    >
      <h2 className='ui-text-lg'>{title}</h2>
      <p className='ui-text-sm ui-text-gray-500'>{children}</p>
    </a>
  );
}
