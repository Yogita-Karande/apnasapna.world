import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
// require('dotenv').config();
import { getDataAPI } from '../api/Apis';

function DynamicTable() {

    const [tableData, settableData] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                const topReceiversData = await getDataAPI('top-receivers');
                settableData(topReceiversData);
            } catch (error) {
                console.error('Error fetching state data:', error);
            }
        }
        fetchData();
    }, []);


    const defaultImage = "Images/home-logo/home-main-logo.png";
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col lg={8} >
                    <Table responsive className='custom-table border-bottom ' >
                        <tbody >
                            {/* {tableData.data.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{defaultImage}</td>
                                    <td>{data.consumerID}</td>
                                    <td>{data.amount}</td>
                                </tr>
                               )
                            )} */}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default DynamicTable

