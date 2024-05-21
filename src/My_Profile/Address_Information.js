import { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getStateCities, myProfile } from "../api/Apis";

function Address_Information({getData}) {

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

  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [getAddressData, setAddressData] = useState(getData)
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
  const token = useSelector((state) => {
    return state.token.token.data.token
  })

  
  console.log(getAddressData)
  
  const handleSameAsPermanentChange = (e) => {
        setSameAsPermanent(e.target.checked);
    
        if (e.target.checked) {
          setAddressData({
            ...getData,
            current_address_line1: getData.address_line1,
            current_address_line2: getData.address_line2,
            current_landmark: getData.landmark,
            current_pincode: getData.pincode,
            current_state: getData.state,
            current_city: getData.city
          });
        } else {
          setAddressData({
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
      // setnotSuccessError('')
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

    return (
        <Container>
            <Row className="mt-5">
                <Col lg={6}>
                    <h2 className="mb-5 fw-bold fs-2">Permanent Address</h2>
                    <Form.Group controlId="formGridPhoneNumber">
                        <Form.Label>Address Line 1 <span className='asterik'> * </span></Form.Label>
                        <Form.Control type="text" placeholder='' name="address_line1" value={getData.address_line1} onChange={handleAddressDataChanges} />
                        <p className='text-danger'>
                            {getAddressDataError.address_line1}
                        </p>
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                        <Form.Label>Address Line 2 <span className='asterik'> * </span></Form.Label>
                        <Form.Control type="text" placeholder='' name="address_line2"
                        //  value={getData.address_line2} 
                        //  onChange={handleAddressDataChanges} 
                         />
                        {/* <p className='text-danger'>{getAddressDataError.address_line2}</p> */}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                        <Form.Label>Landmark <span className='asterik'> * </span></Form.Label>
                        <Form.Control type="text" placeholder='' name="landmark" 
                        // value={getData.landmark} onChange={handleAddressDataChanges} 
                        />
                        {/* <p className='text-danger'>{getAddressDataError.landmark}</p> */}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                        <Form.Label>PIN Code <span className='asterik'> * </span></Form.Label>
                        <Form.Control type="text" placeholder='' name="pincode" 
                        // value={getData.pincode} onChange={handleAddressDataChanges} 
                        />
                        {/* <p className='text-danger'>{getAddressDataError.pincode}</p> */}
                    </Form.Group>

                    <Form.Label>State <span className='asterik'> * </span></Form.Label>
                    <FloatingLabel
                        controlId="floatingInput6"
                        label=''
                        className="mb-3">
                        <Form.Select className="text-muted" name="states" 
                        // value={getData.state} onChange={handleAddressDataChanges}
                        >
                            <option key={0} value="" >Select State</option>
                            {states && ( states.map((item, index) => (
                                 <option key={index} value={item.id} >{item.state}</option>
                            )))}
                        </Form.Select>
                        {/* <p className='text-danger'>{getAddressDataError.permanant_states}</p> */}
                    </FloatingLabel>

                    <Form.Label>District<span className='asterik'> * </span></Form.Label>
                    <FloatingLabel
                        controlId="floatingInput7"
                        label=''
                        className="mb-3">
                        <Form.Select className="text-muted" name="city" value={getData.city} onChange={handleAddressDataChanges}>
                            <option key={0} value="" >Select District</option>
                                {cities && (cities.map((item, index) => (
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
                                // onChange={handleSameAsPermanentChange}
                            />
                    </Col>

                    <Form.Group controlId="formGridPhoneNumber">
                        <Form.Label>Address Line 1 <span className='asterik'> * </span></Form.Label>
                            <Form.Control type="text" placeholder='' 
                                // readOnly={sameAsPermanent} 
                                // value={getData.current_address_line1}
                                // onChange={handleAddressDataChanges}
                                name="address_line1"
                        />
                        <p className='text-danger'>{getAddressDataError.addressline1}</p>
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                        <Form.Label>Address Line 2 <span className='asterik'> * </span></Form.Label>
                            <Form.Control type="text" placeholder='' 
                            // readOnly={sameAsPermanent} value={getData.current_address_line2}
                            // onChange={handleAddressDataChanges}
                            name="address_line2"
                        />
                        {/* <p className='text-danger'>{getAddressDataError.addressline2}</p> */}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                        <Form.Label>Landmark <span className='asterik'> * </span></Form.Label>
                            <Form.Control type="text" placeholder='' 
                                // readOnly={sameAsPermanent} value={getData.current_landmark}
                                // onChange={handleAddressDataChanges}
                                name="landmark" />
                        {/* <p className='text-danger'>{getAddressDataError.landmark}</p> */}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formGridPhoneNumber">
                        <Form.Label>PIN Code <span className='asterik'> * </span></Form.Label>
                            <Form.Control type="text" placeholder='' 
                                // readOnly={sameAsPermanent} 
                                // value={getData.current_pincode}
                                // onChange={handleAddressDataChanges}
                                name="pincode" />
                        <p className='text-danger'>{getAddressDataError.current_pincode}</p>
                    </Form.Group>

                    <Form.Label>State <span className='asterik'> * </span></Form.Label>
                    <FloatingLabel
                        controlId="floatingInput6"
                        label=''
                        className="mb-3">
                        <Form.Select className="text-muted" 
                        // readOnly={sameAsPermanent} 
                        name="states" 
                        // value={getData.current_state} onChange={handleAddressDataChanges}
                        >
                            <option key={0} value="" >Select State</option>
                                {states && (states.map((item, index) => (
                                            <option key={index} value={item.id} >{item.state}</option>
                            )))}
                        </Form.Select>
                        {/* <p className='text-danger'>{getAddressDataError.states}</p> */}
                    </FloatingLabel>

                    <Form.Label>District <span className='asterik'> * </span></Form.Label>
                    <FloatingLabel
                        controlId="floatingInput7"
                        label=''
                        className="mb-3"
                    >
                    <Form.Select className="text-muted" name="city"
                    //  value={getData.current_city} onChange={handleAddressDataChanges}
                     >
                        <option key={0} value="" >Select District</option>
                            {/* {cities && (cities.map((item, index) => (
                                <option key={index} value={item.id} >{item.city}</option>
                            )))} */}
                    </Form.Select>
                        {/* <p className='text-danger'>{getAddressDataError.current_city_id}</p> */}
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>
    )
}

export default Address_Information