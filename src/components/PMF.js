import { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDataAPI, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';
import ShowEntries from './Show-Entries';

function PMF() {

  // const token = useSelector((state) => {return state.token.token.data.token })
  const token = useSelector((state) => {return state.token.token.data.token })
  console.log(token)

  // const MENU_LOGO= process.env.LOGO_URL;
  // console.log("url")
  // console.log(MENU_LOGO)

  const [formData, setFormData] = useState();
  const [getPageData, setPageData] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('pmf');
        setPageData(pageData);

        const receievers = await getDataAPI('get-pmfs', token);
 
        if (receievers.status === 200 ) {
          console.log(receievers.data)
          setFormData(receievers.data)
        } else {
          console.log(receievers.message);
          setMessage(receievers.message)
        }
        
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
              canonicalUrl={getPageData.canonical}
            />
           <Container>
              <h1 className='text-orange text-center py-4 fw-bold fs-2'>PMF</h1>
              <h1 className='text-white text-center  fs-4'>Please transfer the PMF through any UPI and send the screenshot of your transaction amount given to the company through the form.</h1>

              <ShowEntries />
              <Row>
                <Col>
                  <Table responsive variant="light" className='mt-4'>
                    <thead>
                      <tr>
                        <th className='sorting'>Stage</th>
                        <th>Amount</th>
                        <th>GST</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                     {
                      formData && formData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.stage}</td>
                          <td>{data.amount}</td>
                          <td>{data.gst}</td>
                          <td>{data.status}</td>
                          <td>{data.date}</td>
                        </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='mt-4 text-white'>
                <Col >
                  <p>Showing 1 to 10 of 212 entries2 rows selected</p>
                </Col>

                <Col >
                  <Pagination className='justify-content-end m '>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>

                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </Col>
              </Row>
            </Container>
          </>
        )
      }
      {
        !getPageData && (
          <Loader />
        )
      }

    </div>
  )
}

export default PMF