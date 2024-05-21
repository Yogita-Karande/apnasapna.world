import { useState } from 'react';
import { Col, Container, FloatingLabel, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateData } from '../api/Apis';

function Update() {

const data = {currentname:'',newname:'', email:'',newconsumernamephonenumber:'',currentphonenumber:'',newemail:'',paymenttransactiondate:'',paymenttransactionid:'',image:'',message:''}

const [usedata, setusedata] = useState(data)

const [formErrors,setformErrors] = useState({})

const handleData = (e) => {
    setusedata({ ...usedata, [e.target.name]: e.target.value })
}

const handleUpdateForm = async (e) => {
    e.preventDefault();
    (validate(usedata));
    console.log(usedata)
    const submittedForm = await updateData(usedata);
    if (submittedForm.status === 200 ){
                
    }
    console.log("Hello")
    console.log(submittedForm)
}

const validate = (values) => {
    const errors = {};
        
    if (!values.currentname) {
        errors.currentname = "This value is required";
    }

    if (!values.newname) {
        errors.newname = "This value is required";
    }

    if (!values.email) {
        errors.email = "This value is required";
    }

    if (!values.newconsumernamephonenumber) {
        errors.newconsumernamephonenumber = "This value is required";
    }

    if (!values.currentphonenumber) {
        errors.currentphonenumber= "This value is required";
    }

    if (!values.newemail) {
        errors.newemail= "This value is required";
    }
    
    if (!values.paymenttransactiondate) {
        errors.paymenttransactiondate = "This value is required";
    }

    if (!values.paymenttransactionid) {
        errors.paymenttransactionid = "This value is required";
    }

    if (!values.image) {
        errors.image = "This value is required";
    }
  
    if (!values.message) {
        errors.message = "This value is required";
    }
    
    setformErrors(errors);
    if(Object.keys(errors).length === 0)
        return true;
    else
        return false;
    };
    
    return (
        <Container className='mt-4'>
            <Row>
                <Col className='update active-content'>
                    <Form >
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label  className='required' >Current Name<span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="name" name="currentname" value={usedata.currentname} onChange={handleData} />
                            <p className='text-danger'>{formErrors.currentname}</p>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label className='required'>New Name<span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="name" name="newname" value={usedata.newname} onChange={handleData} />
                            <p className='text-danger'>{formErrors.newname}</p>
                        </Form.Group>
                        </Row>

                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className='required'>Current Email ID <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="email" name="email" value={usedata.email} onChange={handleData}  />
                            <p className='text-danger'>{formErrors.email}</p>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPhoneNo">
                            <Form.Label className='required'>New Phone Number <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="phone number" name="newconsumernamephonenumber" value={usedata.newconsumernamephonenumber} onChange={handleData} />
                            <p className='text-danger'>{formErrors.newconsumernamephonenumber}</p>
                        </Form.Group>
                        </Row>

                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPhoneNo">
                            <Form.Label className='required'>Current Phone Number<span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="phone number" name="currentphonenumber" value={usedata.currentphonenumber} onChange={handleData} />
                            <p className='text-danger'>{formErrors.currentphonenumber}</p>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label className='required'>New Email ID <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="email"  name="newemail" value={usedata.newemail} onChange={handleData}/>
                            <p className='text-danger'>{formErrors.newemail}</p>
                        </Form.Group>
                        
                        </Row>
                            
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDate">
                            <Form.Label>Payment Transaction Date </Form.Label>
                            <Form.Control type="date"  name="paymenttransactiondate" value={usedata.paymenttransactiondate} onChange={handleData}/>
                            <p className='text-danger'>{formErrors.paymenttransactiondate}</p>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridID">
                            <Form.Label className='required'>Payment Transaction ID<span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="ID"  name="paymenttransactionid" value={usedata.paymenttransactionid} onChange={handleData}  />
                            <p className='text-danger'>{formErrors.paymenttransactionid}</p>
                        </Form.Group>
                        
                        </Row>

                        <Row className="mb-1">
                           <Form.Group as={Col} controlId="formGridFile">
                                <Form.Label className='required'>Choose Image <span className='asterik'> * </span> </Form.Label>
                                <Form.Control type="file"  name="image" value={usedata.image} onChange={handleData}  />
                                <p className='text-danger'>{formErrors.image}</p>
                                <p className='text-danger mt-3'>Consumership Update, which currently requires a processing fee of Rs. 500, will have its processing fee reduced to only Rs. 100 starting from October 5, 2023, for updating consumership (for correction of consumer name, registered mobile number, registered email ID).
                                    NB: This benefit will be valid only until January 31, 2024.
                                    UPI: 9846073366gntadmin@ibl</p>
                            </Form.Group>
                            
                            <FormGroup as={Col} controlId="formGridMessage">
                            <Form.Label>Message <span className='asterik'> * </span></Form.Label> 
                            <FloatingLabel controlId="floatingTextarea2" >
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a message here"
                                style={{ height: '100px' }}
                                name="message" 
                                value={usedata.message} onChange={handleData}/>
                            </FloatingLabel>
                            <p className='text-danger'>{formErrors.message}</p>
                            </FormGroup>

                        </Row>

                        <Form.Group className="mb-3 " id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check for out" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleUpdateForm} className='bg-orange'>
                        Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Update