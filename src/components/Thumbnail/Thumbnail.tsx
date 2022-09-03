import Image from "next/image";
import type {Document as DocumentDB, Image as ImageDB} from "@prisma/client"
type ThumbnailProps={
    document: DocumentDB & {image: ImageDB}
}
const Thumbnail = ({document}: ThumbnailProps) =>{
    return <> 
    <Image objectFit="cover" layout="fill" alt={document.name}  src={document.image.url} />
    <p className="text"></p>
    </>
}
export default Thumbnail;