// material-ui
import { Box, Button, Checkbox, Dialog, DialogActions,
         DialogContent, DialogContentText, DialogTitle,
         IconButton, TextField, useMediaQuery } from '@mui/material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { GithubOutlined, FilePdfFilled} from '@ant-design/icons';
import {exportToPDF} from "../../../../utils/utilsPdf";
import utilsReport from "../../../../utils/utilsReport";
import {useState} from 'react';
// project import
import HeadsUp from './HeadsUp';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //


const HeaderContent = () => {
    let rows = Array.from(utilsReport.elements);
    let selected = utilsReport.elements;
    const HandlePdf = () =>{

    }
    const [open, setOpen] = useState(false);
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckbox = (row, checked) => {
        if(checked){
           utilsReport.elements.add(row);
        }else{
            utilsReport.elements.delete(row);
        }

        console.log(selected);
    };

    return (
        <>
            {!matchesXs && <HeadsUp />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            {/*
            <IconButton
                component={Link}
                href="https://github.com/codedthemes/mantis-free-react-admin-template"
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
                <GithubOutlined />
            </IconButton>
            >*/}
            <IconButton onClick={handleClickOpen}>
                <FilePdfFilled/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new report</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Report Title"
                        type="text"
                        fullWidth
                        variant="filled"
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Component:</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        role={'checkbox'}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox name={row.id} defaultChecked={true} onChange={(e) => handleCheckbox(row, e.target.checked)} />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => exportToPDF(document.getElementById('name').value, selected)}>Export</Button>
                </DialogActions>
            </Dialog>
            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
