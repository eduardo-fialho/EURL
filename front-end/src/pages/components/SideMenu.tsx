export default function SideMenu() {
    return (
        <aside className="flex flex-col h-full">
            <div className="mb-auto flex items-center">
                <img src="/link-svgrepo-com.svg" alt="Logo" className="w-12 h-12 logo mr-3 rounded-2xl p-1" />
                <h1 className="text-2xl">EURL</h1>
            </div>
            <a href=""></a>
            <div className="mt-auto flex flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-lg mr-3">
                        U
                    </div>
                    <div className="text-md">
                        User
                    </div>
                </div>
                <div>
                    <a href="/login" className="text-red-500 text-center">Sair</a>
                </div>
            </div>
        </aside>
    );
}