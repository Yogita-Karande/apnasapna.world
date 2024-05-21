import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getPageContent, getStateCities, getStates, registerUser } from '../api/Apis';
import { getDOB } from "./DOB-handle";
import MyHelmet from './Helmet';
function Register() {
    
    const { referrer } = useParams();
    const data = { name: "", referrer: (typeof referrer !== "undefined") ? referrer : "" , email: "", city_id: '', mobile_no: "", states: "", gender: "male", dob: "", address_line_1:"", address_line_2:"", landmark:"", pincode:"", accept:"", password : "", repassword : "" }

    const handleData = async (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
        // get state city call
        if (e.target.name == 'states') {
            const setCityData = await getStateCities(e.target.value);
            setCities(setCityData);
        }
    }

    const [formData, setformData] = useState(data)
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [getRegisterPageData, setRegisterPageData] = useState([])
    const [pageError , setPageerror] = useState()
    const [getSuccessMessage, setSuccessMessage] = useState()
    const [formErrors, setformErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setformErrors(validate(formData))
        if(validate(formData)) {
            // register call here
            const submittedForm = await registerUser(formData);
            console.log(submittedForm)
            if(submittedForm.status === 200) {
                // redirect to verify page
                setSuccessMessage(submittedForm.message)
                navigate('/verify/email/' + formData.email)
                setPageerror(submittedForm.message)
            } else {
                // show errors 
                setPageerror(submittedForm.message)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pageData = await getPageContent('register');
                setRegisterPageData(pageData);
                const stateData = await getStates();
                setStates(stateData);
            } catch (error) {
                console.log('Error fetching state data:', error);
            }
        }
        fetchData();
    }, []);

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "This field is required";
        }
        if (!values.referrer) {
            errors.referrer = "This field is required";
        }
        if (!values.email) {
            errors.email = "This field is required";
        }
        if (!values.address_line_1) {
            errors.address_line_1 = "This field is required";
        }
        if (!values.address_line_2) {
            errors.address_line_2 = "This field is required";
        }
        if (!values.mobile_no) {
            errors.mobile_no = "This field is required";
        }
        if (!values.states) {
            errors.states = "This field is required";
        }
        if (!values.gender) {
            errors.gender = "This field is required";
        }
        if (!values.city_id) {
            errors.city_id = "This field is required";
        }
        if (!values.dob) {
            errors.dob = "This field is required";
        }
        if (!values.accept) {
            errors.accept = "This field is required";
        }
        if (!values.pincode) {
            errors.pincode = "This field is required";
        }
        if (!values.password) {
            errors.password = "This field is required";
        }
        if (!values.repassword) {
            errors.repassword = "This field is required";
        }
        if (values.repassword && values.password && (values.password !== values.repassword)) {
            errors.repassword = "Password & confirm password does not match.";
        }
        setformErrors(errors);
        if(Object.keys(errors).length === 0)
            return true;
        else
            return false;
    };

    return (
    <div className="min-height">
        {
           getRegisterPageData && (
            <MyHelmet
                title={getRegisterPageData.title}
                description={getRegisterPageData.description}
                canonicalUrl = {getRegisterPageData.canonical}
            />
            )
        }
        <Container>
            <Row className="justify-content-center">
                <Col className="col-lg-6 col-md-7 col-12">
                    <Card className="rounded shadow-lg">
                        <Card.Body>
                            <h1 className="text-orange text-center fs-2 fw-bold mt-3 mb-4">REGISTER</h1>
                            <Form>
                                <Row className="row-cols-1 row-cols-md-2">
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Name"
                                            className="mb-3">
                                            <Form.Control name="name" type="text" placeholder="name" value={formData.name} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.name}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput1"
                                            label="Email address"
                                            className="mb-3">
                                            <Form.Control type="email" name="email" value={formData.email} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.email}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput2"
                                            label="Mobile No"
                                            className="mb-3">
                                            <Form.Control type="tel" name="mobile_no" placeholder="mobile no" value={formData.mobile_no} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.mobile_no}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput3"
                                            label="Gender"
                                            className="mb-3">
                                            <Form.Select className="text-muted" name="gender" value={formData.gender} onChange={handleData}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </Form.Select>
                                            <p className='text-danger'>{formErrors.gender}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput4"
                                            label="Date of birth"
                                            className="mb-3">
                                            <Form.Control type="date" placeholder="DOB" name="dob" value={formData.dob} onChange={handleData} max={getDOB()} />
                                            <p className='text-danger'>{formErrors.dob}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput5"
                                            label="Referrer consumer no"
                                            className="mb-3">
                                            <Form.Control type="text"  value={formData.referrer} onChange={handleData} name="referrer" placeholder="Referrer consumer no" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput6"
                                            label="State"
                                            className="mb-3">
                                            <Form.Select className="text-muted" name="states" value={formData.states} onChange={handleData}>
                                            <option key={0} value="" >Select State</option>
                                            {
                                                states && (
                                                states.map((item, index) => (
                                                <option key={index} value={item.id} >{item.state}</option>
                                            )))}
                                            </Form.Select>
                                            <p className='text-danger'>{formErrors.states}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput7"
                                            label="District"
                                            className="mb-3">
                                            <Form.Select className="text-muted" name="city_id" value={formData.city_id} onChange={handleData}>
                                            <option key={0} value="" >Select District</option>
                                            {
                                                cities && (
                                                cities.map((item, index) => (
                                                <option key={index} value={item.id} >{item.city}</option>
                                            )))}
                                            </Form.Select>
                                            <p className='text-danger'>{formErrors.city_id}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput8"
                                            label="Address Line 1"
                                            className="mb-3">
                                            <Form.Control type="text" placeholder="Address Line 1" name="address_line_1" value={formData.address_line_1} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.address_line_1}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput9"
                                            label="Address Line 2"
                                            className="mb-3">
                                            <Form.Control type="text" placeholder="Address Line 2" name="address_line_2" value={formData.address_line_2} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.address_line_2}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput10"
                                            label="Landmark"
                                            className="mb-3">
                                            <Form.Control type="text" name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.landmark}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput11"
                                            label="Pincode"
                                            className="mb-3">
                                            <Form.Control type="text" name="pincode" placeholder="pincode" value={formData.pincode} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.pincode}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInputPass"
                                            label="Password"
                                            className="mb-3">
                                            <Form.Control type="password" name="password" placeholder="password" value={formData.password} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.password}</p>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInputPas1s"
                                            label="Confirm Password"
                                            className="mb-3">
                                            <Form.Control type="password" name="repassword" placeholder="password" value={formData.repassword} onChange={handleData} />
                                            <p className='text-danger'>{formErrors.repassword}</p>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Check 
                                        value={"1"} onChange={handleData}
                                        inline
                                        label={(<p className="d-flex">I accept &nbsp;<NavLink className="nav-link text-muted" target="_blank" to="/terms-and-conditions"> terms & conditions.</NavLink></p>)}
                                        name="accept" />
                                        <p className='text-danger'>{formErrors.accept}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-3">
                                        <p className='text-danger'>{pageError}</p>
                                        <Button type="submit" className="bg-orange" onSubmit={handleSubmit} onClick={handleSubmit}>Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
    )
}


export default Register;
