import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Aadhar_Informtion from "../My_Profile/Aadhar_Information";
import Address_Information from "../My_Profile/Address_Information";
import Personal_Information from "../My_Profile/Personal_Information";
// import Social_Media_Information from "../My_Profile/Social_Media_Information";
// import UPI_Information from "../My_Profile/UPI_Information";
import { getPageContent, myProfile } from "../api/Apis";
import MyHelmet from "./Helmet";
import Loader from './Loader';

function MyProfile() {

    const [getPageData, setPageData] = useState();

    const [getData, setData] = useState()

    /**Fetch Token */

    const token = useSelector((state) => {
      return state.token.token.data.token
    })

    useEffect(() => {
    async function fetchData() {
      try {
        const pageData = await getPageContent('my-profile');
        setPageData(pageData);

        const dataResponse = await myProfile('get-profile', token);
        // console.log(dataResponse.profile);
        setData(dataResponse.profile);

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
          <Container className='text-white'>
            <MyHelmet
              title={getPageData.title}
              description={getPageData.description}
              canonicalUrl={getPageData.canonical}
            />
            <h1 className='text-orange text-center py-4 fw-bold fs-2'>MY PROFILE</h1>
            <Personal_Information getData={getData}/>
            <Address_Information getData={getData}/>
            {/* <Social_Media_Information getData={getData}/> */}
            {/* <UPI_Information getData={getData}/> */}
            {/* <Aadhar_Informtion getData={getData}/> */}
          </Container>
        )
      }
      {
        !getPageData && (
          <Loader />
        )
      }
    </div>
  )
}

export default MyProfile
