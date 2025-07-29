"use client"
import {  useState } from "react";
import { useEffect } from "react";

export default function Home() {

    const [sections, setSections] = useState([]);

    useEffect(()=>{

    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/sort");
      const result = await res.json();
      console.log("printing the result of ",result.data)
      const chunkSize = 5;
      const chunks = [];

      for (let i = 0; i < result.data.length; i += chunkSize) {
        chunks.push(result.data.slice(i, i + chunkSize));
      }
      console.log("Printing the chunk", chunks);

      setSections(chunks);
      // const data = result.data;
      // setSections(data)

    }
    fetchData(); // fuction call baher kelayve repetedly call hot ahje

    },[])
 
    
  return (
     <div className="flex  flex-wrap  ">
        {

          sections.map((section, index) => (

          <div key={index} className="mb-5 ml-10 section">

            <h3>Section {index+1}</h3>

            <ul>
              {section.map((item, i) => (
                <li key={i} className="m">{item.name}</li>
              ))}
            </ul>
            
          </div>
          ))
        }
    </div>

  );
}
