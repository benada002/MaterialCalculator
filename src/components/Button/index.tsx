import React, {
  ReactNode, DetailedHTMLProps, ButtonHTMLAttributes,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Button.module.css';

interface IButton {
    children: ReactNode;
    round?: boolean;
    noShadow?: boolean;
    noBackground?: boolean;
    icon?: IconProp,
}

function Button({
  children,
  onClick,
  round,
  noShadow,
  noBackground,
  icon,
  ...buttonProps
}: IButton&DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  const buttonClasses = [
    styles.button,
    ...round ? [styles.round] : [],
    ...!noShadow ? [styles.shadow] : [],
    noBackground ? styles.border : styles.background,
  ].join(' ');

  return (
    <button className={buttonClasses} onClick={onClick} type="button" {...buttonProps}>
      {icon && <span className={styles.icon}><FontAwesomeIcon icon={icon} /></span>}
      {children}
    </button>
  );
}

export default Button;
