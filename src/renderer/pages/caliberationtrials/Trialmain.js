// import react,{useEffect, useState} from 'react';
// import { useLocation,useParams } from 'react-router-dom';

// // Trialpage
// import TrialPage01 from './trial_page_01';
// import TrialPage02 from './trial_page_02';

// const steps = [
//     {
//       type: "image",
//       url: "rightArrow",
//       duration: 2000 // in milliseconds
//     },
//     {
//       type: "video",
//       url: "leftHand",
//       duration: 4000 // in milliseconds
//     },
//     {
//       type: "text",
//       content: "Rest for a few seconds...",
//       duration: 2000 // in milliseconds
//     }
// ];

// const steps2 = [
// {
//     type: "image",
//     url: "rightArrow",
//     duration: 2000 // in milliseconds
// },
// {
//     type: "video",
//     url: "rightHand",
//     duration: 4000 // in milliseconds
// },
// {
//     type: "text",
//     content: "Rest for a few seconds...",
//     duration: 2000 // in milliseconds
// }
// ];

// const steps3 = [
//     {
//       type: "image",
//       url: "rightArrow",
//       duration: 2000 // in milliseconds
//     },
//     {
//       type: "video",
//       url: "leftHand",
//       duration: 4000 // in milliseconds
//     },
//     {
//       type: "text",
//       content: "Rest for a few seconds...",
//       duration: 2000 // in milliseconds
//     },
//     {
//       type: "video",
//       url: "rightHand",
//       duration: 4000 // in milliseconds
//     },
//     {
//       type: "text",
//       content: "Rest for a few seconds...",
//       duration: 2000 // in milliseconds
//     }
// ];

// const Trailmain = () => {
//     let { id, loop } = useParams();
//     let paradigmId = id;
//     let loopCount = loop;

//     const [trialNumber, setTrialNumber] = useState(1)

//     const [leftHandPath,setLeftHandPath] = useState('');
//     const [rightHandPath, setRightHandPath] = useState('');

//     const getAssetPath = (()=> {
//             if(window.require && window.require("electron")) 
//                     window.require("electron").ipcRenderer.send("path", 'left-hand.mp4');
//             if(window.require && window.require("electron")) 
//                     window.require("electron").ipcRenderer.on("path", (e,data) => {
//                     setLeftHandPath(data);
//             })
//             if(window.require && window.require("electron")) 
//                     window.require("electron").ipcRenderer.send("path", 'right-hand.mp4');
//             if(window.require && window.require("electron")) 
//                     window.require("electron").ipcRenderer.on("path", (e,data) => {
//                     setRightHandPath(data);
//             })
//     });
    
//     useEffect(() => {
//         getAssetPath();
//     },[]);

//     useEffect(() => {
//         let i=1;

//         setInterval(() => {
//             if(paradigmId==='P1' && paradigmId==='P1')
//                 if(i < 3){
//                     setTrialNumber(i)
//                     i = i + 1
//                     console.log(`Set Interval Trial Number: ${i}`)
//                 }
//         },4000)

//         console.log(`Outside: ${i}`);
//     },[]);

//     const [paradigmData,setParadigmData] = useState({trails:steps});

//   useEffect(() => {
//     console.log(loopCount, paradigmId);
//     if(window && window.require("electron")){
//       window.require("electron").ipcRenderer.send("getParadigmById",paradigmId);

//       window.require("electron").ipcRenderer.on("getParadigmById", (e,data) => {
//               console.log(data);
//               setParadigmData(data);
//       });
//     }

//     if(window && window.require("electron")){
//       setTimeout(() => {
//         const paradigm_data = `{"paradigm_start":"${new Date().toUTCString()}","paradigmDetails":{"id":"${paradigmId}","loop":"${loopCount}"}}`;
//         window.require("electron").ipcRenderer.send("paradigm_start",paradigm_data);

//         window.require("electron").ipcRenderer.on("paradigm_start", (e,data) => {
//                 console.log(data);
//                 setDisplay(true);
//         });
//       }, 300);
//     }
//   },[]);

//     return (
//         <>

//             <div className='container-fluid'>
//                     {
//                         trialNumber == 1 ? <TrialPage01 /> : (trialNumber == 2 ? <VideoPlay videoSrc={paradigmData.trials[currentStepIndex].url}/> : <h1>Exceeded Trial Limit</h1>)
//                     }
//             </div>
        
//         </>
//     );
// }



// export default Trailmain;

import react,{useEffect, useState} from 'react';
import { useLocation,useParams } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
// Trialpage
import TrialPage01 from './trial_page_01';

import Pls_wait from './pls_wait';


// import { app } from 'electron';
// import path from 'path';

// const leftHand = path.join(app.getAppPath(), 'videos', 'left-hand.mp4');

import leftHand from '../../../renderer/assets/paradigm/left-hand/left-hand.mp4';
import rightArrow from '../../../renderer/assets/icons/right.png';
import Success from '../../../renderer/assets/icons/Success.png';
import Failure from '../../../renderer/assets/icons/Failure.png';
import VideoPlay from './videoPlay';

import ResModal from './Modals/resModal1';
import path from 'path';

const steps = [
  {
    type: "image",
    url: rightArrow,
    duration: 1500 // in milliseconds
  },
  {
    type: "video",
    url: leftHand,
    duration: 4000 // in milliseconds
  },
  {
    type: "text",
    content: "Rest for a few seconds...",
    duration: 2000 // in milliseconds
  }
];

