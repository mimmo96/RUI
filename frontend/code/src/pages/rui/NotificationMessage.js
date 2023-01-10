// material-ui
import { Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
    MenuItem
   }
from '@mui/material';

//import SendIcon from '@mui/icons-material/Send';

import { useTheme } from '@mui/material/styles';

import {SendOutlined, PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import MachinesTable from 'pages/dashboard/MachinesTable';
import ShiftsTable from 'pages/dashboard/ShiftsTable';
import TimeSelection from './data-history/TimeSelection';

import { useState, useEffect } from 'react';


// ==============================|| NOTIFICATION PAGE ||============================== //

function NotificationMessage() {
const theme = useTheme();

const [timeSpan, setTimeSpan] = useState([null, null]);
const [open_notification, setOpenNotification] = useState(false);
const [NotificationName, setNotificationName] = useState('');

const [notificationdone, setNotificationDone] = useState(false);

//In broadcast message e individual message vengono salvati i contenuti dei box
const [BroadcastMessage, setBroadcastMessage] = useState('')
const [IndividualMessage, setIndividualMessage] = useState('')

const handleCloseNotification = () => {
 setOpenNotification(false);
};

const handleOpenNotificationBroadcast = () => {
  console.log(BroadcastMessage);

  fetch('/broadcast?message=' + BroadcastMessage).then(res => res = res.json()).then(data => {});
  
  sendNotification();
  setOpenNotification(true);
};

const handleOpenNotificationIndividual = () => {
  console.log(IndividualMessage);

  fetch('/broadcast?message=' + IndividualMessage).then(res => res = res.json()).then(data => {});

  sendNotification();
  setOpenNotification(true);
};

//operatori a cui inviare i messaggi
const currencies = [
  {
    value: 'Operator1',
    label: 'Marco',
  },
  {
    value: 'Operator2',
    label: 'Aldo',
  },
  {
    value: 'Operator3',
    label: 'Giovanni',
  },
  {
    value: 'Operator4',
    label: 'Giacomo',
  },
];
const sendNotification = () => {
    Swal.fire({
        icon: 'success',
        confirmButtonColor: '#1890ff',
        title: 'Success!',
        text: 'Message Send!',
    })
    setOpenNotification(false);
    setNotificationDone(true);
}

useEffect(() => {
    setNotificationDone(false);
    //sendNotification();
}, [notificationdone]);

return (
 <Grid container rowSpacing={5} columnSpacing={5}> 
   <Grid item xs={12}>
     <Typography variant="h5">Send comunication to all operators</Typography>
      <DialogContent>
          <TextField
            required
            margin="normal"
            id="notificationMess_name"
            label="Message"
            type="text"
            multiline
            rows={3}
            variant="outlined"
            style = {{width: 400}}

            onChange={(event) => {setBroadcastMessage(event.target.value)}}
          />
      </DialogContent>
     <Button variant="contained" onClick={handleOpenNotificationBroadcast} 
     endIcon={<SendOutlined />}>
       Send
     </Button>
   </Grid>
   <Grid item xs={12}>
     <Typography variant="h5">Send comunication to an operator</Typography>
      <DialogContent>
      <TextField
          id="filled-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select operator receiver"
          variant="outlined"
          margin="normal"
          >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          <TextField
            required
            margin="normal"
            id="notificationMess_name"
            label="Message"
            type="text"
            multiline
            rows={3}
            variant="outlined"
            style = {{width: 300}}
            onChange={(event) => {setIndividualMessage(event.target.value)}}
          />
      </DialogContent>
     <Button variant="contained" onClick={handleOpenNotificationIndividual}
     endIcon={<SendOutlined />} >
       Send
     </Button>
   </Grid>
 </Grid>

);
}

export default NotificationMessage;
