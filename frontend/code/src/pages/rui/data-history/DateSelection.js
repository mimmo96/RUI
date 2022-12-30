import {
    useState,
    Fragment
} from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Stack,
    TextField,
    Typography
} from '@mui/material';

import {
    CalendarOutlined,
    DownOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

import {
    LocalizationProvider,
    MobileDateRangePicker,
    MobileTimePicker
} from '@mui/x-date-pickers-pro';

import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

import dayjs from 'dayjs';


// ======================================================================

function DateSelection(props) {
    const [date, setDate] = useState([null, null]);
    const [timeStart, setTimeStart] = useState(dayjs().hour(0).minute(0).second(0));
    const [timeEnd, setTimeEnd] = useState(dayjs().hour(23).minute(59).second(0));

    
    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
            expandIcon={<DownOutlined />}
            aria-controls="panel1bh-content"
            id="panel1bh-header">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <CalendarOutlined />
                    <Typography>Date span</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Date Start', end: 'Date End' }}>
                        <MobileDateRangePicker
                        disableFuture={true}
                        inputFormat='DD/MM/YYYY'
                        value={date}
                        onChange={(newSpan) => {
                            setDate(newSpan);                            
                        }}
                        onAccept={(newSpan) => {
                            if(newSpan[0] !== null && newSpan[1] !== null)
                                props.dateSpanSetter([newSpan[0].hour(timeStart.hour()).minute(timeStart.minute()),
                                                      newSpan[1].hour(timeEnd.hour()).minute(timeEnd.minute())]);
                        }}
                        renderInput={(startProps, endProps) => (
                            <Fragment>
                            <Stack direction="row" spacing={2}>
                                <TextField {...startProps} />
                                <Box sx={{mr:3}}/>
                                <TextField {...endProps} />
                            </Stack>
                            </Fragment>
                        )}
                        />
                    
                        <Stack direction="row" spacing={2}>
                            <MobileTimePicker
                                disabled={date[0] === null}
                                label="Start Time"
                                ampm={false}
                                value={timeStart}
                                onChange={(newValue) => {
                                    setTimeStart(newValue);
                                }}
                                onAccept={(newValue) => {
                                    if(date[0] !== null && date[1] !== null)
                                        props.dateSpanSetter([date[0].hour(newValue.hour()).minute(newValue.minute()),
                                                              date[1].hour(timeEnd.hour()).minute(timeEnd.minute())]);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <ArrowRightOutlined sx={{mr:3}} style={{'margin':0, 'position':'relative', 'bottom':'16px', 'left':'9px'}}/>
                            <MobileTimePicker
                                disabled={date[1] === null}
                                label="End Time"
                                ampm={false}
                                value={timeEnd}
                                onChange={(newValue) => {
                                    setTimeEnd(newValue);
                                }}
                                onAccept={(newValue) => {
                                    if(date[0] !== null && date[1] !== null)
                                        props.dateSpanSetter([date[0].hour(timeStart.hour()).minute(timeStart.minute()),
                                                              date[1].hour(newValue.hour()).minute(newValue.minute())]);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                    
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

export default DateSelection;