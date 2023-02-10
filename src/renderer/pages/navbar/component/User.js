import react from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxArrowRight } from "react-icons/bs";

const Loggeduser = () =>{


    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(e) {
        if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
          if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
          }
        }
      }

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