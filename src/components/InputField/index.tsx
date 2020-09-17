import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import styles from './InputField.module.css';

interface IInputField {
    label?: string
}

export default function InputField(
  { label, ...props }: IInputField&DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) {
  return (
    <div className={styles['input-container']}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input {...props} className={styles['input-field']} />
    </div>
  );
}
