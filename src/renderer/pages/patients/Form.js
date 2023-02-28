import react, {useState} from 'react';


const Form = () => {

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


     const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Form Submitted: ${patientId} - ${patientName} - ${age} - ${address} - ${medicalConditionDesp} - ${maritalStatus} - ${gender} - ${email} - ${contactNumber}`);
      };


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
                                                                value={patientId}
                                                                placeholder="PAT122"
                                                                readOnly
                                                                onChange={(e) => setPatientId(e.target.value)}
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
                                                                >
                                                                    <option defaultValue>Select</option>
                                                                    <option value="1">Single</option>
                                                                    <option value="2">Married</option>
                                                                    <option value="3">Divorced</option>
                                                                    <option value="4">Seperated</option>
                                                                    <option value="5">Prefer not to say</option>
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
                                                                >
                                                                    <option defaultValue>Select</option>
                                                                    <option value="1">Male</option>
                                                                    <option value="2">Female</option>
                                                                    <option value="3">Other</option>
                                                                    <option value="4">Prefer not to say</option>
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
                                                            id="mobile"
                                                            className="form-control form-control-sm"
                                                            value={contactNumber}
                                                            onChange={(e) => setContactNumber(e.target.value)}
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
                                                                onChange={(e) => setDateofBirth(e.target.value)}
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
                                                                    style={{"height":"64px"}}
                                                                />
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