import Image from "next/image";
import type {Document as DocumentDB, Image as ImageDB} from "@prisma/client"
import styles from './Thumbnail.module.scss'
type ThumbnailProps={
    doc: DocumentDB & {image: ImageDB}
}
const Thumbnail = ({doc}: ThumbnailProps) =>{
    return <a href={doc.url} rel="noreferrer" target="_blank"> 
    <Image objectFit="cover" layout="fill" alt={doc.name}  src={doc.image.url} />
    <p className={styles.text}>{doc.name}</p>
    {doc.sponsored && <p className={styles.sponsored}>Sponsrat</p>}
    </a>
}
export default Thumbnail;