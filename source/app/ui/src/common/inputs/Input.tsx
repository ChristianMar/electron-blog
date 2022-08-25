import React, { ReactNode } from 'react'
import { TextField } from '@mui/material';

interface label {
  children?: ReactNode,
  error?: boolean,
  helperText?: ReactNode | string,
  InputLabelProps?: object,
  InputProps?: object,
  style?: object,
  classes?: object,
  label?: ReactNode | string,
  placeholder?: string,
  fullWidth?: boolean,
  disabled?: boolean,
  value?: string | number,
  margin?: 'none' | 'dense' | 'normal' | undefined
}

export const Input = ({
  error,
  helperText,
  style,
  margin,
  placeholder,
  children,
  label,
  value,
  fullWidth,
  InputLabelProps,
  InputProps,
  disabled,
  classes,
  ...rest
}: label) => {
  return (
    <TextField
    label={label}
    classes={classes}
    placeholder={placeholder}
    margin={margin ? margin : 'dense'}
    style={{
      ...style,
    }}
    value={value}
    children={children}
    {...rest}
    fullWidth={fullWidth}
    error={error}
    helperText={<span id={!error ? '' : '__input_error'}>{helperText}</span>}
    InputLabelProps={InputLabelProps}
    InputProps={InputProps}
    disabled={disabled}
  />
  )
}