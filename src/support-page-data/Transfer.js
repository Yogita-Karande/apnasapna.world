import { useState } from 'react';
import { Col, Container, FloatingLabel, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { transferData } from '../api/Apis';

function Transfer() {

    const token = useSelector((state) => {
        return state.token.token.data.token
    
    })

    const data = {existingconsumerno:'',newconsumerno:'', newconsumername:'',newconsumernumber:'',existingconsumernumber:'',newconsumeremail:'',paymenttransactiondate:'',newconsumeraddress:'',paymenttransactionid:'',image: null ,message:'',}

    const [usedata, setusedata] = useState(data)

    const [formErrors,setformErrors] = useState({})
 
    const handleData = (e) => {
        setusedata({ ...usedata, [e.target.name]: e.target.value })
    }

    const [getSuccessMessage, setSuccessMessage] = useState()
    const [pageError , setPageError] = useState()

    const handleTransferForm = async (e) => {
        e.preventDefault();

        if (validate(usedata)) {
            const data = { api: 'transfer-requests', token: token.token };
            console.log(data)
            console.log(usedata)

            try {
                const response = await transferData(data.api, data.token);
                console.log(response);
              if (response && response.status === 200 ){
                console.log("hello")
                console.log(response);
                
                setSuccessMessage(response.message);
              } else {
                console.log("Response status is not 200");
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          } else {
            setPageError('')
            
          }
    
    }

    //  API call

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!values.existingconsumerno) {
            errors.existingconsumerno = "This value is required";
        }
    
        if (!values.newconsumerno) {
            errors.newconsumerno = "This value is required";
        }

        if (!values.newconsumername) {
            errors.newconsumername = "This value is required";
        }

        if (!values.newconsumernumber) {
            errors.newconsumernumber = "This value is required";
        }

        if (!values.existingconsumernumber) {
            errors.existingconsumernumber= "This value is required";
        }

        if (!values.newconsumeremail) {
            errors.newconsumeremail= "This value is required";
        }
        
        if (!values.paymenttransactiondate) {
            errors.paymenttransactiondate = "This value is required";
        }

        if (!values.newconsumeraddress) {
            errors.newconsumeraddress = "This value is required";
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
            <Form >
                <Row className="mb-3">
                    <Col>
                        <Form.Group  controlId="formGridConsumerNo">
                            <Form.Label  >Existing Consumer No<span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="text" name="existingconsumerno"value={usedata.existingconsumerno} onChange={handleData}/>
                        </Form.Group>
                        <p className='text-danger'>{formErrors.existingconsumerno}</p>
                    </Col>
                        
                    <Col>
                        <Form.Group  controlId="formGridConsumerNo">
                            <Form.Label>New Consumer No <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="text" name="newconsumerno" value={usedata.newconsumerno} onChange={handleData}/>
                        </Form.Group>
                        <p className='text-danger'>{formErrors.newconsumerno}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group  controlId="formGridName">
                            <Form.Label >Existing Consumer Name <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="text" name="newconsumername" value={usedata.newconsumername} onChange={handleData} />
                        </Form.Group>
                        <p className='text-danger'>{formErrors.newconsumername}</p>
                    </Col>

                    <Col>
                        <Form.Group controlId="formGridPhoneNo">
                            <Form.Label >New Consumer Phone No <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="text" name="newconsumernumber" value={usedata.newconsumernumber} onChange={handleData} />
                        </Form.Group>
                     <p className='text-danger'>{formErrors.newconsumernumber}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formGridPhoneNo">
                            <Form.Label >Existing Consumer Phone No <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="text" name="existingconsumernumber" value={usedata.existingconsumernumber} onChange={handleData} />
                         <p className='text-danger'>{formErrors.existingconsumernumber}</p>
                        </Form.Group>
                    </Col>
                    
                    <Col>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label className='required'>New Consumer Email ID <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="email" name="newconsumeremail" value={usedata.newconsumeremail} onChange={handleData}/>
                        </Form.Group>
                    <p className='text-danger'>{formErrors.newconsumeremail}</p>
                </Col>
                </Row>
                    
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formGridDate">
                            <Form.Label>Payment Transaction Date </Form.Label>
                            <Form.Control type="date" readOnly={false} name="paymenttransactiondate" value={usedata.paymenttransactiondate} onChange={handleData}/>
                        </Form.Group>
                      <p className='text-danger'>{formErrors.paymenttransactiondate}</p>
                    </Col>
                    
                    <Col>
                        <Form.Group  controlId="formGridDate">
                            <Form.Label className='required'>New Consumer Address <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="address"name="newconsumeraddress" value={usedata.newconsumeraddress} onChange={handleData} />
                        </Form.Group>
                        <p className='text-danger'>{formErrors.newconsumeraddress}</p>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label >Payment Transaction ID <span className='asterik'> * </span> </Form.Label>
                            <Form.Control type="paymentid" name="paymenttransactionid" value={usedata.paymenttransactionid} onChange={handleData} />
                        </Form.Group>
                      <p className='text-danger'>{formErrors.paymenttransactionid}</p>
                    </Col>

                    <Col>
                        <Form.Group  controlId="formGridImage" >
                            <Form.Label >Choose Image <span className='asterik'> * </span> </Form.Label>
                        <Form.Control type="file" name="image" value={usedata.image} onChange={handleData} />
                        <p className='text-danger'>{formErrors.image}</p>
                        <p className='text-danger mt-3'>Processing fee Rs. 500.The payment you paid for the process do not refundable.Please pay 9846073366gntadmin@ibl
                            After making your payment attach the transaction screenshot here
                            UPI:9846073366gntadmin@ibl</p>
                        </Form.Group>
                    </Col>
                </Row>

                <FormGroup>
                    <Form.Label>Message <span className='asterik'> * </span></Form.Label> 
                        <FloatingLabel controlId="floatingTextarea2" >
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a message here"
                                style={{ height: '100px' }}
                                name ="message"
                                value={usedata.message}
                                onChange={handleData}
                            />
                        </FloatingLabel>
                    <p className='text-danger'>{formErrors.message}</p>
                </FormGroup>


                <Form.Group className="mb-3 mt-2" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check for out" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleTransferForm} className='bg-orange'>
                    Submit
                </Button>
            </Form>
            
        </Container>
      )
    }

export default Transfer