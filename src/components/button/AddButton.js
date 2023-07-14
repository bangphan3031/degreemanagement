import React from 'react';
import { Grid, Button, Tooltip } from '@mui/material';
import AnimateButton from 'components/extended/AnimateButton';
import { useTranslation } from 'react-i18next';
import { IconPlus } from '@tabler/icons';

const AddButton = ({ handleClick }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <AnimateButton>
          <Tooltip title={t('button.title.add')} placement="bottom">
            <Button color="info" variant="outlined" size="medium" onClick={handleClick}>
                <IconPlus /> {t('button.label.add')}
            </Button>
          </Tooltip>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default AddButton;
