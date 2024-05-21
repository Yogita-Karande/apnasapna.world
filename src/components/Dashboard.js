import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from "./Loader";

function Dashboard() {

  const [pageDashboardContent, setDashboardContent] = useState([])

  const data = useSelector((state)=>{
    return state.token.token
   })
  
   useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('dashboard');
        setDashboardContent(pageData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-height">
      {
        pageDashboardContent && (
          <Container >
          <MyHelmet
              title={pageDashboardContent.title}
              description={pageDashboardContent.description}
              canonicalUrl = {pageDashboardContent.canonical}
           />

        {
          data === null ? (<h1 className="text-orange text-center py-5 fw-bold text-capitalize fs-2">Dashboard</h1>): (<h1 className="text-orange text-center py-5 fw-bold text-capitalize fs-2">{data.data.name}</h1>)
        }
        
        <Row className="justify-content-center text-center">
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/top-receivers"><Image src="https://giventake.world/static/assets/images/dashboard/ic_top_receives_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/top-receivers" className="nav-link py-4">Top Receiver</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/my-account"><Image src="https://giventake.world/static/assets/images/dashboard/ic_dashboard_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/my-account" className="nav-link py-4">My Account</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/my-profile"><Image src="https://giventake.world/static/assets/images/dashboard/ic_myprofile_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/my-profile" className="nav-link py-4">My Profile</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/pmf"><Image src="https://giventake.world/static/assets/images/dashboard/ic_pmf_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/pmf" className="nav-link py-4">PMF</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/give-help"><Image src="https://giventake.world/static/assets/images/dashboard/ic_give_help_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/give-help" className="nav-link py-4">Give Help</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/invoice"><Image src="https://giventake.world/static/assets/images/dashboard/ic_invoice_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/invoice" className="nav-link py-4">Invoice</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/my-invitation"><Image src="https://giventake.world/static/assets/images/dashboard/ic_invoice_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/my-invitation" className="nav-link py-4">My Invitation</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/receive-help"><Image src="https://giventake.world/static/assets/images/dashboard/ic_receive_help_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/receive-help" className="nav-link py-4">Receive Help</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/transaction-history"><Image src="https://giventake.world/static/assets/images/dashboard/ic_transaction_history_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/transaction-history" className="nav-link py-4">Transaction History</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/gnt"><Image src="https://giventake.world/static/assets/images/dashboard/ic_wallet_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/gnt" className="nav-link py-4">GNT Digital Discount Points</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/reset-password"><Image src="https://giventake.world/static/assets/images/dashboard/ic_account_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/reset-password" className="nav-link py-4">Reset Password</NavLink>
          </Col>
  
          <Col xs={6} md={3} lg={3} className="mb-4">
            <NavLink to="/kyc"><Image src="https://giventake.world/static/assets/images/dashboard/ic_kyc_icon.png" alt="" width="100px" /></NavLink>
            <NavLink to="/kyc" className="nav-link py-4">KYC</NavLink>
          </Col>
  
        </Row>
          </Container>
        )
      }
      {
        !pageDashboardContent && (<Loader/>)
      }
   
    </div>
  );
}

export default Dashboard;
    