interface NewLinkCardProps {
    value: string;
    onChange: (newValue: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function NewLinkCard({ value, onChange, onSave, onCancel }: NewLinkCardProps) {
    return (
        <div className="flex items-center p-4 bg-(--background-contrast-color) border-t border-(--primary-color) animate-in fade-in slide-in-from-top-2">
            <div className="w-[80%] p-4">
                <input 
                    type="text" 
                    className="flex-1 p-2 rounded-lg mr-4"
                    placeholder="Cole sua URL aqui..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="w-[20%] flex gap-2 justify-center p-4">
                <button 
                    onClick={onSave}
                    className="px-4 py-2 rounded-lg text-sm bg-(--primary-color)"
                >
                    Salvar
                </button>
                <button 
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg text-sm bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}