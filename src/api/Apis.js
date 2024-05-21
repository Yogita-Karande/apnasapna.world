import axios from "axios";
// for getting states
let BASE_URL = process.env.SERVER_BASE_URL;

if(typeof BASE_URL == undefined) {
    BASE_URL = '192.168.0.102/giventake/api/web';
}
BASE_URL = 'https://apnasapna.world/api/web';
// BASE_URL = '192.168.0.102/giventake/api/web';
const getResponse = (data) => {
    console.log(data)
    if(data.data.status == 200) {
        if(typeof data.data.data != "undefined") {
            return data.data.data;
            // return Object.entries(data.data.data);
        }
    }
    return data.data.message;
}

//  Save token in redux store 

// const SET_TOKEN = 'SET_TOKEN';

// const setAction = (token) => ({
//     type : SET_TOKEN,
//     payload : token,

// })

// const initialState  = {
//     token : null,
// }

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case SET_TOKEN:
//         return {
//           ...state,
//           token: action.payload,
//         };
//       default:
//         return state;
//     }
//  };


export const getStates = async () => {
    try {
        const response = await axios.get(BASE_URL+'/get-states' );
        const data = getResponse(response);
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        // trigger error alert
        // something went wrong. Please check internet connection.
    }
 }

 /****
  * Used to get state cities
  * @state_id -> state id whose city to be found
  */
export const getStateCities = async (state_id) => {
    try {
        const postData = {
            api:'get-state-cities',
            state_id: state_id
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const data = getResponse(response);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        // trigger error alert
        // something went wrong. Please check internet connection.
    }
}


export const getPageContent = async (page) => {
    try {
        const postData = {
            api:'get-page-content',
            page: page
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    // trigger error alert
    // something went wrong. Please check internet connection.
    }
}


export const getDocuments = async () => {
    try {
        const response = await axios.get( BASE_URL + '/get-documents' );
        let data = response.data.data;
        return data;
    } catch (error) {
        console.error(error);
        // trigger error alert
        // something went wrong. Please check internet connection.
    }
 }

 /***
  * Used to get faqs
  */
export const getFaq = async () => {
    try {
        const response = await axios.post(BASE_URL+'/faqs');
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to login
 * @postData -> form data (consumer_no, password)
 */
export const getLogin = async (postData) => {
    try {
        postData.api = 'login'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // return getResponse(response);
        return response.data;
        // return response.data.token;

    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to star ranking
 * @rank -> rank no from 1 to 10
 */
export const getStarRanking = async (rank) => {
    try {
        const postData = {
            api:'star-ranking',
            rank: rank
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to get top recivers
 * @postData -> form data (state_id, city_id)
 */
export const getTopRecievers = async (postData) => {
    try {
        postData.api = 'top-recievers'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to add contact us page enquiry
 * @postData -> form data (name, email, phone, message)
 */
export const makeEnquiry = async (postData) => {
    try {
        postData.api = 'contact-enquiry'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to add contact us page enquiry
 * @postData -> form data (name, email, mobile_no, dob, address_line1, address_line2, landmark, city_id, pincode, gender)
 */
export const registerUser = async (postData) => {
    try {
        postData.api = 'register'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
        // return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to verify email
 * @postData -> form data (email, otp)
 */
export const verfiyEmail = async (postData) => {
    try {
        postData.api = 'verify-email'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to verify email
 * @email -> email address of user who needs to re-verify email
 */
export const sendVerificationEmail = async (email) => {
    try {
        const postData = {
            api:'send-verification-email',
            email: email
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to forgot password
 * @email -> email address of user
 */
export const forgotPassword = async (email) => {
    try {
        const postData = {
            api:'forgot-password',
            email: email
        };
        const response = await axios.post(BASE_URL, postData, {          
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to reset password
 * @postData -> form data(email, password, confirm_password, otp)
 */
export const resetPassword = async (postData) => {
    try {
        postData.api ='reset-password';
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
    });
    return response.data;
    
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to change password for logged in user
 * @postData -> form data(token, password, confirm_password)
 */
export const changePassword = async (postData) => {
    try {
        postData.api ='change-password';
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Incomplete
 * Used to update profile data for logged in user
 * @postData -> form data(token, password, confirm_password)
 */
export const updateProfile = async (postData) => {
    try {
        postData.api ='change-password';
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to update profile data for logged in user
 * @token -> jwt token
 * @api -> api to be called e.g get-invoices, get-pmf, get-help-data, get-recieved-help-data, get-confirm-help-requests
 */
export const getDataAPI = async (api, token) => {
    try {
        const postData = {
            api: api,
            token: token
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return (response.data);
        // return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to get invoice data
 * @token -> jwt token
 * @invoice_number -> invoice no of invoice
 */
export const getInvoiceDetails = async (token, invoice_number) => {
    try {
        const postData = {
            api: 'get-invoice-details',
            token: token,
            invoice_number: invoice_number
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to get download invoice
 * @token -> jwt token
 * @invoice_number -> invoice no of invoice
 */
export const downInvoice = async (token, invoice_number) => {
    try {
        const postData = {
            api: 'download-invoice-details',
            token: token,
            invoice_number: invoice_number
        };
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to get transaction history
 * @postData -> form data(from, to, token)
 */
export const getTransactionHistory = async (postData) => {
    try {
        postData.api ='get-transaction-history';
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to get transaction history
 * @postData -> form data(request_id, token)
 */
export const confirmHelpRequest = async (postData) => {
    try {
        postData.api ='confirm-help-request';
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to add help request
 * @postData -> form data(request_id, image, token)
 */
export const addHelpRequest = async (postData) => {
    try {
        postData.api ='confirm-help-request';
        const response = await axios.post(BASE_URL, postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}


export const getNotifications = async (api, token) => {
    try {
        const postData = {
            api: api,
            token: token
        };
        const response = await axios.post( BASE_URL + postData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return getResponse(response);
    } catch (error) {
        console.error(error);
        // trigger error alert
        // something went wrong. Please check internet connection.
    }
 }

 /*****
 * Used to add transfer data
 * @postData -> form data()
 */

 export const transferData = async (api, token) => {
    try {
        const postData = {
            api: api,
            token: token
        }
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // return response.data;
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to add updata data
 * @postData -> form data()
 */

export const updateData = async (api, token) => {
    try {
        const postData = {
            api: api,
            token: token
        }
        const response = await axios.put(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
       
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to add transfer data
 * @postData -> form data()
 */

export const deleteData = async (api, token) => {
    try {
        const postData = {
            api: api,
            token: token
        }
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
        // return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}

/*****
 * Used to add my profile data
 * @postData -> form data()
 */

export const myProfile = async (api , token ) => {
    try {
        const postData = {
            api: api,
            token: token
        };
        
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // return response.data;
        return getResponse(response);
    } catch (error) {
        console.log(error);
    }
}
