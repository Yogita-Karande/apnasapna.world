import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { getPageContent, verfiyEmail } from "../api/Apis";
// import MyHelmet from "./Helmet";

function ForgotPassword() {
  const data = { otp:""}
  const [formData , setformData] = useState(data)
  const [getPageData, setPageData] = useState([]);
  const [formErrors,setformErrors] = useState({});
  const [verifiedMessage , setVerifiedMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('verify-otp');
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
    setformErrors(validate(formData));

    if(validate(formData)) {
      console.log(formData)
      const submittedForm = await verfiyEmail(formData);
      console.log(submittedForm)
      if(submittedForm.status === 200) {
            navigate('/reset-password')
            setVerifiedMessage("OTP Verified")

      } else {
            // show errors ?
            console.log(submittedForm.message)
        }
     }
  }


  const validate = (values) => {
    const errors = {};

    if (!values.otp) {
      errors.otp = "OTP is required";
    }

    return errors;
  };

  return (
    <div className="min-height">
      {
        getPageData && (
          <Container>
            <MyHelmet
              title={getPageData.title}
              description={getPageData.description}
              canonicalUrl = {getPageData.canonical}
            />
            <Row className='justify-content-center h-100' style={{minHeight:'60vh'}}>
              <Col xs={10} lg={4} md={5} className='my-auto'>
                <Card className='shadow-lg'>
                  <Card.Body>
                    <h1 className='text-orange fw-bold fs-3 text-center py-3'>Verify</h1>
                    <Form className='px-2'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Enter your otp"
                          name = "otp"
                          value={formData.otp}
                          onChange={handleData}
                        />
                        <p className='text-danger'>{formErrors.otp}</p>
                      </Form.Group>
              
                      {/* <Form.Check className='ms-3 mb-2' label="Remember me" onChange={() => setRememberMe(!rememberMe)} /> */}

                      <div>
                        <Button className="bg-orange float-end" onClick={handleForgetPassword}>Submit</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )
      }
      
    </div>
  );
}

export default ForgotPassword;
