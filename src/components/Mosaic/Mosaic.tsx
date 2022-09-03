import type { Document, Image as ImageDB } from "@prisma/client"
import Image from "next/image"
import styles from './Mosaic.module.scss'

type MosaicProps = {
    documents: Array<Document & {image: ImageDB}>
}
export const Mosaic = ({documents}: MosaicProps) => {
   
    return <div className ={styles.wrapper}>{
        documents.slice(0,6).map(d=> <div className={styles.item}key={d.id}><Image objectFit="cover" layout="fill" alt={d.name}  src={d.image.url} /> </div>)
        }</div>
}