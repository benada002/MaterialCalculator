import React, {
  ReactElement, ReactNode, MouseEvent,
} from 'react';

import styles from './Button.module.css';

interface IButton {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

function Button({ children, onClick }: IButton): ReactElement {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (onClick) onClick(event);
  };

  return (
    <button className={styles.button} onClick={handleClick} type="button">{children}</button>
  );
}

export default Button;
