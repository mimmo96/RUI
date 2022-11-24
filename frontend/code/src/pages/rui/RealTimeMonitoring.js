// material-ui
import { Typography } from '@mui/material';
// project import
import MainCard from 'components/MainCard';

import { useState, useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

function RealTimeMonitoring() {
    const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		fetch('/time').then(res => res.json()).then(data => {
			setCurrentTime(data.time);
		});
	}, []);
    
    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
                The current time is {currentTime}
            </Typography>
        </MainCard>
    );
}

export default RealTimeMonitoring;
