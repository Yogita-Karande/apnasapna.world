import { useEffect, useState } from 'react';
import { getPageContent } from "../api/Apis";

function Logout(){
    const [getPageData, setPageData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const pageData = await getPageContent('login');
            setPageData(pageData);
          } catch (error) {
            console.error('Error fetching state data:', error);
          }
        }
        fetchData();
      }, []);
    return(
        <>
            <MyHelmet
                title={getPageData.title}
                description={getPageData.description}
                canonicalUrl = {getPageData.canonical}
            />
        </>
    )
}