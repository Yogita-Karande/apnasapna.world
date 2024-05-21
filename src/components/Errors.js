

function Errors(){

   

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // KYC
      
        if (!values.accountholdername) {
          errors.accountholdername = "Account Holder Name is required";
        }
    
        if (!values.bankaccountnumber ) {
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

        // LOgin

        if (!values.consumernumber) {
            errors.consumernumber = "Consumer Number is required";
          }
      
        if (!values.password) {
            errors.password = "Password is required";
        }

        // Registration

        if (!values.username) {
            errors.username = "Name is required";
          }
  
        if (!values.number ) {
            errors.number = "Phone Number is required";
            }
        
        if (!values < 10) {
        errors.number = "10 digit number is required";
        }
        
        if (!values.password) {
        errors.password = "Password is required";
        } 
    
        return errors;
      };

    return(
        <h1>

        </h1>
    )
}


export default Errors;
