import react,{useEffect, useState} from 'react';
import { useLocation,useParams } from 'react-router-dom'
// Trialpage
import TrialPage01 from './trial_page_01';
import TrialPage02 from './trial_page_02';
import TrialPage03 from './trial_page_03';
import TrialPage04 from './trial_page_04';
import Endparadigm from './end_paradigm';
import Saveparadigm from './save_paradigm';
import Savedsuccess from './saved_success';
import Pls_wait from './pls_wait';
import { FaPlus } from "react-icons/fa";

// const Trailmain = () => {

//     const [trialNumber, setTrialNumber] = useState(1)


//     useEffect(() => {
//         let i=1;
        
//                 setInterval(() => {
//                     if(i < 6){
//                         setTrialNumber(i)
//                         i = i + 1
//                         console.log(`Set Interval Trial Number: ${i}`)
//                     }
//                 },4000)


//                 console.log(`Outside: ${i}`);
//         },[])


//     return (
//         <>

//             <div className='container-fluid'>
//                     {
//                         trialNumber == 1 ? <TrialPage01 /> : (trialNumber == 2 ? <TrialPage02 /> : (trialNumber == 3 ? <Pls_wait />: (trialNumber == 4 ? <TrialPage03 />: (trialNumber == 5 ? <TrialPage04 />:<h1>Exceeded Trial Limit</h1>))))
//                     }
//             </div>
        
//         </>
//     );
// }



// export default Trailmain;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import leftHand from '../../../renderer/assets/paradigm/left-hand/left-hand.mp4';
import rightArrow from '../../../renderer/assets/icons/right.png';

const steps = [
  {
    type: "image",
    url: rightArrow,
    duration: 2000 // in milliseconds
  },
  {
    type: "cv",
    url: rightArrow,
    duration: 100 // in milliseconds
  },
  {
    type: "video",
    url: leftHand,
    duration: 4000 // in milliseconds
  },
  {
    type: "cv",
    url: rightArrow,
    duration: 100 // in milliseconds
  },
  {
    type: "text",
    content: "Rest for a few seconds...",
    duration: 5000 // in milliseconds
  }
];

let loopCount = 1;

const ContentLoop = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    console.log(loopCount);

    useEffect(() => {
      let timeoutId;
  
      const advanceToNextStep = () => {
        setCurrentStepIndex((currentStepIndex + 1) % steps.length);
        if(currentStepIndex === steps.length - 1 && loopCount > 1){
            loopCount = loopCount - 1 ;
        }
      };
  
      const currentStep = steps[currentStepIndex];
      console.log("Current Step", currentStep.duration);
      timeoutId = setTimeout(advanceToNextStep, currentStep.duration || 0);
    
      return () => clearTimeout(timeoutId);
    }, [currentStepIndex]);
  
    useEffect(() => {
      console.log("re-rendered");
      setCurrentStepIndex(0);
    }, [loopCount]);
  
    if (loopCount <= 0) {
        console.log("in if");
      return null;
    }
  
    return (
      <>
        {steps[currentStepIndex].type === "image" && (
          <TrialPage01 />
        )}
        {steps[currentStepIndex].type === "video" && (
          <video src={steps[currentStepIndex].url} autoPlay muted />
        )}
        {steps[currentStepIndex].type === "text" && (
          <h1>{steps[currentStepIndex].content}</h1>
        )}
        {currentStepIndex === steps.length - 1 && loopCount > 1 && (
          <ContentLoop />
        )}
      </>
    );
};
  
  const Trialmain = () => {
    const location = useLocation();
    const loopCount = parseInt(location.pathname.split("/")[2]) || 1;
  
    return <ContentLoop />;
  };

export default Trialmain;