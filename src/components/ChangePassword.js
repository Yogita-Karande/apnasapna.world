import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { changePassword, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from "./Loader";

function ResetPasswords() {
  const [getPageData, setPageData] = useState();
  const [formErrors,setformErrors] = useState({});
  const data = {token :"", password:"", confirm_password:""}
  const [formData , setformData] = useState(data)
  const [getError, setPageError] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('');
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

  const handleChangePassword = async () => {
    setformErrors(validate(formData));
    // console.log(formData)

    if(validate(formData)) {
      const changeData = await changePassword(formData)
      console.log(changeData)
      
    } else {
      setPageError('Invalid username or password. Please try again.');
    }
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  
    if (!values.password) {
      errors.password = "This field is required";
    }

    if (!values.confirm_password) {
      errors.confirm_password = "This field is required";
    }
  
    return errors;
  };
  
  return (
    <div className="min-height">
    {
      getPageData && (
        <Container >

        <MyHelmet
          title={getPageData.title}
          description={getPageData.description}
          canonicalUrl = {getPageData.canonical}
        />
      
        <Row className="justify-content-center">
        <Col lg={5} >
          <Card className="rounded mx-auto mt-5">
            <Card.Body>
  
               <h1 className='text-orange text-center py-4 fw-bold fs-2'>Change Password</h1>
  
                <Form>
                    <Form.Group className="mb-3 me-3 ms-3" controlId="exampleForm.ControlInput2">
                        <Form.Control type="password" placeholder="Password" name = "password"
                          value={formData.password}
                          onChange={handleData}/>
                      <p className='text-danger'>{formErrors.password}</p>
                    </Form.Group>
                </Form>
  
                <Form>
                    <Form.Group className="mb-3 me-3 ms-3" controlId="exampleForm.ControlInput3">
                        <Form.Control type="text" placeholder="Confirm Password" name = "confirm_password"
                        value={formData.confirm_password}
                        onChange={handleData} />
                        <p className='text-danger'>{formErrors.confirm_password}</p>
                    </Form.Group>
  
                    <Col lg={12}className="text-center" >
                       <NavLink><Button type="submit" onClick={handleChangePassword} className="bg-orange">Submit </Button></NavLink>
                   </Col>
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
  )
}

export default ResetPasswords