import { batch } from "../../utils/ObjectUtil";
import { prismaClient } from "../db/client";

export class PhotographerService{
    public static async upsertMany(names: Array<string>){
        const uniqueNames = Array.from(new Set(names));
        const existingEntities = await prismaClient.photographer.findMany({select: {id: true, name:true}, where: {name: {in: uniqueNames}}})
        const existingNames =  new Set(existingEntities.map(n=> n.name))
        const createQueries = uniqueNames.filter(n=> !existingNames.has(n)).map(n=> prismaClient.photographer.create({select : {id:true, name:true},data:{name: n}}))
        const batches = batch(createQueries,10)
        const created = (await Promise.all(batches.map(b=> prismaClient.$transaction(b)))).flat()
        return await created.concat(existingEntities)

    }
}