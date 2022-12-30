import {
    useEffect,
    useState
} from 'react';

import {
    Skeleton,
    Menu,
    MenuItem
} from '@mui/material';

import dayjs from 'dayjs';

import ReactApexChart from 'react-apexcharts';

import utilsReport from 'utils/utilsReport';

// ======================================================================


function StateChart(props) {
    const dateSpan = props.dateSpan;

    const [series, setSeries] = useState(null);
    
    const [options, setOptions] = useState({
        chart: {
            id: 'switchCount',
            group: 'P01',
            animations: {
                enabled: false
            },
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom',
                tools: {
                    download: false
                }
            }
        },
        markers: {
            size: 3
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy, HH:mm'
            }
        },
        legend: {
            showForSingleSeries: true
        },
        title: {
            text: 'State switch counts',
            align: 'center'
        },
        xaxis: {
            type: "datetime",
            tickamount: 20,
            tooltip: {
                offsetY: 25
            }
        },
        yaxis: {
            decimalsInFloat: 0,
            title: {
                text: "Number of switches",
            }
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const setMachineLoading = props.setMachineLoading;

    useEffect(() => {
        var dateStart = dateSpan[0].format('YYYY-MM-DD HH:mm');
        var dateEnd   = dateSpan[1].format('YYYY-MM-DD HH:mm');

        setIsLoading(true);
        setMachineLoading(true);

        fetch('/get_data_session?' + new URLSearchParams({start_date:dateStart, end_date: dateEnd}))
        .then(res => res = res.json())
        .then(d => {
            let alarm = [];
            let idle = [];
            let working = [];

            d.map(function(currD) {
                alarm.push({
                    x: dayjs(currD['ts']).format(),
                    y: parseInt(currD['n_interval_alarm'])
                });
                idle.push({
                    x: dayjs(currD['ts']).format(),
                    y: parseInt(currD['n_interval_idle'])
                });
                working.push({
                    x: dayjs(currD['ts']).format(),
                    y: parseInt(currD['n_interval_working'])
                });
            });

            setSeries([
                {
                    name: 'Alarm',
                    type: 'bar',
                    data: alarm
                },
                {
                    name: 'Idling',
                    type: 'bar',
                    data: idle
                },
                {
                    name: 'Working',
                    type: 'bar',
                    data: working
                }
            ]);
            setIsLoading(false);
            setMachineLoading(false);
        });

    }, [dateSpan]);

    //---functions for context menu management---
    const [context_menu, setContextMenu] = useState(null);
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

    if(isLoading && series === null)
        return (
            <Skeleton animation="wave" height="100px"/>
        );
    else
        return (
            <ReactApexChart id="hist_switch" onContextMenu={handleContextMenu} series={series} options={options} type='bar' height='400px'>
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
                    <MenuItem onClick={function (){utilsReport.addElement(document.getElementById("hist_switch")); handleClose()}}>Add to report</MenuItem>
                    <MenuItem onClick={function (){utilsReport.removeElement(document.getElementById("hist_switch")); handleClose()}}>Remove from report</MenuItem>
                </Menu>
            </ReactApexChart>
        );

}

export default StateChart;