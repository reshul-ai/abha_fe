import react from 'react';
import brainAlive from "../../assets/brainalive_contact_8.png";
import Brianimg from '../brianimg/brainimg';
import LeftHand from '../../assets/LeftHand.mp4'

const TrialPage02 = () => {

    let videoStyle = {
        "height": '100%',
        "width": '100%',
        "float": "left",
        "top": 0,
        "padding": "none",
        "position": "fixed"
    }

    return (
        <>
        
            <div className='container-fluid'>
                        <div className='row'>
                                    <video style={videoStyle} loop autoPlay>
                                        <source src={LeftHand} type="video/mp4" />
                                    </video>
                                <div className='col'>
                                    
                                </div>
                                <div className='col text-center'></div>
                                <div className='col text-end' style={{"zIndex":9}}>
                                    <Brianimg />
                                </div>
                        </div>
            </div>
        
        </>
    );
}


export default TrialPage02;