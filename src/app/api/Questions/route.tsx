import { NextResponse } from "next/server";
import { pool } from "@/utils/dbConnect";

export const POST = async (req: Request, res: Response) => {
  const { notice, written_on } = await req.json();
  try {
    const newNotice = await pool.query(
      `INSERT INTO notices (notice, written_on) VALUES ($1, $2) RETURNING *`,
      [notice, written_on]
    );
    console.log(newNotice.rows[0]);
    return NextResponse.json({ status: "OK", newNotice });
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
    const data = await pool.query(`SELECT * FROM notices`);
    const notices = data.rows;
    console.log(notices)
    return NextResponse.json(notices)
  } catch (error) {
    console.log(error)
    NextResponse.json(error)
  }
};
