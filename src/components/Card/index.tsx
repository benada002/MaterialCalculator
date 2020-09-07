import React, { ReactNodeArray, ReactNode } from 'react';

import CardWithTitle from './cardWithTitle';
import CardBody from './cardBody';

import styles from './Card.module.css';

interface ICardProps {
    children: ReactNode
}

export default function ({ children }: ICardProps) {
  return (
    <div className={styles.card}>
      {children && children}
    </div>
  );
}

interface ICardGridProps {
  children: ReactNodeArray
}

function CardGrid({ children }: ICardGridProps) {
  return (
    <div className={styles.grid}>
      {children && children.map((ele) => <div className={styles.grid__item}>{ele}</div>)}
    </div>
  );
}

export {
  CardGrid,
  CardWithTitle,
  CardBody,
};
