import React from "react";
import { useEffect,useState } from "react";

function JobListing(){
    const [list,setlist]=useState({})
    useEffect(()=>{
        fetch('')
        .then(r=>r.json())
        .then(data=>setlist(data))
    },[])
    return(
        <div>
            <h2>Job lisings</h2>
            {list.map((job)=>{
                return(
                    <div key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>{job.requirements}</p>
                    </div>
                    
                )
            })}
        </div>
    )
}
export default JobListing;