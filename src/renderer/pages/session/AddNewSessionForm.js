import react, {useState} from 'react';


const AddNewSessionForm = () => {

     // --------------- Defining Form States  ----------------------//

     const [sessionId, setSessionId] = useState('');
     const [selectPatient, setselectPatient] = useState('');
     const [timeOfSession, setTimeOfSession] = useState('');
     const [dateofSession, setDateofSession] = useState('');
    
     
     // --------------- Defining Form States  ----------------------//


     const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Form Submitted: ${sessionId} - ${selectPatient} - ${dateofSession} - ${timeOfSession}`);
      };


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
                                                                value={sessionId}
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
                                                                    <option value="1">Dipika Sharma</option>
                                                                    <option value="2">John Doe</option>
                                                                    <option value="3">Ankur Singh</option>
                                                                    <option value="4">Shivam Singh</option>
                                                                </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-outline text-start mb-4">
                                                            <label className="form-label" htmlFor="date_of_session">
                                                                Date of Session
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="date_of_session"
                                                                className="form-control form-control-sm"
                                                                value={dateofSession}
                                                                onChange={(e) => setDateofSession(e.target.value)}
                                                            />
                                                            
                                                    </div>
                                                </div>
                                                <div className='col'>
                                                <div className="form-outline text-start mb-4">
                                                            <label className="form-label" htmlFor="time_of_session">
                                                            Time of Session
                                                            </label>
                                                            <input
                                                                type="time"
                                                                id="time_of_session"
                                                                className="form-control form-control-sm"
                                                                value={timeOfSession}
                                                                onChange={(e) => setTimeOfSession(e.target.value)}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                           
                                           
                                    </form>
                            </div>
        </>
    );
}


export default AddNewSessionForm;