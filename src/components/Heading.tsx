import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'hero' | 'section' | 'card';
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  variant = 'default',
  className = ''
}) => {
  const baseClasses = 'heading';
  const variantClasses = {
    default: 'heading-default',
    hero: 'heading-hero',
    section: 'heading-section',
    card: 'heading-card'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  const renderHeading = () => {
    switch (level) {
      case 1:
        return <h1 className={classes}>{children}</h1>;
      case 2:
        return <h2 className={classes}>{children}</h2>;
      case 3:
        return <h3 className={classes}>{children}</h3>;
      case 4:
        return <h4 className={classes}>{children}</h4>;
      case 5:
        return <h5 className={classes}>{children}</h5>;
      case 6:
        return <h6 className={classes}>{children}</h6>;
      default:
        return <h2 className={classes}>{children}</h2>;
    }
  };

  return renderHeading();
};
