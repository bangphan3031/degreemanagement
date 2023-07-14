import React from 'react';
import { Grid, Button, Tooltip } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import { IconX } from '@tabler/icons';

const DeleteButton = ({ handleClick }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <AnimateButton>
          <Tooltip title={t('button.delete')} placement="bottom">
            <Button color="error" variant="outlined" size="medium" onClick={handleClick}>
                <IconX /> {t('button.delete')}
            </Button>
          </Tooltip>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default DeleteButton;
