import React from 'react';
import { Field } from 'react-final-form';
import { Button } from '@mui/material';

import { IErrorsType } from '../../mocks/errorsType';
import { CenteredWidget } from '../../common/containers/CenteredWidget';
import { ErrorList } from '../../common/components/ErrorList';
import { RenderTextField } from '../../common/fields/RenderTextField';
import { LabelButton } from '../../common/inputs/LabelButton';

interface Props {
  labels: {
    username: string;
    password: string;
    login: string;
  };
  onLogin: () => void;
  loading: boolean;
  error?: IErrorsType;
}

export const LoginWidget = ({ labels, onLogin, loading, error }: Props) => {
  return (
    <CenteredWidget>
      <ErrorList errors={error} />
      <Field
        name="username"
        component={RenderTextField}
        label={labels.username}
        fullWidth={true}
        disabled={loading}
        variant="standard"
        size="small"
      />
      <Field
        name="password"
        component={RenderTextField}
        label={labels.password}
        fullWidth={true}
        disabled={loading}
        type="password"
        variant="standard"
        size="small"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
        onClick={onLogin}
        disabled={loading}
      >
        <LabelButton loading={loading} label={labels.login} />
      </Button>
    </CenteredWidget>
  );
};
