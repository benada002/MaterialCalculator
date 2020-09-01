import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './IconLabel.module.css';

interface IIconLabel {
  label?: string|number,
  icon: IconProp,
}

export default function IconLabel({ label, icon }: IIconLabel): ReactElement {
  return (
    <span>
      <FontAwesomeIcon className={styles.icon} icon={icon} />
      {label && <span>{label}</span>}
    </span>
  );
}
