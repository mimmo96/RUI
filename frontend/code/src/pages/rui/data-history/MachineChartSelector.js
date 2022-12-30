import {
    useState,
    Fragment
} from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    Typography
} from '@mui/material';

import {
    DownOutlined,
    SettingOutlined
} from '@ant-design/icons';

import Android12Switch from "./Android12Switch";

// ======================================================================


function MachineChartSelector(props) {

    const [globalSel, setGlobalSel] = useState([false, false]);

    const onChangeGlobal = (event) => {
        const val = event.target.checked;

        props.setSelPower({
            'mean': val,
            'var': val,
            'pp1_mean': val,
            'pp1_var': val,
            'pp2_mean': val,
            'pp2_var': val
        });

        props.setSelActivityPerc(val);
        props.setSelActivityNum(val);
        props.setSelAlarm(val);

        props.setSelTime({
            'pp1_mean': val,
            'pp1_var': val,
            'pp2_mean': val,
            'pp2_var': val
        })

        props.setSelPieceCount({
            'pp1': val,
            'pp2': val
        })

        setGlobalSel([val, false]);
    }

    const handlePowerMean = (event) => {
        props.setSelPower({...props.selPower, 'mean': event.target.checked});
    };   

    const handlePowerVar = (event) => {
        props.setSelPower({...props.selPower, 'var': event.target.checked});
    };

    const handlePowerMeanPP1 = (event) => {
        props.setSelPower({...props.selPower, 'pp1_mean': event.target.checked});
    };   

    const handlePowerVarPP1 = (event) => {
        props.setSelPower({...props.selPower, 'pp1_var': event.target.checked});
    };

    const handleTimeMeanPP1 = (event) => {
        props.setSelTime({...props.selTime, 'pp1_mean': event.target.checked});
    };   

    const handleTimeVarPP1 = (event) => {
        props.setSelTime({...props.selTime, 'pp1_var': event.target.checked});
    };

    const handleTimeMeanPP2 = (event) => {
        props.setSelTime({...props.selTime, 'pp2_mean': event.target.checked});
    };   

    const handleTimeVarPP2 = (event) => {
        props.setSelTime({...props.selTime, 'pp2_var': event.target.checked});
    };

    const handlePowerMeanPP2 = (event) => {
        props.setSelPower({...props.selPower, 'pp2_mean': event.target.checked});
    };   

    const handlePowerVarPP2 = (event) => {
        props.setSelPower({...props.selPower, 'pp2_var': event.target.checked});
    };

    const handleCountPP1 = (event) => {
        props.setSelPieceCount({...props.selPieceCount, 'pp1': event.target.checked});
    };
    
    const handleCountPP2 = (event) => {
        props.setSelPieceCount({...props.selPieceCount, 'pp2': event.target.checked});
    };

    const handleSwitchCount= (event) => {
        props.setSelSwitchCount(event.target.checked);
    };
    
    /*const handleAlarm = (event) => {
        props.setSelAlarm(event.target.checked);
    };*/


    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
            expandIcon={<DownOutlined />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <FormControlLabel
                    label={<Fragment><SettingOutlined style={{'verticalAlign':'0.1em', 'padding': '0 6px 0 0'}}/>Machine data: {props.name}</Fragment>}
                    control={
                        <Checkbox
                        checked={globalSel[0]}
                        indeterminate={globalSel[1]}
                        onChange={onChangeGlobal}
                        size='small'
                        style={{'padding':'0px 14px 0px 8px'}}
                        />}
                    />
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Status</Typography></Divider>
                        <FormControlLabel
                            label="State Switches Count"
                            control={<Android12Switch checked={props.selSwitchCount} onChange={handleSwitchCount} />}
                        />
                        {/*<FormControlLabel
                            label="Alarms"
                            control={<Android12Switch checked={props.selAlarm} onChange={handleAlarm} />}
                        />*/}
                    </Box></div>
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2 }}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Power consumption</Typography></Divider>
                        <FormControlLabel
                            label="Machine Mean"
                            control={<Android12Switch checked={props.selPower['mean']} onChange={handlePowerMean} />}
                        />
                        <FormControlLabel
                            label="Machine Deviation"
                            control={<Android12Switch checked={props.selPower['var']} onChange={handlePowerVar} />}
                        />
                        <FormControlLabel
                            label="PP1 Mean"
                            control={<Android12Switch checked={props.selPower['pp1_mean']} onChange={handlePowerMeanPP1} />}
                        />
                        <FormControlLabel
                            label="PP1 Deviation"
                            control={<Android12Switch checked={props.selPower['pp1_dev']} onChange={handlePowerVarPP1} />}
                        />
                        <FormControlLabel
                            label="PP2 Mean"
                            control={<Android12Switch checked={props.selPower['pp2_mean']} onChange={handlePowerMeanPP2} />}
                        />
                        <FormControlLabel
                            label="PP2 Deviation"
                            control={<Android12Switch checked={props.selPower['pp2_dev']} onChange={handlePowerVarPP2} />}
                        />
                    </Box></div>
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Production times</Typography></Divider>
                        <FormControlLabel
                            label="PP1 Mean Cycle Time"
                            control={<Android12Switch checked={props.selTime['pp1_mean']} onChange={handleTimeMeanPP1} />}
                        />
                        <FormControlLabel
                            label="PP1 Variance Cycle Time"
                            control={<Android12Switch checked={props.selTime['pp1_var']} onChange={handleTimeVarPP1} />}
                        />
                        <FormControlLabel
                            label="PP2 Mean Cycle Time"
                            control={<Android12Switch checked={props.selTime['pp2_mean']} onChange={handleTimeMeanPP2} />}
                        />
                        <FormControlLabel
                            label="PP2 Variance Cycle Time"
                            control={<Android12Switch checked={props.selTime['pp2_var']} onChange={handleTimeVarPP2} />}
                        />
                    </Box></div>
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Production counts</Typography></Divider>
                        <FormControlLabel
                            label="PP1 Piece Count"
                            control={<Android12Switch checked={props.selPieceCount['pp1']} onChange={handleCountPP1} />}
                        />
                        <FormControlLabel
                            label="PP2 Piece Count"
                            control={<Android12Switch checked={props.selPieceCount['pp2']} onChange={handleCountPP2} />}
                        />
                    </Box></div>
                    
                    {/*
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Status</Typography></Divider>
                        <FormControlLabel
                            label="Activity (%)"
                            control={<Android12Switch checked={props.selActivityPerc} onChange={handleActivityPerc} />}
                        />
                        <FormControlLabel
                            label="Activity (#)"
                            control={<Android12Switch checked={props.selActivityNum} onChange={handleActivityNum} />}
                        />
                        <FormControlLabel
                            label="Alarms"
                            control={<Android12Switch checked={props.selAlarm} onChange={handleAlarm} />}
                        />
                    </Box></div>
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Part program 1</Typography></Divider>
                        <FormControlLabel
                            label="Total Power Consumption"
                            control={<Android12Switch checked={selPower['pp1_total']} onChange={handlePowerMinPP1} />}
                        />
                        <FormControlLabel
                            label="Mean Power Consumption"
                            control={<Android12Switch checked={selPower['pp1_mean']} onChange={handlePowerMaxPP1} />}
                        />
                        <FormControlLabel
                            label="Variance Power Consumption"
                            control={<Android12Switch checked={selPower['pp1_var']} onChange={handlePowerAvgPP1} />}
                        />
                        <FormControlLabel
                            label="Mean Cycle Time"
                            control={<Android12Switch checked={selPower['powerMin']} onChange={handlePowerMin} />}
                        />
                        <FormControlLabel
                            label="Variance Cycle Time"
                            control={<Android12Switch checked={selPower['powerMax']} onChange={handlePowerMax} />}
                        />
                        <FormControlLabel
                            label="Total Piece Count"
                            control={<Android12Switch checked={selPower['powerAvg']} onChange={handlePowerAvg} />}
                        />
                    </Box></div>
                    <div><Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, mr: 2}}>
                        <Divider textAlign="center" variant='middle'><Typography variant='overline'>Part program 2</Typography></Divider>
                        <FormControlLabel
                            label="Total Power Consumption"
                            control={<Android12Switch checked={selPower['powerMin']} onChange={handlePowerMin} />}
                        />
                        <FormControlLabel
                            label="Mean Power Consumption"
                            control={<Android12Switch checked={selPower['powerMax']} onChange={handlePowerMax} />}
                        />
                        <FormControlLabel
                            label="Variance Power Consumption"
                            control={<Android12Switch checked={selPower['powerAvg']} onChange={handlePowerAvg} />}
                        />
                        <FormControlLabel
                            label="Mean Cycle Time"
                            control={<Android12Switch checked={selPower['powerMin']} onChange={handlePowerMin} />}
                        />
                        <FormControlLabel
                            label="Variance Cycle Time"
                            control={<Android12Switch checked={selPower['powerMax']} onChange={handlePowerMax} />}
                        />
                        <FormControlLabel
                            label="Total Piece Count"
                            control={<Android12Switch checked={selPower['powerAvg']} onChange={handlePowerAvg} />}
                        />
                    </Box></div>
                    */}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default MachineChartSelector;