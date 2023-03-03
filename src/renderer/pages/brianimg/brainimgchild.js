import react from 'react';
import brianImg from '../patients/QDIC/brainalive_contact_8.png';


const Brianimgchild = () => {

    return (
        <>
                <div className='container-fluid'>
                        <div className='row'>
                                    <div className='col text-center pt-3'>
                                        <img src={brianImg} height="320" width="320" />
                                    </div>
                        </div>
                        <div className='row'>
                                    <div className='col text-center pt-3'>
                                        <button className='btn btn-outline-success'>Show Plot</button>
                                    </div>
                        </div>
                </div>
        </>
    );

}

  
export default Brianimgchild;