import type { Document, Image as ImageDB } from "@prisma/client"
import Thumbnail from "../Thumbnail/Thumbnail"
import styles from './Mosaic.module.scss'

type MosaicProps = {
    documents: Array<Document & {image: ImageDB}>
}
export const Mosaic = ({documents}: MosaicProps) => {
   
    return <div className ={styles.wrapper}>{
        documents.slice(0,6).map(d=> <div className={styles.item}key={d.id}> <Thumbnail document={d}></Thumbnail> </div>)
        }</div>
}