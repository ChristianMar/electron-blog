import React, { ReactNode } from 'react';
import { Box, Dialog } from '@mui/material';

import { ModalContainerStyle } from './UIModal';

interface Props {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
}

export const ModalWrapper = ({ open, handleClose, children }: Props) => {
  return (
    <Dialog keepMounted open={open} onClose={handleClose}>
      {children}
    </Dialog>
  );
};
