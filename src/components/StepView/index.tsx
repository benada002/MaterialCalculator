import React, { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './StepView.module.css';

export interface IStep {
  name: string,
  element: JSX.Element
}

interface IStepViewProps {
  steps: IStep[]
}

function StepView({ steps }: IStepViewProps) {
  if (steps.length === 0) return null;
  // eslint-disable-next-line
  const [currentStep, setCurrentStep] = useState(0);
  const { element } = steps[currentStep];

  const stepIncrement = () => {
    if (currentStep + 1 <= steps.length) setCurrentStep(currentStep + 1);
  };
  const stepDecrement = () => {
    if (currentStep - 1 >= 0) setCurrentStep(currentStep - 1);
  };

  const showForwardButton = currentStep >= steps.length - 1;
  const showBackButton = currentStep <= 0;

  return (
    <>
      <div className={styles.progressbar}>
        {steps && steps.map(
          ({ name }, i) => {
            const showBar = i < steps.length - 1;
            const done = i < currentStep;
            const current = i === currentStep;

            const stepClasses = [
              styles.progressbar__item,
              ...done ? [styles['progressbar__item--done']] : [],
              ...current ? [styles['progressbar__item--current']] : [],
            ].join(' ');
            const barClasses = [
              styles.progressbar__bar,
              ...done ? [styles['progressbar__bar--done']] : [],
            ].join(' ');

            return (
              <>
                <div className={stepClasses}>
                  <span className={styles.progressbar__number}>{done ? <FontAwesomeIcon icon={faCheck} /> : i}</span>
                  <span className={styles.progressbar__name}>{name}</span>
                </div>
                {showBar && <span className={barClasses} />}
              </>
            );
          },
        )}
      </div>
      <div className={styles.view}>{element}</div>
      <div className={styles.buttons}>
        <button type="button" disabled={showBackButton} className={`${styles.button} ${styles['button--back']}`} onClick={stepDecrement}>Zurück</button>
        <button type="button" disabled={showForwardButton} className={`${styles.button} ${styles['button--forward']}`} onClick={stepIncrement}>Weiter</button>
      </div>
    </>
  );
}

export default StepView;
