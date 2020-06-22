import React, {
  ReactNode, ReactElement, useRef, MouseEvent,
} from 'react';

import styles from './Modal.module.css';

interface IModal {
    open: boolean;
    children?: ReactNode,
    close: () => void;
}

function Modal({ open, children, close }: IModal): ReactElement|null {
  const notClickable = useRef<HTMLDivElement|null>(null);
  if (!open) return null;

  const handleClose = (event: MouseEvent<HTMLDivElement>) => {
    if (notClickable && notClickable.current) {
      if (!notClickable.current.contains(event.target as Node)) close();
    }
  };

  return (
    // eslint-disable-next-line
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.container} ref={notClickable}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
