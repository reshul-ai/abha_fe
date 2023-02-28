import react,{useEffect, useState} from 'react';

// Trialpage
import TrialPage01 from './trial_page_01';
import TrialPage02 from './trial_page_02';


const Trailmain = () => {

    const [trialNumber, setTrialNumber] = useState(1)


    useEffect(() => {
        let i=1;

                setInterval(() => {
                    if(i < 3){
                        setTrialNumber(i)
                        i = i + 1
                        console.log(`Set Interval Trial Number: ${i}`)
                    }
                },4000)

                console.log(`Outside: ${i}`);
    },[]);


    return (
        <>

            <div className='container-fluid'>
                    {
                        trialNumber == 1 ? <TrialPage01 /> : (trialNumber == 2 ? <TrialPage02 /> : <h1>Exceeded Trial Limit</h1>)
                    }
            </div>
        
        </>
    );
}



export default Trailmain;