import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import { getStateCities, getStates, getTopRecievers } from '../api/Apis';
function HomeTopReceiverForm() {

  const data = { city_id: '', states: "" }
  const [formData, setformData] = useState(data)
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formErrors, setformErrors] = useState({})
  const [tableData, setTableData] = useState([])

  const handleData = async (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    // get state city call
    if (e.target.name == 'states') {
      const setCityData = await getStateCities(e.target.value);
      setCities(setCityData);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      const recievers = await getTopRecievers(formData);
      setTableData(recievers);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stateData = await getStates();
        setStates(stateData);

        const receievers = await getTopRecievers(formData);
        setTableData(receievers);

      } catch (error) {
        console.log('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.states) {
      errors.states = "This field is required";
    }
    if (!values.city_id) {
      errors.city_id = "This field is required";
    }
    setformErrors(errors);
    if (Object.keys(errors).length === 0)
      return true;
    else
      return false;
  };

  const defaultImage = "Images/home-logo/home-main-logo.png";
  return (
    <Container>
      <Form >
        <Row className='justify-content-center mb-3'>
          <Col lg={3}>
            <Form.Select className="text-muted" name="states" value={formData.states} onChange={handleData}>
              <option key={0} value="" >Select State</option>
              {
                states && (
                  states.map((item, index) => (
                    <option key={index} value={item.id} >{item.state}</option>
                  )))}
            </Form.Select>
            <p className='text-danger'>{formErrors.states}</p>
          </Col>
          <Col lg={3} className='mt-2 mt-lg-0'>
            <Form.Select className="text-muted" name="city_id" value={formData.city_id} onChange={handleData}>
              <option key={0} value="" >Select District</option>
              {
                cities && (
                  cities.map((item, index) => (
                    <option key={index} value={item.id} >{item.city}</option>
                  )))}
            </Form.Select>
            <p className='text-danger'>{formErrors.city_id}</p>
          </Col>

          <Col lg={1} className='mt-2 mt-lg-0 mb-3 mb-lg-0' >
            <Button type="button" className="btn btn-warning bg-orange" onSubmit={handleSubmit} onClick={handleSubmit}>Search</Button>
          </Col>
        </Row>
      </Form>
      <Row className='justify-content-center text-white'>
        <Col lg={7} xs={12}>
          <Table responsive className='custom-table table-bordered table-hover '>
            <tbody >
              {
              tableData.map((data, index) => (
                <tr key={index}>
                  <td >{data.name}</td>                
                  <td><Image src={data.image} alt={data.name} className="img-fluid" /></td>
                  <td>{data.earned}</td>
                  <td>{data.id}</td>               
                </tr>
              )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
export default HomeTopReceiverForm




