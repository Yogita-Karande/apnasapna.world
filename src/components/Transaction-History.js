import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { NavLink } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import { getPageContent, getTransactionHistory } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function TransactionHistory() {

  /** Filter  Data from table **/

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = { startdate: "", enddate: "" }
  const [formData, setFormData] = useState(data)

  const sampleData = [
    { id: 1, name: 'John', date: '2024-02-10' },
    { id: 2, name: 'Jane', date: '2024-02-12' },
    { id: 3, name: 'Doe', date: '2024-02-15' }
  ];

  const handleData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // if (name === 'startdate') {
    //   setStartDate(value);
    // } else if (name === 'enddate') {
    //   setEndDate(value);
    // }
  }

  const handleFilterClick = () => {
    // const filtered = gettableData.filter((item) => {
    //   const itemDate = new Date(item.date);
    //   const filterStartDate = new Date(startDate);
    //   const filterEndDate = new Date(endDate);
    //   return itemDate >= filterStartDate && itemDate <= filterEndDate;
    // });
    // setFilteredData(filtered);
  };

  /*API CAll */

  const [getPageData, setPageContent] = useState();
  const [gettableData, setTableData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('transaction-history');
        setPageContent(pageData);

        const tableData = await getTransactionHistory();
        setTableData(tableData);

        setFilteredData(tableData); // Initialize filtered data with all data
        setLoading(false);

      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  /* Export/Download PDF Functionalinality implement  */

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const tableref = useRef(null);

  /* Export/Download Excel Functionalinality implement  */

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableref.current,
    filename: 'Table',
    sheet: 'Users'
  });

  /* Return Code */

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
            <h1 className='text-orange text-center py-5 fw-bold fs-2'>TRANSACTION HISTORY</h1>
            <Row>
              <Col lg={3}>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="date" name='startdate' value={formData.startdate} onChange={handleData} />
                  </Form.Group>
                </Form>
              </Col>

              <Col lg={3}>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Control type="date" name='enddate' value={formData.enddate} onChange={handleData} />
                  </Form.Group>
                </Form>
              </Col>

              <Col xs={2} lg={2}>
                <Button className='bg-orange' onClick={handleFilterClick}>Filter</Button>
              </Col>

              <Col xs={5} lg={2} id='pdf' className='text-end'>
                <Button className='bg-orange' onClick={() => toPDF()}>Export to PDF</Button>
              </Col>

              <Col xs={5} lg={2} className='text-end'>
                <NavLink ><Button className='bg-orange' id='to_excel' onClick={onDownload}>Export to Excel</Button></NavLink>
              </Col>

            </Row>
            <Row className='justify-content-center'>
              <Col ref={targetRef} >
                <Table striped bordered hover variant="light" className='mt-4 text-end' ref={tableref}>
                  <thead >
                    <tr>
                      <th className='sorting'>#</th>
                      <th>Created at</th>
                      <th>Invoice Number</th>
                    </tr>
                  </thead>
                  <tbody >
                    {/* {
                      loading ? (
                        <tr>
                          <td colSpan="3" className="text-center">Loading...</td>
                        </tr>
                      ) : filteredData.length > 0 ? (
                        filteredData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">No data found for the selected date range.</td>
                        </tr>
                      )
                    } */}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )
      }
      {
        !getPageData && (<Loader />)
      }

    </div>
  );
}

export default TransactionHistory;
