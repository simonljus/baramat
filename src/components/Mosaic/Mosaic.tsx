import type { Document, Image as ImageDB } from "@prisma/client"
import Thumbnail from "../Thumbnail/Thumbnail"
import styles from './Mosaic.module.scss'

type MosaicProps = {
    documents: Array<Document & {image: ImageDB}>
}
export const Mosaic = ({documents}: MosaicProps) => {
   
    return <div className ={styles.wrapper}>{
        documents.slice(0,6).map(doc=> <div className={styles.item}key={doc.id}> <Thumbnail doc={doc}></Thumbnail> </div>)
        }</div>
}