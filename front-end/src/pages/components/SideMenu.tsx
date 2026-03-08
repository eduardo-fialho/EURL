export default function SideMenu() {
    return (
        <aside className="flex flex-col h-full">
            <div className="mb-auto flex items-center">
                <img src="/link-svgrepo-com.svg" alt="Logo" className="w-12 h-12 logo mr-3 rounded-2xl p-1" />
                <h1 className="text-2xl">EURL</h1>
            </div>
            <a href=""></a>
            <div className="mt-auto flex flex-col justify-center">
                <div className="w-full flex justify-center">
                    <a href="/login" className="w-[80%] p-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors text-center">Sair</a>
                </div>
            </div>
        </aside>
    );
}