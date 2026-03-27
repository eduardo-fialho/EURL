export default function Header() {
    return (
        <header className="flex items-center p-6 lg:px-12 bg-transparent">
            <div className="flex items-center gap-3">
                <div className="bg-[var(--primary-color)] p-1.5 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-rounded text-white !text-[24px]">link</span>
                </div>
                <h1 className="text-2xl font-black tracking-tighter text-[var(--text-color)]">EURL</h1>
            </div>
        </header>
    );
}