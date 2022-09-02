import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Document as DocumentKoket } from '../../../models/koket';
import { DocumentService } from '../../../server/services/documentService';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/koket.json', 'utf8');
    const docs = JSON.parse(fileContents) as Array<DocumentKoket>
    const ids = await addDocumetsToDB(docs)
    //Return the content of the data file in json format
    res.status(200).json({json: docs, db: ids});
}

async function addDocumetsToDB(docs: Array<DocumentKoket>) {

   return  DocumentService.createMany(docs)
}