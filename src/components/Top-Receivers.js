import { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { getPageContent } from "../api/Apis";
import DynamicTable from '../dynamic_table/Dynamic-Table';
import MyHelmet from './Helmet';
import HomeTopReceiverForm from './Home-TopReceivers-CommonComponent';
import Loader from './Loader';
import Logo from './Logo';

function TopReceivers() {

  const [getPageData, setPageContent] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('top-receivers');
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
          <Container>
            <Logo />
            <h1 className='text-orange text-center py-3 fw-bold fs-2'>TOP RECEIVERS</h1>,
              <Row>
                <Col >
                  <HomeTopReceiverForm/>  
                </Col>
              </Row>

              <Row>
                <Col className="pt-lg-5" >
                  <DynamicTable />
                </Col>
              </Row>
          </Container>
        </>
      )
    }

    {
      !getPageData && (
       <Loader/>
      )
    }
   </div>
  )
}

export default TopReceivers