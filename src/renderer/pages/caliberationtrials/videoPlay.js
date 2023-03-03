import react from 'react';
import { FaPlus } from "react-icons/fa";
import brainAlive from "../../assets/brainalive_contact_8.png";
import Brianimg from '../brianimg/brainimg';
import leftHand from '../../../renderer/assets/paradigm/left-hand/left-hand.mp4';

const VideoPlay = ({videoSrc}) => {

    let videoStyle = {
        "height": '100%',
        "width": '100%',
        "float": "left",
        "top": 0,
        "left":0,
        "margin":0,
        "padding": "none",
        "position": "fixed"
    }
    
    return (
        <>
            <div className='container-fluid'>
                        <div className='row'>
                                    <video style={videoStyle} loop autoPlay>
                                        <source src={videoSrc} type="video/mp4" />
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


export default VideoPlay;