import React, { ReactNode } from 'react';

import styles from './FixedPosition.module.css';

interface IFixedPosition{
    children: ReactNode
    position: 'bottom-right'
}

export default function FixedPosition({ children, position }: IFixedPosition) {
  return <div className={`${styles.fixed} ${styles[position]}`}>{children}</div>;
}
