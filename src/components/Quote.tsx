import { ReactNode } from 'react';

export default ({
  isBlock,
  children,
  ...props
}: {
  isBlock?: boolean;
  children: ReactNode | string;
}) => {
  return (
    <span
      className={`quote-inline ${isBlock ? 'quote-block' : 'quote-inline'}`}
      {...props}
    >
      {children}
    </span>
  );
};
