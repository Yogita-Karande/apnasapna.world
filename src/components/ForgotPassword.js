import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";

function ForgotPassword() {
  const data = { email:"" }
  const [formData , setformData] = useState(data)
  const [getPageData, setPageData] = useState([]);
  const [formErrors, setformErrors] = useState({});
  const [getError, setPageError] = useState()
  const [isSubmitted, setIsSubmitted] = useState()
  const navigate = useNavigate()
 
  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('forgot-password');
        setPageData(pageData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  const handleData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(validate(formData)) {
      const submittedForm = await forgotPassword(formData.email);
      if (submittedForm.status === 200) {
        navigate('/reset-password/email/'+formData.email);
      } else {
        setPageError(submittedForm.message);
      }
    }
    setIsSubmitted(false);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    setformErrors(errors);
    if(Object.keys(errors).length === 0)
      return true;
    else
      return false;
  };

  return (
    <Container className="min-height">
      <MyHelmet
        title={getPageData.title}
        description={getPageData.description}
        canonicalUrl = {getPageData.canonical}
      />
      <Row className='justify-content-center h-100 min-height'>
        <Col xs={10} lg={4} md={5} className='my-auto'>
          <Card className='shadow-lg'>
            <Card.Body>
              <h1 className='text-orange fw-bold fs-3 text-center py-3'>FORGET PASSWORD</h1>
              {getError && (
                <p className='text-center text-orange fw-lighter'>{getError}</p>
              )}
              <Form className='px-2'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name = "email"
                    value={formData.email}
                    onChange={handleData}
                  />
                  <p className='text-danger'>{formErrors.email}</p>
                </Form.Group>
                <div>
                  {
                    isSubmitted && (
                      <Button disabled type="button" className="bg-orange float-end">
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                      </Button>
                    )
                  }
                  {
                    !isSubmitted && (
                      <Button className="bg-orange float-end" onClick={handleForgetPassword}>Get otp</Button>
                    )
                  }
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
