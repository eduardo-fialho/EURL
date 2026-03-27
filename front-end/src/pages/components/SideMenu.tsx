export default function SideMenu() {
    return (
        <aside className="flex flex-col h-screen border-r border-(--border-color) p-6 bg-(--background-contrast-color)">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="p-2 rounded-xl bg-(--primary-color) flex items-center justify-center shadow-[0_0_20px_rgba(23,182,255,0.3)]">
                    <span className="material-symbols-rounded text-white">link</span>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-(--text-color) text-nowrap">EURL</h1>
            </div>

            <nav className="flex-1 space-y-1">
                <NavItem icon="dashboard" label="Dashboard" active />
                <NavItem icon="bar_chart" label="Estatísticas" />
                <NavItem icon="link" label="Meus Links" />
                <NavItem icon="settings" label="Configurações" />
            </nav>

            <div className="pt-6 border-t border-(--border-color)">
                <a href="/login" className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium group">
                    <span className="material-symbols-rounded group-hover:translate-x-1 transition-transform">logout</span>
                    <span className="text-sm">Sair</span>
                </a>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-(--primary-color)/10 text-(--primary-color) border border-(--primary-color)/20' : 'text-neutral-500 hover:bg-white/5 hover:text-neutral-200'}`}>
            <span className="material-symbols-rounded text-[20px]">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}