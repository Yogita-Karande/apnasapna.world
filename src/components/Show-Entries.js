import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

function ShowEntries() {

    /* Show Entries functionslity..... state to track entries*/

    const [showEntries, setShowEntries] = useState(10)

    const handleShowEntries = (e) =>{
        console.log('10')
        setShowEntries(parseInt(e.target.value))
    }

    return (
        <Container>
            <Form className='text-white'>
                <Row>
                    <Col className='d-flex mt-3'>
                        <Form.Group controlId="formGridNumber">
                            <Form.Label className='d-flex'>
                                <Form.Label className='me-2 mt-1'>Show </Form.Label >
                                    <Form.Select  value={showEntries} onChange={handleShowEntries}>
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
        </Container>
    )
}

export default ShowEntries;
