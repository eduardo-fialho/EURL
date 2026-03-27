interface InputProps {
    type: string;
    placeholder: string;
    title?: string;
    className?: string;
    value?: string;
    icon?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ title, icon, ...props }: InputProps) {
    return (
        <div className={props.className}>
            {title && <label className="text-sm font-medium text-neutral-400 block mb-2 ml-1">{title}</label>}
            <div className="relative flex items-center">
                {icon && (
                    <span className="material-symbols-rounded absolute left-4 text-neutral-500 !text-[20px]">
                        {icon}
                    </span>
                )}
                <input 
                    className={`w-full bg-[#1a1c1e] border border-[var(--border-color)] text-[var(--text-color)] p-3 rounded-xl focus:outline-none focus:border-[var(--primary-color)] focus:shadow-[0_0_10px_rgba(23,182,255,0.2)] transition-all ${icon ? 'pl-12' : 'pl-4'}`}
                    {...props}
                />
            </div>
        </div>
    );
}