import react from 'react';
import { FaPlus } from "react-icons/fa";
import brainAlive from "../QDIC/brainalive_contact_8.png"

const TrialPage01 = () => {
    return (
        <>

            <div classname="container" style={{"height":"100vh"}}>
                {/* <div className='row h-25'>
                    <div className='col'></div>
                    <div className='col'></div>
                    <div className='col text-end'>
                            <img src={brainAlive} width="252px" />
                    </div>
                </div> */}
                    <div className='row align-items-center'>
                            <div className='col'></div>
                            <div className='col text-center'>
                                    <FaPlus style={{"width":"40vh", "height":"40vh","cursor":"pointer"}} />
                            </div>
                            <div className='col'></div>
                    </div>
            </div>

        </>
    );
}


export default TrialPage01;