import MetricCard from "./MetricCard";

interface MetricsInterface {
    numLinks: number;
    numClicks: number;
}

export default function Metrics({ numLinks, numClicks }: MetricsInterface) {

    const mediaCliques = numLinks > 0 ? (numClicks / numLinks).toFixed(1) : "0";

    return (
        <div className="h-auto mb-8 mx-5">
            <div className="mt-3 mb-5">   
                <h3 className="text-2xl font-bold tracking-tight">Estatísticas</h3>
                <p className="text-neutral-500 text-sm">Acompanhe o desempenho dos seus links</p>
            </div>
            <div className="flex gap-4 items-stretch">
                <MetricCard title="Total de Links" value={numLinks} icon="link" />
                <MetricCard title="Total de Cliques" value={numClicks} icon="ads_click" />
                <MetricCard title="Média de Cliques" value={mediaCliques} icon="leaderboard" />
            </div>
        </div>
    );
}