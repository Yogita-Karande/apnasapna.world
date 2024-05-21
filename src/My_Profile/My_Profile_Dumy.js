import { faFacebook, faTelegram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector } from "react-redux";
import Personal_Information from "../My_Profile/Personal_Information";
import { getPageContent, getStateCities, getStates, myProfile } from "../api/Apis";
import { getDOB } from "./DOB-handle";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function MyProfile() {

  const [getPageData, setPageData] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [getData, setData] = useState({})

 useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('my-profile');
        setPageData(pageData);

        const stateData = await getStates();
        setStates(stateData);

        const dataResponse = await myProfile('get-profile', token);
        console.log(dataResponse.profile);
        setData(dataResponse.profile);

      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  // Token

  const token = useSelector((state) => {
    return state.token.token.data.token
  })

  /** Persoanl Data Handler */
  
  const [getpersonalDataError, setPersonalDataError] = useState({})
  const [personalDataSuccess, setpersonalDataSuccess] = useState()

  const handlePersonalDataChanges = (event) => {
    event.preventDefault();
    setData({ ...getData, [event.target.name]: event.target.value })
  }

  const updatePersonalData = async (event) => {
    event.preventDefault();

    if (validatePersonalData(getData)) {
      setData(prevData =>({...prevData , mobile_no: '', dob: '', gender: '', photo: ''}))
      // setData({...getData , mobile_no: '', dob: '', gender: '', photo: ''})

    } else {
      setnotSuccessError('')
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

  /**Address Data Handler */

  const AddressData = {
    address_line1: "",
    address_line2: "",
    landmark: "",
    pincode: '',
    state: '',
    city: '',

    current_address_line1: '',
    current_address_line2: '',
    current_landmark: '',
    current_pinCode: '',
    current_state: '',
    current_district: ''

  }
  const [getAddressData, setAddressData] = useState({ AddressData })
  const [getAddressDataError, setAddressDataError] = useState({})
  const [sameAsPermanent, setSameAsPermanent] = useState(false);
  const [addressDataSuccess, setaddressDataSuccess] = useState()

  const handleAddressDataChanges = async (e) => {
    setAddressData({ ...getAddressData, [e.target.name]: e.target.value })

    if (e.target.name == 'permanant_states') {
      const setCityData = await getStateCities(e.target.value);
      setCities(setCityData);
    }

    if (e.target.name == 'current_states') {
      const setCityData = await getStateCities(e.target.value);
      setCities(setCityData);
    }
  }

  // Check same as permanant address

  const handleSameAsPermanentChange = (e) => {
    setSameAsPermanent(e.target.checked);

    if (e.target.checked) {
      setData({
        ...getData,
        current_address_line1: getData.address_line1,
        current_address_line2: getData.address_line2,
        current_landmark: getData.landmark,
        current_pincode: getData.pincode,
        current_state: getData.state,
        current_city: getData.city
      });
    } else {
      setData({
        ...getData,
        current_address_line1: '',
        current_address_line2: '',
        current_landmark: '',
        current_pincode: '',
        current_state: '',
        current_city: ''
      });
    }
  }

  const handleAddressData = async (e) => {
    e.preventDefault();

    if (validateAddressData(getAddressData)) {
      console.log(getAddressData)
      const data = { api: 'get-profile', token: token };
      try {
        const response = await myProfile(data.api, data.token);
        console.log(response);

        setaddressDataSuccess(response.message);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    } else {
      setnotSuccessError('')
    }
  }

  //  Address Data Error 

  const validateAddressData = (values) => {
    const errors = {};

    if (!values.permanant_addressline1) {
      errors.permanant_addressline1 = "This field is required";
    }

    if (!values.permanant_addressline2) {
      errors.permanant_addressline2 = "This field is required";
    }

    if (!values.permanant_pincode) {
      errors.permanant_pincode = "This field is required";
    }

    if (!values.permanant_landmark) {
      errors.permanant_landmark = "This field is required";
    }

    if (!values.permanant_states) {
      errors.permanant_states = "This field is required";
    }

    if (!values.permanant_city_id) {
      errors.permanant_city_id = "This field is required";
    }

    if (!values.current_addressline1) {
      errors.current_addressline1 = "This field is required";
    }

    if (!values.current_addressline2) {
      errors.current_addressline2 = "This field is required";
    }

    if (!values.current_pincode) {
      errors.current_pincode = "This field is required";
    }

    if (!values.current_landmark) {
      errors.current_landmark = "This field is required";
    }

    if (!values.current_states) {
      errors.current_states = "This field is required";
    }

    if (!values.current_city_id) {
      errors.current_city_id = "This field is required";
    }

    setAddressDataError(errors);
    if (Object.keys(errors).length === 0)
      return true;
    else
      return false;

  };

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

  //  UPI Details 

  const upiDetails = { phonepay: '', gpay: '', paytm: "", bhim: "", bankupiid: "" }
  const [getupiDetailsData, setupiDetailsData] = useState(upiDetails)
  const [getupiDetailsDataError, setupiDetailsDataError] = useState({})
  const [upiDataSuccess, setupiSuccess] = useState()

  const handleupiDetailsDataChanges = (e) => {
    setupiDetailsData({ ...getupiDetailsData, [e.target.name]: e.target.value })
  }

  const handleupiDetailsData = async (e) => {
    e.preventDefault();

    if (validateupiDetailsaData(getupiDetailsData)) {
      console.log(getupiDetailsData)
      const data = { api: 'get-profile', token: token };
      try {
        const response = await myProfile(data.api, data.token);
        console.log(response);

        setupiSuccess(response.message);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    } else {
      setnotSuccessError('')
    }
  }

  // UPI Data Error

  const validateupiDetailsaData = (values) => {
    const errors = {};

    if (!values.phonepay) {
      errors.phonepay = "This field is required";
    }

    // if (!values.bhim) {
    //   errors.bhim = "This field is required";
    // }

    // if (!values.paytm) {
    //   errors.paytm = "This field is required";
    // }

    // if (!values.bankupiid) {
    //   errors.bankupiid = "This field is required";
    // }

    // if (!values.gpay) {
    //   errors.gpay = "This field is required";
    // }

    // if (!values.gpay && !values.bankupiid && !values.paytm && !values.phonepay && !values.bhim) {
    //    errors = "At least one field is required";
    //   // Handle errors here, for example, you might set an error state or display an error message.
    // }


    setupiDetailsDataError(errors);
    if (Object.keys(errors).length === 0)
      return true;
    else
      return false;
  };

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
  // console.log("hello profile")
  // // console.log(getData.mobile_no)
  // console.log(getData.aadhaar)
  // console.log(getData.photo)


  return (
    <div className="min-height">
      {
        getPageData && (
          <Container className='text-white'>
            <MyHelmet
              title={getPageData.title}
              description={getPageData.description}
              canonicalUrl={getPageData.canonical}
            />

            <Personal_Information/>
            <h1 className='text-orange text-center py-4 fw-bold fs-2'>MY PROFILE</h1>
            <Row>
              <Col lg={6}>
                <Form.Label>Mobile No<span className='asterik'> * </span></Form.Label>
                <InputGroup >
                  <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                  <Form.Control
                    placeholder=''
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    type="tel"
                    value={getData.mobile_no}
                    name="mobile_no" onChange={handlePersonalDataChanges}
                  />
                </InputGroup>
                <p className='text-danger '>{getpersonalDataError.mobile_no}</p>

                <Form.Group controlId="formGridCity" className='mt-2'>
                  <Form.Label>Date of Birth <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="date"  max={getDOB()} name="dob" value={getData.dob} onChange={handlePersonalDataChanges} />
                  <p className='text-danger'>{getpersonalDataError.dob}</p>
                </Form.Group>

                <Col className='d-flex'>
                  <Form.Label className="me-2">Gender : </Form.Label>
                  <Form.Check type="radio" aria-label="radio 1" label="Male" className='me-2' value='male'
                    name='gender'
                    checked={getData.gender === 'male'}
                    onChange={handlePersonalDataChanges}
                  />

                  <Form.Check type="radio" aria-label="radio 1" label="Female" className='me-2' value='female'
                    name='gender'
                    checked={getData.gender === 'female'}
                    onChange={handlePersonalDataChanges}
                  />

                  <Form.Check type="radio" aria-label="radio 1" label="Other" value='other'
                    name='gender'
                    checked={getData.gender === 'other'}
                    onChange={handlePersonalDataChanges}
                  />
                </Col>

              </Col>
              <Col lg={3} className="offset-lg-3 text-end mt-2" >

                <Col className=" ">
                  <Image className="btn border" alt="" src={getData.photo} style={{ width: "190px", height: "190px", }}/>
                </Col>

              </Col>
            </Row>
            <Row className="border-bottom border-2">

              <Col className='text-center mt-3'>
                <Button type="submit" onClick={updatePersonalData} className='bg-orange mb-3'>Update</Button>
              </Col>
              <p className="text-success">{personalDataSuccess}</p>
            </Row>

            <Row className="mt-5">
              <Col lg={6}>
                <h2 className="mb-5 fw-bold fs-2">Permanent Address</h2>

                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Address Line 1 <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' name="address_line1" value={getData.address_line1} onChange={handleAddressDataChanges} />
                  <p className='text-danger'>{getAddressDataError.address_line1}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                  <Form.Label>Address Line 2 <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' name="address_line2" value={getData.address_line2} onChange={handleAddressDataChanges} />
                  <p className='text-danger'>{getAddressDataError.address_line2}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                  <Form.Label>Landmark <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' name="landmark" value={getData.landmark} onChange={handleAddressDataChanges} />
                  <p className='text-danger'>{getAddressDataError.landmark}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                  <Form.Label>PIN Code <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' name="pincode" value={getData.pincode}onChange={handleAddressDataChanges} />
                  <p className='text-danger'>{getAddressDataError.pincode}</p>
                </Form.Group>

                <Form.Label>State <span className='asterik'> * </span></Form.Label>
                <FloatingLabel
                  controlId="floatingInput6"
                  label=''
                  className="mb-3">
                  <Form.Select className="text-muted" name="states" value={getData.state} onChange={handleAddressDataChanges}>
                    <option key={0} value="" >Select State</option>
                    {
                      states && (
                        states.map((item, index) => (
                          <option key={index} value={item.id} >{item.state}</option>
                        )))}
                  </Form.Select>
                  <p className='text-danger'>{getAddressDataError.permanant_states}</p>
                </FloatingLabel>

                <Form.Label>District<span className='asterik'> * </span></Form.Label>
                <FloatingLabel
                  controlId="floatingInput7"
                  label=''
                  className="mb-3">
                  <Form.Select className="text-muted" name="city" value={getData.city} onChange={handleAddressDataChanges}>
                    <option key={0} value="" >Select District</option>
                    {
                      cities && (
                        cities.map((item, index) => (
                          <option key={index} value={item.id} >{item.city}</option>
                        )))}
                  </Form.Select>
                  <p className='text-danger'>{getAddressDataError.permanant_city_id}</p>
                </FloatingLabel>
              </Col>


              <Col>

                <Col className="d-flex">
                  <h2 className="mb-5 fw-bold fs-2 me-3">Current Address </h2>

                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Same as permanent address"
                    className="mt-2"
                    onChange={handleSameAsPermanentChange}

                  />

                </Col>

                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Address Line 1 <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' readOnly={sameAsPermanent} value={getData.current_address_line1}
                    onChange={handleAddressDataChanges}
                    name="address_line1"
                  />
                  <p className='text-danger'>{getAddressDataError.addressline1}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                  <Form.Label>Address Line 2 <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' readOnly={sameAsPermanent} value={getData.current_address_line2}
                    onChange={handleAddressDataChanges}
                    name="address_line2"
                  />
                  <p className='text-danger'>{getAddressDataError.addressline2}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                  <Form.Label>Landmark <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' readOnly={sameAsPermanent} value={getData.current_landmark}
                    onChange={handleAddressDataChanges}
                    name="landmark" />
                  <p className='text-danger'>{getAddressDataError.landmark}</p>
                </Form.Group>

                <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                  <Form.Label>PIN Code <span className='asterik'> * </span></Form.Label>
                  <Form.Control type="text" placeholder='' readOnly={sameAsPermanent} value={getData.current_pincode}
                    onChange={handleAddressDataChanges}
                    name="pincode" />
                  <p className='text-danger'>{getAddressDataError.current_pincode}</p>
                </Form.Group>

                <Form.Label>State <span className='asterik'> * </span></Form.Label>
                <FloatingLabel
                  controlId="floatingInput6"
                  label=''
                  className="mb-3">
                  <Form.Select className="text-muted" readOnly={sameAsPermanent} name="states" value={getData.current_state} onChange={handleAddressDataChanges}>
                    <option key={0} value="" >Select State</option>
                    {
                      states && (
                        states.map((item, index) => (
                          <option key={index} value={item.id} >{item.state}</option>
                        )))}

                  </Form.Select>
                  <p className='text-danger'>{getAddressDataError.states}</p>
                </FloatingLabel>

                <Form.Label>District <span className='asterik'> * </span></Form.Label>
                <FloatingLabel
                  controlId="floatingInput7"
                  label=''
                  className="mb-3"
                >
                  <Form.Select className="text-muted" name="city" value={getData.current_city} onChange={handleAddressDataChanges}>
                    <option key={0} value="" >Select District</option>
                    {
                      cities && (
                        cities.map((item, index) => (
                          <option key={index} value={item.id} >{item.city}</option>
                        )))}
                  </Form.Select>
                  <p className='text-danger'>{getAddressDataError.current_city_id}</p>
                </FloatingLabel>
              </Col>
            </Row>

            <Col className='text-center mt-3 border-bottom border-2'>
              <Button type="reset" onClick={handleAddressData} className='bg-orange mb-3'>Update</Button>
              <p className="text-success">{addressDataSuccess}</p>
            </Col>


            {/* Social Media Contact */}

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
            </Row>

            <Col className='text-center mt-3 border-bottom border-2'>
              <Button type="submit" onClick={handleSocialMediaData} className='bg-orange mb-3'>Update</Button>
              <p className="text-success">{socialMediaDataSuccess}</p>
            </Col>
            <h2 className="fw-bold fs-2 mt-5">UPI Details </h2>

            <Row className="mt-4">

              <Col lg={4} className="mt-2 " >
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>PhonePay </Form.Label>
                  <Form.Control type="Phone Number" placeholder="PhonePay" name="phonepay" value={getupiDetailsData.phonepay} onChange={handleupiDetailsDataChanges}
                  />
                  <p className='text-danger'>{getupiDetailsDataError.phonepay}</p>
                </Form.Group>
              </Col>
              <Col lg={4} className="mt-2">
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Gpay</Form.Label>
                  <Form.Control type="" placeholder="Gpay" name="gpay" value={getupiDetailsData.gpay} onChange={handleupiDetailsDataChanges}
                  />
                  <p className='text-danger'>{getupiDetailsDataError.gpay}</p>
                </Form.Group>
              </Col>

              <Col lg={4} className="mt-2">
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Paytm</Form.Label>
                  <Form.Control type="" placeholder="Paytm" name="paytm" value={getupiDetailsData.paytm} onChange={handleupiDetailsDataChanges}
                  />
                  {/* <p className='text-danger'>{formErrors.paytm}</p> */}
                </Form.Group>
              </Col>
            </Row>

            <Row >
              <Col lg={4} className="mt-2">
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>BHIM </Form.Label>
                  <Form.Control type="" placeholder="BHIM" name="bhim" value={getupiDetailsData.bhim} onChange={handleupiDetailsDataChanges}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} className="mt-2">
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Bank UPI ID </Form.Label>
                  <Form.Control type="Phone Number" placeholder="Bank UPI ID" name="bankupiid" value={getupiDetailsData.bankupiid} onChange={handleupiDetailsDataChanges}
                  />

                </Form.Group>
              </Col>
            </Row>


            <Col className='text-center mt-3 py-3 border-bottom border-2'>
              <Button type="submit" onClick={handleupiDetailsData} className='bg-orange'>Update</Button>
              <p className="text-success">{upiDataSuccess}</p>
            </Col>
            {/* <p className='text-danger'>{getupiDetailsDataError}</p> */}
 
            <Row>
              <Col className='text-center mt-3 '>
                <Button type="submit" onClick={handleAadharCardData} className='bg-orange'>Update</Button>
                <p className="text-success">{setAadharCardSuccess}</p>
              </Col>
            </Row>
          </Container>
        )
      }
      {
        !getPageData && (
          <Loader />
        )
      }

    </div>
  )
}

export default MyProfile
