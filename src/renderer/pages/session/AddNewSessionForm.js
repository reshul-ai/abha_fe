import { Console } from 'console';
import react, {useEffect, useState} from 'react';
import { Button, Modal } from "react-bootstrap";
import moment from 'moment';
const AddNewSessionForm = ({handleClose}) => {

    // --------------- Defining Form States  ----------------------//

    const [sessionId, setSessionId] = useState('SES105');
    const [selectPatient, setselectPatient] = useState('');
    const [startTimeOfSession, setStartTimeOfSession] = useState("");
    const [endTimeOfSession, setEndTimeOfSession] = useState('');
    const [dateofSession, setDateofSession] = useState('');
    
    const [isElectron,setIsElectron] = useState(false);
    const [patientList, setPatientList] = useState({items:[]});
    const [newSESId, setNewSESId] = useState('SES1')
    // --------------- Defining Form States  ----------------------//


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Form Submitted: ${sessionId} - ${selectPatient} - ${dateofSession} - ${startTimeOfSession}`);
        if (isElectron) {
            const formattedStartTime = moment(startTimeOfSession, 'HH:mm').format('hh:mm A');
            const formattedEndTime = moment(endTimeOfSession, 'HH:mm').format('hh:mm A');

            // calculate duration in minutes
            const durationInMinutes = moment(formattedEndTime, 'hh:mm A').diff(moment(formattedStartTime, 'hh:mm A'), 'minutes');

            // format duration in hh:mm A format
            const duration = moment.utc(moment.duration(durationInMinutes, 'minutes').asMilliseconds()).format('hh:mm A').split(' ')[0];

            window.
            require("electron").
            ipcRenderer.
            send("addSession",{
                id:newSESId,
                patientId:selectPatient,
                date:dateofSession,
                startTime:formattedStartTime, 
                endTime:formattedEndTime,
                duration,
                status:"SCHEDULED"
            });
    
            window.require("electron").ipcRenderer.on("addSession", (data) => {
                console.log(data);
            });
        }
        handleClose(true);
    };

    const getPatientsList = () => {
        //console.log("called");
        window.require("electron").ipcRenderer.send("getAllPatient",{});
    
        window.require("electron").ipcRenderer.on("getAllPatient", (e,data) => {
            //console.log(data.items);
            setPatientList(data);
        });
    };

    const getNewSesId = () => {
        window.require("electron").ipcRenderer.send("getNewSES",{});
    
        window.require("electron").ipcRenderer.on("getNewSES", (e,data) => {
            console.log(data);
            setNewSESId(data);
        });
    };
    
    useEffect(() => {
        if (window.require && window.require("electron")){
            setIsElectron(isElectron => !isElectron);
            getPatientsList();
            getNewSesId();
        }   
    },[]);

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-outline text-start mb-4">
                                        <label className="form-label" htmlFor="sessionId">
                                            Session ID
                                        </label>
                                        <input
                                            type="text"
                                            id="sessionId"
                                            className="form-control form-control-sm"
                                            value={newSESId}
                                            placeholder={newSESId}
                                            readOnly
                                            onChange={(e) => setSessionId(e.target.value)}
                                        />
                                </div>
                            </div>
                            <div className='col'>
                            <div className="form-outline text-start mb-4">
                                        <label className="form-label" htmlFor="Select Patient">
                                        Select Patient
                                        </label>
                                        <select
                                                className="form-select form-select-sm"
                                                id="select_patient"
                                                value={selectPatient}
                                                onChange={(event) => {setselectPatient(event.target.value)}}
                                                name="select_patient"
                                                aria-label="form-select-sm example"
                                            >
                                                <option defaultValue>Select</option>
                                                {
                                                    patientList && patientList.items.map((item =>
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                      ))
                                                }
                                            </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-outline text-start mb-4">
                                        <label className="form-label" htmlFor="date_of_session">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date_of_session"
                                            className="form-control form-control-sm"
                                            value={dateofSession}
                                            onChange={(e) => setDateofSession(e.target.value)}
                                            required
                                        />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="form-outline text-start mb-4">
                                        <label className="form-label" htmlFor="startTime">
                                        Start Time
                                        </label>
                                        <input
                                            type="time"
                                            id="startTime"
                                            className="form-control form-control-sm"
                                            value={startTimeOfSession}
                                            onChange={(e) => setStartTimeOfSession(e.target.value)}
                                            required
                                        />
                                </div>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-outline text-start mb-4">
                                    <label className="form-label" htmlFor="endTime">
                                    End Time
                                    </label>
                                    <input
                                        type="time"
                                        id="endTime"
                                        className="form-control form-control-sm"
                                        value={endTimeOfSession}
                                        onChange={(e) => setEndTimeOfSession(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row ps-3 pe-3'>
                            <div className='col'>
                                    <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                            <Button variant="secondary" onClick={handleClose} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                    Cancel
                                            </Button>
                                    </div></div>
                            <div className='col'>
                                    <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                            <Button variant="primary" type='submit' style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                    Add Session
                                            </Button>
                                    </div>
                            </div>
                    </div>
                </form>
            </div>
        </>
    );
}


export default AddNewSessionForm;