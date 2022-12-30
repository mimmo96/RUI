import React from 'react';
import { useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import {Grid, Typography} from '@mui/material';

function EnergyActivityGraph(props) {

    const series = [
        {
            name: 'energy_usage',
            type: 'line',
            data: props.data.chart_energy
        },
        {
            name: 'activity',
            type: 'line',
            data: props.data.chart_activity
        },
        {
            name: 'energy_cost',
            type: 'line',
            data: props.data.chart_energy_cost
        }
    ];

    const options = {
        colors: ['#008FFB', '#00E396', '#FF0000'],
            chart: {
                height: 150,
                type: 'line',
                stacked: false,
                animations: {
                    enabled: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [3, 3, 3]
            },
            title: {
                text: 'Energy usage and activity ' + props.machine,
                align: 'left',
                offsetX: 0,
                style: {
                    fontSize:  '22px',
                    fontWeight:  'bold',
                },
            },
            xaxis: {
                type: 'datetime'

            },
            yaxis: [
                {
                    seriesName: 'energy_usage',
                    decimalsInFloat: 0,
                    title: {
                        text: 'energy usage',
                        style: {
                            color: '#008FFB',
                            fontSize: '14px',
                        },
                    },
                    axisBorder: {
                        show: true,
                        color: '#008FFB',
                        width: 0
                    },
                },
                {
                    decimalsInFloat: 0,
                    tickAmount: 4,
                    opposite: true,
                    min: 0,
                    max: 100,
                    axisBorder: {
                        show: true,
                        color: '#00E396',
                        width: 0
                    },
                    title: {
                        text: 'activity (%)',
                        style: {
                            color: '#00E396',
                            fontSize: '14px',
                        },
                    },

                    seriesName: 'activity'
                },
                {
                    decimalsInFloat: 3,
                    seriesName: 'energy_cost',
                    title: {
                        text: 'energy cost',
                        style: {
                            color: '#FF0000',
                            fontSize: '14px',
                        }
                    },
                    axisBorder: {
                        show: true,
                        color: '#FF0000',
                        width: 0,
                    },
                    labels: {
                        style: {
                            color: '#FF0000',
                        }
                    },
                },
            ],
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            },
            tooltip: {
                x: {
                    show: true,
                    format: 'H:m',
                },
            }
        };

    return(
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={12}>
                <Chart series={series} options={options} type={'line'} height={300}/>
            </Grid>
        </Grid>

    );
}

export default EnergyActivityGraph;