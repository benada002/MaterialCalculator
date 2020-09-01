import React, { ReactNodeArray, Fragment } from 'react';

import CardWithTitle from './cardWithTitle';
import CardBody from './cardBody';

import styles from './Card.module.css';

interface ICardProps {
    children: ReactNodeArray
}

export default function ({ children }: ICardProps) {
  return (
    <div className={styles.card}>
      {children && children.map((ele, i) => <Fragment key={i}>{ele}</Fragment>)}
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
