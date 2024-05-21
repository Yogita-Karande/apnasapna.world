import { faCog, faLock, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearToken } from '../redux_toolkit_api/TokenReducer';

function OffcanvasExample() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const data = useSelector((state)=>{
    // return state.users.token.data.name
    // const data = useSelector(state => state.users.token.data?.name);
     return state.token.token
  })

  const handleLogout = () =>{
    dispatch(clearToken(data)) && navigate('/');
  }

 return (
    <Navbar collapseOnSelect expand="lg" sticky="top" className='shadow-sm'>
      <Container>
        <Navbar.Brand to="/" className='logo text-uppercase' as={NavLink}>APNASAPNA.WORLD</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavDropdown
              title="Info" className='dropdown' data-toggle="collapse">
              <NavDropdown.Item as={NavLink} to="about-us">About Us</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="company-profile">Company Profile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="terms-and-conditions">T & C</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="privacy-policy">Privacy Policy</NavDropdown.Item>
            </NavDropdown>
            <NavLink className="nav-link" to="top-receivers">Top Receivers</NavLink>
            <NavLink className="nav-link" to="givers-and-takers">Giver & Takers</NavLink>
            <NavLink className="nav-link" to="support">Support</NavLink>
            <NavLink className="nav-link" to="star-ranking">Star Ranking</NavLink>
            <NavLink className="nav-link" to="faq">FAQ</NavLink>
            <NavLink className="nav-link" to="contact-us">Contact Us</NavLink>
          </Nav>
          <Nav>

          { data === null ? (<NavLink className="nav-link"  to='login'>
              <FontAwesomeIcon icon={faUser}/> Login
            </NavLink>
            ):(<NavDropdown
              title={data.data.name}
              className=' dropdown-centered'
              data-toggle="collapse" >
                <NavDropdown.Item as={NavLink} to="dashboard"> <FontAwesomeIcon icon={faUser}/>  Dashboard</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="notification"><FontAwesomeIcon icon={faUser}/> Notification</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="pmf"> <FontAwesomeIcon icon={faCog} /> PMF</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="give-help"><FontAwesomeIcon icon={faLock} /> Give Help</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="invoice"><FontAwesomeIcon icon={faLock} /> Invoice</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="my-invitation"><FontAwesomeIcon icon={faLock} /> My Invitation</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="receive-help"><FontAwesomeIcon icon={faLock} /> Receive Help</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="kyc"><FontAwesomeIcon icon={faLock} /> KYC</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="transaction-history"><FontAwesomeIcon icon={faLock} /> Transaction History</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="my-profile"><FontAwesomeIcon icon={faLock} /> My Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="change-password"><FontAwesomeIcon icon={faLock} /> Change Password</NavDropdown.Item>
                <Dropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignInAlt}/> Logout</NavDropdown.Item>
              </NavDropdown>)}
            
            {/* non logged in user */}
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
