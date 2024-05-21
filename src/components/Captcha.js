import React, { useState } from 'react';
import { Col, FormControl } from 'react-bootstrap';

const Captcha = () => {
  const [captchaCode, setCaptchaCode] = useState(generateCaptchaCode());
  const [userInput, setUserInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(true);

  function generateCaptchaCode() {
    // Implement your logic to generate a random code
    const characters = 'ABCyhbukZ0123456789';
    const code = Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]);
    return code.join('');
  }

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptchaCode());
    setUserInput('');
  };

  const handleSubmit = () => {
    // Implement your logic to check if userInput matches captchaCode
    const isValid = userInput.toUpperCase() === captchaCode;
    setIsCaptchaValid(isValid);

    // Add your additional logic when the form is submitted
    if (isValid) {
      // Form submission logic
      console.log('Captcha is valid. Submit the form!');
    } else {
      // Handle invalid captcha
      console.log('Invalid captcha. Please try again.');
    }
  };

  return (
    <Col>
      
      <FormControl type="text" className='mt-2 mb-2' value={userInput} onChange={handleInputChange} placeholder="Enter Captcha" />
      <small>Enter below captcha</small><br></br>
      {/* <Image className="bg-white"src={`https://dummyimage.com/150x50/000/fff&text=${captchaCode}`} alt="Captcha" /> */}
      <img src={`https://dummyimage.com/150x50/000/fff&text=${captchaCode}`} alt="verification" class="img-fluid" />
      <br />
      
      {/* <button onClick={refreshCaptcha}>Refresh</button>
      <button onClick={handleSubmit}>Submit</button> */}
      {!isCaptchaValid && <p style={{ color: 'red' }}>Invalid Captcha. Please try again.</p>}
    </Col>
  );
};

export default Captcha;
