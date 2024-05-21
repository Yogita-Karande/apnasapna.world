import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap"
import { getDOB } from "../components/DOB-handle"

function Personal_Information({getData}) {

  /** Persoanl Data Handler */

  const Data = {mobile_no:'', dob:'', gender:'', photo:null}
  const [formData, setFormData] = useState(Data)
  const [getpersonalDataError, setPersonalDataError] = useState({})

  useEffect(() => {
    if (getData) {
      setFormData(getData);
      console.log(getData)
    }
  }, [getData]);
  
  const handlePersonalDataChanges = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const updatePersonalData = async (event) => {
    event.preventDefault();

    if (validatePersonalData(formData)) {
      // console.log(formData)
          
    } else {
      // setnotSuccessError('')
    }
  }
  // Personal Data Error

  const validatePersonalData = (values) => {
    const errors = {};

    if (!values.mobile_no) {
      errors.mobile_no = "This field is required";
    }

    if (!values.dob) {
      errors.dob = "This field is required";
    }

    setPersonalDataError(errors);
    if (Object.keys(errors).length === 0)
      return true;
    else
      return false;
  };

  return (
    <Container className="mt-5">
    <Form>
      <Row className="py-3">
        <Col lg={6}>
          <Form.Label>Mobile No<span className='asterik'> * </span></Form.Label>
          <InputGroup >
            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
            <Form.Control
              placeholder=''
              aria-label="Username"
              aria-describedby="basic-addon1"
              type="tel"
              value={formData.mobile_no}
              name="mobile_no" onChange={handlePersonalDataChanges}
            />
          </InputGroup>
          <p className='text-danger '>{getpersonalDataError.mobile_no}</p>

          <Form.Group controlId="formGridCity" className='mt-4'>
            <Form.Label>Date of Birth <span className='asterik'> * </span></Form.Label>
            <Form.Control type="date"
              max={getDOB()} name="dob"
              value={formData.dob}
              onChange={handlePersonalDataChanges}
            />
            <p className='text-danger'>{getpersonalDataError.dob}</p>
          </Form.Group>

          <Col className='d-flex mt-4'>
            <Form.Label className="me-2">Gender : </Form.Label>
            <Form.Check type="radio" aria-label="radio 1" label="Male" className='me-2' 
              value={formData.gender}
              name='gender'
              checked={formData.gender === 'male'}
              onChange={handlePersonalDataChanges}
            />

            <Form.Check type="radio" aria-label="radio 1" label="Female" className='me-2' 
              value={formData.gender}
              name='gender'
              checked={formData.gender === 'female'}
              onChange={handlePersonalDataChanges}
            />

            <Form.Check type="radio" aria-label="radio 1" label="Other" 
              value={formData.gender}
              name='gender'
              checked={formData.gender === 'other'}
              onChange={handlePersonalDataChanges}
            />
          </Col>
        </Col>
        <Col lg={3} className="offset-lg-3 text-end mt-2" >
          <Col className=" ">
            <Image className="btn border" alt=""
              src={formData.photo}
              style={{ width: "190px", height: "190px", }} 
              name="photo"
              value={formData.photo}
              />
          </Col>
        </Col>
      </Row>
      <Row className="border-bottom border-2">
        <Col className='text-center mt-3'>
          <Button type="submit" onClick={updatePersonalData} className='bg-orange mb-3'>Update</Button>
        </Col>
        {/* <p className="text-success">{personalDataSuccess}</p> */}
      </Row>
     </Form>
    </Container>
  )
}

export default Personal_Information