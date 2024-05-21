import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import { getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function DigitalDiscountsPoints() {

  const [getPageData, setPageData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('gnt');
        setPageData(pageData);
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
      <Container>
        <MyHelmet
          title={getPageData.title}
          description={getPageData.description}
          canonicalUrl = {getPageData.canonical}
        />
  
         <h1 className='text-orange text-center py-4 fw-bold fs-2'>GNT DIGITAL DISCOUNT POINTS</h1>
         <Row className="justify-content-center">
           <Col lg={5} className=" mt-5 pt-5">
             <Card style={{ height: '15rem' }} className="GNTCard mx-auto  ">
              <Card.Body>
                  <Row className="mt-3">
                      <Col lg={8} xs={8}>
                          <h6 className="text-white">130122023123537</h6>
                          <h5 className="text-white">NIRMALA YASHWANT JADHAV</h5>
                      </Col>
                      <Col lg={4} xs={4} >
                        <Col className="border me-1">
                          <p className="mb-0 ms-3 text-white"> Discount Points</p>
                          <p className="mb-0 ms-3 text-orange">3858.00</p>
                        </Col>
                      </Col>
                  </Row>
               </Card.Body>
            </Card>
         </Col>
         </Row>
     </Container>

      )
    }
    {
      !getPageData && (<Loader/>)
    }
    
    </div>
  )
}

export default DigitalDiscountsPoints