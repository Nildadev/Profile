import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
    content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const [activeId, setActiveId] = useState<string>('');
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        // Parse markdown for headers
        const lines = content.split('\n');
        const extractedHeadings = lines
            .filter(line => line.startsWith('#') && (line.match(/^#{2,3}\s/) !== null))
            .map(line => {
                const level = line.match(/^#{2,3}/)?.[0].length || 2;
                const text = line.replace(/^#+\s+/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return { id, text, level };
            });
        setHeadings(extractedHeadings);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0px -80% 0px' }
        );

        extractedHeadings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [content]);

    if (headings.length === 0) return null;

    return (
        <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Mục lục</h4>
            <div className="flex flex-col space-y-2">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`
              text-xs transition-all duration-300 border-l-2 pl-4 py-1
              ${heading.level === 3 ? 'ml-4' : ''}
              ${activeId === heading.id
                                ? 'border-brand-primary text-brand-primary font-bold'
                                : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'}
            `}
                    >
                        {heading.text}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TableOfContents;
