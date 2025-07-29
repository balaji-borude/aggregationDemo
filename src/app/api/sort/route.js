import connect from "@/lib/mongoConnect";

import Data from "@/lib/models/Data";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;

    const result = await Data.aggregate([
      { $sort: { name: 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    const total = await Data.countDocuments();

    return NextResponse.json(
      {
        message: "Data fetched successfully",
        data: result,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("API error: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
