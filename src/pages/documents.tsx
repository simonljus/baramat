import type { Document,Image } from "@prisma/client"
import { Mosaic } from "../components/Mosaic/Mosaic"
import { DocumentService } from "../server/services/documentService"
import { shuffle } from "../utils/ObjectUtil"

export async function getServerSideProps(){
    const docs = await DocumentService.getAll()
    const shuffled = shuffle(docs)
    return {props: {docs: shuffled.map(d=> ({...d, url: `${d.source.url || ''}${d.url}` }))} }
} 
type DocumentsProps = {
    docs: Array<Document & {image: Image}>
}
const Documents = ({docs} : DocumentsProps) =>{
    return <Mosaic documents={docs}></Mosaic>
}
export default Documents