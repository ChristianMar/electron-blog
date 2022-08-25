import React from 'react';

import { ErrorWrapper, ErrorListUl, ErrorListLi } from './UIErrorList';
import { IErrorsType } from '../../mocks/errorsType';

export const ErrorList = ({ errors }: { errors?: IErrorsType }) => {
  return (
    <ErrorWrapper>
      <ErrorListUl>
        <ErrorListLi>{errors ? errors.message : null}</ErrorListLi>
      </ErrorListUl>
    </ErrorWrapper>
  );
};
