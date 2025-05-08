
import { Tag } from '../ui/tag';

interface TechnologyTagsProps {
  tags: string[];
}

export default function TechnologyTags({ tags }: TechnologyTagsProps) {
    if (!tags || tags.length === 0) return null;

    return (
         <div className="
        bg-[#1B1B22]               
        rounded-xl               
        px-6 py-5                  
        flex                       
        flex-col                   
        items-start                
        gap-4                     
        self-stretch              
      ">
            <h3 className="text-sm font-semibold text-white  tracking-wider">Technologies</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        </div>
    );
}