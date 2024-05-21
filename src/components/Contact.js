import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { getPageContent, makeEnquiry } from '../api/Apis';
import MyHelmet from './Helmet';
import Loader from './Loader';

function Contact() {

  const initialvalues = { name: "", email: "", mobile_no: "", message: "" }
  const [formvalues, setformvalues] = useState(initialvalues)
  const [formErrors, setformErrors] = useState({})
  const [isSubmit, setisSubmit] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    //  setformvalues({...formvalues, [e.target.name]: e.target.value })
    setformvalues(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformErrors(validate(formvalues));
    setisSubmit(true);

    if (Object.keys(formErrors).length === 0) {
      const contactEnquiryData = await makeEnquiry(formvalues);
      setSuccessMessage(contactEnquiryData);
    }
  };

  const [getContactData, setContactData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await getPageContent('contact-us');
        setContactData(pageData);
      } catch (error) {
        console.log('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.mobile_no) {
      errors.mobile_no = "Phone Number is required";
    }

    if (!values.message) {
      errors.message = "Message is required";
    }

    return errors;
  };


  return (
    <div className="min-height">
      {
        getContactData && (
          <>
            <MyHelmet
              title={getContactData.title}
              description={getContactData.description}
              canonicalUrl={getContactData.canonical}
            />

            <Container>
              <Row className='justify-content-center'>
                <Col xs={12}>
                  <h1 className='text-orange text-center py-4 fw-bold fs-2'>CONTACT US</h1>

                  <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3767.964281241259!2d72.8191339752084!3d19.196762382032894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDExJzQ4LjMiTiA3MsKwNDknMTguMiJF!5e0!3m2!1sen!2sin!4v1707288053786!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Col>
                <Col xs={10} lg={6} className=" mt-5 text-white">
                  <h3 className="fw-bold">Office Address</h3>
                  <h6 className="mt-5 mb-3">A.K.S.S.P.B.U.S NGO</h6>
                  <h6 >PARASANA VASTU-B, UNITY APARTMENT,<br />
                    Baf Hira Nagar Rd, Malad, Bafhira Nagar,<br />
                    Kharodi, Mumbai, Maharashtra 400095 </h6>

                  <span><NavLink className="nav-link mt-4"><FontAwesomeIcon icon={faEnvelope} /> apnasapna.world@gmail.com</NavLink></span>
                  <span><NavLink className="nav-link text-lowercase"><FontAwesomeIcon icon={faPhone} /> 080-0606-8080</NavLink></span>
                </Col>

                <Col xs={10} lg={6}>
                  <Form className="paragraph form mt-5 text-white" onSubmit={handleSubmit}>
                    <h3 className="fw-bold mb-2">Contact Us</h3>

                    <Form.Group controlId="validationCustom01">
                      <Form.Label className="name " > Name <span className="text-danger">*</span></Form.Label><br />
                      <Form.Control type="text" name="name" value={formvalues.name} onChange={handleChange} />
                      <p className='text-danger'>{formErrors.name}</p>
                    </Form.Group>

                    <Form.Group controlId="validationCustom02">
                      <Form.Label className="email mt-2" > Email <span className="text-danger">*</span></Form.Label><br />
                      <Form.Control type="email" name="email" value={formvalues.email} onChange={handleChange} />
                      <p className='text-danger'>{formErrors.email}</p>
                    </Form.Group>

                    <Form.Group controlId="validationCustom03">
                      <Form.Label className="phone mt-2" > Mobile No <span className="text-danger">*</span></Form.Label><br />
                      <Form.Control type="tel" name="mobile_no" value={formvalues.mobile_no} onChange={handleChange} />
                      <p className='text-danger'>{formErrors.phone}</p>
                    </Form.Group>

                    <Form.Group controlId="validationCustom04">
                      <Form.Label className="message mt-2" > Message <span className="text-danger">*</span></Form.Label><br />
                      <Form.Control as="textarea" style={{ height: '100px' }} name="message" value={formvalues.message} onChange={handleChange} />
                      <p className='text-danger'>{formErrors.message}</p>
                    </Form.Group>
                    {
                      successMessage ? ("") : (<Col className='text-end mt-3 '>
                        <Button className='bg-orange' type='submit' >Submit</Button>
                      </Col>)
                    }

                    <p >{successMessage && (
                      <span className='text-orange fw-bold'>{successMessage}</span>
                    )}</p>
                  </Form>
                </Col>
              </Row>
            </Container>
          </>
        )
      }
      {
        !getContactData && (
          <Loader/>
        )
      }

    </div>
  )
}
export default Contact