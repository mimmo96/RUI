import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect} from 'react';
import {
  Menu,
  MenuItem
} from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
// third-party
import ReactApexChart from 'react-apexcharts';
import utilsReport from "../../utils/utilsReport";

function SLChart(props){
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

  const series = [
    {
      //name: props.series_type,
      data: props.data
    }
  ];

  const options = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    xaxis: {
      categories: ([...Array(20).keys()].map(n => `${n} min ago`)).reverse(), //to decide
    },
    title: {
      text: props.data[props.data.length - 1],
      align: 'left',
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: props.series_type,
      offsetX: 0,
      style: {
        fontSize: '14px',
      }
    }
  };

  return <div id={props.id}>
    <Chart onContextMenu={handleContextMenu} options={options} series={series} type={'area'} height={160}>
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
        <MenuItem onClick={function (){utilsReport.addElement(document.getElementById(props.id)); handleClose()}}>Add to report</MenuItem>
        <MenuItem onClick={function (){utilsReport.removeElement(document.getElementById(props.id)); handleClose()}}>Remove from report</MenuItem>
      </Menu>
    </Chart>
  </div>
}


export default SLChart;
