import react from 'react';
import Plot from 'react-plotly.js';
import MIAChart from'./MiaChart';
import ARATChart from'./ARATChart';
import GSSChart from'./GSSChart';
const Patientdashboard = () => {


    let x_axis_01 = [
        'session 01',
        'session 02',
        'session 03',
        'session 04',
        'session 05'
      ];
    
      let x_axis_02 = [
        'session 01',
        'session 02',
        'session 03',
        'session 04',
        'session 05'
      ];

      let x_axis_03 = [
        'session 01',
        'session 02',
        'session 03',
        'session 04',
        'session 05'
      ];
    
    
      let y_axis_01 = [
        2,1,1,6,8
      ]
      let y_axis_02 = [
        2,1,1,6,8
      ]
      let y_axis_03 = [
        2,1,1,6,8
      ]
    
      let trace1 = {
          x: x_axis_01,
          y: y_axis_01,
          type: 'scatter',
          mode: 'scatter',
          fill: 'tozeroy',
          marker: {color: 'red'},
          'line': {'shape': 'spline',  'smoothing': 1.3}
      }

      let trace2 = {
        x: x_axis_02,
        y: y_axis_02,
        type: 'scatter',
        fill: 'tozeroy',
        marker: {color: 'orange'},
        'line': {'shape': 'spline',  'smoothing': 1.3}
    }

    let trace3 = {
      x: x_axis_03,
      y: y_axis_03,
      type: 'scatter',
      fill: 'tozeroy',
      marker: {color: 'green'},
      'line': {'shape': 'spline',  'smoothing': 1.3}
    }
    
    return (
        <>

                <div className='container-fluid'>
                <div className='row pt-4'>
                                                <div className='col'>
                                                        <div className='row'>
                                                                <div className='col'>
                                                                        <p>MI Accuracy vs Sessions</p>
                                                                </div>
                                                                
                                                             </div>

                                                        <MIAChart /></div></div>      
                                                        <div className='row pt-4'>
                                                <div className='col'>
                                                        <div className='row'>
                                                                <div className='col'>
                                                                        <p>ARAT Score Analytics</p>
                                                                </div>
                                                                
                                                             </div>

                                                        <ARATChart /></div></div>  
                                                        <div className='row pt-4'>
                                                <div className='col'>
                                                        <div className='row'>
                                                                <div className='col'>
                                                                        <p>GS Score vs Sessions</p>
                                                                </div>
                                                                
                                                             </div>

                                                        <GSSChart /></div></div>  
                       
                        
                </div>
        
        </>
    );
}


export default Patientdashboard;