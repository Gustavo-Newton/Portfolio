import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'medium',
  className = ''
}) => {
  const baseClasses = 'container';
  const maxWidthClasses = {
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
    full: 'container-full'
  };
  const paddingClasses = {
    none: 'container-padding-none',
    small: 'container-padding-small',
    medium: 'container-padding-medium',
    large: 'container-padding-large'
  };

  const classes = [
    baseClasses,
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
