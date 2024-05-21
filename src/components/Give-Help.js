import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDataAPI, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function GiveHelp() {

  const [getGiveHelpData, setGiveHelpData] = useState();
  
  const token = useSelector((state)=>{
     return state.token.token
  })

  const [formData, setFormData] = useState()

  useEffect(() => {
    async function fetchData() {
      try {

        const GiveHelp = await getPageContent('give-help');
        setGiveHelpData(GiveHelp);
     
        const data = { api: 'give-help', token: token };
        const receievers = await getDataAPI(data.api, data.token);
        setFormData(receievers);
        console.log(receievers);

      } catch (error) {
        console.log('Error fetching state data:', error);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="min-height">
      {
        getGiveHelpData && (
          <>
            <MyHelmet
              title={getGiveHelpData.title}
              description={getGiveHelpData.description}
              canonicalUrl={getGiveHelpData.canonical}
            />

            <Container>
              <Row className="justify-content-center">

                <h1 className='text-orange text-center py-4 fw-bold fs-2'>GIVE HELP</h1>
                <Col >
                  <Table responsive variant="light" className='mt-4 text-center dt-responsive'>
                    <thead>
                      <tr>
                        <th className='sorting'>Stage</th>
                        <th>Consumer No.</th>
                        <th>Consumer Name</th>
                        <th>Designation</th>
                        <th>Mobile</th>
                        <th>Give Help Amount</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {formData.map((giveHelpData, index) => (
                            <tr key={index}>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                              <td>{giveHelpData}</td>
                            </tr>
                      ))} */}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </>
        )
      }
      {
        !getGiveHelpData && (
          <Loader />
        )
      }

    </div>
  )
}

export default GiveHelp