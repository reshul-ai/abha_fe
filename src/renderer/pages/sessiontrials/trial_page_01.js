import react from 'react';
import { FaPlus } from "react-icons/fa";
import brainAlive from "../../assets/brainalive_contact_8.png";
import Brianimg from '../brianimg/brainimg';

const TrialPage01 = () => {
    return (
        <>

            <div classname="container" style={{"height":"100vh"}}>
                <div className='row h-25'>
                    <div className='col'></div>
                    <div className='col'></div>
                    <div className='col text-end'>
                            <Brianimg />
                    </div>
                </div>
                    <div className='row align-items-center'>
                            <div className='col'></div>
                            <div className='col text-center'>
                                    <FaPlus style={{"width":"40vh", "height":"40vh","cursor":"pointer","color":"white"}} />
                            </div>
                            <div className='col'></div>
                    </div>
            </div>

        </>
    );
}


export default TrialPage01;