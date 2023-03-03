import react, {useRef, useEffect, useState} from 'react';
import brianImg from "../patients/QDIC/brainalive_contact_8.png";
 
const SessionHcq = () => {


    const [dataset, setDataset] = useState({"contact_quality":{CH1:"grey",CH2:"grey",CH3:"grey",CH4:"grey",CH5:"grey",CH6:"grey",CH7:"grey",CH8:"grey"}})

    // {"contact_quality":{CH1:"red",CH2:"green",CH3:"orange",CH4:"green",CH5:"orange",CH6:"red",CH7:"green",CH8:"green"}}

    useEffect(()=>{
        if(window && window.require("electron")){
            // window.require("electron").ipcRenderer.send('contact_quality_check',`{"contact_quality_check":"start"}`);
            
            window.require("electron").ipcRenderer.on("contact_quality", (e,data) => {
                let contactQuality = JSON.parse(data);
                // console.log(JSON.parse(data));
                for (const key in contactQuality.contact_quality) {
                    // console.log(key);
                    const value = contactQuality.contact_quality[key];
                    contactQuality.contact_quality[key] = value > 80 ? "red" : (value >= 50 ? "orange" : "green");
                }
                console.log(contactQuality);
                setDataset(contactQuality);
            });
        }
        // setTimeout(() => {
        //     setDataset({"contact_quality":{CH1:"red",CH2:"green",CH3:"orange",CH4:"green",CH5:"orange",CH6:"red",CH7:"green",CH8:"green"}})
        // },1000)
    },[])

    const brainImgStyle = {
        "backgroundImage": `url(${brianImg})`,
        "height":"382px",
        "width":"388px",
        "backgroundSize": "382px 388px",
        "backgroundRepeat": "no-repeat",
        "backgroundPosition":"center top"
    }

    const canvasRef = useRef(null)
    const canvasRef2 = useRef(null)
    const canvasRef3 = useRef(null)


    const draw11 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH1}`
        ctx.beginPath()
        ctx.arc(85, 110, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw12 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH2}`
        ctx.beginPath()
        ctx.arc(210, 110, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw21 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH3}`
        ctx.beginPath()
        ctx.arc(80, 65, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw22 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH4}`
        ctx.beginPath()
        ctx.arc(150, 62, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw23 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH5}`
        ctx.beginPath()
        ctx.arc(220, 62, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw31 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH6}`
        ctx.beginPath()
        ctx.arc(85, 20, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw32 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH7}`
        ctx.beginPath()
        ctx.arc(150, 20, 10, 0, 2*Math.PI)
        ctx.fill()
      }

      const draw33 = ctx => {
        ctx.fillStyle = `${dataset.contact_quality.CH8}`
        ctx.beginPath()
        ctx.arc(215, 20, 10, 0, 2*Math.PI)
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
        
            <div className='container-fluid'>
                <div className='row text-center'>
                                    <div className='col text-center pt-3' style={brainImgStyle}>
                                            <div className='row' style={{"height":"33%"}}>
                                                    <div className='col'>
                                                            <div className='row'>
                                                            <div className='col'></div>
                                                            <div className='col'></div>
                                                            </div>
                                                    </div>
                                                    <div className='col'><canvas ref={canvasRef} /></div>
                                                    <div className='col'></div>
                                            </div>
                                            <div className='row' style={{"height":"33%"}}>
                                                    <div className='col'></div>
                                                    <div className='col'>
                                                             <canvas ref={canvasRef2} />
                                                    </div>
                                                    <div className='col'></div>
                                            </div>
                                            <div className='row' style={{"height":"33%"}}>
                                                    <div className='col' ></div>
                                                    <div className='col'><canvas ref={canvasRef3} /></div>
                                                    <div className='col'></div>
                                            </div>
                                        {/* <img src={brianImg} height="320" width="320" /> */}
                                    </div>
                </div>
            </div>
        
        </>
    );
    
}


export default SessionHcq;