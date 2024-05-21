import { Col, Container, Row, Spinner } from 'react-bootstrap'
function Loader(){
    return(
        <Container>
            <Row className="justify-content-center h-100 text-center min-height">
                <Col className="my-auto">
                    <Spinner className="mx-1" animation="grow" variant="primary" />
                    <Spinner className="mx-1" animation="grow" variant="secondary" />
                    <Spinner className="mx-1" animation="grow" variant="success" />
                    <Spinner className="mx-1" animation="grow" variant="danger" />
                    <Spinner className="mx-1" animation="grow" variant="warning" />
                    <Spinner className="mx-1" animation="grow" variant="info" />
                    <Spinner className="mx-1" animation="grow" variant="light" />
                    <Spinner className="mx-1" animation="grow" variant="dark" />
                </Col>
            </Row>
        </Container>
    )
}

export default Loader