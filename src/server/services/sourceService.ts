import { prismaClient } from "../db/client";
export class SourceService {
    public static async upsert(source : {slug: string,name:string, url:string}) {
        const {slug,name,url} = source
        return  await prismaClient.source.upsert({select: {id : true},where: {slug},update: {name,url},create: {name,slug,url}})
    }
}