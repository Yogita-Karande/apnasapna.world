import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDataAPI } from "../api/Apis";


function InvoiceBill({ formData }) {

  const [FormData, setFormData] = useState([]);

  const token = useSelector((state) => {
    return state.users.token

  })
  console.log(token)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = { invoice_numbers: formData.invoice_number, token: token };
        console.log(data)
        const receievers = await getDataAPI(data.invoice_numbers, data.data.token);
        console.log('receive')
        setFormData(receievers)

      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    }
    fetchData();
  }, []);

  const inputRef = useRef(null)

  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      });

      pdf.addImage(imgData, "JPEG", 10, 10, 190, 130);

      pdf.save("download.pdf");
    });
  }

  return (
    <Container className="mt-5">
      <Col ref={inputRef}>
        <Col><Image src="/Images/home-logo/home_logo01.png" width="10%" /></Col>
        <Row>
          <Col className="mt-4 text-white" >
            <h6> PRASANTH PANACHIKKAL ENTERPRISES PVT LTD</h6>
            <h6>PRASANTH PANACHIKKAL ENTERPRISES PVT LTD<br />
              FIRST FLOOR, 23/326/53-1, N P TOWER<br />
              WEST FORT, PIN - 680004<br />
              THRISSUR, KERALA<br />
              GSTIN: 32AAICP8972D1Z9<br />
              SAC : 9987<br />
              CIN: U72200KL2016PTC046962<br />
              PHONE:+919846073366
            </h6>

            <h5 className="mt-3 mb-4">Billing to </h5>

            <h6 className="text-uppercase">
              Nirmala Yashwant Jadhav<br />
              walsawangi Taq. bhokardab<br />
              district jalana<br />
              Jalna, Maharashtra,<br />
              India<br />
              PH: +917080909141
            </h6>

          </Col>
          <Col className=" text-end text-white">
            <h5>INVOICE</h5>
            <h6 className="mt-3 mb-3">Invoice Date: Dec. 30, 2023, 12:44 p.m</h6>
            <h6>Invoice Number: #AL/53752/23-24</h6>
          </Col>
        </Row>

        <Table striped bordered hover variant="dark" className='mt-4 text-end'>
          <thead>
            <tr>
              <th className='sorting'>SL.NO</th>
              <th>Description</th>
              <th>Amount</th>
              <th>IGST(18%)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Initial Platform Maintenance Fee (PMF)</td>
              <td>₹ 450.00</td>
              <td>₹ 81.00</td>
              <td>₹ 531.00</td>
            </tr>
          </tbody>
        </Table>

        <Col className="text-end text-white">
          <h6>Sub-total: ₹ 450.00</h6>

          <h6>IGST(18%): ₹ 81.00</h6>

          <h6>Total: ₹ 531.00</h6>
        </Col>
      </Col>

      <Col className="text-center mt-4">
        <Button className="bg-orange" onClick={printDocument}>Download Invoice</Button>
      </Col>
    </Container>
  )
}
export default InvoiceBill