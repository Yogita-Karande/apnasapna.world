import axios from "axios";
import { useState } from "react";

function PostApi (){
    const data = {firstname : "", lastname:""}

    const [usedata,setusedata] = useState(data)

    handleData = (e) =>{
        setusedata({...usedata,[e.target.name]:e.target.value})

    }

    handleDelete =(e)=>{
        try{
            e.preventDefault();
            axios.delete('https://jsonplaceholder.typicode.com//posts/1')
            .then((response)=>{
            console.log(response)
        })
        } catch (error) {
        console.error(error);
      }
    }
    return(
        <>
        <label name='firstname' value={usedata.firstname}>Name</label>
        <input onChange={handleData}></input>
        <button onSubmit={handleDelete}>Delete</button>
        </>
    )

}

export default PostApi;