import React from 'react'

function UPI_Information() {

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

    return (
        <Container>
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
        </Container>
    )
}

export default UPI_Information