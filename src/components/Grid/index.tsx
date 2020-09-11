import React, { ReactNode, ReactElement, ReactNodeArray } from 'react';

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
  margin?: 'left'|'right'|'600-left'|'600-right'
}

export function GridItem({ children, margin }: IGridItemProps) {
  const classes = [
    styles.item,
    ...margin ? [`mr-${margin}-auto`] : [],
  ].join(' ');

  return <div className={classes}>{children}</div>;
}

interface IGridGutter {
  gutter: 'xs'|'s'|'m'
  children: ReactNode|ReactNodeArray
}

export function GridGutter({ gutter, children }: IGridGutter) {
  return <div className={styles[`gutter-${gutter}`]}>{children}</div>;
}

export default Grid;
