import { Col, Container, Image, Row } from 'react-bootstrap'
function Logo(){
    return(
        <Container>
            <Row className='justify-content-center'>
                <Col className="text-center py-4" >
                  <Image src='/Images/home-logo/Logo_new.jpeg' className='img-fluid' alt='logo' />
                </Col>
            </Row>
      </Container>
    )
}

export default Logo