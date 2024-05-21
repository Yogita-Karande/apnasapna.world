import React from 'react'

function Images() {
  return (
    <Container>
        <Row>
           <Col className=" ">
                  <Image className="btn border" alt="" src={getData.photo} style={{ width: "190px", height: "190px", }}/>
            </Col>
        </Row>
    </Container>
  )
}

export default Images