import Image from "next/image";
import type {Document as DocumentDB, Image as ImageDB} from "@prisma/client"
import styles from './Thumbnail.module.scss'
type ThumbnailProps={
    document: DocumentDB & {image: ImageDB}
}
const Thumbnail = ({document}: ThumbnailProps) =>{
    return <> 
    <Image objectFit="cover" layout="fill" alt={document.name}  src={document.image.url} />
    <p className={styles.text}>{document.name}</p>
    <p className={styles.sponsored}>Sponsrat</p>
    </>
}
export default Thumbnail;