import LinkCard from "./LinkCard"

export default function LinksList() {
    return (
        <div className="h-max-[75%] w-auto mx-5">
            <div>   
                <h3 className="text-2xl font-semibold">Meus Links Encurtados</h3>
                <p className="text-neutral-500">Gerencie todos os seus links criados</p>
            </div>
            <div className="rounded-2xl all-borders mt-5 h-[90%]">
                <div>
                    <span className="w-[45%] inline-block p-4 text-neutral-500">URL Original</span>
                    <span className="w-[25%] inline-block p-4 text-neutral-500">URL Encurtada</span>
                    <span className="w-[10%] inline-block p-4 text-neutral-500 text-center">Cliques</span>
                    <span className="w-[20%] inline-block p-4 text-neutral-500 text-center">Ações</span>
                </div>
                <LinkCard />
                <LinkCard />
                <LinkCard />
            </div>
        </div>
    )
}