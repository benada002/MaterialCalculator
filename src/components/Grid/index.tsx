import React, { ReactNode, ReactElement } from 'react';

import styles from './Grid.module.css';

interface IGrid {
    children: ReactNode
    column?: boolean
}

function Grid({ children, column = false }: IGrid): ReactElement {
  const classes = [
    styles.grid,
    ...column ? [styles.column] : [],
  ].join(' ');

  return (
    <div className={classes}>
      {children && children}
    </div>
  );
}

interface IGridItemProps {
  children: ReactNode
  margin?: 'left'|'right'
}

export function GridItem({ children, margin }: IGridItemProps) {
  const classes = [
    styles.item,
    ...margin ? [`mr-${margin}-auto`] : [],
  ].join(' ');

  return <div className={classes}>{children}</div>;
}

export default Grid;
