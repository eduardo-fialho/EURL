import LinkCard from "./LinkCard"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NewLinkCard from "./NewLinkCard";

interface LinkData {
    id: string;
    originalUrl: string;
    shortUrl: string;
    numClicks: number;
}

interface LinkListInterface {
    getMetrics: (numClicks: number, numLinks: number) => void;
}

export default function LinksList(functions: LinkListInterface) {

    const { data: session } = useSession();
    const [userLinks, setUserLinks] = useState<LinkData[]>([]);
    const [loading, setLoading] = useState(true);
    const [creatingUrl, setCreatingUrl] = useState(false);
    const [newUrl, setNewUrl] = useState<string>("");

    async function getUserLinks() {
        if(!(session as any)?.user?.id) return;
        try {
            const response = await fetch(`http://localhost:8080/url/all/${(session as any).user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${(session as any).accessToken}`,
                }
            });
            const data = await response.json();
            setUserLinks(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erro ao buscar links:", err);
            setUserLinks([]);
        }
        setLoading(false);
    }

    async function addNewLink() {
        const data = {
            userId: `${(session as any).user.id}`,
            originalUrl: newUrl 
        }
        const response = await fetch(`http://localhost:8080/url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(session as any).accessToken}`,
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const novoLink = await response.json();
            setUserLinks(prevLinks => [...prevLinks, novoLink]);
            setCreatingUrl(false); 
            setNewUrl("");
        } else {
            console.error("Erro ao salvar o link:", response.statusText);
        }
    }

    async function deleteLink(index: number) {
        const linkId = userLinks[index].id;
        const response = await fetch(`http://localhost:8080/url/${linkId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(session as any).accessToken}`,
            }
        });
        if(response.ok) {
            const newLinksList = [...userLinks];
            newLinksList.splice(index, 1);
            setUserLinks(newLinksList);
        } else {
            console.error("Erro ao deletar o link:", response.statusText);
        }
    }

    function sendMetricsData() {
        if (!Array.isArray(userLinks)) return;
        let totalNumClicks = 0;
        userLinks.forEach((e) => {
            totalNumClicks += e.numClicks;
        });
        functions.getMetrics(totalNumClicks, userLinks.length);
    }

    useEffect(() => {

        sendMetricsData();

    }, [userLinks])

    useEffect(() => {
        getUserLinks();
    }, [(session as any)?.user?.id]);

    return (
        <div className="mx-5 mb-10">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">Meus Links</h3>
                    <p className="text-neutral-500 text-sm">Gerencie e monitore seu tráfego em tempo real</p>
                </div>
                {!creatingUrl && (
                    <button 
                        onClick={() => setCreatingUrl(true)} 
                        className="px-6 py-2 rounded-xl flex items-center gap-2 bg-[var(--primary-color)] text-white hover:brightness-110 shadow-[0_4px_15px_rgba(23,182,255,0.3)] hover:scale-105 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-rounded !text-[20px]">add</span>
                        <span>Novo Link</span>
                    </button>
                )}
            </div>

            <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden bg-[var(--background-contrast-color)]/30 backdrop-blur-sm shadow-2xl">
               
                <div className="flex border-b border-[var(--border-color)] bg-[var(--background-contrast-color)]/50 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className="w-[45%] p-4">URL Original</span>
                    <span className="w-[25%] p-4">Link Curto</span>
                    <span className="w-[10%] p-4 text-center">Cliques</span>
                    <span className="w-[20%] p-4 text-center">Gerenciar</span>
                </div>

                <div className="min-h-[300px]">
                    {creatingUrl && (
                        <NewLinkCard 
                            value={newUrl} 
                            onChange={setNewUrl} 
                            onSave={addNewLink} 
                            onCancel={() => setCreatingUrl(false)} 
                        />
                    )}
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-20 text-neutral-500 gap-4">
                            <div className="w-8 h-8 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-sm font-medium animate-pulse">Buscando seus dados...</p>
                        </div>
                    ) : userLinks.length > 0 ? (
                        <div className="divide-y divide-[var(--border-color)]">
                            {userLinks.map((link, index) => (
                                <LinkCard 
                                    key={link.id} 
                                    {...link} 
                                    onRefresh={getUserLinks} 
                                    onDelete={() => deleteLink(index)} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-20 text-neutral-600 gap-3">
                            <span className="material-symbols-rounded text-5xl opacity-20">link_off</span>
                            <p className="text-sm">Você ainda não criou nenhum link encurtado.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}