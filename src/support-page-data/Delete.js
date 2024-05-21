import { useState } from 'react';
import { Col, Container, FloatingLabel, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { deleteData } from '../api/Apis';

function Delete() {

const data = {consumerno:'', consumername:'', phonenumber:'', message:''}

const [usedata, setusedata] = useState(data)

const [formErrors,setformErrors] = useState({})

const handleData = (e) => {
    setusedata({ ...usedata, [e.target.name]: e.target.value })
}

const handleDeleteForm = async (e) => {
    e.preventDefault();
    setformErrors(validate(usedata));
    console.log(usedata)
    const submittedForm = await deleteData(usedata);
    console.log("Hello")
    console.log(submittedForm)
}

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!values.consumerno) {
        errors.consumerno= "Consumer No is required";
    }

    if (!values.consumername) {
        errors.consumername = "Consumer Name is required";
    }

    if (!values.phonenumber) {
        errors.phonenumber = "Mobile Number is required";
    }

    if (!values.message) {
        errors.message = "Message is required";
    }
 
    return errors;
    };

    return (
        <Container className='mt-4'>
            <Row>
                <Col>
                    <Form >
                        <Row className="mb-3">
                            <Form.Group  controlId="formGridNumber">
                                <Form.Label  className='required' >Consumer No<span className='asterik'> * </span> </Form.Label>
                                <Form.Control type="text"name="consumerno" value={usedata.consumerno} onChange={handleData} />
                                <p className='text-danger'>{formErrors.consumerno}</p>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group  controlId="formGridName">
                                <Form.Label className='required'>Consumer Name<span className='asterik'> * </span> </Form.Label>
                                <Form.Control type="name" name="consumername" value={usedata.consumername} onChange={handleData}/>
                                <p className='text-danger'>{formErrors.consumername}</p>
                            </Form.Group>
                        </Row>
                                                        
                        <Row className="mb-3">
                            <Form.Group  controlId="formGridNumber">
                                <Form.Label className='required'>Phone Number<span className='asterik'> * </span> </Form.Label>
                                <Form.Control type="text" name="phonenumber"  value={usedata.phonenumber} onChange={handleData}  />
                                <p className='text-danger'>{formErrors.phonenumber}</p>
                            </Form.Group>
                        </Row>
                    
                        <Row className="mb-3">
                        <FormGroup  controlId="formGridMessage">
                            <Form.Label>Message <span className='asterik'> * </span></Form.Label> 
                            <FloatingLabel controlId="floatingTextarea2" >
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a message here"
                                style={{ height: '100px' }}
                                value={usedata.message} onChange={handleData}
                                name="message"/>
                                
                            </FloatingLabel>
                            <p className='text-danger'>{formErrors.message}</p>
                        </FormGroup>
                        </Row>

                        <Button variant="primary" type="submit" onClick={handleDeleteForm} className='bg-orange'> Submit </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
  }
export default Delete