import PropTypes from 'prop-types';
import React from 'react';
import {
    Menu,
    MenuItem
} from '@mui/material';

import { useState, useEffect} from 'react';
import utilsReport from "../../utils/utilsReport";

// material-ui
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';

function DonutChart({machines, series, id}) {
    const [context_menu, setContextMenu] = useState(null);

    //---functions for context menu management---
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

    const handleClose = () => {
        setContextMenu(null);
    };

    //---chart properties---
    const options = {
        chart: {
            height: 250
        },
        labels: machines,
        dataLabels: {
            dropShadow: {
                blur: 3,
                opacity: 0.8
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true
                        }
                    }
                }
            }
        },
    }

    return <div id={id}>
        <Chart onContextMenu={handleContextMenu} options={options} series={series} type={'donut'}>
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
        </Chart>
    </div>
}

export default DonutChart;
