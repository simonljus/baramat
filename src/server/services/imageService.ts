import { PhotographerService } from "./photograhperService"
import { prismaClient } from "../db/client";
import { batch, mapBy, unique } from "../../utils/ObjectUtil";
export class ImageService{
    public static async upsertMany(images: Array<{name: string, photographer: string, url:string}>){
        const uniqueImages = unique(images,i=> i.url)
        const photographers = await PhotographerService.upsertMany(uniqueImages.map(i=> i.photographer));
        const nameMap = mapBy(photographers,p=> p.name)
        const queries = uniqueImages.map(image=> prismaClient.image.upsert(
            {select:  {url:true,id:true},where:{url : image.url}, 
            update: {name: image.name, photographerId: nameMap.get(image.photographer)?.id || ''},
            create: {name:image.name,photographerId: nameMap.get(image.photographer)?.id || '', url: image.url}}))
        const batches = batch(queries,10).map(b=> prismaClient.$transaction(b))
        return (await Promise.all(batches)).flat()
    }
}