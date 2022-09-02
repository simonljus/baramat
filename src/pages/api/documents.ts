import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../server/db/client";
export default async function handler(req: NextApiRequest,res:NextApiResponse){
    const docs = await prismaClient.document.findMany({select: {
        id:true,
        source: {select: {id: true,name:true}},
        name: true,
        type: true, 
        url: true,
        sponsored: true,
        description:true,
        image: {
            select: {url: true, photographer: {select: {name: true}}}
        }
    }})
    res.status(200).json(docs)
}