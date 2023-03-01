import react from 'react';
import brainAlive from "../QDIC/brainalive_contact_8.png";
import LeftHand from '../../../assets/LeftHand.mp4';

const TrialPage02 = () => {

    const brainImgStyle = {
        "backgroundVideo": `url(${LeftHand})`,
        "height":"360px",
        "width":"360px",
        "backgroundSize": "360px 360px",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition":"center top"
    }

    return (
        <>
        
            <div className='container-fluid'>
                        <div className='row'>
                                
                                <div className='col'></div>
                                <div className='col text-center'><h3>Trial 02</h3></div>
                                <div className='col text-end'><img src={brainAlive} width="252px" /></div>
                        </div>
            </div>

        </>
    );
}


export default TrialPage02;