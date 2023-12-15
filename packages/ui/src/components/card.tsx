interface CardProps {
  /**
   * 説明
   */
  className?: string;
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

/**
 * hello world
 */
export function Card({
  className,
  title,
  children,
  href,
}: CardProps): JSX.Element {
  return (
    <a className={className} href={href}>
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}
