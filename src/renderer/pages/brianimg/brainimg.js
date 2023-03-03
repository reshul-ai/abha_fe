import react, {useRef, useEffect, useState} from 'react';
import brianImg from '../patients/QDIC/brainalive_contact_8.png';


const Brianimg = () => {

  //   const handleClick = () => {
  //       window.electron.ipcRenderer.sendMessage('brian-image', ['www.google.com']);
  //   }

    const [dataset, setDataset] = useState({"contact_quality":{CH1:"grey",CH2:"grey",CH3:"grey",CH4:"grey",CH5:"grey",CH6:"grey",CH7:"grey",CH8:"grey"}})

  //   // {"contact_quality":{CH1:"red",CH2:"green",CH3:"orange",CH4:"green",CH5:"orange",CH6:"red",CH7:"green",CH8:"green"}}

  //   useEffect(()=>{
  //     if(window && window.require("electron")){
  //         // window.require("electron").ipcRenderer.send('contact_quality_check',`{"contact_quality_check":"start"}`);
          
  //         window.require("electron").ipcRenderer.on("contact_quality", (e,data) => {
  //             let contactQuality = JSON.parse(data);
  //             // console.log(JSON.parse(data));
  //             for (const key in contactQuality.contact_quality) {
  //                 // console.log(key);
  //                 const value = contactQuality.contact_quality[key];
  //                 contactQuality.contact_quality[key] = value > 80 ? "red" : (value >= 50 ? "orange" : "green");
  //             }
  //             console.log(contactQuality);
  //             setDataset(contactQuality);
  //         });
  //     }
      setTimeout(() => {
          setDataset({"contact_quality":{CH1:"red",CH2:"green",CH3:"orange",CH4:"green",CH5:"orange",CH6:"red",CH7:"green",CH8:"green"}})
      },1000)
  // },[])


    const brainImgStyle = {
        "backgroundImage": `url(${brianImg})`,
        "height":"200px",
        "width":"200px",
        "backgroundSize": "200px 200px",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition":"right top"
    }

    const canvasRef = useRef(null)
    const canvasRef2 = useRef(null)
    const canvasRef3 = useRef(null)


    const draw11 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH1}`
        ctx.beginPath()
        ctx.arc(180, 65, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw12 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH2}`
        ctx.beginPath()
        ctx.arc(245, 65, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw21 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH3}`
        ctx.beginPath()
        ctx.arc(170, 38, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw22 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH4}`
        ctx.beginPath()
        ctx.arc(210, 38, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw23 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH5}`
        ctx.beginPath()
        ctx.arc(250, 38, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw31 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH6}`
        ctx.beginPath()
        ctx.arc(180, 8, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw32 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH7}`
        ctx.beginPath()
        ctx.arc(214, 8, 7, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw33 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH8}`
        ctx.beginPath()
        ctx.arc(245, 8, 7, 0, 2*Math.PI)
        ctx.fill()
      }


      useEffect(() => {
        const canvas = canvasRef.current
        const canvas2 = canvasRef2.current
        const canvas3 = canvasRef3.current
        const context = canvas.getContext('2d')
        const context2 = canvas2.getContext('2d')
        const context3 = canvas3.getContext('2d')
        // Our draw come here
        draw11(context)
        draw12(context)
        draw21(context2)
        draw22(context2)
        draw23(context2)
        draw31(context3)
        draw32(context3)
        draw33(context3)
      }, [draw11, draw12, draw21, draw22, draw23, draw31, draw32, draw33])


    return (
        <>

                    <div className='container-fluid' >
                        <div className='row'>
                                    <div className='col text-start' style={brainImgStyle}>
                                            <div className='row' style={{"height":"33%"}}>
                                                    <div className='col'>
                                                            <div className='row'>
                                                            <div className='col'></div>
                                                            <div className='col'></div>
                                                            </div>
                                                    </div>
                                                    <div className='col'></div>
                                                    <div className='col'><canvas ref={canvasRef} /></div>
                                            </div>
                                            <div className='row' style={{"height":"33%"}}>
                                                    <div className='col'></div>
                                                    <div className='col'>
                                                             
                                                    </div>
                                                    <div className='col'><canvas ref={canvasRef2} /></div>
                                            </div>
                                            <div className='row' style={{"height":"33%"}}>
                                                    <div className='col' ></div>
                                                    <div className='col'></div>
                                                    <div className='col'><canvas ref={canvasRef3} /></div>
                                            </div>
                                  
                                    </div>
                        </div>
                    </div>
                {/* <img src={brianImg} height="200" width="200" onClick={handleClick} /> */}

        </>
    );

}

  
export default Brianimg;