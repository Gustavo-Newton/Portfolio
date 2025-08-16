import React, { forwardRef } from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  children,
  columns = 1,
  gap = 'medium',
  className = ''
}, ref) => {
  const baseClasses = 'grid';
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12'
  };
  const gapClasses = {
    none: 'grid-gap-none',
    small: 'grid-gap-small',
    medium: 'grid-gap-medium',
    large: 'grid-gap-large'
  };

  const classes = [
    baseClasses,
    columnClasses[columns],
    gapClasses[gap],
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';
