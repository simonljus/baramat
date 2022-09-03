import Image from "next/image";
import type {Document as DocumentDB, Image as ImageDB} from "@prisma/client"
import styles from './Thumbnail.module.scss'
type ThumbnailProps={
    doc: DocumentDB & {image: ImageDB}
}
const Thumbnail = ({doc}: ThumbnailProps) =>{
    return <a className={styles.thumbnail} href={doc.url} rel="noreferrer" target="_blank"> 
    <Image className={styles.image} objectFit="cover" layout="fill" alt={doc.name}  src={doc.image.url} />
    {doc.sponsored && <p className={styles.sponsored}>Sponsrat</p>}
    <p className={styles.text}>{doc.name}</p>
    {doc.description && <p className={styles.description}>{doc.description}</p>}
    </a>
}
export default Thumbnail;