import { marked } from "marked";
import { remark } from "remark";
import sanitizeHtml, { AllowedAttribute } from "sanitize-html";
import strip from 'strip-markdown'

export class StringUtil{
    public static convertMarkdownToHtml(markdown?: string,allowedAttributes?: Record<string,Array<AllowedAttribute>>){
        if(!markdown){
            return ''
        }
        const mergedAllowedAttributes = {...sanitizeHtml.defaults.allowedAttributes}
        const allowedTags = Object.keys(allowedAttributes || {});
        const mergedAllowedTags = sanitizeHtml.defaults.allowedTags.concat(allowedTags)
        if(allowedAttributes){
            for(const tag of allowedTags){
                if (tag in mergedAllowedAttributes){
                    const attributes = allowedAttributes[tag] || []
                    const current = mergedAllowedAttributes[tag] || []
                    mergedAllowedAttributes[tag]= current?.concat(attributes)
                }else{
                    mergedAllowedAttributes[tag] = allowedAttributes[tag] || []
                }
            }
        }
        
        return sanitizeHtml(marked.parse(markdown),{allowedAttributes:mergedAllowedAttributes ,allowedTags: mergedAllowedTags }).trim()
    }
    public static convertMarkdownToText(markdown?: string){
        if(!markdown){
            return '';
        }
        const str = remark().use(strip).processSync(markdown)
        return String(str).replaceAll("\n"," ").trim()
    }
}
