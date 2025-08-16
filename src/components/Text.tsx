import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'lead' | 'small' | 'caption';
  as?: 'p' | 'span' | 'div';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  as: Component = 'p',
  className = ''
}) => {
  const baseClasses = 'text';
  const variantClasses = {
    body: 'text-body',
    lead: 'text-lead',
    small: 'text-small',
    caption: 'text-caption'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
};
