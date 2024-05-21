import React from 'react'

function Social_Media_Information() {

/** Social Media Contact */

    const SocialMedia = { whatsppnumber: '', telegramnumber: '', facebookid: "" }
    const [getSocialMediaData, setSocialMediaData] = useState(SocialMedia)
    const [getSocialMediaDataError, setSocialMediaDataError] = useState({})
    const [socialMediaDataSuccess, setsocialMediaDataSuccess] = useState()
    const [notSuccessError, setnotSuccessError] = useState()

    const handleSocialMediaDataChanges = (e) => {
        setSocialMediaData({ ...getSocialMediaData, [e.target.name]: e.target.value })
    }

    const handleSocialMediaData = async (e) => {
        e.preventDefault();
    
        if (validateSocialMediaData(getSocialMediaData)) {
          console.log(getSocialMediaData)
          const data = { api: 'get-profile', token: token };
          try {
            const response = await myProfile(data.api, data.token);
            console.log(response);
            setsocialMediaDataSuccess(response.message);
    
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          setnotSuccessError('')
          
        }
    }

    // SocialMedia Data Error

    const validateSocialMediaData = (values) => {
    const errors = {};

    if (!values.whatsppnumber) {
      errors.whatsppnumber = "This field is required";
    }

    setSocialMediaDataError(errors);
    if (Object.keys(errors).length === 0)
      return true;
    else
      return false;
    };


    return (
        <Container>
            <h1 className="fw-bold fs-2 mt-5 ">Social Media Contacts </h1>

            <Row className="mt-">
                <Col lg={4} className="mt-3 ">
                    <Form.Label><FontAwesomeIcon icon={faWhatsapp} size="1x" className="me-1" />Whatsapp Number<span className='asterik'> * </span></Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>

                        <Form.Control
                            placeholder=''
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="tel"
                            name="whatsppnumber" value={getData.mobile_no} onChange={handleSocialMediaDataChanges}
                        />

                    </InputGroup>
                    <p className='text-danger'>{getSocialMediaDataError.whatsppnumber}</p>
                </Col>

                <Col lg={4} className="mt-3 ">
                    <Form.Label><FontAwesomeIcon icon={faTelegram} size="1x" className="me-1" />Telegram Number </Form.Label>
                    <InputGroup >
                        <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>

                        <Form.Control
                            placeholder="Telegram Number"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="tel"
                            name="telegramnumber" value={getSocialMediaData.telegramnumber} onChange={handleSocialMediaDataChanges}
                        />

                    </InputGroup>
                    {/* <p className='text-danger'>{formErrors.telegramnumber}</p> */}
                </Col>

                <Col lg={4} className="mt-3">
                    <Form.Label><FontAwesomeIcon icon={faFacebook} size="1x" className="me-1" />Facebook ID </Form.Label>
                    <InputGroup >
                        <Form.Control
                            placeholder="Facebook ID"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            type="text"
                            name="facebookid" value={getSocialMediaData.facebookid} onChange={handleSocialMediaDataChanges}
                        />
                    </InputGroup>
                    {/* <p className='text-danger'>{formErrors.facebookid}</p> */}
                </Col>

            <Col className='text-center mt-3 border-bottom border-2'>
              <Button type="submit" onClick={handleSocialMediaData} className='bg-orange mb-3'>Update</Button>
              <p className="text-success">{socialMediaDataSuccess}</p>
            </Col>
            </Row>
        </Container>
    )
}

export default Social_Media_Information