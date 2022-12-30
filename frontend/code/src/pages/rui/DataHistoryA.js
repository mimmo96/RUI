import {
    useState
} from 'react';

import {
    Grid
} from '@mui/material';

import DateSelection from './DateSelection';
import MachineChartSelector from './MachineChartSelector';
import PowerCharts from './PowerCharts';

// ======================================================================

function DataHistory() {

    const [dateSpan, setDateSpan] = useState([null, null]);

    const [selPower, setSelPower] = useState({
        'powerMin': false,
        'powerMax': false,
        'powerAvg': false,
        'powerPred': false,
        'energyCost': false
    });


    return (

        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={9} sx={{ mb: -2.25 }}>
                {(dateSpan[0] !== null && dateSpan[1] !== null) &&
                    <PowerCharts name='P01' dateSpan={dateSpan} selPower={selPower} />
                }
            </Grid>
            <Grid item xs={3} sx={{ mb: -2.25 }}>
                <DateSelection dateSpanSetter={setDateSpan} />
                <MachineChartSelector name='P01' pps={['A', 'B', 'C']} selPower={selPower} setSelPower={setSelPower}/>
            </Grid>
        </Grid>

    );

}


export default DataHistory;