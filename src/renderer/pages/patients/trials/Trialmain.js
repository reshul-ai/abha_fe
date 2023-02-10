import react,{useEffect, useState} from 'react';

// Trialpage
import TrialPage01 from './trial_page_01';
import TrialPage02 from './trial_page_02';
import TrialPage03 from './trial_page_03';
import TrialPage04 from './trial_page_04';

const Trailmain = () => {

    const [trialNumber, setTrialNumber] = useState(1);


    useEffect(() => {
        let i=2;
        
                setInterval(() => {
                    if(i < 5){
                        setTrialNumber(i)
                        i = i + 1
                        console.log(`Set Interval Trial Number: ${i}`)
                    }
                },4000)


                console.log(`Outside: ${i}`)
    },[])


    return (
        <>

            <div className='container-fluid'>
                    {
                        trialNumber == 1 ? <TrialPage01 /> : (trialNumber == 2 ? <TrialPage02 /> : (trialNumber == 3 ? <TrialPage03 />: (trialNumber == 4 ? <TrialPage04 />: <h1>Exceeded Trial Limit</h1>)))
                    }
            </div>
        
        </>
    );
}



export default Trailmain;