import { prismaClient } from "../db/client";
export class SourceService {
    public static async upsert(source : {slug: string,name:string}) {
        const {slug,name} = source
        return  await prismaClient.source.upsert({select: {id : true},where: {slug},update: {name},create: {name,slug}})
    }
}