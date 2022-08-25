const checkNullUndefinedEmpty = (val: string | number) =>
  val === undefined || val === null || val === '';

export const isRequired = (error: string, val: string | number) =>
  checkNullUndefinedEmpty(val) ? error : undefined;