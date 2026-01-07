import MetricCard from "./MetricCard";

export default function Metrics() {
    return (
        <div className="h-[25%] mx-5 w-auto">
            <div className="mt-3">   
                <h3 className="text-2xl font-semibold">Métricas</h3>
                <p className="text-neutral-500">Gerencie seus resultados</p>
            </div>
            <div className="flex justify-between h-[75%] items-center ">
                <MetricCard title="Total de Links" value={5} />
                <MetricCard title="Total de Cliques" value={800} />
                <MetricCard title="Média de Cliques" value={200} />
                <MetricCard title="Crescimento de Cliques" value={"10%"} />
            </div>
        </div>
    );
}