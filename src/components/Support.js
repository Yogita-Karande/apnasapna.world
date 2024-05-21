import { useEffect, useState } from 'react';
import { Card, Col, Container, Nav, Row, Spinner } from 'react-bootstrap';
import { getPageContent } from "../api/Apis";
import Delete from '../support-page-data/Delete';
import Transfer from '../support-page-data/Transfer';
import Update from '../support-page-data/Update';
import MyHelmet from "./Helmet";

function Support() {
 const [toggle, settoggle] = useState(1)

 const toggleTab =(index) =>{
    settoggle(index)
 }

 const [getPageData, setPageContent] = useState();

 useEffect(() => {
  async function fetchData() {
    try {
      const pageData = await getPageContent('support');
      setPageContent(pageData);
    } catch (error) {
      console.error('Error fetching state data:', error);
    }
  }
  fetchData();
}, []);

 return (
   <div className="min-height">
   {
      getPageData && (
        <>
          <MyHelmet
          title={getPageData.title}
          description={getPageData.description}
          canonicalUrl = {getPageData.canonical}
        />
     
        <Container className='mt-3'>
            <Row>
                <Col>
                  <Card className='py-2 p-3'>
                    <Card.Body >
                      <Nav fill variant="tabs" defaultActiveKey="link-1" className='bg-primary'>
                      
                        <Nav.Item>
                          <Nav.Link onClick={() => toggleTab(1)} eventKey="link-1">Transfer Consumer Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link onClick={() => toggleTab(2)} eventKey="link-2">Update Consumer Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link onClick={() => toggleTab(3)} eventKey="link-3">Delete Consumer Request</Nav.Link>
                        </Nav.Item>
                      </Nav>

                      {toggle === 1 && <Transfer />}
                      {toggle === 2 && <Update />}
                      {toggle === 3 && <Delete />}
                    </Card.Body>
                  </Card>
                </Col>
            </Row>
         </Container>
        </>
     )
   }

   {
     !getPageData && (
      <Container>
        <Row className="justify-content-center h-100 text-center min-height">
          <Col className="my-auto">
            <Spinner className="mx-1" animation="grow" variant="primary" />
            <Spinner className="mx-1" animation="grow" variant="secondary" />
            <Spinner className="mx-1" animation="grow" variant="success" />
            <Spinner className="mx-1" animation="grow" variant="danger" />
            <Spinner className="mx-1" animation="grow" variant="warning" />
            <Spinner className="mx-1" animation="grow" variant="info" />
            <Spinner className="mx-1" animation="grow" variant="light" />
            <Spinner className="mx-1" animation="grow" variant="dark" />
          </Col>
        </Row>
       </Container>
     )
   }
 
   </div>
 );
}

export default Support;
