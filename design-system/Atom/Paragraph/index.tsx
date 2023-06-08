import * as React from 'react';
import clsx from 'clsx';

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, children, ...props }, ref) => {
    const BaseStyling =
      'max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center';

    return (
      <p ref={ref} {...props} className={clsx(className ?? BaseStyling)}>
        {children}
      </p>
    );
  },
);

Paragraph.displayName = 'Paragraph';
