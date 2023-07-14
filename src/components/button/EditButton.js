import React from 'react';
import { Grid, Button, Tooltip } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import { IconCheck } from '@tabler/icons';

const EditButton = ({ handleClick }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <AnimateButton>
          <Tooltip title={t('button.edit')} placement="bottom">
            <Button color="info" variant="outlined" size="medium" onClick={handleClick}>
                <IconCheck /> {t('button.edit')}
            </Button>
          </Tooltip>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default EditButton;
