import {
    useState
} from 'react';

import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from '@mui/material';

import {
    SettingOutlined,
    LoadingOutlined
} from '@ant-design/icons';

import DateSelection from './DateSelection';
import MachineChartSelector from './MachineChartSelector';
import PowerChart from './PowerChart';
import TimeChart from './TimeChart';
import PieceCountChart from './PieceCountChart';
import StateChart from './StateChart';
import Loader from 'components/Loader';

// ======================================================================

function DataHistory() {

    const [dateSpan, setDateSpan] = useState([null, null]);

    const [selPower, setSelPower] = useState({
        'mean': false,
        'var': false,
        'pp1_mean': false,
        'pp1_var': false,
        'pp2_mean': false,
        'pp2_var': false,
    });

    const [selActivityPerc, setSelActivityPerc] = useState(false);

    const [selSwitchCount, setSelSwitchCount] = useState(false);

    const [selAlarm, setSelAlarm] = useState(false);

    const [selTime, setSelTime] = useState({
        'pp1_mean': false,
        'pp1_var': false,
        'pp2_mean': false,
        'pp2_var': false,
    });

    const [selPieceCount, setSelPieceCount] = useState({
        'pp1': false,
        'pp2': false
    })

    const [isMachineLoading, setMachineLoading] = useState(false);

    const atLeastOneSel = () => {
        return (
            selPower['mean'] ||
            selPower['var'] ||
            selPower['pp1_mean'] ||
            selPower['pp1_var'] ||
            selPower['pp2_mean'] ||
            selPower['pp2_var'] ||
            selActivityPerc ||
            selSwitchCount ||
            selAlarm ||
            selTime['pp1_mean'] ||
            selTime['pp1_var'] ||
            selTime['pp2_mean'] ||
            selTime['pp2_var'] ||
            selPieceCount['pp1'] ||
            selPieceCount['pp2']
        );
    };

    const atLeastOneSelPower = () => {
        return (
            selPower['mean'] ||
            selPower['var'] ||
            selPower['pp1_mean'] ||
            selPower['pp1_var'] ||
            selPower['pp2_mean'] ||
            selPower['pp2_var']
        );
    };

    const atLeastOneSelTime = () => {
        return (
            selTime['pp1_mean'] ||
            selTime['pp1_var'] ||
            selTime['pp2_mean'] ||
            selTime['pp2_var']
        );
    }

    const atLeastOneSelPC = () => {
        return(
            selPieceCount['pp1'] || selPieceCount['pp2']
        );
    }


    return (

        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={9} sx={{ mb: -2.25 }}>
                {atLeastOneSel() && dateSpan[0] !== null && dateSpan[1] !== null &&
                    <Card>
                        <CardContent>
                            <Typography variant="overline" gutterBottom>
                                { isMachineLoading && <Loader/> }
                                { isMachineLoading?
                                    <LoadingOutlined style={{'verticalAlign':'0.05em', 'margin': '0 6px 0 0'}}/>
                                :
                                    <SettingOutlined style={{'verticalAlign':'0.05em', 'margin': '0 6px 0 0'}}/>
                                }
                                Machine data: P01
                            </Typography>
                            <Stack spacing={2}>
                                { (selSwitchCount) &&
                                    <StateChart dateSpan={dateSpan} setMachineLoading={setMachineLoading}/>
                                }
                                { (atLeastOneSelPower()) &&
                                    <PowerChart dateSpan={dateSpan} selPower={selPower} setMachineLoading={setMachineLoading}/>
                                }
                                { (atLeastOneSelTime()) &&
                                    <TimeChart dateSpan={dateSpan} selTime={selTime} setMachineLoading={setMachineLoading}/>
                                }
                                { (atLeastOneSelPC()) &&
                                    <PieceCountChart dateSpan={dateSpan} selPieceCount={selPieceCount} setMachineLoading={setMachineLoading}/>
                                }
                            </Stack>
                        </CardContent>
                    </Card>
                }
            </Grid>
            <Grid item xs={3} sx={{ mb: -2.25 }}>
                <DateSelection dateSpanSetter={setDateSpan} />
                <MachineChartSelector
                    selPower={selPower} setSelPower={setSelPower}
                    selActivityPerc={selActivityPerc} setSelActivityPerc={setSelActivityPerc}
                    selSwitchCount={selSwitchCount} setSelSwitchCount={setSelSwitchCount}
                    selAlarm={selAlarm} setSelAlarm={setSelAlarm}
                    selTime={selTime} setSelTime={setSelTime}
                    selPieceCount={selPieceCount} setSelPieceCount={setSelPieceCount}
                    setMachineLoading={setMachineLoading}
                />
            </Grid>
        </Grid>

    );

}


export default DataHistory;
