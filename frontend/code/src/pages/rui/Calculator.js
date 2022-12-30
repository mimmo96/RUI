import './Calcolatrice.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { QuestionOutlined } from '@ant-design/icons';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';



function Calculator() {

  const [rows_energy, set_rows_energy] = useState([
    { name: 'PP1', min: '', avg: '', max: '' },
    { name: 'PP2', min: '', avg: '', max: '' },
    { name: 'PP3', min: '', avg: '', max: '' },
    { name: 'Total', min: '', avg: '', max: '' },
  ]);
  const [rows_time, set_rows_time] = useState([
    { name: 'PP1', min: '', avg: '', max: '' },
    { name: 'PP2', min: '', avg: '', max: '' },
    { name: 'PP3', min: '', avg: '', max: '' },
    { name: 'Total', min: '', avg: '', max: '' },
  ]);

  const [num_pp1, setnum_pp1] = useState(0);
  const [num_pp2, setnum_pp2] = useState(0);
  const [num_pp3, setnum_pp3] = useState(0);

  let min_energy_per_pp1 = 1.2
  let avg_energy_per_pp1 = 1.5
  let max_energy_per_pp1 = 1.8

  let min_energy_per_pp2 = 2.2
  let avg_energy_per_pp2 = 2.5
  let max_energy_per_pp2 = 2.8

  let min_energy_per_pp3 = 3.2
  let avg_energy_per_pp3 = 3.5
  let max_energy_per_pp3 = 3.8

  let min_time_per_pp1 = 1.234
  let avg_time_per_pp1 = 1.523
  let max_time_per_pp1 = 1.8

  let min_time_per_pp2 = 2.23
  let avg_time_per_pp2 = 2.4
  let max_time_per_pp2 = 2.654

  let min_time_per_pp3 = 3.242
  let avg_time_per_pp3 = 3.23
  let max_time_per_pp3 = 3.825

  const compute_values = () => {
    set_rows_energy([
      { name: 'PP1', min: (min_energy_per_pp1 * num_pp1).toFixed(2), avg: (avg_energy_per_pp1 * num_pp1).toFixed(2), max: (max_energy_per_pp1 * num_pp1).toFixed(2) },
      { name: 'PP2', min: (min_energy_per_pp2 * num_pp2).toFixed(2), avg: (avg_energy_per_pp2 * num_pp2).toFixed(2), max: (max_energy_per_pp2 * num_pp2).toFixed(2) },
      { name: 'PP3', min: (min_energy_per_pp3 * num_pp3).toFixed(2), avg: (avg_energy_per_pp3 * num_pp3).toFixed(2), max: (max_energy_per_pp3 * num_pp3).toFixed(2) },
      {
        name: 'Total',
        min: ((min_energy_per_pp1 * num_pp1) + (min_energy_per_pp2 * num_pp2) + (min_energy_per_pp1 * num_pp3)).toFixed(2),
        avg: ((avg_energy_per_pp1 * num_pp1) + (avg_energy_per_pp2 * num_pp2) + (avg_energy_per_pp3 * num_pp3)).toFixed(2),
        max: ((max_energy_per_pp1 * num_pp1) + (max_energy_per_pp2 * num_pp2) + (max_energy_per_pp3 * num_pp3)).toFixed(2)
      }
    ]);
    set_rows_time([
      { name: 'PP1', min: (min_time_per_pp1 * num_pp1).toFixed(2), avg: (avg_time_per_pp1 * num_pp1).toFixed(2), max: (max_time_per_pp1 * num_pp1).toFixed(2) },
      { name: 'PP2', min: (min_time_per_pp2 * num_pp2).toFixed(2), avg: (avg_time_per_pp2 * num_pp2).toFixed(2), max: (max_time_per_pp2 * num_pp2).toFixed(2) },
      { name: 'PP3', min: (min_time_per_pp3 * num_pp3).toFixed(2), avg: (avg_time_per_pp2 * num_pp3).toFixed(2), max: (max_time_per_pp3 * num_pp3).toFixed(2) },
      {
        name: 'Total',
        min: ((min_time_per_pp1 * num_pp1) + (min_time_per_pp2 * num_pp2) + (min_time_per_pp3 * num_pp3)).toFixed(2),
        avg: ((avg_time_per_pp2 * num_pp1) + (avg_time_per_pp2 * num_pp2) + (avg_time_per_pp3 * num_pp3)).toFixed(2),
        max: ((max_time_per_pp3 * num_pp1) + (max_time_per_pp2 * num_pp2) + (max_time_per_pp3 * num_pp3)).toFixed(2)
      }
    ]);
  }

  return (
      <div className='container-calcolatrice'>
        <h2>Energy & Time Calculator</h2>
        <div className='box-1'>
          <div className='box-2'>
            <TextField onChange={(e) => { setnum_pp1(e.target.value) }} id="outlined-number" type='number' label="how many PP1" variant="outlined" />
          </div>
          <div className='box-2'>
            <TextField onChange={(e) => { setnum_pp2(e.target.value) }} id="outlined-number" type='number' label="how many PP2" variant="outlined" />
          </div>
          <div className='box-2'>
            <TextField onChange={(e) => { setnum_pp3(e.target.value) }} id="outlined-number" type='number' label="how many PP3" variant="outlined" />
          </div>
        </div>

        <div className='mid-box-1'>
          <Button onClick={compute_values} variant="contained">Compute Estimates</Button>
        </div>

        <div className='box-1'>
          <div className='box-2'>
          <h3> Energy (Kw) </h3> 
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell size='small'>Part Program</TableCell>
                    <TableCell size='small' align="right">
                      Minimum
                      <Tooltip title='According to the data, this is the minimum possible energy required'>
                        <QuestionOutlined style={{ 'verticalAlign':'0.15em', 'margin': '0 0 0 3px', 'fontSize': 'small' }} />
                      </Tooltip>
                    </TableCell>
                    <TableCell size='small' align="right">
                      Average
                      <Tooltip title='According to the data, this is the average energy required'>
                        <QuestionOutlined style={{ 'verticalAlign':'0.15em', 'margin': '0 0 0 3px', 'fontSize': 'small' }} />
                      </Tooltip>
                    </TableCell>
                    <TableCell size='small' align="right">
                      Maximum
                      <Tooltip title='According to the data, this is the maximum possible energy required'>
                        <QuestionOutlined style={{ 'verticalAlign':'0.15em', 'margin': '0 0 0 3px', 'fontSize': 'small' }} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_energy.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell size='small' component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell size='small' align="right">{row.min}</TableCell>
                      <TableCell size='small' align="right">{row.avg}</TableCell>
                      <TableCell size='small' align="right">{row.max}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className='box-2'>
            <h3> Time (secs) </h3> 
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell size='small'>Part Program</TableCell>
                    <TableCell size='small' align="right">
                      Minimum
                      <Tooltip title='According to the data, this is the minimum possible time required'>
                        <QuestionOutlined style={{ 'verticalAlign':'0.15em', 'margin': '0 0 0 3px', 'fontSize': 'small' }} />
                      </Tooltip>
                    </TableCell>
                    <TableCell size='small' align="right">
                      Average
                      <Tooltip title='According to the data, this is the average time required'>
                        <QuestionOutlined style={{ 'verticalAlign':'0.15em', 'margin': '0 0 0 3px', 'fontSize': 'small' }} />
                      </Tooltip>
                    </TableCell>
                    <TableCell size='small' align="right">
                      Maximum
                      <Tooltip title='According to the data, this is the maximum possible time required'>
                        <QuestionOutlined style={{ 'verticalAlign':'0.15em', 'margin': '0 0 0 3px', 'fontSize': 'small' }} />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows_time.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell size='small' component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell size='small' align="right">{row.min}</TableCell>
                      <TableCell size='small' align="right">{row.avg}</TableCell>
                      <TableCell size='small' align="right">{row.max}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
  );
}

export default Calculator;