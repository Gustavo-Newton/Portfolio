import React, { useMemo, useState } from 'react';
import type { Skill } from '../types';
import { Card } from './Card';
import { Heading } from './Heading';
import checkmarkIcon from '../assets/images/icons/checkmark.png';

interface PersonSkillsProps {
  name: string;
  skills: Skill[];
  pageSize?: number;
}

export const PersonSkills: React.FC<PersonSkillsProps> = ({ name, skills, pageSize = 10 }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const totalPages = Math.max(1, Math.ceil(skills.length / pageSize));

  const currentSkills = useMemo(() => {
    const start = pageIndex * pageSize;
    return skills.slice(start, start + pageSize);
  }, [skills, pageIndex, pageSize]);

  const goToPage = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, totalPages - 1));
    setPageIndex(safeIndex);
  };

  const goPrev = () => goToPage(pageIndex - 1);
  const goNext = () => goToPage(pageIndex + 1);

  return (
    <Card variant="elevated" className="person-skills">
      <Heading level={3} variant="card">{name}</Heading>
      <div className="skills-list">
        {currentSkills.map((skill) => (
          <div key={skill.id} className="skill-item">
            <img src={checkmarkIcon} alt="Checkmark" className="skill-icon" />
            <span className="skill-name">{skill.name}</span>
            <span className="skill-level">({skill.level})</span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <>
          <button
            type="button"
            className="person-skills-arrow prev"
            onClick={goPrev}
            disabled={pageIndex === 0}
            aria-label="Página anterior"
          >
            ‹
          </button>
          <div className="person-skills-controls" role="navigation" aria-label={`Paginação de ${name}`}>
          <div className="person-skills-dots" role="tablist" aria-label="Paginação de habilidades">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`person-skills-dot${idx === pageIndex ? ' active' : ''}`}
                onClick={() => goToPage(idx)}
                aria-label={`Ir para página ${idx + 1}`}
                aria-selected={idx === pageIndex}
                role="tab"
              />
            ))}
          </div>
          </div>
          <button
            type="button"
            className="person-skills-arrow next"
            onClick={goNext}
            disabled={pageIndex === totalPages - 1}
            aria-label="Próxima página"
          >
            ›
          </button>
        </>
      )}
    </Card>
  );
};


