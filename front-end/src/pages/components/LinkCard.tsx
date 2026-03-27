import { useState } from "react";

interface LinkCardProps {
    originalUrl: string;
    shortUrl: string;
    numClicks: number;
    onRefresh: () => void;
    onDelete: () => void;
}

export default function LinkCard(props: LinkCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center border-b border-[var(--border-color)] last:border-0 hover:bg-white/[0.03] transition-all group px-2">
            <span className="w-[45%] p-4 truncate text-sm text-neutral-400 group-hover:text-neutral-200">
                <a href={props.originalUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--primary-color)]">
                    {props.originalUrl}
                </a>
            </span>
            
            <span className="w-[25%] p-4 flex items-center gap-2">
                <a href={props.shortUrl} target="_blank" rel="noreferrer" className="text-[var(--primary-color)] font-medium text-sm hover:underline truncate">
                    {props.shortUrl.replace(/^https?:\/\//, '')}
                </a>
                <button onClick={handleCopy} className="p-1 rounded-md hover:bg-[var(--primary-color)]/10 text-neutral-600 hover:text-[var(--primary-color)] transition-colors">
                    <span className="material-symbols-rounded !text-[16px]">
                        {copied ? 'check' : 'content_copy'}
                    </span>
                </button>
            </span>

            <span className="w-[10%] p-4 text-center font-mono text-neutral-500 text-xs flex items-center justify-center gap-1.5">
                <span className="material-symbols-rounded text-[14px]! opacity-70">touch_app</span> 
                {props.numClicks}
            </span>

            <span className="w-[20%] p-4 text-center flex justify-center gap-1">
                <button 
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-neutral-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100" 
                    title="Excluir" 
                    onClick={props.onDelete}
                >
                    <span className="material-symbols-rounded text-[18px]!">delete</span>
                </button>
                <button 
                    className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-600 hover:text-white transition-all opacity-0 group-hover:opacity-100" 
                    title="Detalhes"
                >
                    <span className="material-symbols-rounded text-[18px]!">open_in_new</span>
                </button>
            </span>
        </div>
    );
}