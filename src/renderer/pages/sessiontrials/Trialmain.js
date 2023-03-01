import react,{useEffect, useState} from 'react';

// Trialpage
import TrialPage01 from './trial_page_01';
import TrialPage02 from './trial_page_02';
import TrialPage03 from './trial_page_03';
import TrialPage04 from './trial_page_04';
import Endparadigm from './end_paradigm';
import Saveparadigm from './save_paradigm';
import Savedsuccess from './saved_success';
import Pls_wait from './pls_wait';

const Trailmain = () => {

    const [trialNumber, setTrialNumber] = useState(1)

    useEffect(() => {
        let i=1;
        
                setInterval(() => {
                    if(i < 6){
                        setTrialNumber(i)
                        i = i + 1
                        console.log(`Set Interval Trial Number: ${i}`)
                    }
                },4000)


                console.log(`Outside: ${i}`);
        },[])


    return (
        <>

            <div className='container-fluid' style={{"height":"100vh","backgroundColor":"#181818"}}>
                    {
                        trialNumber == 1 ? <TrialPage01 /> : (trialNumber == 2 ? <TrialPage02 /> : (trialNumber == 3 ? <Pls_wait />: (trialNumber == 4 ? <TrialPage03 />: (trialNumber == 5 ? <TrialPage04 />:<h1>Exceeded Trial Limit</h1>))))
                    }
            </div>
        
        </>
    );
}



export default Trailmain;