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
        const response = await fetch(`http://localhost:8080/url/all/${(session as any).user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${(session as any).accessToken}`,
            }
        });
        const data = await response.json();
        setUserLinks(data);
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
        let totalNumClicks = 0;
        userLinks.forEach((e) => {
            totalNumClicks += e.numClicks;
        });
        functions.getMetrics(totalNumClicks, userLinks.length);
    }

    function creatingNewUrl() {
        setCreatingUrl(true);
    }

    useEffect(() => {

        sendMetricsData();

    }, [userLinks])

    useEffect(() => {
        getUserLinks();
    }, [(session as any)?.user?.id]);

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
                {
                    loading ? 
                    (<p className="p-4 text-center">Carregando...</p>) : userLinks.length > 0 ?
                    (userLinks.map(
                        (link, key) => (
                            <LinkCard key={key} originalUrl={link.originalUrl} shortUrl={link.shortUrl} numClicks={link.numClicks} onRefresh={getUserLinks} onDelete={() => deleteLink(key)}/>
                        )
                    )) :
                    (<p className="p-4 text-center text-neutral-500">Nenhum link encontrado.</p>)
                }
                {creatingUrl && <NewLinkCard value={newUrl} onChange={setNewUrl} onSave={addNewLink} onCancel={() => {setCreatingUrl(false); setNewUrl("");}}/>}
            </div>
            {!creatingUrl && (
                <div className="flex justify-end mt-[0.5%]">
                    <button onClick={creatingNewUrl} className="w-[10%] rounded-xl p-3">Adicionar</button>
                </div>
            )}
        </div>
    )
}