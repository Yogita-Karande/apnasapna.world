import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getPageContent } from '../api/Apis';
import MyHelmet from "./Helmet";
import Loader from './Loader';

function KYC() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const dispatch = useDispatch();

  const handleSave1 = () => {
    // dispatch(saveKYCData(formData1));
  };

  const handleSave2 = (e) => {
    e.preventDefault();
    // dispatch(saveKYCData(formData2));
    setformErrors(validate(formData2));
  };

  const handleSave3 = () => {
    // dispatch(saveKYCData(formData3));
  };

  const [formData1, setFormData1] = useState({
    familyName: '',
    fatherName: '',
    motherName: '',
    WifeHusbandName: '',
    children: '',
    education: '',
    job: '',
    monthlyincome: '',
    yearlyincome: '',
    house: '',
    liabilities: '',
    cibilscore: '',
    message: '',

  })

  const [formData2, setFormData2] = useState({
    accountholdername: '',
    bankaccountnumber: '',
    ifsccode: '',
    bankname: '',
    bankbranch: '',
    nomineename: '',
    nomineecontactnumber: '',
    nomineerelationship: '',
    nomineeAadhaarFront: null,
    nomineeAadhaarBack: null,
    adharcardnumber: '',

  })
  const [formData3, setFormData3] = useState({

    panNumber: '',
    panCardFront: null,
    passportNumber: '',
    passportFront: null,
    passportBack: null,
    rationCardNumber: '',
    rationCardFront: null,
    rationCardBack: null,
    drivingLicense: '',
    drivingLicenseFront: null,
    drivingLicenseBack: null,


    // Add more fields as needed
  });



  const handleInputChange1 = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData1((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData1((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleInputChange2 = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData2((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData2((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleInputChange3 = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData3((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData3((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [getPageData, setPageData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('kyc');
        setPageData(pageData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  const [formErrors, setformErrors] = useState({});
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.accountholdername) {
      errors.accountholdername = "Account Holder Name is required";
    }

    if (!values.bankaccountnumber) {
      errors.bankaccountnumber = "Account Number is required ";
    }

    if (!values.ifsccode) {
      errors.ifsccode = "IFSC code is required";
    }

    if (!values.bankname) {
      errors.bankname = "Bank Name is required";
    }


    if (!values.bankbranch) {
      errors.bankbranch = "Bank branch name is required";
    }

    if (!values.nomineename) {
      errors.nomineename = "Nominee Name is required";
    }

    if (!values.nomineecontactnumber) {
      errors.nomineecontactnumber = "Contact Number is required";
    }

    if (!values.nomineerelationship) {
      errors.nomineerelationship = "Nominee Relationship is required";
    }

    if (!values.nomineeAadhaarFront) {
      errors.nomineeAadhaarFront = "Nominee Adhar Card is required";
    }

    if (!values.nomineeaadhaarback) {
      errors.nomineeaadhaarback = "Nominee Adhar Card is required";
    }

    if (!values.adharcardnumber) {
      errors.adharcardnumber = "Nominee Adhar Number is required";
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
          canonicalUrl={getPageData.canonical}
        />
        <h1 className='text-orange text-center py-4 fw-bold fs-2'>KYC</h1>

        <Form className="text-white">

          <h1 className=" mb-3 text-white fs-2 fw-bold">Family Details</h1>

          <Form.Group className='col-lg-6' controlId="validationCustom01">
            <Form.Label className="name " >Family Name</Form.Label><br />
            <Form.Control type="text" name="familyName"
              placeholder='Family Name'
              value={formData1.familyName}
              onChange={handleInputChange1} />
          </Form.Group>

          <Row className='mt-4 mb-4'>
            <Col >
              <Form.Group controlId="validationCustom02">
                <Form.Label className="name " >Father Name</Form.Label><br />
                <Form.Control type="text" name="fatherName"
                  placeholder='Father Name'
                  value={formData1.fatherName}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="validationCustom03">
                <Form.Label className="name " >Mother Name</Form.Label><br />
                <Form.Control type="text" name="motherName"
                  placeholder='Mother Name'
                  value={formData1.motherName}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

          </Row>

          <Row className="mt-4">
            <h1 className='fs-4 py-3'>Maritial Status</h1>

            <Col >
              <Form.Group controlId="validationCustom04">
                <Form.Label className="name " >Wife/Husband Name</Form.Label>
                <Form.Control type="text" name="WifeHusbandName"
                  placeholder='Wife/Husband Name'
                  value={formData1.WifeHusbandName}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="validationCustom05">
                <Form.Label className="name " >Children</Form.Label>
                <Form.Control type="text" name="children"
                  placeholder='Children'
                  value={formData1.children}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

          </Row>

          <Row className="mt-4">

            <Col>
              <Form.Group controlId="validationCustom06">
                <Form.Label className="name " >Education</Form.Label>
                <Form.Control type="text" name="education"
                  placeholder='Education'
                  value={formData1.education}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="validationCustom07">
                <Form.Label className="name " >Job</Form.Label>
                <Form.Control type="text" name="job"
                  placeholder='Job'
                  value={formData1.job}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">

            <Col lg={3} className='mt-3'>
              <Form.Group controlId="validationCustom08">
                <Form.Label>Monthly Family Income</Form.Label>
                <Form.Control type="text" name="monthlyincome"
                  placeholder='Monthly Family Income'
                  value={formData1.monthlyincome}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col lg={3} className='mt-3'>
              <Form.Group controlId="validationCustom09">
                <Form.Label>Yearly Family Income</Form.Label>
                <Form.Control type="text" name="yearlyincome"
                  placeholder='Yearly Family Income'
                  value={formData1.yearlyincome}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col lg={3} className='mt-3'>
              <Form.Group controlId="validationCustom10">
                <Form.Label>House</Form.Label>
                <Form.Control type="text" name="house"
                  placeholder='House'
                  value={formData1.house}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col lg={3} className='mt-3'>
              <Form.Group controlId="validationCustom11">
                <Form.Label  >Liabilities in Rs.</Form.Label>
                <Form.Control type="text" name="liabilities"
                  placeholder='Liabilities in Rs.'
                  value={formData1.liabilities}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

          </Row>

          <Row className="mt-4">

            <Col lg={4} >
              <Form.Group controlId="validationCustom12">
                <Form.Label className="name ">Cibil Score.</Form.Label><br />
                <Form.Control type="text" name="cibilscore"
                  placeholder='Cibil Score.'
                  value={formData1.cibilscore}
                  onChange={handleInputChange1} />
              </Form.Group>
            </Col>

            <Col className=' mt-4'>
              <Form.Label className="name ">Owned Vehicles</Form.Label>
              <Col className="d-flex">
                <Form.Check className='me-4' type="radio" label="Motorcycle" />
                <Form.Check type="radio" label="Car" />
              </Col>
            </Col>

            <Col className=' mt-4'>
              <Form.Label className="name ">Insurance Details</Form.Label>
              <Col className="d-flex">
                <Form.Check className='me-4' type="radio" label="Medical" />
                <Form.Check type="radio" label="Term" />
              </Col>
            </Col>


          </Row>

          <Col className="mt-4"><h6>Do you file income tax?</h6>
            <Col className="d-flex">
              <Form.Check className='me-4' type="radio" label="Yes" />
              <Form.Check type="radio" label="No" />
            </Col>
          </Col>

          <Col className="mt-4"><h6>Do anyone in family have any health problems ?</h6>
            <Col className="d-flex">
              <Form.Check className='me-4' type="radio" label="Yes" />
              <Form.Check type="radio" label="No" />
            </Col>
          </Col>

          <Col lg={9} className="mt-3">
            <Form.Group controlId="validationCustom13">
              <Form.Control as="textarea" style={{ height: '100px' }} name="message"
                placeholder='Message'
                value={formData1.message}
                onChange={handleInputChange1} />
            </Form.Group>
          </Col>

          <Col className='d-flex justify-content-end mt-4 '>
            {/* <Button className='bg-orange me-2' onClick={toggleEditMode}>Edit</Button> */}
            <Button className='bg-orange' type='submit' onClick={handleSave1} >Save</Button>

          </Col>



          <Row className="mt-4">
            <h1 className='mt-4  mb-3 text-white fs-2 fw-bold'>Bank Details</h1>

            <Col lg={4} className="mt-4">
              <Form.Group controlId="validationCustom14">
                <Form.Label className="name " >Account Holder Name<span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="accountholdername"
                  placeholder='Account Holder Name'
                  value={formData2.accountholdername}
                  onChange={handleInputChange2} />
                <p className='text-danger '>{formErrors.accountholdername}</p>
              </Form.Group>
            </Col>

            <Col lg={4} className="mt-4">
              <Form.Group controlId="validationCustom15">
                <Form.Label className="name " >Bank Account Number<span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="bankaccountnumber"
                  placeholder='Bank Account Number'
                  value={formData2.bankaccountnumber}
                  onChange={handleInputChange2} />
                <p className='text-danger '>{formErrors.bankaccountnumber}</p>
              </Form.Group>
            </Col>

            <Col lg={4} className="mt-4">
              <Form.Group controlId="validationCustom16">
                <Form.Label className="name " >IFSC Code<span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="ifsccode"
                  placeholder='IFSC Code'
                  value={formData2.ifsccode}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.ifsccode}</p>
              </Form.Group>
            </Col>

          </Row>

          <Row className="mt-4">

            <Col>
              <Form.Group controlId="validationCustom17">
                <Form.Label className="name " >Bank Name <span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="bankname"
                  placeholder='Bank Name'
                  value={formData2.bankname}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.bankname}</p>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="validationCustom18">
                <Form.Label className="name " >Bank Branch <span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="bankbranch"
                  placeholder='Bank Branch'
                  value={formData2.bankbranch}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.bankbranch}</p>
              </Form.Group>
            </Col>

          </Row>


          <Row className='mt-4'>
            <h1 className="mt-4  mb-3 text-white fs-2 fw-bold">Nominee Details</h1>

            <Col lg={4}>
              <Form.Group controlId="validationCustom19">
                <Form.Label className="name " >Nominee Name<span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="nomineename"
                  placeholder='Nominee Name'
                  value={formData2.nomineename}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.nomineename}</p>
              </Form.Group>
            </Col>

            <Col lg={4} className="mt-3 mt-lg-0">
              <Form.Group controlId="validationCustom20">
                <Form.Label className="name " >Nominee Contact Number <span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="nomineecontactnumber"
                  placeholder='Nominee Contact Number'
                  value={formData2.nomineecontactnumber}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.nomineecontactnumber}</p>
              </Form.Group>
            </Col>

            <Col lg={4} className="mt-3 mt-lg-0">
              <Form.Group controlId="validationCustom21">
                <Form.Label className="name " >Nominee Relationship <span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="nomineerelationship"
                  placeholder='Nominee Relationship'
                  value={formData2.nomineerelationship}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.nomineerelationship}</p>
              </Form.Group>
            </Col>

          </Row>

          <Row className="mt-4">

            <Col lg={4} >
              <Form.Group controlId="formGridState">
                <Form.Label className='required'>Nominee Aadhaar Front <span className='asterik'> * </span> </Form.Label>
                <Form.Control type="file" name="nomineeaadhaarfront"
                  placeholder='Nominee Aadhaar Front'
                  accept="image/*"
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.nomineeAadhaarFront}</p>
              </Form.Group>

            </Col>

            <Col lg={4} className="mt-4 mt-lg-0">
              <Form.Group controlId="formGridState">
                <Form.Label className='required'>Nominee Aadhaar Back <span className='asterik'> * </span> </Form.Label>
                <Form.Control type="file" name="nomineeaadhaarback"
                  placeholder='Nominee Aadhaar Back'
                  accept="image/*"
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.nomineeaadhaarback}</p>
              </Form.Group>

            </Col>

            <Col lg={4} className="mt-4 mt-lg-0">
              <Form.Group controlId="validationCustom22">
                <Form.Label className="name " >Aadhar Card Number<span className='asterik'> * </span></Form.Label><br />
                <Form.Control type="text" name="adharcardnumber"
                  placeholder='Aadhar Card Number'
                  value={formData2.adharcardnumber}
                  onChange={handleInputChange2} />
                <p className='text-danger'>{formErrors.adharcardnumber}</p>
              </Form.Group>
            </Col>
          </Row>

          <Col className='d-flex justify-content-end mt-4 '>
            {/* <Button className='bg-orange me-2' onClick={toggleEditMode}>Edit</Button> */}
            <Button className='bg-orange' type='submit' onClick={handleSave2} >Save</Button>

          </Col>



          <h1 className='mt-4 mb-3 text-white fs-2 fw-bold'>Upload Documents</h1>

          <Col className='d-flex mt-4'>
            <h5 className='me-3'>Pan Card</h5>
            <Form.Check aria-label="option 1" />
          </Col>

          <Row className='mt-4'>

            <Col lg={4}>
              <Form.Group controlId="validationCustom23">
                <Form.Label className="name " >Pan Number</Form.Label><br />
                <Form.Control type="text" name="panNumber"
                  placeholder='Pan Number'
                  value={formData3.panNumber}
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

            <Col lg={4} className='mt-3 mt-lg-0'>
              <Form.Group controlId="formGridState">
                <Form.Label >Pan card Front ( Current file)</Form.Label>
                <Form.Control type="file" name="panCardFront"
                  placeholder='Pan card Front ( Current file)'
                  accept="image/*"
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

          </Row>

          <Col className='d-flex mt-4'>
            <h5 className='me-3'>Passport</h5>
            <Form.Check aria-label="option 1" />
          </Col>

          <Row className='mt-4'>

            <Col lg={4}>
              <Form.Group controlId="validationCustom24">
                <Form.Label className="name " >Passport Number</Form.Label><br />
                <Form.Control type="text" name="passportNumber"
                  placeholder='Passport Number'
                  value={formData3.passportNumber}
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

            <Col lg={4} className='mt-3 mt-lg-0'>
              <Form.Group controlId="formGridState">
                <Form.Label >Passport Front ( Current file)</Form.Label>
                <Form.Control type="file" name="passportFront"
                  placeholder='Passport Front ( Current file)'
                  accept="image/*"
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

            <Col lg={4} className='mt-3 mt-lg-0'>
              <Form.Group controlId="formGridState">
                <Form.Label>Passport Back ( Current file)</Form.Label>
                <Form.Control type="file" name="passportBack"
                  placeholder='Passport Back ( Current file)'
                  accept="image/*"
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>
          </Row>

          <Col className='d-flex mt-4'>
            <h5 className='me-3'>Ration Card </h5>
            <Form.Check aria-label="option 1" />
          </Col>

          <Row className='mt-4'>

            <Col lg={4} >
              <Form.Group controlId="validationCustom25">
                <Form.Label className="name " >Ration Card Number</Form.Label><br />
                <Form.Control type="text" name="rationCardNumber"
                  placeholder='Ration Card Number'
                  value={formData3.rationCardNumber}
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

            <Col lg={4} className='mt-3 mt-lg-0'>
              <Form.Group controlId="formGridState">
                <Form.Label >Ration card Front ( Current file)</Form.Label>
                <Form.Control type="file" name="rationCardFront"
                  placeholder='Ration card Front ( Current file)'
                  accept="image/*"
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

            <Col lg={4} className='mt-3 mt-lg-0'>
              <Form.Group controlId="formGridState">
                <Form.Label >Ration card Back ( Current file)</Form.Label>
                <Form.Control type="file" name="rationCardBack"
                  placeholder='Ration card Back ( Current file)'
                  accept="image/*"
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>
          </Row>

          <Col className='d-flex mt-4'>
            <h5 className='me-3 '>Driving License</h5>
            <Form.Check aria-label="option 1" />
          </Col>

          <Row className='mt-4'>

            <Col lg={4} >
              <Form.Group controlId="validationCustom26">
                <Form.Label className="name " >Driving License </Form.Label><br />
                <Form.Control type="text" name="drivingLicense"
                  placeholder='Driving License'
                  value={formData3.drivingLicense}
                  onChange={handleInputChange3} />
              </Form.Group>
            </Col>

            <Col lg={4} className="mt-3" >
              <Form.Group controlId="formGridPhoneNumber">
                <Form.Label >Adhar Card Back</Form.Label>
                <Form.Label htmlFor="file-upload" className="btn border text-white" style={{ width: '400px', height: '200px', display: 'inline-block' }}>
                  <FontAwesomeIcon icon={faFileUpload} />
                  Browser Upload<br />
                  {selectedFile ? <Image className="mt-2  mb-2" src={URL.createObjectURL(selectedFile)} width="40%" height="80%" /> : <Image className="mt-2 mb-2" src="https://gnt-prod.s3.ap-south-1.amazonaws.com/source/aadhaarFront_FOzgbTZ.jpg" width="40%" height="80%" />}
                </Form.Label>
                <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileInputChange} />
              </Form.Group>
            </Col>

            <Col lg={4} className="mt-3" >
              <Form.Group controlId="formGridPhoneNumber">
                <Form.Label >Adhar Card Back</Form.Label>
                <Form.Label htmlFor="file-upload" className="btn border text-white" style={{ width: '400px', height: '200px', display: 'inline-block' }}>
                  <FontAwesomeIcon icon={faFileUpload} />
                  Browser Upload<br />
                  {selectedFile ? <Image className="mt-2  mb-2" src={URL.createObjectURL(selectedFile)} width="40%" height="80%" /> : <Image className="mt-2 mb-2" src="https://gnt-prod.s3.ap-south-1.amazonaws.com/source/aadhaarFront_FOzgbTZ.jpg" width="40%" height="80%" />}
                </Form.Label>
                <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileInputChange} />
              </Form.Group>
            </Col>

          </Row>
          <Col className='d-flex justify-content-end mt-4 '>
            {/* <Button className='bg-orange me-2' onClick={toggleEditMode}>Edit</Button> */}
            <Button className='bg-orange' type='submit' onClick={handleSave3} >Save</Button>
          </Col>
        </Form>
      </Container>

      )
    }
    {
      !getPageData && (<Loader/>)
    }
      
    </div>
  )
}

export default KYC