const steps2 = [
  {
    type: "image",
    url: rightArrow,
    duration: 1500 // in milliseconds
  },
  {
    type: "video",
    url: leftHand,
    duration: 4000 // in milliseconds
  },
  {
    type: "text",
    content: "Rest for a few seconds...",
    duration: 2000 // in milliseconds
  }
];

const steps3 = [
  {
    type: "image",
    url: rightArrow,
    duration: 1500 // in milliseconds
  },
  {
    type: "video",
    url: leftHand,
    duration: 4000 // in milliseconds
  },
  {
    type: "text",
    content: "Rest for a few seconds...",
    duration: 2000 // in milliseconds
  },
  {
    type: "video",
    url: leftHand,
    duration: 4000 // in milliseconds
  },
  {
    type: "text",
    content: "Rest for a few seconds...",
    duration: 2000 // in milliseconds
  }
];

let loopCount = 1, paradigmId = "P1";

const ContentLoop = ({paradigmData}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let timeoutId;

    const advanceToNextStep = () => {
      if(paradigmData.trials.type == 'image' && currentStepIndex==0){
        console.log("in paradigmData.trials if");
        // paradigmData.trials.splice(0,1);
      }
      if (currentStepIndex === paradigmData.trials.length - 1 && loopCount >= 1) {
        setCurrentStepIndex(0);
        loopCount = loopCount - 1;
        return;
      }

      setCurrentStepIndex((currentStepIndex + 1) % paradigmData.trials.length);
    };

    const currentStep = paradigmData.trials[currentStepIndex];

    timeoutId = setTimeout(advanceToNextStep, currentStep.duration || 0);

    return () => clearTimeout(timeoutId);
  }, [currentStepIndex, loopCount]);
  
  if (loopCount <= 0) {
    if (window.require && window.require("electron")) {
      window.require("electron").ipcRenderer.send("calibmain", `{"Status":"close"}`);
    }
    console.log("ends");
  } else if(loopCount < 0 ){
    console.log("re-rendered",loopCount);
    // if(client){
    //   client.write('contact_quality_check');
    // }
  }

  const [showPopup, setShowPopup] = useState(false);
  const [res, setRes] = useState(0);
  const handleClose = () => setShowPopup(false);

  if (window.require && window.require("electron")) {
    window.require("electron").ipcRenderer.on("paradigm", (e,data) => {
        data = JSON.parse(data);
        if(data.paradigm.result === 1){
          setRes(1);
        } else {
          setRes(0);
        }
        setShowPopup(true);
          setTimeout(() => {
            handleClose();
          }, 1000);
    });
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        // send a message to the main window to close the child window
        // window.opener.postMessage('close-child-window', '*');
          console.log("key pressed");
          //     if(window && window.require("electron")){
          
          window.require("electron").ipcRenderer.send("calibmain",`{"Status":"close","from":"calib"}`);

      }
      }

    window.document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.document.removeEventListener('keydown', handleKeyDown);
    };
  },[]);

  return (
    <>
    <div className='container-fluid'>
      {paradigmData.trials[currentStepIndex].type === "image" && (
        <TrialPage01 />
      )}
      {paradigmData.trials[currentStepIndex].type === "video" && (
        <VideoPlay videoSrc={paradigmData.trials[currentStepIndex].url}/>
      )}
      {paradigmData.trials[currentStepIndex].type === "text" && (
        <Pls_wait />
      )}
      </div>
      {/* <Modal show={showPopup} onHide={handleClose} className='transparent-background' size='sm' style={{backgroundColor: "transparent",border:"none",opacity: '1' }}>
        <div className="mt-4 d-flex justify-content-center">
          <img src={res ? Success : Failure}/>
        </div>
      </Modal> */}
    {/* {
      showPopup && (
        <ResModal res={res} handleClose={handleClose}/>
      )
    } */}
    <div className={`image-container ${showPopup ? "show" : ""}`}>
      <img src={res==1 ? Success : Failure} alt={res?"Sucess":"Failure"} />
    </div>
    </>
  );
};

const Trialmain = () => {
  let { id, loop } = useParams();
  paradigmId = id;
  loopCount = loop;

  const [paradigmData,setParadigmData] = useState({trails:steps});
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    console.log(loopCount, paradigmId);
    if(window && window.require("electron")){
      window.require("electron").ipcRenderer.send("getParadigmById",paradigmId);

      window.require("electron").ipcRenderer.on("getParadigmById", (e,data) => {
              console.log(data);
              setParadigmData(data);
              setDisplay(true);
      });
    }

//     if(window && window.require("electron")){
//       setTimeout(() => {
//         const paradigm_data = `{"paradigm_start":"${new Date().toUTCString()}","paradigmDetails":{"id":"${paradigmId}","loop":"${loopCount}"}}`;
//         window.require("electron").ipcRenderer.send("paradigm_start",paradigm_data);

//         window.require("electron").ipcRenderer.on("paradigm_start", (e,data) => {
//                 console.log(data);
//                 setDisplay(true);
//         });
//       }, 300);
//     }
  },[]);

  

  return (
      <>
        {display && <ContentLoop paradigmData={paradigmData}/>}
      </>
  )
};

export default Trialmain;