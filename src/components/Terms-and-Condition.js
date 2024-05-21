import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from "./Loader";
import Logo from './Logo';

function TermsandConditions() {
  const [getPageData, setPageContent] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('terms-and-conditions');
        setPageContent(pageData);
      } catch (error) {
        console.log('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-height">
      {  getPageData && (
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
                    <h1 className="text-orange fs-2 fw-bold py-4 text-center">TERMS AND CONDITIONS FOR CONSUMERS</h1>
                    <div dangerouslySetInnerHTML={{ __html: getPageData.text }}></div>
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

export default TermsandConditions;