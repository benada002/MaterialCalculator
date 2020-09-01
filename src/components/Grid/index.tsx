import React, { ReactNode, ReactElement, ReactNodeArray } from 'react';

import styles from './Grid.module.css';

interface IGrid {
    children: ReactNodeArray
    column?: boolean
}

function Grid({ children, column = false }: IGrid): ReactElement {
  const classes = [
    styles.grid,
    ...column ? [styles.column] : [],
  ].join(' ');

  return (
    <div className={classes}>
      {children && children.map(
        (ele: ReactNode, i) => <div key={i} className={styles.item}>{ele}</div>,
      )}
    </div>
  );
}

export default Grid;
