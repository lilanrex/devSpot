// src/components/profile/TechnologyTags.tsx
import { Tag } from '../ui/tag';

interface TechnologyTagsProps {
  tags: string[];
}

export default function TechnologyTags({ tags }: TechnologyTagsProps) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Technologies</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        </div>
    );
}