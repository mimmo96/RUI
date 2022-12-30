// material-ui
import { Box, Button, IconButton, Link, useMediaQuery } from '@mui/material';
import { GithubOutlined, FilePdfFilled} from '@ant-design/icons';
import {exportToPDF} from "../../../../utils/utilsPdf";

// project import
import HeadsUp from './HeadsUp';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            {!matchesXs && <HeadsUp />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {/*
            <IconButton
                component={Link}
                href="https://github.com/codedthemes/mantis-free-react-admin-template"
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
                <GithubOutlined />
            </IconButton>
            >*/}
            <IconButton onClick={exportToPDF}>
                <FilePdfFilled/>
            </IconButton>
            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;