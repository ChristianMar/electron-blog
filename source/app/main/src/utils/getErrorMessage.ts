import { IErrorQuery } from '../mocks/errorQuery';

export const getErrorMessage = (
  isError: boolean,
  error: IErrorQuery | undefined
) => (!isError ? { message: undefined } : { message: error?.data?.message });
