import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getNotifications, getPageContent } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';
import NotificationCard from './NotificationCard';


function Notification() {
  const [getPageData, setPageData] = useState();
  const [getNotificationData, setNotificationData] = useState();
  
  const token = useSelector((state) => {return state.token.token.data.token })
  console.log(token)

  useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('notification');
        setPageData(pageData);

        const data = { api: 'get-notifications', token: token };
        console.log(data)
        const notification = await getNotifications('get-notifications', token);
        console.log('receive')
        console.log(notification)
        setNotificationData(notification);
        
      } catch (error) {
        console.error('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-height">
      {
        getPageData && (
          <Container >
            <MyHelmet
              title={getPageData.title}
              description={getPageData.description}
              canonicalUrl={getPageData.canonical}
            />
            <Row>
              <h1 className="text-orange text-center fs-2  mt-4 fw-bold">NOTIFICATIONS</h1>
              <Col className="mt-5 text-white">
                <>Comming Soon...</>
                {getNotificationData && getNotificationData.map((item, index) => (
                  <NotificationCard
                    key={index}
                    heading={item.heading}
                    paragraph={item.Paragraph}
                  />
                ))}
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
export default Notification;
