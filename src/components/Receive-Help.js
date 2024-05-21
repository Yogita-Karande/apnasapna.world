import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDataAPI, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function ReceiveHelp() {

  const token = useSelector((state) => {
    return state.token.token

  })
  console.log(token)

  const [formData, setFormData] = useState();
  const [getPageData, setPageContent] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('receive-help');
        setPageContent(pageData);

        const data = { api: 'receive-help', token: token };
        console.log(data)
        const receievers = await getDataAPI(data.api, data.data.token);
        console.log('receive')
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
            <h1 className="text-orange text-center py-4 fw-bold fs-2">RECEIVE HELP</h1>
            <Row>
              <Col className='text-end'>
                <NavLink to="/receive-help2"><Button className='bg-orange'><FontAwesomeIcon icon={faEye} /> Confirm Help</Button></NavLink>
              </Col>
            </Row>
            <Col lg={6} className='offset-lg-3 mt-5'>
              <Table striped bordered hover variant="transparent" className=' text-center  '>
                <thead>
                  <tr>
                    <th className='sorting text-center' colSpan={7}>2046<span className='text-primary'>/3</span><span className='text-danger'> /3,</span><span className='text-warning'> 0 /3</span></th>
                  </tr>
                </thead>
                <tbody >
                  <tr>
                    <td>1</td>
                    <td>150</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>-</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Container>
        )
      }
      {
        !getPageData && (<Loader />)
      }
    </div>
  )
}

export default ReceiveHelp