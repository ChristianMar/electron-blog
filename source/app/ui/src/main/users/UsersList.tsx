import React, { ReactNode } from 'react';
import { Button } from '@mui/material';
import { useTranslate } from 'react-polyglot';

import { IErrorsType } from '../../mocks/errorsType';
import { ErrorList } from '../../common/components/ErrorList';
import { Spinner } from '../../common/components/Spinner';
import { LoadMore } from './UIUsers';
import { LabelButton } from '../../common/inputs/LabelButton';

interface Props {
  loading: boolean;
  error?: IErrorsType;
  children: ReactNode;
  hasNext: boolean | undefined;
  hasPrev: boolean | undefined;
  loadNextUsers: () => void;
  loadPrevUsers: () => void;
}

export const UsersList = ({
  loading,
  error,
  children,
  hasNext,
  hasPrev,
  loadNextUsers,
  loadPrevUsers
}: Props) => {
  const t = useTranslate();
  return (
    <React.Fragment>
      <ErrorList errors={error} />
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {children}
          <LoadMore>
            <Button onClick={loadPrevUsers} disabled={!hasPrev}>
              <LabelButton label={t('common.prev')} />
            </Button>
            <Button onClick={loadNextUsers} disabled={!hasNext}>
              <LabelButton label={t('common.next')} />
            </Button>
          </LoadMore>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
