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
    const [chart_activity_1, setChartActivity1] = useState(new Array(20).fill(0));
    const [chart_piece_count, setChartPieceCount] = useState(new Array(20).fill(0));

    const [chart_energy_2, setChartEnergy2] = useState(new Array(20).fill(0));
    const [chart_activity_2, setChartActivity2] = useState(new Array(20).fill(0));
    const [chart_piece_count_2, setChartPieceCount2] = useState(new Array(20).fill(0));

    const[time_point, setTimePoint] = useState(1);
    const[time_point_2, setTimePoint2] = useState(100);

    const [donut_chart_data, setDonutChartData] = useState(new Array(2).fill(0));

    const [flag, setFlag] = useState(false);

    const [first, setFirst] = useState(true);

    const [factory_energy, setFactoryEnergy] = useState(0);
    const [factory_products, setFactoryProducts] = useState(0);
    const [factory_activity, setFactoryActivity] = useState(0);

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

    const asset = 'P01';

    function startup(){
      fetch('/get_machines').then(res => res = res.json()).then(data => {
        if(data.length > 1)
          setFlag(true);

      });
      fetch('/get_real_time_data?' + new URLSearchParams({asset: asset, index: time_point})).then(res => res = res.json()).then(data => {
          var energy_avg = parseFloat(data[0].power_avg).toFixed(0);
          var activity_1 = 100 - data[0].idle_time;
          var piece_count = data[0].items;
          setTimePoint(time_point + 1);

          setChartEnergy(update_chart(chart_energy, energy_avg));
          setChartPieceCount(update_chart(chart_piece_count, piece_count));
          setChartActivity1(update_chart(chart_activity_1, activity_1));
      });
      if (flag){
        fetch('/get_real_time_data?' + new URLSearchParams({asset: asset, index: time_point_2})).then(res => res = res.json()).then(data => {
            var energy_avg_2 = parseFloat(data[0].power_avg).toFixed(0);
            var activity_2 = 100 - data[0].idle_time;
            var piece_count = data[0].items;
            setTimePoint2(time_point_2 + 1);

            setChartEnergy2(update_chart(chart_energy_2, energy_avg_2));
            setChartPieceCount2(update_chart(chart_piece_count_2, piece_count));
            setChartActivity2(update_chart(chart_activity_2, activity_2));
        });
      }
    }


    useEffect(() => {
        if(first){
          startup();
          setFirst(false);
        }
        const interval = setInterval(() => {
          startup();
        }, 1000);

        var chart_energy_num = parseFloat(chart_energy.at(-1)).toFixed(0);
        var chart_energy_2_num = parseFloat(chart_energy_2.at(-1)).toFixed(0);
        setFactoryEnergy(parseFloat(chart_energy_num) + parseFloat(chart_energy_2_num));
        setFactoryProducts(parseFloat(factory_products+chart_piece_count.at(-1)+chart_piece_count_2.at(-1)));
        setFactoryActivity((parseFloat(chart_activity_1.at(-1))+parseFloat(chart_activity_2.at(-1)))/2);

        update_donut_chart(new Array(parseFloat(chart_energy_num), parseFloat(chart_energy_2_num)));
        return ()=>{
            clearInterval(interval);
        }

    }, [time_point, time_point_2]);

    return (
        <Grid container rowSpacing={3.5} columnSpacing={2.75}>

          <Grid item xs={12}>
            <Typography variant="h5">FACTORY</Typography>
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce id = {"total_energy_factory"} title="Energy Usage (kWh)" count={factory_energy.toString()} />
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce id = {"activity_factory"} title="Activity (%)" isActivity={true} count={factory_activity.toString()} />
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce id = {"total_products_factory"} title="Products made" count={factory_products.toString()} />
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce id = {"FIX"} title="Price per product" count={"$5.79(I'm not real..)"} />
          </Grid>

          {flag && <Grid item xs={4}>
            <Item className={"rep"}>
            <Typography variant="h5">Total Energy Consumption</Typography>
                <DonutChart series={donut_chart_data} machines={['P01', 'P02']} id={"energy_consumption"}/>
            </Item>
          </Grid>}

          <Grid item xs={4}>
              <AnalyticEcommerce id = {"cycle_time_PP1"} analytics={true} title="Cycle Time of PP1 (sec)" type="saved" count="40" percentage={7.5} extra="3" />
              <br/>
              <AnalyticEcommerce id={"energy_PP2"} analytics={true} title="Energy Consumed in PP2 (kWh)" type="saved" count="2549" percentage={11.7} extra="300" />
          </Grid>
          <Grid item xs={4}>
              <AnalyticEcommerce id = {"energy_PP1"} analytics={true} title="Energy Consumed of PP1 (sec)" type="saved" count="2549" percentage={11.7} extra="300" />
              <br/>
              <AnalyticEcommerce id={"cycle_time_PP2"} analytics={true} title="Cycle Time of PP2 (kWh)" type="saved" count="20" percentage={7.5} extra="1.5" />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5">P01</Typography>
          </Grid>

          <Grid item xs={4}>
              <Item className = {'rep'}>
                  <SLChart data={chart_energy} series_type={'Energy Usage (kWh)'} id={"energy_usage_machine1"}/>
              </Item>
          </Grid>

          <Grid item xs={4}>
              <Item className={'rep'}>
                  <SLChart data={chart_activity_1} series_type={'Activity (%)'} id={"activity_machine1"}/>
              </Item>
          </Grid>

          <Grid item xs={4}>
              <Item className={'rep'}>
                  <SLChart data={chart_piece_count} series_type={'Piece Count'} id={"piece_count_machine1"}/>
              </Item>
          </Grid>


          {flag && <Grid item xs={12}>
            <Typography variant="h5">P02</Typography>
          </Grid>}

          {flag && <Grid item xs={4}>
              <Item className={'rep'}>
                  <SLChart data={chart_energy_2} series_type={'Energy Usage (kWh)'} id={"energy_usage_machine2"}/>
              </Item>
          </Grid>}

          {flag && <Grid item xs={4}>
              <Item className={'rep'}>
                  <SLChart data={chart_activity_2} series_type={'Activity (%)'} id={"activity_machine2"}/>
              </Item>
          </Grid>}

          {flag && <Grid item xs={4}>
              <Item className={'rep'}>
                  <SLChart data={chart_piece_count_2} series_type={'Piece Count'} id={"piece_count_machine2"}/>
              </Item>
          </Grid>}

        </Grid>
    );
};

export default DashboardDefault;
