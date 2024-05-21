import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Logo from './Logo';

function PrivacyandPolicy() {

  const [getPageData, setPageContent] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('privacy-policy');
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
              <Logo/>
              <Row className="text-white justify-content-center">
                <Col>
                  <h1 className="text-orange fs-2 fw-bold py-4 text-center">PRIVACY POLICY</h1>
                  <div dangerouslySetInnerHTML={{ __html: getPageData.text }}></div>
                </Col>
              </Row>
            </Container>
        </>
      )
    }

    {
      !getPageData && (
        <Container>
          <Row className="justify-content-center h-100 text-center" style={{minHeight:"75vh"}}>
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
  )
}

export default PrivacyandPolicy