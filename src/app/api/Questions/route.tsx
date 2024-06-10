import { NextResponse } from "next/server";
import { pool } from "@/utils/dbConnect";

export const POST = async (req: Request, res: Response) => {
  const { testName, questionset } = await req.json();
  try {
    const questionsetString = JSON.stringify(questionset);

    const newTest = await pool.query(
      `INSERT INTO questions (testName, questionset) VALUES ($1, $2::jsonb) RETURNING *`,
      [testName, questionsetString]
    );
    console.log(newTest.rows[0]);
    return NextResponse.json({ status: "OK", newTest });
  } catch (error) {
    return NextResponse.json(
        {
          message: "Error",
          error,
        },
        {
          status: 500,
        }
      );
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    const data = await pool.query(`SELECT * FROM questions`);
    const questionSet = data.rows;
    console.log(questionSet)
    return NextResponse.json(questionSet)
  } catch (error) {
    console.log(error)
    NextResponse.json(error)
  }
};
