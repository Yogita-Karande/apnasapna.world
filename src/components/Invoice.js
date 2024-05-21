import { useEffect, useState } from 'react';
import { Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDataAPI, getPageContent } from '../api/Apis';
import MyHelmet from "./Helmet";
import Loader from './Loader';


function Invoice() {
  
  const [formData, setFormData] = useState();
  const [getPageData, setPageData] = useState();
  const [showEntries, setShowEntries] = useState(10)

  /** Get table data from server */

  /** get token from redux */

  const token = useSelector((state) => {
    return state.token.token

  })


  /**API Call  */

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('invoice');
        setPageData(pageData);

        const receievers = await getDataAPI('get-invoice', token);
        console.log(receievers)

        if (receievers.status === 200 ) {
          console.log(receievers.data)
        } else {
          console.log(receievers.message);
        }
        

      } catch (error) {
        console.error('Error fetching invoice data:', error); }
    }
    fetchData();
  }, []);

  /** Show Entries */

  const handleShowEntries = (e) =>{
      console.log('10')
      setShowEntries(parseInt(e.target.value))
  }

  /**Return Data */

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

            <h1 className='text-orange text-center py-4 fw-bold fs-2'>INVOICES</h1>

            <Form className='text-white'>
              <Row>
                <Col className='d-flex mt-3'>
                  <Form.Group controlId="formGridNumber">
                    <Form.Label className='d-flex'>
                      <Form.Label className='me-2 mt-1'>Show </Form.Label >
                      <Form.Select value={showEntries} onChange={handleShowEntries}>
                        <option value="1">10</option>
                        <option value="2">20</option>
                        <option value="3">25</option>
                      </Form.Select>
                      <Form.Label className='ms-2 mt-1'>Entries</Form.Label >
                    </Form.Label>
                  </Form.Group>
                </Col>
                <Col className='mt-3 offset-lg-6'>
                  <Form.Group controlId="formGridNumber">
                    <Form.Label className='d-flex'>
                      <Form.Label className='me-2 mt-1 '>Search: </Form.Label >
                      <Form.Control />
                    </Form.Label>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Table responsive striped hover variant="light" className='mt-4 text-end'>
              <thead>
                <tr>
                  <th className='sorting'># </th>
                  <th>Created at</th>
                  <th>Invoice Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.created}</td>
                  <td>{data.invoice_number}</td>
                </tr>
               )
              )} */}
        
              </tbody>
            </Table>

            <Row className='mt-4 text-white'>
              <Col >
                <h6>Showing 1 to 10 of 212 entries2 rows selected</h6>
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

export default Invoice