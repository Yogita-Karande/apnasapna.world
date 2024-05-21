import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { getPageContent, getStarRanking } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from "./Loader";

function StarRanking() {
  const [getPageData, setPageContent] = useState();
  const [getRankingData, setRanking] = useState([]);

  useEffect(() => {
    const fetchData = async ()  => {
      try {
        const pageData = await getPageContent('star-ranking');
        setPageContent(pageData);

        const rankingData = await getStarRanking(3);
        setRanking(rankingData);

      } catch (error) {
        console.log('Error fetching state data:', error);
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

          <Container className='mt-5 text-white'>
            <Row className="justify-content-end">
              <Col lg={9}>
                <h1 className='text-orange text-center fs-2 fw-bold'>STAR RANKING</h1>
              </Col>
              <Col lg={2} className="mb-3 mb-lg-0">
                <Form.Select aria-label="Default select example">
                  <option>Select Star Rank</option>
                  <option value="1">1 Rank</option>
                  <option value="2">2 Rank</option>
                  <option value="3">3 Rank</option>
                  <option value="3">4 Rank</option>
                  <option value="3">5 Rank</option>
                  <option value="3">6 Rank</option>
                  <option value="3">7 Rank</option>
                  <option value="3">8 Rank</option>
                  <option value="3">9 Rank</option>
                  <option value="3">10 Rank</option>
                </Form.Select>
              </Col>
              <Col lg={1} >
                <Button className="bg-orange">Search</Button>
              </Col>
            </Row>
            <Row className="mt-3 mt-md-5">
              <Col>
                <div dangerouslySetInnerHTML={{ __html: getPageData.text }}></div>
              </Col>
            </Row>
            <Row className='justify-content-center row-cols-2 row-cols-md-4'>
              {
                getRankingData.map((ranking , index) => (
                    <Col className="mt-3 mt-md-4">
                      <Card> 
                        <Card.Body>
                          <h6 className='text-uppercase text-muted font-16'>{ranking.name}</h6>
                          <h5 className='text-secondary mt-4'>{ranking.id}</h5>
                          </Card.Body>
                      </Card>
                    </Col>
                ))
              }
            </Row>
          </Container>
     </>
    )
  }
  
  { !getPageData &&(
      <Loader/>
    )
  }
    </div>
  )
}

export default StarRanking;