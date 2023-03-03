import react, {useState, useEffect} from 'react';
import { Button, Modal } from "react-bootstrap";

const Form = ({handlePatient, handleBciShow,handleCloseP}) => {

     // --------------- Defining Form States  ----------------------//

     const [patientId, setPatientId] = useState('');
     const [patientName, setPatientName] = useState('');
     const [maritalStatus, setMaritalStatus] = useState('');
     const [gender, setGender] = useState('');
     const [email, setEmail] = useState('');
     const [contactNumber, setContactNumber] = useState('');
     const [dateofBirth, setDateofBirth] = useState('');
     const [age, setAge] = useState('');
     const [address, setAddress] = useState('');
     const [medicalConditionDesp, setMedicalConditionDesp] = useState('');
 
     
     // --------------- Defining Form States  ----------------------//

      const [isElectron,setIsElectron] = useState(false);
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        handlePatient(patientId);
        console.log(`Form Submitted: ${patientId} - ${patientName} - ${age} - ${address} - ${medicalConditionDesp} - ${maritalStatus} - ${gender} - ${email} - ${contactNumber}`);
        if (isElectron) {
            window.
            require("electron").
            ipcRenderer.
            send("addPatient",{
                id:newPatientId,
                name:patientName,
                age:age,
                dob:dateofBirth,
                gender:gender,
                email:email,
                phoneNumber:`+91-${contactNumber}`,
                address:address,
                maritalStatus:maritalStatus,
                desc:medicalConditionDesp,
                bci_calib_status:"NO",
                status:"NOT RECOVERED"
            });
    
            window.require("electron").ipcRenderer.on("addPatient", (data) => {
                console.log(data);
            });
        }
        handleCloseP();
        handleBciShow();
      };

      const [newPatientId,setNewPatientId] = useState('PID1');

      const getNewPatientId = () => {
        window.require("electron").ipcRenderer.send("getNewPID",{});
    
        window.require("electron").ipcRenderer.on("getNewPID", (e,data) => {
            console.log(data);
            setNewPatientId(data);
        });
    }
    
    useEffect(() => {
        if (window.require && window.require("electron")){
            setIsElectron(isElectron => !isElectron);
            getNewPatientId();
        }   
    },[]);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 365);
    const maxDateString = maxDate.toISOString().split("T")[0];

    function calculateAge(e) {
        const dob = e.target.value;
        setDateofBirth(dob);
    
        // Calculate age based on entered DOB
        const birthDate = new Date(dob);
        const today = new Date();
        const ageInMilliseconds = today - birthDate;
        const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        setAge(ageInYears);
      }

    return (
        <>
            <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-outline text-start">
                                        <label className="form-label" htmlFor="patientId">
                                            Patient ID
                                        </label>
                                        <input
                                            type="text"
                                            id="patientId"
                                            className="form-control form-control-sm"
                                            value={newPatientId}
                                            placeholder={newPatientId}
                                            readOnly
                                            onChange={(e) => setPatientId(e.target.value)}
                                            required
                                        />
                                </div>
                            </div>
                            <div className='col'>
                            <div className="form-outline text-start mb-3">
                                        <label className="form-label" htmlFor="patientName">
                                            Patient Name
                                        </label>
                                        <input
                                            type="text"
                                            id="patientName"
                                            className="form-control form-control-sm"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                            required
                                        />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                                <div className='col'>
                                    <div className="form-inputs text-start mb-3">
                                            <label className="form-label" htmlFor="marital_status">
                                                Marital Status
                                            </label>
                                            <select
                                                className="form-select form-select-sm"
                                                id="marital_status"
                                                value={maritalStatus}
                                                onChange={(event) => {setMaritalStatus(event.target.value)}}
                                                name="marital_status"
                                                aria-label="form-select-sm example"
                                                required
                                                aria-required="true"
                                            >
                                                <option value="">Select</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Seperated">Seperated</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                    </div>
                                </div>
                            <div className='col'>
                                    <div className="form-inputs text-start mb-3">
                                            <label className="form-label" htmlFor="gender">
                                                Gender
                                            </label>
                                            <select
                                                className="form-select form-select-sm"
                                                id="gender"
                                                value={gender}
                                                onChange={(event) => {setGender(event.target.value)}}
                                                name="gender"
                                                aria-label="form-select-sm example"
                                                required
                                                aria-required="true"
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                    </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-outline text-start mb-3">
                                        <label className="form-label" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                        type="email"
                                        id="email"
                                        className="form-control form-control-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        />
                                        
                                </div>
                            </div>
                            <div className='col'>
                            <div className="form-outline text-start mb-3">
                                        <label className="form-label" htmlFor="mobile">
                                            Contact No.
                                        </label>
                                        <input
                                        type="tel"
                                        pattern="[0-9]{10}"
                                        id="mobile"
                                        className="form-control form-control-sm"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        required
                                        />
                                        
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="form-outline text-start mb-3">
                                        <label className="form-label" htmlFor="dob">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id="dob"
                                            className="form-control form-control-sm"
                                            value={dateofBirth}
                                            onChange={calculateAge}
                                            required
                                            max={maxDateString}
                                        />
                                        
                                </div>
                            </div>
                            <div className='col'>
                            <div className="form-outline text-start mb-3">
                                        <label className="form-label" htmlFor="age">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            id="age"
                                            className="form-control form-control-sm"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                            min={1}
                                            max={120}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                    <div className="form-outline text-start mb-3">
                                            <label className="form-label" htmlFor="address">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="form-control form-control-sm"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                            
                                    </div>
                                </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                    <div className="form-outline text-start mb-4">
                                            <label className="form-label" htmlFor="medcondesp">
                                                Medical Condition Description
                                            </label>
                                            <input
                                                type="text"
                                                id="medcondesp"
                                                className="form-control form-control-sm"
                                                value={medicalConditionDesp}
                                                onChange={(e) => setMedicalConditionDesp(e.target.value)}
                                                required
                                                style={{"height":"64px"}}
                                            />
                                    </div>
                                </div>
                        </div>
                        <div className='row ps-3 pe-3'>
                            <div className='col'>
                                    <div className="form-outline text-start mb-4" style={{ 'padding-left': '6%' }}>
                                            <Button variant="secondary" onClick={handleCloseP} style={{ 'width': '100%', 'background-color': '#FFFFFF', 'color': '#006666', 'border-color': '#006666' }}>
                                                    Cancel
                                            </Button>
                                    </div></div>
                            <div className='col'>
                                    <div className="form-outline text-start mb-4" style={{ 'padding-right': '6%' }}>
                                            <Button variant="primary" type="submit" style={{ 'width': '100%', 'background-color': '#006666', 'color': '#FFFFFF', }}>
                                                    Add Patient
                                            </Button>
                                    </div>
                            </div>
                        </div>
                            {/* <div className='row'>
                                    <div className='col'>
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            >
                                            Register
                                        </button>
                                    </div>
                            </div> */}
                    </form>
            </div>
        </>
    );
}


export default Form;