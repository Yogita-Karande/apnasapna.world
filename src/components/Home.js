import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { getPageContent } from '../api/Apis';
import MyHelmet from './Helmet';
import HomeTopReceiverForm from './Home-TopReceivers-CommonComponent';
import Loader from "./Loader";
import Logo from './Logo';

function Home() {

  const [getHomePageData, setHomePageData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await getPageContent('home');
        setHomePageData(pageData);
        
      } catch (error) {
        console.log('Error fetching state data:', error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <div style={{minHeight:'100vh'}}>
      {
          getHomePageData && (
            <>
              <MyHelmet
                  title={getHomePageData.title}
                  description={getHomePageData.description}
                  canonicalUrl = {getHomePageData.canonical}
              />
              <Container>
                  <Logo/>
                  <h1 className='text-orange text-center py-4 fw-bold fs-2'>TOP RECEIVERS</h1>
                  <HomeTopReceiverForm/>
              </Container>
            </>
          )
        }
        {
          !getHomePageData && (
            <Loader/>
          )
        }
    </div>
  )
}

export default Home