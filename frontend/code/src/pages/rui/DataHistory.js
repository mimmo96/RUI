// material-ui
import {Button, Typography } from '@mui/material';
// project import
import MainCard from 'components/MainCard';
import { useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

function DataHistory() {
    const [currentTime, setCurrentTime] = useState(0);

    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
            </Typography>
        </MainCard>
    );
}

export default DataHistory;
