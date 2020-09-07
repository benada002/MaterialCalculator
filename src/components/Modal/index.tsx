import React, {
  ReactElement, useRef, MouseEvent, JSXElementConstructor,
} from 'react';

import styles from './Modal.module.css';

interface IComponent {
  [key: string]: JSXElementConstructor<{openOrCloseModal: () => void}>
}
interface IModal {
    components: IComponent,
    currentComponent: string,
    close: () => void,
  }

function Modal({ currentComponent = '', components, close }: IModal): ReactElement|null {
  if (typeof currentComponent !== 'string' || currentComponent === '' || !components.hasOwnProperty(currentComponent)) return null;

  const CurrentModalComponent = components[currentComponent];

  // eslint-disable-next-line
  const notClickable = useRef<HTMLDivElement|null>(null);

  const handleClose = (event: MouseEvent<HTMLDivElement>) => {
    if (notClickable && notClickable.current) {
      if (!notClickable.current.contains(event.target as Node)) close();
    }
  };

  return (
    // eslint-disable-next-line
    <div className={styles.modal} onClick={handleClose}>
      <div className={styles.container} ref={notClickable}>
        <CurrentModalComponent openOrCloseModal={close} />
      </div>
    </div>
  );
}

export default Modal;
