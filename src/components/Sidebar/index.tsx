import React, { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBars, faTags, faBox, faCalculator, faTimes, faCog,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.css';

interface iExpandebaleLink {
  to: string,
  children?: string,
  icon: IconProp,
}

function ExpandebleLink({ to, children, icon }: iExpandebaleLink): ReactElement {
  return (
    <NavLink className={styles.link} to={to} activeClassName={styles.active}>
      <FontAwesomeIcon className={styles['link-icon']} icon={icon} size="lg" fixedWidth />
      <p className={styles['link-text']}>{children}</p>
    </NavLink>
  );
}

function Sidebar(): ReactElement {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const getClassNames = (): string => [
    styles.sidebar,
    ...collapsed ? [styles.collapsed] : [],
  ].join(' ');

  return (
    <aside className={getClassNames()}>
      <nav>
        <FontAwesomeIcon
          className={`${styles.toggle} ${styles['link-icon']}`}
          icon={collapsed ? faBars : faTimes}
          onClick={() => setCollapsed(!collapsed)}
          size="lg"
          fixedWidth
        />
        <ExpandebleLink to="/products" icon={faTags}>Produkte</ExpandebleLink>
        <ExpandebleLink to="/materials" icon={faBox}>Material</ExpandebleLink>
        <ExpandebleLink to="/calculator" icon={faCalculator}>Rechner</ExpandebleLink>
      </nav>
      <nav>
        <ExpandebleLink to="/settings" icon={faCog}>Settings</ExpandebleLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
