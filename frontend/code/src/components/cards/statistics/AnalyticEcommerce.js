import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

import {
    Menu,
    MenuItem
} from '@mui/material';

import { useState, useEffect} from 'react';
import utilsReport from "utils/utilsReport";

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //



function AnalyticEcommerce ({ id, color, title, count, percentage, isLoss, type, extra }) {
    const [context_menu, setContextMenu] = useState(null);

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            context_menu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

  return <div id={id}>
    <MainCard onContextMenu={handleContextMenu} contentSX={{ p: 2.25 }}>
        <Menu
            open={context_menu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                context_menu !== null
                    ? { top: context_menu.mouseY, left: context_menu.mouseX }
                    : undefined
            }
        >
            <MenuItem onClick={function (){utilsReport.addElement(document.getElementById(id)); handleClose()}}>Add to report</MenuItem>
            <MenuItem onClick={function (){utilsReport.removeElement(document.getElementById(id)); handleClose()}}>Remove from report</MenuItem>
        </Menu>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            icon={
                                <>
                                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="textSecondary">
                You {type} an extra{' '}
                <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                    {extra}
                </Typography>{' '}
                this month
            </Typography>
        </Box>
    </MainCard>
  </div>
}

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    type: PropTypes.string,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'primary'
};

export default AnalyticEcommerce;
