import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPageContent, verfiyEmail } from '../api/Apis';
import MyHelmet from './Helmet';
import Loader from "./Loader";

const VerfiyEmail = () => {
  const { email } = useParams();
  const [getPageData, setPageData] = useState([]);
  const [formErrors,setformErrors] = useState({});
  const data = { email: email, otp:""}
  const [formData , setformData] = useState(data)
  const [ verifyError , setVerifyError] = useState('')

  const handleData = (e) => {
      setformData({ ...formData, [e.target.name]: e.target.value });
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setformErrors(validate(formData))
        if(validate(formData)) {
            // register call here
            console.log(formData)
            const submittedForm = await verfiyEmail(formData);
            console.log(submittedForm)
            if(submittedForm.status === 200) {
                // verified email show message
                setVerifyError(submittedForm.message)
            } else {
                // show errors ?
                // console.log(submittedForm.message)  
            }
        }
    }

    useEffect(() => {
      async function fetchData() {
        try {
          const pageData = await getPageContent('my-account');
          setPageData(pageData);
        } catch (error) {
          console.error('Error fetching state data:', error);
        }
      }
      fetchData();
    }, []);

    const validate = (values) => {
        const errors = {};
        if (!values.otp) {
            errors.otp = "This field is required";
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
              
                {verifyError ?
                <h1 className='text-success fw-bold fs-4 text-center py-3'>{verifyError}</h1>:
                <h1 className='text-orange fw-bold fs-2 text-center py-3'>Verify</h1>
                }
                
                <Form className='px-2'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="Verification otp"
                      name = "otp"
                      value={formData.otp}
                      onChange={handleData}
                    />
                    <p className='text-danger'>{formErrors.otp}</p>
                  </Form.Group>
                  <div>
                    <p>
                      <Button className="bg-orange float-end" onClick={handleSubmit}> Verify </Button>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
          </Container>
        )
      }
      {
        !getPageData && (<Loader/>)
      }
   
    </div>
  );
}

export default VerfiyEmail;
