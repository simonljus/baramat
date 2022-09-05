import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Document as DocumentKoket } from '../../../models/koket';
import { DocumentService } from '../../../server/services/documentService';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST'){
        res.status(405).send({ message: 'Only POST' })
        return
    }
    const {password} =req.body || {}
    if(!password){
        res.status(400).send({ message: 'credentials missing' })
        return
    }
    if(!process.env.CRON_PASSWORD){
        res.status(500).send({ message: 'invalid config' })
        return
    }
    if(password !== process.env.CRON_PASSWORD ){
        res.status(400).send({ message: 'not authorized' })
        return
    }
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