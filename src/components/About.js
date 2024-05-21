import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';
import Logo from './Logo';

function About() {
  const [getAboutData, setAboutData] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('about-us');
        setAboutData(pageData);
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
    {
      getAboutData && (
        <>
            <MyHelmet
              title={getAboutData.title}
              description={getAboutData.description}
              canonicalUrl = {getAboutData.canonical}
            />
            <Container className="min-height">
              <Logo/>
                <Row className="text-white justify-content-center">
                  <h1 className="text-orange fs-2 fw-bold py-4 text-center">ABOUT US</h1>
                  <div dangerouslySetInnerHTML={{ __html: getAboutData.text }}></div>
                </Row>
            </Container>
        </>
      )

    }
    {
          !getAboutData && (
            <Loader/>
          )
        }
      
   </>
  )
}

export default About;