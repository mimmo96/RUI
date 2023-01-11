// material-ui
import './Customization.css'

import { Typography,
         Box,
         Checkbox,
         FormGroup,
         FormControlLabel,
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
    const [open_shift_delete, setOpenShiftsDelete] = useState(false);

    const [checked, setChecked] = useState(new Array(0));
    const [machine_name, setMachineName] = useState('');
    const [machine_type, setMachineType] = useState('');
    const [shift_name, setShiftName] = useState('');
    const [shift_cost, setShiftCost] = useState('');

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

    const handleClickOpenShiftsDelete = () => {
      setOpenShiftsDelete(true);
    };

    const handleCloseShifts = () => {
      setOpenShifts(false);
    };

    const handleCloseShiftsDelete = () => {
      setOpenShiftsDelete(false);
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
      fetch('/get_shifts').then(res => res = res.json()).then(data => {
        if(data != null)
          data.forEach((item, i) => {
            item.id = i + 1;
            let start_hour =  new Date(item.shift_start).getHours();
            let start_mins =  new Date(item.shift_start).getMinutes();
            start_hour = start_hour.toString().padStart(2, '0');
            start_mins = start_mins.toString().padEnd(2, '0');
            item.shift_start = start_hour+':'+start_mins;
            let end_hour =  new Date(item.shift_end).getHours();
            let end_mins =  new Date(item.shift_end).getMinutes();
            end_hour = end_hour.toString().padStart(2, '0');
            end_mins = end_mins.toString().padEnd(2, '0');
            item.shift_end = end_hour+':'+end_mins;
          });
          setShiftsData(data);
      });
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
      if(shift_cost != ""){
        let shift_start = timeSpan[0];
        let shift_end = timeSpan[1];
        shift_start = (shift_start.$H - 1)+":"+shift_start.$m
        shift_end = (shift_end.$H - 1)+":"+shift_end.$m
        fetch('/save_shifts_costs?' + new URLSearchParams({shift_name: shift_name,
          shift_start: shift_start,
          shift_end: shift_end,
          shift_cost: shift_cost}))
        .then(res => res = res.json())
        .then(data => {});
        console.log(timeSpan);
        Swal.fire({
          icon: 'success',
          confirmButtonColor: '#1890ff',
          title: 'Success!',
          text: 'A new shift was added',
        })
        setOpenShifts(false);
        setNewMachine(true);
      }
      else{
        Swal.fire({
          icon: 'error',
          confirmButtonColor: '#1890ff',
          title: 'Error!',
          text: 'The cost must be a number',
        })
        //setOpenShifts(false);
      }
      setShiftCost("");
    }

    const deleteShift = () => {
      checked.forEach((item, i) => {
        fetch('/delete_shifts_costs?' + new URLSearchParams({shift_name: item}),
          { method: 'DELETE' })
        .then(() => console.log(item+" was deleted."));
      });
      Swal.fire({
        icon: 'success',
        confirmButtonColor: '#1890ff',
        title: 'Success!',
        text: 'Shifts were removed',
      });
      setOpenShiftsDelete(false);
      setNewMachine(true);
    }

    const handleCheck = (event) => {
      var updatedList = [...checked];
      if (event.target.checked)
        updatedList = [...checked, event.target.labels[0].id];
      else
        updatedList.splice(checked.indexOf(event.target.labels[0].id));
      setChecked(updatedList);
    };

    const handleCost = (e) => {
      const regex = /^[0-9\b]+$/;
      if (regex.test(e.target.value))
        setShiftCost(e.target.value);
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
        <Grid item>
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
              <TextField
                required
                margin="dense"
                id="shift_cost"
                label="Shift Cost"
                type="number"
                fullWidth
                variant="filled"
                onChange={(event) => {handleCost(event)}}
              />
              <TimeSelection timeSpanSetter={setTimeSpan} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseShifts}>Cancel</Button>
              <Button onClick={addShift}>Add</Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid item>
          <Button variant="outlined" onClick={handleClickOpenShiftsDelete}
          style={{
              backgroundColor: "#ffffff",
          }}
          startIcon={<PlusOutlined />} color="secondary">
            DELETE SHIFT
          </Button>
          <Dialog open={open_shift_delete} onClose={handleCloseShiftsDelete}>
            <DialogTitle>Choose which shifts to delete:</DialogTitle>
            <DialogContent>
            <FormGroup>
            {shifts_data.map((item, i) => (
              <FormControlLabel
                id={item.shift_name}
                key={i}
                label={item.shift_name}
                control={<Checkbox onChange={handleCheck}/>}
              />
            ))}
            </FormGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseShiftsDelete}>Cancel</Button>
              <Button onClick={deleteShift}>Delete</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

    );
}

export default Customization;
