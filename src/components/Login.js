import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getLogin, getPageContent } from "../api/Apis";
import { setToken } from '../redux_toolkit_api/TokenReducer';
import MyHelmet from "./Helmet";

function Login() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.token.token);
  const data = {token:"", name:"", consumer_no:"", password:""}

  const [formData , setformData] = useState(data)
  const [getPageData, setPageData] = useState([]);
  const [formErrors, setformErrors] = useState({});
  const [getError, setPageError] = useState()
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const handleData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {

    async function fetchData() {
      try {
        const pageData = await getPageContent('login');
        setPageData(pageData);
      } catch (error) {
        console.log('Error fetching state data:'+error);
      }
    }
    fetchData();
  },  []);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(validate(formData)) {
      const submittedForm = await getLogin(formData);
     
      if(submittedForm.status === 200) {
        dispatch(setToken(submittedForm));
        navigate('/dashboard')
  
        // if(typeof destination !== "undefined") {
        //   navigate('/dashboard');
        //   // navigate('/' + destination);
        // } else {
        //   // navigate('');
        // }
      } else {
        setPageError(submittedForm.message);
      }
    }
  }
    const validate = (values) => {
    const errors = {};
    if (!values.consumer_no) {
      errors.consumer_no = "Consumer Number is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
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
        // title={getPageData.title}
        // description={getPageData.description}
        // canonicalUrl = {getPageData.canonical}
      />
     <Row className='justify-content-center h-100 min-height'>
        <Col xs={10} lg={4} md={5} className='my-auto'>
          <Card className='shadow-lg'>
            <Card.Body>
              <h1 className='text-orange fw-bold fs-2 text-center py-3'>LOGIN</h1>
              {getError && (
                <p className='text-center text-orange fw-lighter'>{getError}</p>
              )}
              <Form className='px-2'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="consumerno"
                    placeholder="Consumer Number"
                    name = "consumer_no"
                    value={formData.consumer_no}
                    onChange={handleData}
                  />
                  <p className='text-danger'>{formErrors.consumer_no}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Control
                    type="Password"
                    placeholder="Password"
                    name = "password"
                    value={formData.password}
                    onChange={handleData}
                  />
                  <p className='text-danger'>{formErrors.password}</p>
                </Form.Group>
                {/* <Form.Check className='ms-3 mb-2' label="Remember me" onChange={() => setRememberMe(!rememberMe)} /> */}

                <div>
                  <Button className="bg-orange float-end" onClick={handleLogin}>Sign In</Button>
                  <Form.Check name="remember" value="1" className='float-start' label="Remember me" onClick={handleData} />
                </div>
                <div className='mt-3 mt-md-5' style={{"clear":"both"}}>
                  <span className="float-start">
                    <NavLink to="/forgot-password" className="text-decoration-none">Forgot Password?</NavLink>
                  </span>
                  <span className="float-end">
                    New User? <NavLink to="/register" className="text-decoration-none">Sign Up</NavLink>
                  </span>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}

export default Login;
