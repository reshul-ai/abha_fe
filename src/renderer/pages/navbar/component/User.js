import react from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

const Loggeduser = () =>{

    return (
        <>

                <div className='container-fluid bg-dark text-light pt-3 pb-3'>
                        <div className='row'>
                                <div className='col' style={{"fontSize":"25px"}}>
                                        <AiOutlineUser />
                                </div>
                        </div>
                        <div className='row pt-2'>
                                <div className='col'>
                                        <h6>Bob Ross | <span style={{"color":"grey"}}>(Therapist)</span></h6>
                                </div>
                        </div>
                        <div className='row'>
                                <div className='col'>
                                        bob.admin@therapy.com
                                </div>
                        </div>
                        <div className='row pt-2' >
                                <div className='col'>
                                        <a href='/home' ><button className='btn' style={{"backgroundColor":"black","color":"white"}}><span style={{"fontSize":"18px"}}><BsBoxArrowRight /></span>&nbsp;&nbsp;&nbsp;<small>Sign Out</small></button></a>
                                </div>
                        </div>
                </div>

        </>
    );
}


export default Loggeduser;
