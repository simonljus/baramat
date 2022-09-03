
import { Document as DocumentKoket } from "../../models/koket";
import { batch, mapBy } from "../../utils/ObjectUtil";
import { prismaClient } from "../db/client";
import { ImageService } from "./imageService";
import { SourceService } from "./sourceService";
export class DocumentService{
    public static async createMany(docs: Array<DocumentKoket>){
        const sourceDB = await SourceService.upsert({slug: 'koketse',name: 'Köket.se', url: 'https://www.koket.se'})
        const imageDB = await ImageService.upsertMany(docs.map(d=> d.image));
        const imageMap= mapBy(imageDB,i=> i.url)
        const queries = docs.map(doc=> {
            const data = {
                sourceId: sourceDB.id,
                sourceDocumentId : doc.id + '',
                name: doc.name,
                type: doc.type,
                sponsored: doc.sponsored,
                description: doc.description,
                imageId: imageMap.get(doc.image.url)?.id || '',
                url: doc.url
            }
            return prismaClient.document.upsert({select: {id: true}, where: {sourceDocumentId_sourceId: {sourceDocumentId: data.sourceDocumentId,sourceId: data.sourceId}}, create: data, update: data})
        }) 
        const batches = batch(queries,10)
        const transactions = batches.map(b=> prismaClient.$transaction(b))
        return (await Promise.all(transactions)).flat()
    }
    public static async getAll(){
        const docs = await prismaClient.document.findMany({select: {
            id:true,
            source: {select: {id: true,name:true, url:true}},
            name: true,
            type: true, 
            url: true,
            sponsored: true,
            description:true,
            image: {
                select: {url: true, photographer: {select: {name: true}}}
            }
        }})
        return docs
    }
   
}