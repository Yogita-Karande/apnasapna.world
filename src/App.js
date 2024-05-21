import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import About from './components/About';
import ChangePassword from './components/ChangePassword';
import CompanyProfile from './components/Company-Profile';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import DigitalDiscountsPoints from './components/Digital-Discounts-Points';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import GiveHelp from './components/Give-Help';
import Giventakers from './components/Giventakers';
import Home from './components/Home';
import Invoice from './components/Invoice';
import InvoiceBill from './components/InvoiceBill';
import KYC from './components/KYC';
import Login from './components/Login';
import Menubar from './components/Menubar';
import MyInvitation from './components/My-Invitation';
import MyAccount from './components/MyAccount';
import MyProfile from './components/MyProfile';
import Notification from './components/Notification';
import PMF from './components/PMF';
import PrivacyandPolicy from './components/Privacy-and-Policy';
import ReceiveHelp from './components/Receive-Help';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import StarRanking from './components/Star-Ranking';
import Support from './components/Support';
import TermsandConditions from './components/Terms-and-Condition';
import TopReceivers from './components/Top-Receivers';
import TransactionHistory from './components/Transaction-History';
import VerifyEmail from './components/VerifyEmail';
import Receivehelp2 from './components/receive-help2';
import Delete from './support-page-data/Delete';
import Transfer from './support-page-data/Transfer';
import Update from './support-page-data/Update';


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation()
 
  const token = useSelector((state) => state.token.token);
 
  const navigate = useNavigate()

  // if(token !== null) {
  //   navigate(location.pathname)
  // } else {
  //   const destination = location.pathname !== "undefined" ? "?destination="+location.pathname.replace(/\//, '') : ''
  //   navigate('/login'+destination)
  // }

  // useEffect(() => {
  //   if(token !== null) {
  //   navigate(location.pathname)
  //   } else {
  //     const destination = location.pathname !== "undefined" ? "?destination="+location.pathname.replace(/\//, '') : ''
  //     navigate('/login'+destination)
  //   }

  // },[token, location.pathname, navigate])

  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? <Component {...rest} /> : null;

};

function App() {


   return (
    <div className='app'>
      <BrowserRouter>
        <Menubar />
        <Routes >
          {/* <Route path='dashboard' element={<Dashboard />}/> */}
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />          
          <Route path='/' element={<Home />} />
          <Route path='top-receivers' element={<TopReceivers />} />
          <Route path='givers-and-takers' element={<Giventakers />} />
          <Route path='support' element={<Support />} />
          <Route path='star-ranking' element={<StarRanking />} />
          <Route path='contact-us' element={<Contact />} />
          <Route path='about-us' element={<About />} />
          <Route path='terms-and-conditions' element={<TermsandConditions />} />
          <Route path='Privacy-Policy' element={<PrivacyandPolicy />} />
          <Route path='faq' element={<FAQ />} />
          <Route path='transfer' element={<Transfer />} />
          <Route path='update' element={<Update />} />
          <Route path='delete' element={<Delete />} />
          <Route path='company-profile' element={<CompanyProfile />} />
          <Route path='my-account' element={<MyAccount />} />
          <Route path='my-profile' element={<MyProfile />} />
          <Route path="/pmf" element={<ProtectedRoute component={PMF} />} />
          <Route path="/give-help" element={<ProtectedRoute component={GiveHelp} />} />
          <Route path="/invoice" element={<ProtectedRoute component={Invoice} />} />
          <Route path="/invoice-bill" element={<ProtectedRoute component={InvoiceBill} />} />
          <Route path="/my-invitation" element={<ProtectedRoute component={MyInvitation} />} />
          <Route path="/receive-help" element={<ProtectedRoute component={ReceiveHelp} />} />
          <Route path="/receive-help2" element={<ProtectedRoute component={Receivehelp2} />} />
          <Route path="/transaction-history" element={<ProtectedRoute component={TransactionHistory} />} />
          <Route path="/gnt" element={<ProtectedRoute component={DigitalDiscountsPoints} />} />
          <Route path="/change-password" element={<ProtectedRoute component={ChangePassword} />} />
          <Route path="notification" element={<ProtectedRoute component={Notification} />} />
          <Route path="/kyc" element={<ProtectedRoute component={KYC} />} />
          <Route path='register' element={<Register />} />
          <Route path='register/:referrer' Component={Register} />
          <Route path='verify/email/:email' Component={VerifyEmail} />
          <Route path='login' element={<Login />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password/email/:email' element={<ResetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
