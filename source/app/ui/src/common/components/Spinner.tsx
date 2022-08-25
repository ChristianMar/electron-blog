import React from 'react';
import { CircularProgress } from '@mui/material';

import { SpinnerContainer } from './UISpinner';

interface spinner {
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  size?: number;
  style?: object;
  thickness?: number;
  value?: number;
  styleContainer?: object;
}

export const Spinner = ({
  color,
  size,
  style,
  thickness,
  value,
  styleContainer
}: spinner) => {
  return (
    <SpinnerContainer style={styleContainer}>
      <CircularProgress
        color={color}
        size={size}
        style={style}
        thickness={thickness}
        value={value}
      />
    </SpinnerContainer>
  );
};
