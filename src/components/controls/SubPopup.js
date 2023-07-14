import { Dialog, DialogContent, DialogTitle, Slide, IconButton, Tooltip, Grid } from '@mui/material';
import { forwardRef } from 'react';
// import MuiTypography from '@mui/material/Typography';
import { IconX } from '@tabler/icons';
import AnimateButton from 'components/extended/AnimateButton';
import { setOpenSubPopup } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} timeout={700} />;
});

export default function SubPopup(props) {
  const { t } = useTranslation()
  const { title, children, openSubPopup, maxWidth, bgcolor } = props;
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(setOpenSubPopup(false));
  };

  return (
    <div>
      <Dialog
        open={openSubPopup}
        TransitionComponent={Transition}
        keepMounted
        fullWidth= {true}
        maxWidth={maxWidth || "sm"}
        style={{ mb: '10%' }}
      >
        <DialogTitle bgcolor={bgcolor} display={'flex'}>
          <Grid container spacing={1} direction="row">
          <Grid item color={'#fff'} sx={{fontSize: '20px'}}>
            {title}
          </Grid>
          <Grid item sx={{ ml: 'auto' }}>
            <AnimateButton>
              <Tooltip title={t('button.close')} placement="bottom">
                <IconButton size='small' style={{ color: 'white' }} onClick={handleCloseClick}>
                  <IconX fontSize="large" />
                </IconButton>
              </Tooltip>
            </AnimateButton>
          </Grid>
        </Grid>
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
