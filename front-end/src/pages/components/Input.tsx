interface InputProps {
    type: string;
    placeholder: string;
    title?: string;
    className?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props : InputProps) {
    return (
        <div className={props.className}>
            {props.title && <label className="text-[1em] block mb-2">{props.title}</label>}
            <input className="w-full p-3 rounded-xl" 
            type={props.type} 
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            />
        </div>
    )
}