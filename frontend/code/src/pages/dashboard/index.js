import { useState, useEffect, useContext} from 'react';
import SLChart from './Sparklines';
import DonutChart from './DonutChartEnergy';
import {styled, makeStyles} from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined} from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';


// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [chart_energy, setChartEnergy] = useState(new Array(20).fill(0));
    const [chart_idle, setChartIdle] = useState(new Array(20).fill(0));
    const [chart_piece_count, setChartPieceCount] = useState(new Array(20).fill(0));

    const [chart_energy_2, setChartEnergy2] = useState(new Array(20).fill(0));
    const [chart_idle_2, setChartIdle2] = useState(new Array(20).fill(0));
    const [chart_piece_count_2, setChartPieceCount2] = useState(new Array(20).fill(0));

    const[time_point, setTimePoint] = useState(1);
    const[time_point_2, setTimePoint2] = useState(100);

    const [donut_chart_data, setDonutChartData] = useState(new Array(4).fill(0));

    const [flag, setFlag] = useState(false);

    const [hidMachine2, setHidMachine2] = useState("");

    const update_chart = (chart_data, new_value)=>{
        let new_data = [...chart_data, new_value];
        new_data.shift();
        return new_data;
    };

    const update_donut_chart = (new_donut_data)=>{
        setDonutChartData(new_donut_data);
    };

    const generate_donut_data = (data)=>{
        var max = data * 1.2;
        var min = data * 0.8;
        var array = [];
        for(let i = 0; i < 2; i++) {
            var new_data = Math.random() * (max - min) + min;
            array.push(~~new_data);
        }
        return array;
    };

    useEffect(() => {
        var asset= 'P01';
        const interval = setInterval(() => {
            fetch('/get_machines').then(res => res = res.json()).then(data => {
              if(data.length > 1)
                setFlag(true);

            });
            fetch('/get_real_time_data?' + new URLSearchParams({asset: asset, index: time_point})).then(res => res = res.json()).then(data => {
                var energy_avg = data[0].power_avg;
                var idle = 100 - data[0].idle_time;
                var piece_count = data[0].items;
                console.log(data);
                setTimePoint(time_point + 1);

                setChartEnergy(update_chart(chart_energy, energy_avg));
                setChartPieceCount(update_chart(chart_piece_count, piece_count));
                setChartIdle(update_chart(chart_idle, idle));

                var donut_data = generate_donut_data(energy_avg);
                update_donut_chart(donut_data);
            });
            fetch('/get_real_time_data?' + new URLSearchParams({asset: asset, index: time_point_2})).then(res => res = res.json()).then(data => {
                var energy_avg = data[0].power_avg;
                var idle = 100 - data[0].idle_time;
                var piece_count = data[0].items;
                setTimePoint2(time_point_2 + 1);

                setChartEnergy2(update_chart(chart_energy_2, energy_avg));
                setChartPieceCount2(update_chart(chart_piece_count_2, piece_count));
                setChartIdle2(update_chart(chart_idle_2, idle));

                var donut_data = generate_donut_data(energy_avg);
                update_donut_chart(donut_data);
            });
        }, 1000);
        return ()=>{
            clearInterval(interval);
        }
    }, [time_point, time_point_2]);

    return (
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>
            <Grid item xs={12}>
              <Typography variant="h5">Machine 1</Typography>
            </Grid>
            <Grid item xs={4}>
                <Item className = {'rep'}>
                    <SLChart data={chart_energy} series_type={'Energy Usage (kWh)'} id={"energy_usage_machine1"}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className={'rep'}>
                    <SLChart data={chart_idle} series_type={'Activity (%)'} id={"activity_machine1"}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className={'rep'}>
                    <SLChart data={chart_piece_count} series_type={'Piece Count'} id={"piece_count_machine1"}/>
                </Item>
            </Grid>
            {flag && <Grid container rowSpacing={3.5} columnSpacing={2.75}><Grid item xs={12}>
              <Typography variant="h5">Machine 2</Typography>
            </Grid>
            <Grid item xs={4}>
                <Item className={'rep'}>
                    <SLChart data={chart_energy_2} series_type={'Energy Usage (kWh)'} id={"energy_usage_machine2"}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className={'rep'}>
                    <SLChart data={chart_idle_2} series_type={'Activity (%)'} id={"activity_machine2"}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item className={'rep'}>
                    <SLChart data={chart_piece_count_2} series_type={'Piece Count'} id={"piece_count_machine2"}/>
                </Item>
            </Grid></Grid>}
            <Grid item xs={4}>

                <Item className={"rep"}>
                <Typography variant="h5">Total Energy Consumption</Typography>
                    <DonutChart series={donut_chart_data} machines={['machine1', 'machine2']} id={"energy_consumption"}/>
                </Item>
            </Grid>
            <Grid item xs={4}>
                <AnalyticEcommerce id = {"total_products"} title="Total Products Produced" type="made" count="40,236" percentage={59.3} extra="3,000" />
            </Grid>
            <Grid item xs={4}>
                <AnalyticEcommerce id={"total_energy"} title="Total Energy Consumed (kWh)" type="saved" count="2,549" isLoss color="warning" percentage={18} extra="300" />
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
