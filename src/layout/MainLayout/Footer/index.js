import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';

const FooterWrapper = styled('footer')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

const Footer = () => {
  return (
    <FooterWrapper sx={{mr: '40px', ml:'40px'}}>
      <footer style={{ display: 'flex', justifyContent: 'space-between', height: '30px' }}>
        <span>&copy; berrydashboard.io</span>
        <a
          href="https://khanhhoa.vnpt.vn/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '5px', textDecoration: 'none' }}
        >
          &copy; khanhhoa.vnpt.vn
        </a>
      </footer>
    </FooterWrapper>
  );
};

export default Footer;
