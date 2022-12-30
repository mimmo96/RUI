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


function TimeChart(props) {
    const dateSpan = props.dateSpan;    
    const selTime = props.selTime;

    const [allSeries, setAllSeries] = useState(null);
    const [pp1Mean, setPP1Mean] = useState(null);
    const [pp1Var, setPP1Var] = useState(null);
    const [pp2Mean, setPP2Mean] = useState(null);
    const [pp2Var, setPP2Var] = useState(null);

    const updateAllSeries = () => {
        let allS = [];

        if(pp1Mean !== null && selTime['pp1_mean'])
            allS = allS.concat(pp1Mean);
        if(pp1Var !== null && selTime['pp1_var'])
            allS = allS.concat(pp1Var);

        if(pp2Mean !== null && selTime['pp2_mean'])
            allS = allS.concat(pp2Mean);
        if(pp2Var !== null && selTime['pp2_var'])
            allS = allS.concat(pp2Var);

        setAllSeries(allS);
        setIsLoading(false);
        setMachineLoading(false);
    };
    
    const [options, setOptions] = useState({
        chart: {
            id: 'time',
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
        stroke: {
            width: 3,
            curve: 'stepline'
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
            text: 'Production time cycles',
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
                text: "Time Cycle (s)",
            }
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const setMachineLoading = props.setMachineLoading;

    useEffect(() => {
        updateAllSeries();
    }, [selTime]);

    useEffect(() => {
        var dateStart = dateSpan[0].format('YYYY-MM-DD HH:mm');
        var dateEnd   = dateSpan[1].format('YYYY-MM-DD HH:mm');

        setIsLoading(true);
        setMachineLoading(true);

        fetch('/get_data_part_program?' + new URLSearchParams({start_date:dateStart, end_date: dateEnd}))
        .then(res => res = res.json())
        .then(d => {

            var pp1_mean = [];
            var pp2_mean = [];
            d.map(function(currD) {
                if(currD['part_program'] == 1)
                    pp1_mean.push({
                        x: dayjs(currD['ts']).format(),
                        y: parseFloat(currD['cycle_time_mean'])
                    });
                else if(currD['part_program'] == 2)
                    pp2_mean.push({
                        x: dayjs(currD['ts']).format(),
                        y: parseFloat(currD['cycle_time_mean'])
                    });
            });

            setPP1Mean({
                    name: 'PP1 mean',
                    type: 'line',
                    data: pp1_mean
            });

            setPP2Mean({
                    name: 'PP2 mean',
                    type: 'line',
                    data: pp2_mean
            });

            var pp1_var = [];
            var pp2_var = [];
            d.map(function(currD) {
                if(currD['part_program'] == 1)
                    pp1_var.push({
                        x: dayjs(currD['ts']).format(),
                        y: Math.sqrt(parseFloat(currD['cycle_time_var']))
                    });
                else if(currD['part_program'] == 2)
                    pp2_var.push({
                        x: dayjs(currD['ts']).format(),
                        y: Math.sqrt(parseFloat(currD['cycle_time_var']))
                    });
            });

            setPP1Var({
                    name: 'PP1 deviation',
                    type: 'line',
                    data: pp1_var
            });

            setPP2Var({
                    name: 'PP2 deviation',
                    type: 'line',
                    data: pp2_var
            });
            
            updateAllSeries();
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

    if(isLoading && allSeries === null)
        return (
            <Skeleton animation="wave" height="100px"/>
        );
    else
        return (
            <ReactApexChart id="hist_time" onContextMenu={handleContextMenu} series={allSeries} options={options} type='line' height='400px'>
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
                    <MenuItem onClick={function (){utilsReport.addElement(document.getElementById("hist_time")); handleClose()}}>Add to report</MenuItem>
                    <MenuItem onClick={function (){utilsReport.removeElement(document.getElementById("hist_time")); handleClose()}}>Remove from report</MenuItem>
                </Menu>
            </ReactApexChart>
        );

}

export default TimeChart;