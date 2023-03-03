import react, { useState } from 'react';
import {
  FaAlignJustify,
  FaHome,
  FaUserFriends,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { Outlet, Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SessionHCQ from './SessionHcq';
import { Button, Modal } from 'react-bootstrap';
import { width } from '@mui/system';
import { TableFooter } from '@mui/material';

const PastSessionBci = ({onChildClick,paradigms, currSessionResult}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  console.log(currSessionResult);
  function createData(
    paradigm_name,
    loops,
    randomize,
    activities,
    mi_accuracy
  ) {
    return { paradigm_name, loops, randomize, activities, mi_accuracy };
  }

  const rows = [
    createData('Right Hand Movement', 2, 'No', 1, '40%'),
    createData('Motor Imagery', 2, 'Yes', 2, '43%'),
  ];

  const [showCC, setShowCC] = useState(false);
  const handleCCClose = () => setShowCC(false);
  const handleCCShow = () => setShowCC(true);

  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div style={{ overflow: 'hidden' }} className="container-fluid">
        <div className="row ">
          <div className="col">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="Left">
                      Paradigm Name
                    </StyledTableCell>
                    <StyledTableCell align="Left">Loops</StyledTableCell>
                    <StyledTableCell align="Left">Randomize</StyledTableCell>
                    <StyledTableCell align="Left">Activities</StyledTableCell>
                    <StyledTableCell align="Left">MI Accuracy</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currSessionResult?.paradigms.map((row, index) => (
                    <>
                      <StyledTableRow
                        style={{ cursor: 'pointer' }}
                        key={row.id}
                        onClick={() => {
                          setOpen(!open);
                          onChildClick(row.id, index);
                          setOpenIndex(index);
                        }}
                      >
                        {/* <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell> */}

                        <StyledTableCell align="Left">
                          {paradigms.items.find((item) => item.id === row.id)?.name}
                        </StyledTableCell>
                        <StyledTableCell align="Left">
                          {row.loop}
                        </StyledTableCell>

                        <StyledTableCell align="Left">
                          {paradigms.items.find((item) => item.id === row.id)?.Randomize}
                        </StyledTableCell>
                        <StyledTableCell align="Left">
                          {paradigms.items.find((item) => item.id === row.id)?.activities}
                        </StyledTableCell>
                        <StyledTableCell align="Left">
                          {"85%"}
                        </StyledTableCell>
                        
                      </StyledTableRow>
                        <div>
                            {open && (
                              <>
                                {openIndex === index && (
                                  <div className="feedback-div p-2 px-3" style={{backgroudColor:'grey'}}>
                                    <p>Feedback</p>
                                    <p>
                                      Feedback ny Therapist or Patients latest conditions update or some other components.
                                    </p>
                                  </div>
                                )}
                              </>
                            )}
                        </div>   
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>{' '}
        <div className="row">
          <div>
            <Modal show={showCC} onHide={handleCCClose}>
              <Modal.Header closeButton>
                <Modal.Title><h5 className='pt-3 ps-2'>Headset Contact Quality</h5></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <SessionHCQ />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCCClose}>
                  Plot Data
                </Button>
                <Link to="/trialmain">
                  <Button variant="primary">Continue</Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastSessionBci;
