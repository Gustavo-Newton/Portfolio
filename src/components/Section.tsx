import React, { forwardRef } from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  variant?: 'default' | 'hero' | 'about' | 'skills' | 'projects' | 'contact';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  id,
  variant = 'default',
  padding = 'medium',
  className = ''
}, ref) => {
  const baseClasses = 'section';
  const variantClasses = {
    default: 'section-default',
    hero: 'section-hero',
    about: 'section-about',
    skills: 'section-skills',
    projects: 'section-projects',
    contact: 'section-contact'
  };
  const paddingClasses = {
    none: 'section-padding-none',
    small: 'section-padding-small',
    medium: 'section-padding-medium',
    large: 'section-padding-large'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <section ref={ref} id={id} className={classes}>
      {children}
    </section>
  );
});
