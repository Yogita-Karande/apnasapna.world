import axios from "axios";
import { useEffect, useState } from "react";

function GetApi (){
    const [Posts,setPost] = useState([]);

    useEffect (()=>{
        axios.get("https://jsonplaceholder.typicode.com/users").then(response =>{
            setPost(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
    },[])

    return(
        <>
        <ul>
            {
                Posts.map(item  =>(

                    <li key={item.id}>{item.title}</li>


                ))
            }
        </ul>
        
        </>
    )

}

export default GetApi;