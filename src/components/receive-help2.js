import { Col, Container, Table } from "react-bootstrap"

function Receivehelp2() {
  return (
    <Container>
    
       <Col className=" receiver text-center mt-5 mb-5"><h2>RECEIVE HELP</h2></Col>
    
       <Table striped bordered hover variant="dark" className='mt-4 text-center'>
                <thead>
                    <tr>
                        <th className='sorting'># </th>
                        <th>Consumer No</th>
                        <th>Consumer Name</th>
                        <th>Receive Help Amount</th>
                        <th>Mobile</th>
                        <th>Contact Number</th>
                        <th>Designation</th>
                        <th>Status</th>
                        <th>Countdown</th>

                
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td colSpan={9}>No data available in table</td>
                        

                    </tr>
                  

                  


                </tbody>
            </Table>
            <Col >
                    <h6>Showing 0 to 0 of 0 entries </h6>
            </Col>
            <hr/>
    </Container>
  )
}

export default Receivehelp2