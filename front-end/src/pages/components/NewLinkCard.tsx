interface NewLinkCardProps {
    value: string;
    onChange: (newValue: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function NewLinkCard({ value, onChange, onSave, onCancel }: NewLinkCardProps) {
    return (
        <div className="flex w-full items-center border-on-top bg-neutral-900/50">
            <div className="w-[80%] p-4">
                <input 
                    type="text" 
                    className="w-full p-2 rounded outline-none text-white"
                    placeholder="Cole sua URL aqui..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="w-[20%] flex gap-2 justify-center p-4">
                <button 
                    onClick={onSave}
                    className="flex-1 p-2 !bg-blue-500 text-white rounded-xl text-sm font-medium hover:!bg-blue-600 transition-colors"
                >
                    Salvar
                </button>
                <button 
                    onClick={onCancel}
                    className="flex-1 p-2 !bg-red-500 text-white rounded-xl text-sm font-medium hover:!bg-red-600 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}