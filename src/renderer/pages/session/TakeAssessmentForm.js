import react, {useState} from 'react';
import Button from 'react-bootstrap/Button';

const TakeAssessmentForm = () => {

     // --------------- Defining Form States  ----------------------//

     const [reading, setReading] = useState('');
     const [show, setShow] = useState('1');
     
     // --------------- Defining Form States  ----------------------//


     const handleSubmit = (event) => {
        event.preventDefault();
       
      };


    return (
        <>
                        <div className='container-fluid p-0 m-0'>
                                    <form onSubmit={handleSubmit}>
                                                <div className='row pb-2 px-1'>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #8A8A93"}}>
                                                                <div className='row pb-2'><div className='col text-center'>Assessment ID</div></div>
                                                                <div className='row Assessments-labelValue pb-2'><div className='text-center'>SES112</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #8A8A93"}}>
                                                                <div className='row pb-2 ps-3 '><div className='text-center'>Patient</div></div>
                                                                <div className='row Assessments-labelValue pb-2 ps-3'><div className='text-center'>John Doe</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #8A8A93"}}>
                                                                <div className='row pb-2 ps-3'><div className='text-center'>Date</div></div>
                                                                <div className='row Assessments-labelValue pb-2 ps-3'><div className='text-center'>12 Jan 2023</div></div>
                                                        </div>
                                                        <div className='col Assessments-label'>
                                                                <div className='row pb-2 ps-3'><div className='text-center'>Start Time</div></div>
                                                                <div className='row Assessments-labelValue pb-2 ps-3'><div className='text-center'>4:00 PM</div></div>
                                                        </div>
                                                       
                                                </div>
                                            
                                            <div className='row pt-4'>

                                                    <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black" }}>
                                                        <span className={show==='1' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('1') }} 
                                                        style={{ 'border-bottom': show==='1' ? "2px solid black" : "none" }}>
                                                            GS</span>
                                                            </div>
                                                            <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black"  }}>
                                                    <span className={show==='2' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('2')}} 
                                                        style={{ 'border-bottom': show==='2' ? "2px solid black" : "none"  }}>ARAT</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black" }}>
                                                        <span className={show==='3' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('3')}} 
                                                        style={{  'border-bottom': show==='3' ? "2px solid black" : "none"  }}>Fugl-Meyer</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black"  }}>
                                                        <span className={show==='4' ? "Assess-labelValue" : "Assess-label"} onClick={() => {setShow('4') }} 
                                                        style={{  'border-bottom': show==='4' ? "2px solid black" : "none"  }}>9-Hole Peg</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black"  }}>
                                                        <span className={show==='5' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('5') }} 
                                                        style={{  'border-bottom': show==='5' ? "2px solid black" : "none" }}>MAS</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer" }}>
                                                        <span className={show==='6' ? "Assess-labelValue" : "Assess-label"} onClick={() => {setShow('6')}} 
                                                        style={{ 'border-bottom': show==='6' ? "2px solid black" : "none"  }}>VAS</span></div>
                                                    
                                                    
                                                    <hr style={{"marginTop":"2px"}} />
                                                    </div><div className='row px-1 Assessments-label pt-3'>
                                                <div className='col'>
                                                    <div className="form-outline text-start mb-2">
                                                            <label className="form-label" htmlFor="outcomes">
                                                               Outcomes:
                                                            </label>
                                                            
                                                    </div>
                                                </div>
                                               
                                            </div>
                                            <div className='row px-1'>
                                                <div className='col'>
                                                {
            show==='1' && <div className="form-outline text-start mb-4">
         
            <label className="form-label" htmlFor="reading">
                Dynamometer Reading
            </label>
            <input  type="text"
                id="readings"
                className="form-control form-control-sm"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
            />
    </div>
        } 
                                        {
            show==='2' && <div className="form-outline text-start mb-4">
         
            <label className="form-label" htmlFor="reading">
                ARAT Score
            </label>
            <input  type="text"
                id="readings"
                className="form-control form-control-sm"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
            />
    </div>
        }                                {
            show==='3' && <div className="form-outline text-start mb-4">
         
            <label className="form-label" htmlFor="reading">
                Fugl-Meyer Assessment Score
            </label>
            <input  type="text"
                id="readings"
                className="form-control form-control-sm"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
            />
    </div>
        }                                {
            show==='4' && <div className="form-outline text-start mb-4">
         
            <label className="form-label" htmlFor="reading">
                No. of Pegs placed per second
            </label>
            <input  type="text"
                id="readings"
                className="form-control form-control-sm"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
            />
    </div>
        }                                {
            show==='5' && <div className="form-outline text-start mb-4">
         <div className='row'>
            <label className="form-label" htmlFor="reading">
                MAS Score
            </label></div>
            <div className='row'>
            <div className='col'>
            <Button variant="secondary" style={{'width':'15%'}}>00</Button>{' '}
            <Button variant="light" style={{'width':'15%'}}> 01 </Button>{' '}
            <Button variant="light" style={{'width':'15%'}}> 02 </Button>{' '}
            <Button variant="light" style={{'width':'15%'}}>03</Button>{' '}
            <Button variant="light" style={{'width':'15%'}}>04</Button>{' '}
            <Button variant="light" style={{'width':'15%'}}>05</Button>{' '}
            </div></div>
    </div>
        }                                {
            show==='6' && <div className="form-outline text-start mb-4">
         
            <label className="form-label" htmlFor="reading">
                VAS Score
            </label>
            <input  type="text"
                id="readings"
                className="form-control form-control-sm"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
            />
    </div>
        }                                            
                                                </div>
                                              
                                            </div>
                                           
                                          
                                    </form>
                            </div>
        </>
    );
}


export default TakeAssessmentForm;