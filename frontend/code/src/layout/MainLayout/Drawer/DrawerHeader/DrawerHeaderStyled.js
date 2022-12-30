// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingUp: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
}));

export default DrawerHeaderStyled;
