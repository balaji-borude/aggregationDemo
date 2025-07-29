import connect from "@/lib/mongoConnect";

import Data from "@/lib/models/Data";
import { NextResponse } from "next/server";

export async function GET(req){

    try {

        await connect(); 

        const page = 1;       
        const limit = 50; // we have to use params to get the page and limit 


         const result = await Data.aggregate([
            { $sort: { name: 1 } },                 
            { $skip: (page - 1) * limit },
            { $limit: limit }
            ]); 
``
        return NextResponse.json(
        { 
            message: "Data fetched successfully" ,
            data: result,
        },
        { status: 200 });

    } catch (error) {
        console.log("error while Sorting By Name ",error);
    }


}

