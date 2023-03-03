import react from 'react';
import Brianimg from '../brianimg/brainimg';

const Pls_wait = () => {
    return (
        <>
            <div className="container-fluid" style={{"height":"100vh"}}>
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
                                <h1>Please wait, next trial will start shortly...</h1>
                            </div>
                            <div className='col'></div>
                </div>
            </div>
        </>
    );
}



export default Pls_wait;