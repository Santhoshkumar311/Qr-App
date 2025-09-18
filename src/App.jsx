import {useState} from "react"

export const QrCode = () => {
  const [img, setImg] = useState("")
   const [loading,setLoading] = useState(false)
   const [qrData,setData] = useState ("")
  const [qrSize, setQrSize] = useState("150")

  


  async function GenerateQR(){
    setLoading(true)
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url)

    }catch(error){
      console.error("Error generatin QR Code",error)

    }finally{
      setLoading(false)
    }
  }
  function DownloadQR(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob) =>{
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }).catch((error)=>{
    console.error("Error downloadind QR code", error)
    })
  }
  return (
    <div className="app-container">

            <h1>QR Code Generator</h1>
           {loading && <p>Please Wait....</p>}
        {img && <img src={img} className="qr-code-image"/>}
      <div>
        <label htmlFor="dataInput" className="input-label" >Data For QR Code:</label>
        <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR Code" onChange={(e)=> setData(e.target.value)}/>
        <label htmlFor="dataInput" className="input-label">Image size(e.g.,150):</label>
        <input type="text" id="sizeInput" placeholder="Enter image size" value={qrSize} onChange={(e)=> setQrSize(e.target.value)}/>
        <div style={{display:"flex"}}>
          <button className="Gbutton" disabled={loading} onClick={GenerateQR} >Generate QR Code</button>
        <button className="Dbutton" onClick={DownloadQR}>Download QR Code</button>
        </div>
        
      </div>
      <p className="footer"> <a href="https://www.linkedin.com/in/santhoshkumar-k-71723729b/"></a></p>
    </div>
    
  )
}

export default QrCode 
