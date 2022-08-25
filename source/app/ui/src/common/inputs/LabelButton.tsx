import React, { ReactNode } from 'react';
import { Spinner } from '../components/Spinner';

interface labelButton {
  label: ReactNode | string;
  loading?: boolean;
  spinnerSize?: number;
  spinnerThickness?: number;
  spinnerColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
}

export const LabelButton = ({
  label,
  loading,
  spinnerSize,
  spinnerThickness,
  spinnerColor
}: labelButton) => {
  return (
    <span
      style={{
        display: 'inherit',
        alignItems: 'inherit',
        justifyContent: 'inherit'
      }}
    >
      {loading ? (
        <Spinner
          size={spinnerSize ? spinnerSize : 21}
          thickness={spinnerThickness ? spinnerThickness : 2}
          color={spinnerColor ? spinnerColor : 'inherit'}
        />
      ) : (
        label
      )}
    </span>
  );
};
