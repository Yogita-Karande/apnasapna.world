// FOR UPLOAD IMAGE OR FILE WHEN CLICK ON IMAGE 

// 1) give  input and their type (file) 
// 2) add image which we want to click 
// 3) import {useState and useref}
// 4) Create useRef 
// 5) add InputRef in input 
// 6) pass function (handleImageClick) in div that will trigger inputref 
// 7) Hide input box using style 
// 8) Make a function for change image and add event onChange() in event pass function in onchage event
// 9) make event.target.files for console value 
// 10)  add o value for show image

// SHOW IMAGE ON UI

// 1) Add condition on image
// 2) create URL for image save according us



import { useRef, useState } from "react";
import { Form } from "react-bootstrap";



function ImageUpload (){

    const InputRef = useRef()
    const [image , setImage] = useState(null)
    
    const handleImageClick = () =>{
        InputRef.current.click()
    }

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        console.log(file)
        setImage(event.target.files[0])
        
    }

    return(
        <div onClick={handleImageClick} >
            {/* <Form.Label ><FontAwesomeIcon icon={faFileUpload}/>Browser Upload<Form.Control type="file" ref={InputRef} onChange={handleImageChange}  style={{display :"none"}}/></Form.Label><br/> */}
            <Form.Group>
                <Form.Label className='text-white' style={{ width:    "200px", height: "200px", display: "inline-block" }}>
                    
                    <input type="file" ref={InputRef} onChange={handleImageChange} style={{display :"none"}} ></input><br/>                 
                    {
                        image ? <img src={URL.createObjectURL(image)} alt=""  style={{ width:    "150px", height: "150px",  }}/> : <img src="" alt=""  style={{ width:    "150px", height: "150px",  }}/>
                    }
                </Form.Label>
            </Form.Group>
        </div>
    )
}



export default ImageUpload
