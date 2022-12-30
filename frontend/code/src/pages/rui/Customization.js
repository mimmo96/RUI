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
         DialogTitle
        }
from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import MachinesTable from 'pages/dashboard/MachinesTable';
import ShiftsTable from 'pages/dashboard/ShiftsTable';
import TimeSelection from './data-history/TimeSelection';

import { useState, useEffect } from 'react';


// ==============================|| CUSTOMIZATION PAGE ||============================== //

function Customization() {
    const theme = useTheme();
    const [timeSpan, setTimeSpan] = useState([null, null]);

    const [machines_data, setMachinesData] = useState(new Array(0));
    const [shifts_data, setShiftsData] = useState(new Array(0));

    const [open_machine, setOpenMachines] = useState(false);
    const [open_shift, setOpenShifts] = useState(false);

    const [machine_name, setMachineName] = useState('');
    const [machine_type, setMachineType] = useState('');
    const [shift_name, setShiftName] = useState('');

    const [new_machine, setNewMachine] = useState(false);

    const handleClickOpenMachines = () => {
      setOpenMachines(true);
    };

    const handleCloseMachines = () => {
      setOpenMachines(false);
    };

    const handleClickOpenShifts = () => {
      setOpenShifts(true);
    };

    const handleCloseShifts = () => {
      setOpenShifts(false);
    };

    const getMachines = () => {
      fetch('/get_machines').then(res => res = res.json()).then(data => {
        if(data != null)
          data.forEach((item, i) => {
            item.id = i + 1;
          });
        setMachinesData(data);
      });
    }

    const getShifts = () => {
      // fetch('/get_machines').then(res => res = res.json()).then(data => {
      //   if(data != null)
      //     data.forEach((item, i) => {
      //       item.id = i + 1;
      //     });
      //   setShiftsData(data);
      //});
    }

    const addMachine = () => {
      console.log(machine_name);
      fetch('/save_machine_and_machine_type?' + new URLSearchParams({asset: machine_name, machine_type: machine_type})).then(res => res = res.json()).then(data => {
      });
      Swal.fire({
        icon: 'success',
        confirmButtonColor: '#1890ff',
        title: 'Success!',
        text: 'A new machine was added',
      })
      setOpenMachines(false);
      setNewMachine(true)
    }

    const addShift = () => {
      //fetch('/save_machine_and_machine_type?' + new URLSearchParams({asset: name, machine_type: type})).then(res => res = res.json()).then(data => {
      //});
      console.log(timeSpan);
      Swal.fire({
        icon: 'success',
        confirmButtonColor: '#1890ff',
        title: 'Success!',
        text: 'A new shift was added',
      })
      setOpenShifts(false);
    }

	useEffect(() => {
    getShifts();
    getMachines();
    setNewMachine(false);
	}, [new_machine]);

    return (
      <Grid container rowSpacing={3.5} columnSpacing={2.75}>
        <Grid item xs={12}>
          <Typography variant="h5">Machines</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <MachinesTable rows={machines_data} />
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleClickOpenMachines}
          style={{
              backgroundColor: "#ffffff",
          }}
          startIcon={<PlusOutlined />} color="secondary">
            ADD MACHINE
          </Button>
          <Dialog open={open_machine} onClose={handleCloseMachines}>
            <DialogTitle>New Machine</DialogTitle>
            <DialogContent>
              <TextField
                required
                margin="dense"
                id="machine_name"
                label="Machine Name"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => {setMachineName(event.target.value)}}
              />
              <TextField
                required
                margin="dense"
                id="machine_type"
                label="Machine Type"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => {setMachineType(event.target.value)}}
              />
              <TextField
                required
                margin="dense"
                id="url"
                label="Connection URL"
                type="text"
                fullWidth
                variant="filled"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseMachines}>Cancel</Button>
              <Button onClick={addMachine}>Add</Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Shifts</Typography>
        </Grid>
        <Grid item xs={12}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <ShiftsTable rows={shifts_data}/>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleClickOpenShifts}
          style={{
              backgroundColor: "#ffffff",
          }}
          startIcon={<PlusOutlined />} color="secondary">
            ADD SHIFT
          </Button>
          <Dialog open={open_shift} onClose={handleCloseShifts}>
            <DialogTitle>New Shift</DialogTitle>
            <DialogContent>
              <TextField
                required
                margin="dense"
                id="shift_name"
                label="Shift Name"
                type="text"
                fullWidth
                variant="filled"
                onChange={(event) => {setShiftName(event.target.value)}}
              />
              <TimeSelection timeSpanSetter={setTimeSpan} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseShifts}>Cancel</Button>
              <Button onClick={addShift}>Add</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

    );
}

export default Customization;
