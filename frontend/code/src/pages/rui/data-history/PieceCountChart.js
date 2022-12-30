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


function PieceCountChart(props) {
    const dateSpan = props.dateSpan;    
    const selPieceCount = props.selPieceCount;

    const [allSeries, setAllSeries] = useState(null);
    const [pp1Count, setpp1Count] = useState(null);
    const [pp2Count, setpp2Count] = useState(null);

    const updateAllSeries = () => {
        let allS = [];

        if(pp1Count !== null && selPieceCount['pp1'])
            allS = allS.concat(pp1Count);
        if(pp2Count !== null && selPieceCount['pp2'])
            allS = allS.concat(pp2Count);

        setAllSeries(allS);
        setIsLoading(false);
        setMachineLoading(false);
    };

    const [options, setOptions] = useState({
        chart: {
            id: 'count',
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
            text: 'Production counts',
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
                text: "Number of pieces",
            }
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const setMachineLoading = props.setMachineLoading;

    useEffect(() => {
        updateAllSeries();
    }, [selPieceCount]);

    useEffect(() => {
        var dateStart = dateSpan[0].format('YYYY-MM-DD HH:mm');
        var dateEnd   = dateSpan[1].format('YYYY-MM-DD HH:mm');

        setIsLoading(true);
        setMachineLoading(true);

        fetch('/get_data_part_program?' + new URLSearchParams({start_date:dateStart, end_date: dateEnd}))
        .then(res => res = res.json())
        .then(d => {

            var pp1_count = [];
            var pp2_count = [];
            d.map(function(currD) {
                if(currD['part_program'] == 1)
                    pp1_count.push({
                        x: dayjs(currD['ts']).format(),
                        y: parseInt(currD['item_total'])
                    });
                else if(currD['part_program'] == 2)
                    pp2_count.push({
                        x: dayjs(currD['ts']).format(),
                        y: parseInt(currD['item_total'])
                    });
            });

            setpp1Count({
                    name: 'PP1',
                    type: 'bar',
                    data: pp1_count
            });

            setpp2Count({
                    name: 'PP2',
                    type: 'bar',
                    data: pp2_count
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
            <ReactApexChart id="hist_count" onContextMenu={handleContextMenu} series={allSeries} options={options} type='bar' height='400px'>
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
                    <MenuItem onClick={function (){utilsReport.addElement(document.getElementById("hist_count")); handleClose()}}>Add to report</MenuItem>
                    <MenuItem onClick={function (){utilsReport.removeElement(document.getElementById("hist_count")); handleClose()}}>Remove from report</MenuItem>
                </Menu>
            </ReactApexChart>
        );

}

export default PieceCountChart;