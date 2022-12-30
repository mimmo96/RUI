import React from 'react';
import {useState, useEffect} from 'react';
import {Grid, Typography} from '@mui/material'
import PieceCount from "./PieceCount";
import EnergyActivityGraph from "./EnergyActivityGraph";
import Alarms from "./Alarms";

function MachineRealTime(props) {
    const asset = 'P01';
    //state variables
    const [time_point, setTimePoint] = useState(window.time_point);
    const [chart_energy, setChartEnergy] = useState([]);
    const [chart_energy_cost, setChartEnergyCost] = useState([]);
    const [chart_activity, setChartActivity] = useState([]);
    const [chart_piece_count, setChartPieceCount] = useState([[], []]);
    const [min_range, setMinRange] = useState(new Date());
    const [chart_alarms, setChartAlarms] = useState([]);
    const [total_items, setTotalItems] = useState([]);
    const [total_alarms, setTotalAlamrs] = useState([[],[],[],[]]);
    const [sum_alarms, setSumAlarms] = useState([0,0,0,0]);

    //function to add the new data in real time
    const update_chart = (chart_data, timestamp ,new_value) => {
        let new_data = [...chart_data, [timestamp, new_value]];
        if(new_data.length >= props.time_range * 60){
            new_data = new_data.slice(new_data.length - (props.time_range * 60), new_data.length);
        }
        return new_data;
    };
    //to update alarms data that has different format (to be improved)
    const update_alarm = (chart_data, new_value) => {
        let new_data = [...chart_data, new_value];
        return new_data;
    };
    //to update the cumulative alarms count in the last four hours
    const update_total_alarms = (total_alarms, new_value) => {
        let new_data = total_alarms.slice();
        for(let i = 0; i < new_data.length; i++){
            new_data[i].push(new_value[i]);
            if(new_data[i].length >= props.time_range * 60){
                new_data[i] = new_data[i].slice(new_data[i].length - (props.time_range * 60), new_data[i].length);
            }

        }
        return new_data;
    };

    const sum_array = (array) => {
        let sum = 0;
        for(let i = 0; i < array.length; i++){
            sum += array[i];
        }
        return sum;
    };

    useEffect(() => {
        fetch('/get_real_time_data?' + new URLSearchParams({asset:asset, index: window.time_point})).then(res => res = res.json()).then(data => {
            let time = data[0].ts;
            setChartAlarms(update_alarm(chart_alarms, {x: 'alarm 1', y: [time, time]}));
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/get_real_time_data?' + new URLSearchParams({asset:asset, index: time_point})).then(res => res = res.json()).then(data => {
                let idle = 100 - data[0].idle_time;
                let time = Date.parse(data[0].ts);

                //update series
                setTimePoint(time_point => time_point + 1);
                setChartEnergy(update_chart(chart_energy, time, data[0].power_avg));
                setChartEnergyCost(update_chart(chart_energy_cost, time, data[0].energy_cost));
                setChartActivity(update_chart(chart_activity, time, idle));
                if(data[0].part_program === 1){
                    setChartPieceCount([update_chart(chart_piece_count[0], time, data[0].items), update_chart(chart_piece_count[1], time, 0)]);
                }else if(data[0].part_program === 2){
                    setChartPieceCount([update_chart(chart_piece_count[0], time, 0), update_chart(chart_piece_count[1], time, data[0].items)]);

                }else{
                    setChartPieceCount([update_chart(chart_piece_count[0], time, 0), update_chart(chart_piece_count[1], time, 0)]);

                }
                // generate fake alarms data to show something
                let alarms_data = new Array(4).fill(0);
                for(let i = 0; i < alarms_data.length; i++){
                    let choice = Math.floor(Math.random() * 50);
                    if(choice === 1){
                        alarms_data[i] = Math.floor(Math.random() * 60);
                    }
                }
                //handle alarms data
                setMinRange(time);
                for(let i = 0; i < alarms_data.length; i++){
                    if(alarms_data[i] != 0){
                        let new_value = {x: 'alarm ' + (i + 1), y: [time, time + (alarms_data[i]) * 1000]};
                        setChartAlarms(update_alarm(chart_alarms, new_value));
                    }
                }

                setTotalItems([sum_array(chart_piece_count[0].map(x => x[1])), sum_array(chart_piece_count[1].map(x => x[1]))]);
                setTotalAlamrs(update_total_alarms(total_alarms, alarms_data));
                let sums = new Array(4).fill(0);
                for(let i = 0; i < sum_alarms.length; i++){
                    sums[i] = sum_array(total_alarms[i]);
                }
                setSumAlarms(sums);
                window.time_point = time_point;
                console.log(window.time_point);
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [time_point]);

    return(
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={12}>
                <EnergyActivityGraph machine={props.machine} data={{chart_energy: chart_energy, chart_activity: chart_activity, chart_energy_cost: chart_energy_cost}}/>
            </Grid>
            <Grid item xs={12}>
                <PieceCount machine={props.machine} data={chart_piece_count} total_items={total_items} time_range={props.time_range}/>
            </Grid>
            <Grid item xs={12}>
                <Alarms machine={props.machine} data={chart_alarms} min={min_range - 3600000} max={min_range} cumulative_data={sum_alarms} time_range={props.time_range}/>
            </Grid>
        </Grid>
    );
}

export default MachineRealTime;