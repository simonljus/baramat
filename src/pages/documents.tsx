import type { Document,Image } from "@prisma/client"
import { d } from "vitest/dist/index-ea17aa0c"
import { Mosaic } from "../components/Mosaic/Mosaic"
import { DocumentService } from "../server/services/documentService"

export async function getStaticProps(){
    const docs = await DocumentService.getAll()
    console.log()
    return {props: {docs: docs.map(d=> ({...d, url: `${d.source.url || ''}${d.url}` }))} }
} 
type DocumentsProps = {
    docs: Array<Document & {image: Image}>
}
const Documents = ({docs} : DocumentsProps) =>{
    return <Mosaic documents={docs}></Mosaic>
}
export default Documents