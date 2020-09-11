import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import styles from './InputField.module.css';
import Grid, { GridItem } from '../Grid';

interface IInputField {
    label?: string
}

export default function InputField(
  { label, ...props }: IInputField&DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) {
  return (
    <Grid column>
      {label && <GridItem><label htmlFor={props.name}>{label}</label></GridItem>}
      <GridItem><input {...props} className={styles['input-field']} /></GridItem>
    </Grid>
  );
}
