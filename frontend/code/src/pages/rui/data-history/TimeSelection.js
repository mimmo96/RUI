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
    DesktopTimePicker,
    TimePicker
} from '@mui/x-date-pickers-pro';

import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

import dayjs from 'dayjs';


// ======================================================================

function TimeSelection(props) {
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
                    <Typography>Shift Duration</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Date Start', end: 'Date End' }}>
                      <Stack direction="row" spacing={2}>
                          <DesktopTimePicker
                              label="Start Time"
                              ampm={false}
                              value={timeStart}
                              onChange={(newValue) => {
                                  setTimeStart(newValue);
                              }}
                              onAccept={(newValue) => {
                                      props.timeSpanSetter([newValue,timeEnd]);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                          />
                          <ArrowRightOutlined sx={{mr:3}} style={{'margin':0, 'position':'relative', 'bottom':'16px', 'left':'9px'}}/>
                          <DesktopTimePicker
                              label="End Time"
                              ampm={false}
                              value={timeEnd}
                              onChange={(newValue) => {
                                  setTimeEnd(newValue);
                              }}
                              onAccept={(newValue) => {
                                      props.timeSpanSetter([timeStart, newValue]);
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

export default TimeSelection;
