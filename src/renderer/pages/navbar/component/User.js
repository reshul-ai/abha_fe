import react from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

const Loggeduser = () =>{

    return (
        <>

                <div className='container-fluid bg-dark text-light'>
                        <div className='row'>
                                <div className='col'>
                                        <AiOutlineUser />
                                </div>
                        </div>
                        <div className='row'>
                                <div className='col'>
                                        Bob Ross | (Therapist)
                                </div>
                        </div>
                        <div className='row'>
                                <div className='col'>
                                        bob.admin@therapy.com
                                </div>
                        </div>
                        <div className='row'>
                                <div className='col'>
                                        <button className='btn btn-dark'><BsBoxArrowRight />Sign Out</button>
                                </div>
                        </div>
                </div>

        </>
    );
}


export default Loggeduser;
