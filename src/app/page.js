
"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [sections, setSections] = useState([]);
  const [page, setPage] = useState(1);
  const [inputLimit, setInputLimit] = useState(1);
  const[limit,setLimit] = useState(1);

  //const limit = 5; 
  const [totalPages, setTotalPages] = useState(4);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/sort?page=${page}&limit=${limit}`);
        const result = await res.json();

        const chunks = [];
        for (let i = 0; i < result.data.length; i += limit) {
          chunks.push(result.data.slice(i, i + limit));
        }

        setSections(chunks);
        setTotalPages(result.totalPages);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, [page,limit]);


  // functio call
  const limitSubmitter =(e)=>{
    e.preventDefault();
    if (inputLimit > 0) {
      setLimit(inputLimit); 
      setPage(1);            
    }
  }

  return (

    <div className="p-5">

            {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Enter the limit */}
      <div className="flex gap-x-5 items-center mb-10 mt-14">
        <form onSubmit={limitSubmitter}>
          <label htmlFor="demo">Enter the Limit of page </label>
          <input
            id="demo"
            type="text"
            value={inputLimit}
            onChange={(e) => setInputLimit(Number(e.target.value))}
            className="h-10 w-14 border p-3 "

          />

          <button type="submit" className="border ml-6 px-4 py-2 rounded-2xl"> submit</button>

        </form>
      </div>

      <div className="flex flex-wrap">

        {sections.map((section, index) => (
          
          <div key={index} className="mb-5 ml-10 section">
            {/* <h3>Section {index + 1}</h3> */}

            <ul>
              {section.map((item, i) => (
                <li key={i}>{item.name}</li>
              ))}
            </ul>

          </div>
        ))}
      </div>


    </div>
  );
}
