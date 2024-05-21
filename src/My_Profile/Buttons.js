import React from 'react'

function Buttons() {
  return (
    <Container>
        <Row>
            <Col className='text-center mt-3 border-bottom border-2'>
                <Button type="reset" 
                // onClick={handleAddressData} 
                className='bg-orange mb-3'>Update</Button>
                {/* <p className="text-success">{addressDataSuccess}</p> */}
            </Col>
        </Row>
    </Container>
  )
}

export default Buttons