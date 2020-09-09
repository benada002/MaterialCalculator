import React, {
  useState, Fragment, ReactElement, Children, ReactNode,
} from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './StepView.module.css';

import Button from '../Button';

interface IStepProps {
  children?: ReactNode,
  name: string,
  goForward?: boolean
}

export function Step(props: IStepProps) {
  return <>{props?.children}</>;
}

interface IStepViewProps {
  children?: ReactElement<IStepProps>[]|ReactElement<IStepProps>
}

function StepView({ children }: IStepViewProps) {
  if (!children || typeof children !== 'object') return null;
  const steps = Children.toArray(children);

  /* eslint-disable */
  const [currentStep, setCurrentStep] = useState(0);
  /* eslint-enable */

  const element = steps[currentStep];

  const stepIncrement = () => {
    if (currentStep + 1 <= steps.length) setCurrentStep(currentStep + 1);
  };
  const stepDecrement = () => {
    if (currentStep - 1 >= 0) setCurrentStep(currentStep - 1);
  };

  // @ts-ignore
  const showForwardButton = element.props.goForward && currentStep < steps.length - 1;
  const showBackButton = currentStep > 0;

  return (
    <>
      <div className={styles.progressbar}>
        {steps && steps.map(
          (step, i) => {
            // @ts-ignore
            const { name } = step.props;

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
              <Fragment key={i}>
                <div className={stepClasses}>
                  <span className={styles.progressbar__number}>
                    {done ? <FontAwesomeIcon icon={faCheck} /> : i + 1}
                  </span>
                  <span className={styles.progressbar__name}>{name}</span>
                </div>
                {showBar && <span className={barClasses} />}
              </Fragment>
            );
          },
        )}
      </div>
      <div className={styles.view}>{element}</div>
      <div className={styles.buttons}>
        {showBackButton && (
          <div className={styles.back}>
            <Button
              noShadow
              noBackground
              onClick={stepDecrement}
            >
              Zurück
            </Button>
          </div>
        )}
        {showForwardButton && (
          <div className={styles.forward}>
            <Button onClick={stepIncrement}>Weiter</Button>
          </div>
        )}
      </div>
    </>
  );
}

export default StepView;
