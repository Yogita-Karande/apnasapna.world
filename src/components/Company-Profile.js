import { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Table } from 'react-bootstrap';
import { getDocuments, getPageContent } from '../api/Apis';
import MyHelmet from "./Helmet";
import Loader from './Loader';

function CompanyProfile() {

  const [getDocumentsData, setDocumentsData] = useState();
  const [getPageData, setPageData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('company-profile');
        setPageData(pageData);

        const Documents = await getDocuments();
        setDocumentsData(Documents);
        
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
              canonicalUrl={getPageData.canonical}
            />

            <Row>
              <h1 className="text-orange text-center fs-2 py-4 fw-bold">COMPANY PROFILE</h1>
              <h2 className="py-3 fs-4 text-white fw-bold">COMPANY DETAILS</h2>

              <Col>
                <Table striped hover className='table custome-table bg-transparent'>
                  <tbody>
                    <tr>
                      <td>Company Name</td>
                      <td className='text-end'>ApnaSapna.World</td>
                    </tr>
                    <tr>
                      <td>Office Address</td>
                      <td className='text-end'>ApnaSapna.World<br />

                        PARASANA VASTU-B,<br />
                        UNITY APARTMENT,<br />
                        Baf Hira Nagar Rd,<br />
                        Malad, Bafhira Nagar,<br />
                        Kharodi, Mumbai, <br />
                        Maharashtra 400095.</td>
                    </tr>
                    <tr>
                      <td>GST NUMBER</td>
                      <td className='text-end'>27AALAA9794R1ZH</td>
                    </tr>
                    <tr>
                      <td>PAN CARD</td>
                      <td className='text-end'>AALAA9794R</td>
                    </tr>
                    <tr>
                      <td>CF.No</td>
                      <td className='text-end'>146/15F11723</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            {
              getDocumentsData && (
                <>
                  <h3 className='py-3 fs-4 text-white fw-bold'>DOCUMENTS</h3>
                  <Row className='text-white justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-3'>
                    {
                      getDocumentsData.documents.map((document, index) => (
                        <Col className='mt-3 mt-md-0'>
                          <h5 className='text-center'>{document.title}</h5>
                          <Image src={document.document} alt={document.title} className='img-fluid' />
                        </Col>
                      ))
                    }
                  </Row>
                </>
              )
            }
          </Container>

        )
      }

      {
        // if end here
        !getPageData && (
          <Loader/>
        )
      }
    </div>
  )
}

export default CompanyProfile