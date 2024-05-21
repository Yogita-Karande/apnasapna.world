import React from 'react'

function Aadhar_Information() {

    //  Aadhar Card Details

    const aadharCard = { adharnumber: '', aadhar_front_photo: null, aadhar_back_photo: null }
    const [getAadharCardData, setAadharCardData] = useState(aadharCard)
    const [getAadharCardDataError, setAadharCardDataError] = useState({})
    const [aadharCardSuccess, setAadharCardSuccess] = useState()
    
    const handleAadharCardDataChanges = (e) => {
    setAadharCardData({ ...getAadharCardData, [e.target.name]: e.target.value })
    }

    const handleAadharCardData = async (e) => {
    e.preventDefault();

    if (validateAadharCardData(getAadharCardData)) {
      console.log(getAadharCardData)

      const data = { api: 'get-profile', token: token };
      try {
        const response = await myProfile(data.api, data.token);
        console.log(response);

        setAadharCardSuccess(response.message);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    } else {
      setnotSuccessError('')
    }
    }

    // Adhar Card Data Error

    const validateAadharCardData = (values) => {
    const errors = {};

    if (!values.adharnumber) {
      errors.adharnumber = "This field is required";
    }

    // if (!values.aadhar_front_photo) {
    //   errors.aadhar_front_photo = "This field is required";
    // }

    // if (!values.aadhar_back_photo) {
    //   errors.aadhar_back_photo = "This field is required";
    // }

    setAadharCardDataError(errors);
    if (Object.keys(errors).length === 0)
      return true;
    else
      return false;
    };

    return (
        <Container>
            <h2 className="fw-bold fs-2 pt-5">Aadhar Card</h2>

            <Row className="mt-3">

                <Col lg={4} className=" ">
                    <Form.Group controlId="formGridPhoneNumber">
                        <Form.Label>Aadhar Number <span className='asterik'> * </span></Form.Label>
                        <Form.Control type="Phone Number" placeholder="Adhar Number" name="adharnumber" value={getAadharCardData.adharnumber} onChange={handleAadharCardDataChanges}
                        />
                        <p className='text-danger'>{getAadharCardDataError.adharnumber}</p>
                    </Form.Group>

                    <Form.Group controlId="formGridPhoneNumber">
                        <Form.Label>Aadhar Front Photo</Form.Label>
                        <Form.Control type="file" placeholder="Adhar Number" name="aadhar_front_photo" value={getAadharCardData.aadhar_front_photo} onChange={handleAadharCardDataChanges}
                        />

                    </Form.Group>

                    <Form.Group controlId="formGridPhoneNumber">
                        <Form.Label className="mt-3">Aadhar Back Photo</Form.Label>
                        <Form.Control type="file" placeholder="Adhar Number" name="aadhar_back_photo" value={getAadharCardData.aadhar_back_photo} onChange={handleAadharCardDataChanges}
                        />
                    </Form.Group>
                </Col>

                <Col lg={4} className=" mb-3 text-end mt-4" >
                    <Image className="btn border" src={getData.photo} style={{ width: "190px", height: "190px", }} />
                </Col>

                <Col lg={4} className=" mb-3 text-end mt-4">
                    <Image className="btn border" src={getData.photo} style={{ width: "190px", height: "190px", }} />
                </Col>
            </Row>

            <Row>
              <Col className='text-center mt-3 '>
                <Button type="submit" onClick={handleAadharCardData} className='bg-orange'>Update</Button>
                <p className="text-success">{setAadharCardSuccess}</p>
              </Col>
            </Row>
        </Container>
    )
}

export default Aadhar_Information