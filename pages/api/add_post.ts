import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();
  const body = JSON.parse(req.body);
  const post = await db.collection("posts").insertOne({
    title: body.title,
    author: body.author,
    content: body.content,
  });
  res.status(200).json({ post });
}
