import { Form } from "react-bootstrap"

export const InputField =(Col,Label,type,placeholder,defaultValue)=>{

return(


    <Col className="form-group">
       <Form.Group lg={Col} md="4" controlId="validationCustom01">
          <Form.Label>{Label}</Form.Label>
          <Form.Control
            required
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
          </Form.Group>
    </Col>

 

  )

}

