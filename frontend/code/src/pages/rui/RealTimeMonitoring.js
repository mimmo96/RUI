// material-ui
import { Button, Fade, FormControl, Grid, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material';
import {styled, makeStyles} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// project import
import MachineRealTime from "../../components/rui_components/MachineRealTime";

import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function RealTimeMonitoring() {
    const [anchor_el, setAnchorEl] = useState(null);
    const [machine, setMachine] = useState('P01');
    const [time_range, setTimeRange] = useState(1);
    const open = Boolean(anchor_el);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (e) => {
        setAnchorEl(null);
        setMachine(e.currentTarget.firstChild.data);
    };

    const handleChange = (e) => {
        setTimeRange(e.target.value);
    };

    return (
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={6}>
                <div>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Choose machine
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchor_el}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleSelect}>P01</MenuItem>
                        <MenuItem onClick={handleSelect}>P02</MenuItem>
                    </Menu>
                </div>
            </Grid>
            <Grid item xs={6}>
                <FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select data range</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={time_range}
                            label="time_interval"
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>1 Hour</MenuItem>
                            <MenuItem value={2}>2 Hours</MenuItem>
                            <MenuItem value={4}>4 Hours</MenuItem>
                            <MenuItem value={6}>6 Hours</MenuItem>
                        </Select>
                    </FormControl>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Item>
                    <MachineRealTime machine={machine} time_range={time_range}/>
                </Item>
            </Grid>
        </Grid>

    );
}

export default RealTimeMonitoring;

