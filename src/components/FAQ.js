import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import { getFaq, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from "./Loader";

function FAQ (){

    const [getFaqData, setFaqData] = useState([]);
    const [pageData, setpageData] = useState();

        useEffect(() => {
            async function fetchData() {
            try {
                const getPageData = await getPageContent('FAQ');
                setpageData(getPageData);
                
                const faqData = await getFaq();
                setFaqData(faqData);
            
            } catch (error) {
                console.log('Error fetching state data:', error);
            }
         }
    fetchData();
  }, []);
    return(
        <div className="min-height">
        {
            pageData && (
               <>
                <MyHelmet
                title={pageData.title}
                description={pageData.description}
                canonicalUrl = {pageData.canonical}
            />
     
             <Container>
                <h1 className='text-orange text-center py-4 fw-bold fs-2'>FAQ</h1>
                <Row className='justify-content-center'>
                    <Col xs={12} lg={10}>
                        <Accordion>
                            {
                                getFaqData.faqs && (
                                    getFaqData.faqs.map((item, index) => (
                                        <Accordion.Item eventKey={index} key={index}>
                                            <Accordion.Header className='accordian-header'>{item.question}</Accordion.Header>
                                            <Accordion.Body className='accordian-body'>
                                                <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        )
                                    )
                                )
                            }
                        </Accordion>
                    </Col>
                </Row>
            </Container>
            </> 
          )
        }
        {
            !pageData && (
                <Loader/>
            )
         }
      </div>
    )
}

export default FAQ;