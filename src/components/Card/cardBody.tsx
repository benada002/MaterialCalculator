import React, { ReactNode } from 'react';

import styles from './Card.module.css';

interface ICardBodyProps {
    children: ReactNode
    withBottomBorder?: boolean
}

export default function ({ children, withBottomBorder = false }: ICardBodyProps) {
  const classes = [
    styles.card__body,
    ...withBottomBorder ? [styles['card__body--with-border']] : [],
  ].join(' ');

  return (
    <div className={classes}>{children ?? ''}</div>
  );
}
