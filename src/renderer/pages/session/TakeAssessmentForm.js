import { getNewASSES } from 'main/ipcCommunication';
import react, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';

const TakeAssessmentForm = ({MIA, onChildClick,patientData}) => {

     // --------------- Defining Form States  ----------------------//

     const [GS, setGS] = useState('');
     const [ARAT, setARAT] = useState('');
     const [FuglMeyer, setFuglMeyer] = useState('');
     const [NineHolePeg, setNineHolePeg] = useState('');
     const [MAS, setMAS] = useState(0);
     const [VAS, setVAS] = useState('');

     const [show, setShow] = useState('1');
     
     // --------------- Defining Form States  ----------------------//


     const handleSubmit = (event) => {
        event.preventDefault();
       
      };

      const [newAssesmentId, setNewAssesmentId] = useState('');
      const [sessionData, setSessionData] = useState({items:[]});

      const getSessionsData = (() => {
        window.require("electron").ipcRenderer.send("getSessionData",{});
  
        window.require("electron").ipcRenderer.on("getSessionData", (e,data) => {
                //console.log(data.items);
                setSessionData(data);
        });
      });

      const getNewASSESId = (() => {
        if (window.require && window.require("electron")){
            window.require("electron").ipcRenderer.send("getNewASSES",patientData.id);

            window.require("electron").ipcRenderer.on("getNewASSES", (e,data) => {
                setNewAssesmentId(data);
            })
        }
      });

      const [lastSesssion, setLastSession] = useState('');

      const getlastattendSession = (() => {
        if (window.require && window.require("electron")){
            window.require("electron").ipcRenderer.send("getSessionByPatientId",patientData.id);

        window.require("electron").ipcRenderer.on("getSessionByPatientId", (e,data) => {
            console.log(data);
            const sessions = [];
            data.items.map(item => {
                if (item.status === "FINISHED") {
                  const sessionEndTime = new Date(`${item.date} ${item.endTime}`);
                  const currentMaxEndTime = sessions.length > 0 ? new Date(`${sessions[0].date} ${sessions[0].endTime}`) : null;
                  if (!currentMaxEndTime || sessionEndTime > currentMaxEndTime) {
                    sessions.splice(0, sessions.length, item);
                  } else if (sessionEndTime.getTime() === currentMaxEndTime.getTime()) {
                    sessions.push(item);
                  }
                }
              });
            setLastSession(data);
            console.log(data);
        });
        }
      });

      const getLastAttendedSession = () => {
        let sessions = sessionData.items.filter((session) => session.patientId === patientData.patientId);
        let lastSession = null;
      
        sessions.forEach(session => {
          const sessionEndTime = new Date(`${session.date} ${session.endTime}`);
          const currentDate = new Date();
    
          if (sessionEndTime < currentDate && (!lastSession || sessionEndTime > new Date(`${lastSession.date} ${lastSession.endTime}`))) {
            lastSession = session;
          }
          
        });
      
        // console.log(lastSession);
        return lastSession;
      }

      const [curDate, setCurDate] = useState();
      const [curTime, setCurTime] = useState();

      const getCurrentDateTime = (() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
        const day = String(currentDate.getDate()).padStart(2, "0");
        setCurDate(`${year}-${month}-${day}`);

        const hours = currentDate.getHours();
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const amOrPm = hours >= 12 ? "PM" : "AM";
        const twelveHourFormat = hours % 12 || 12;
        setCurTime(`${twelveHourFormat}:${minutes} ${amOrPm}`);
      });

      useEffect(() => {
        getNewASSESId();
        getlastattendSession();
        getCurrentDateTime();
        getSessionsData();
      },[]);
      
      const submitAssessment = (() => {
        if (window.require && window.require("electron")){
            const lastSession = getLastAttendedSession();
            const assessmentData = {
                id:newAssesmentId,
                patientId:patientData.id,
                date:curDate,
                time:curTime,
                GS,
                ARAT,
                FuglMeyer,
                NineHolePeg,
                MAS,
                VAS,
                lastSesssionId:lastSession?.id,
                MIA
            };
            window.require("electron").ipcRenderer.send("addAssesment",assessmentData);
        }
        onChildClick();
      });
    return (
        <>
                        <div className='container-fluid p-0 m-0'>
                                    <form onSubmit={handleSubmit}>
                                                <div className='row pb-2 px-1'>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #8A8A93"}}>
                                                                <div className='row pb-2'><div className='col text-center'>Assessment ID</div></div>
                                                                <div className='row Assessments-labelValue pb-2'><div className='text-center'>{newAssesmentId}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #8A8A93"}}>
                                                                <div className='row pb-2 ps-3 '><div className='text-center'>Patient</div></div>
                                                                <div className='row Assessments-labelValue pb-2 ps-3'><div className='text-center'>{patientData.name}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label' style={{"borderRight": "1px solid #8A8A93"}}>
                                                                <div className='row pb-2 ps-3'><div className='text-center'>Date</div></div>
                                                                <div className='row Assessments-labelValue pb-2 ps-3'><div className='text-center'>{curDate}</div></div>
                                                        </div>
                                                        <div className='col Assessments-label'>
                                                                <div className='row pb-2 ps-3'><div className='text-center'>Start Time</div></div>
                                                                <div className='row Assessments-labelValue pb-2 ps-3'><div className='text-center'>{curTime}</div></div>
                                                        </div>
                                                       
                                                </div>
                                            
                                            <div className='row pt-4'>

                                                    <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black" }}>
                                                        <span className={show==='1' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('1') }} 
                                                        style={{ 'borerBottom': show==='1' ? "2px solid black" : "none" }}>
                                                            GS</span>
                                                            </div>
                                                            <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black"  }}>
                                                    <span className={show==='2' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('2')}} 
                                                        style={{ 'borerBottom': show==='2' ? "2px solid black" : "none"  }}>ARAT</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black" }}>
                                                        <span className={show==='3' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('3')}} 
                                                        style={{  'borerBottom': show==='3' ? "2px solid black" : "none"  }}>Fugl-Meyer</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black"  }}>
                                                        <span className={show==='4' ? "Assess-labelValue" : "Assess-label"} onClick={() => {setShow('4') }} 
                                                        style={{  'borerBottom': show==='4' ? "2px solid black" : "none"  }}>9-Hole Peg</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer","borderRight":"1px solid black"  }}>
                                                        <span className={show==='5' ? "Assess-labelValue" : "Assess-label"} onClick={() => { setShow('5') }} 
                                                        style={{  'borerBottom': show==='5' ? "2px solid black" : "none" }}>MAS</span></div>
                                                        <div className='col text-center' style={{ "cursor": "pointer" }}>
                                                        <span className={show==='6' ? "Assess-labelValue" : "Assess-label"} onClick={() => {setShow('6')}} 
                                                        style={{ 'borerBottom': show==='6' ? "2px solid black" : "none"  }}>VAS</span></div>
                                                    
                                                    
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
                value={GS}
                onChange={(e) => setGS(e.target.value)}
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
                value={ARAT}
                onChange={(e) => setARAT(e.target.value)}
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
                value={FuglMeyer}
                onChange={(e) => setFuglMeyer(e.target.value)}
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
                value={NineHolePeg}
                onChange={(e) => setNineHolePeg(e.target.value)}
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
            <Button variant={MAS==0 ?"secondary":"light"} style={{'width':'15%'}} onClick={() => {console.log("clicked");setMAS(0)}}>00</Button>{' '}
            <Button variant={MAS==1 ?"secondary":"light"} style={{'width':'15%'}}onClick={() => {setMAS(1)}}> 01 </Button>{' '}
            <Button variant={MAS==2 ?"secondary":"light"} style={{'width':'15%'}}onClick={() => {setMAS(2)}}> 02 </Button>{' '}
            <Button variant={MAS==3 ?"secondary":"light"} style={{'width':'15%'}}onClick={() => {setMAS(3)}}>03</Button>{' '}
            <Button variant={MAS==4 ?"secondary":"light"} style={{'width':'15%'}}onClick={() => {setMAS(4)}}>04</Button>{' '}
            <Button variant={MAS==5 ?"secondary":"light"} style={{'width':'15%'}}onClick={() => {setMAS(5)}}>05</Button>{' '}
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
                value={VAS}
                onChange={(e) => setVAS(e.target.value)}
            />
    </div>
        }                                            
                                                </div>
                                              
                                            </div>
                                           
                                          
                                    </form>
                            </div>

                            <div className='row'>
                                                <div className='col'>
                                                    <div className="form-outline text-start mb-4">
                                            <Button variant="secondary" onClick={onChildClick} style={{'width':'100%','backgroundColor':'#FFFFFF','color':'#006666','borderColor':'#006666'}}>
                                                                                Cancel
                                                                        </Button>
                                                                        </div></div>
                                                                        <div className='col'>
                                                    <div className="form-outline text-start mb-4" >
                                                                        <Button variant="primary" onClick={submitAssessment} style={{'width':'100%','backgroundColor':'#006666','color':'#FFFFFF',}}>
                                                                        Save
                                                                        </Button>
                                           </div></div></div>
        </>
    );
}


export default TakeAssessmentForm;