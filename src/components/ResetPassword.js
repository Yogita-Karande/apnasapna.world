import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPageContent, resetPassword } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from "./Loader";
function ResetPassword() {
  const { email } = useParams();
  const [getPageData, setPageData] = useState();
  const [formErrors,setformErrors] = useState({});
  const data = {email :email, password:"", repassword:"", otp:""}
  const [formData , setformData] = useState(data)
  const [getError, setPageError] = useState()
  const [successMessage, setSuccessMessage] = useState()
  const [isSubmitted, setIsSubmitted] = useState()
  const handleData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if(validate(formData)) {
      const resetData = await resetPassword(formData)
      if(resetData.status === 200) {
        setSuccessMessage(resetData.message)
      } else {
        setPageError(resetData.message);
      }
    }
    setIsSubmitted(false);
  }

  const validate = (values) => {
    const errors = {};
  
    if (!values.otp) {
      errors.otp = "This field is required";
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
  
  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('reset-password');
        setPageData(pageData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-height">
      {
        getPageData && (
          <>
            <MyHelmet
                title={getPageData.title}
                description={getPageData.description}
                canonicalUrl = {getPageData.canonical}
            />
            <Container>
              <Row className="justify-content-center">
                <Col lg={5} xs={12}>
                  <Card className="rounded mt-5">
                    <Card.Body>
                      {getError && (
                        <p className='text-center text-orange fw-lighter'>{getError}</p>
                      )}
                      {successMessage && (
                        <p className='text-center text-success fw-bolder my-auto'>{successMessage}</p>
                      )}
                      {!successMessage && (
                        <Form>
                          <h1 className='text-orange text-center py-4 fw-bold fs-2'>Reset Password</h1>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                              <Form.Control type="text" placeholder="OTP" name="otp"
                                value={formData.otp}
                                onChange={handleData} />
                            <p className='text-danger'>{formErrors.otp}</p>
                          </Form.Group>
                    
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                              <Form.Control type="password" placeholder="Password" name = "password"
                              value={formData.password}
                              onChange={handleData} />
                              <p className='text-danger'>{formErrors.password}</p>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                              <Form.Control type="password" placeholder="Confirm Password" name = "repassword"
                              value={formData.repassword}
                              onChange={handleData} />
                              <p className='text-danger'>{formErrors.repassword}</p>
                          </Form.Group>

                          <div className="float-end">
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
                                <Button className="bg-orange float-end" onClick={handleChangePassword}>Submit</Button>
                              )
                            }
                          </div>
                        </Form>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        )
      }
      {
        !getPageData && (<Loader/>)
      }
    </div>
  )
}

export default ResetPassword