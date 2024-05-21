import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, NavLink, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getDataAPI, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function MyAccount() {

  const [getPageData, setPageData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('my-account');
        setPageData(pageData);

        const consumerData = await getDataAPI();
        setPageData(consumerData);

      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  /* Display user name */
 const token = useSelector((state) => {
      return state.token.token.data
    })

    console.log(token)


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

        {
          token === null ? (<h1 className="text-orange text-center py-5 fw-bold text-capitalize fs-2">My Account</h1>): (<h1 className="text-orange text-center py-5 fw-bold text-capitalize fs-2">{token.name}</h1>)
        }

        <Row>
          <Col lg={4} className='mb-4'>
            <Card style={{ height: '20rem' }}>
              <Card.Body>
                <h6 className='text-muted text-uppercase text-center'>my account status</h6>

                <Table responsive className='custom-table'>
                  <tbody>
                    <tr >
                      <td className='text-dark'>Consumer Name</td>
                      <td className='text-dark' >:</td>
                      <td className='text-dark'>Ravita Raut</td>
                    </tr>

                    <tr>
                      <td className='text-dark'>Consumer No</td>
                      <td className='text-dark'>:</td>
                      <td className='text-dark'>130122023123537</td>
                    </tr>

                    <tr>
                      <td className='text-dark'>Total PMF</td>
                      <td className='text-dark'>:</td>
                      <td className='text-dark'>₹3150.00</td>
                    </tr>

                    <tr>
                      <td className='text-dark'>Total Tax</td>
                      <td className='text-dark'>:</td>
                      <td className='text-dark'>₹108.00</td>
                    </tr>

                    <tr>
                      <td className='text-dark'>Total Received Help</td>
                      <td className='text-dark'>:</td>
                      <td className='text-dark'>₹500.00</td>
                    </tr>

                    <tr>
                      <td className='text-dark'>Registration Time</td>
                      <td className='text-dark'>:</td>
                      <td className='text-dark'>30-12-2023 12:35 PM</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className='mb-4'>
            <Card style={{ height: '18rem' }}>
              <Card.Body>
                <h6 className='text-muted text-uppercase text-center'>Designation</h6>
                <p className=' text-uppercase text-center'>Giventake Associate</p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className='mb-4'>
            <Card style={{ height: '18rem' }}>
              <Card.Body><h3 className='text-muted text-uppercase text-center'>20 Days Left</h3></Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={4} className='mt-3 mb-4'>
            <Card style={{ height: '18rem' }}>
              <Card.Body>
                <h6 className='text-center text-uppercase text-muted'>invitation link</h6>
                <Row className='text-center mt-5 pt-5'>
                  <Col>
                    <NavLink to=""><Button className="bg-orange ">Invitation Link</Button></NavLink>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
  {
    !getPageData &&(
      <Loader/>
    )
  }
    </div> 
  )
}

export default MyAccount