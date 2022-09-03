import { NextApiRequest, NextApiResponse } from "next";
import { DocumentService } from "../../server/services/documentService";
export default async function handler(req: NextApiRequest,res:NextApiResponse){
    const docs = await DocumentService.getAll()
    res.status(200).json(docs)
}