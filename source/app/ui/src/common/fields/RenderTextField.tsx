import React from 'react'

import { Input } from '../inputs/Input'

interface renderTextField {
  input: object,
  label?: string,
  meta: {
    touched?: boolean,
    error?: string,
  }
}

export const RenderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...props
}: renderTextField) => {
  return (
    <Input
      label={label}
      error={touched && typeof error !== 'undefined'}
      helperText={touched && typeof error !== 'undefined' ? error : null}
      {...input}
      {...props}
    />
  )
}