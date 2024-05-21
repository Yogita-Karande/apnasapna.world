import { useEffect, useState } from 'react';
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDataAPI, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';
import ShowEntries from './Show-Entries';

function MyInvitation() {

  const [getPageData, setPageData] = useState();

  const token = useSelector((state) => {
    return state.token.token

  })
  console.log(token)

  const [formData, setFormData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('my-invitation');
        setPageData(pageData);

        const data = { api: 'my-invitation', token: token };
        console.log(data)
        const receievers = await getDataAPI(data.api, data.data.token);
        console.log('receive')
        // console.log(receievers)
        setFormData(receievers);

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

            <h1 className="text-orange text-center py-4 fw-bold fs-2">MY INVITATION</h1>
            <Row className='justify-content-center'>
              <Col lg={10}>
                <ShowEntries />
              </Col>
            </Row>
            <Row className='justify-content-center'>
              <Col lg={10}>
                <Table responsive variant="light" className='mt-4 text-end'>
                  <thead>
                    <tr>
                      <th className='sorting'>Name</th>
                      <th>Email ID</th>
                      <th>Consumer Number</th>
                      <th>Mobile</th>
                      <th>PLaced Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {
                                formData.map((data, index) => (
                                <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.consumer_no}</td>
                                <td>{data.mobile_no}</td>
                                <td>{data.placed_order}</td>
                                </tr>
                              )
                            )} */}
                    <tr>
                      <td>2</td>
                      <td>Dec 30-2023-01:14 PM	</td>
                      <td>AL/53779/23-24</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>

                </Table>
              </Col>
            </Row>
            <Row className=' text-white justify-content-center'>
              <Col lg={10}>
                <h6>Showing 1 to 2 of 2 entries2 rows selected</h6>
              </Col>

              <Col lg={10}>
                <Pagination className='justify-content-end'>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>

                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Col>
            </Row>
          </Container>

        )
      }
      {
        !getPageData && (<Loader />)
      }

    </div>
  )
}

export default MyInvitation