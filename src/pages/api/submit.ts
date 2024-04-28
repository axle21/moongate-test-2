// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Log the body to simulate saving the data
    console.log("Received data:", req.body);

    // Send a response back to the client
    res.status(200).json({ message: "Form data received successfully!" });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(500).end(`Somthing went Wrong`);
  }
}
