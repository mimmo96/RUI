// material-ui
import { Button, Fade, Menu, MenuItem, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function DropDownMenu() {
    const [anchor_el, setAnchorEl] = useState(null);
    const open = Boolean(anchor_el);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (e) => {
        setAnchorEl(null);
        console.log(e.currentTarget.firstChild.data);
    };

    return (
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
                <MenuItem onClick={handleSelect}>machine 1</MenuItem>
                <MenuItem onClick={handleSelect}>machine 2</MenuItem>
                <MenuItem onClick={handleSelect}>machine 3</MenuItem>
            </Menu>
        </div>
    );
}

export default DropDownMenu;