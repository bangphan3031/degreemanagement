import React from 'react';
import { Grid, Button, Tooltip } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import { IconBan } from '@tabler/icons';

const NoButton = ({ handleClick }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <AnimateButton>
          <Tooltip title={t('button.no')} placement="bottom">
            <Button color="info" variant="contained" size="medium" onClick={handleClick}>
                <IconBan /> {t('button.no')}
            </Button>
          </Tooltip>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default NoButton;
