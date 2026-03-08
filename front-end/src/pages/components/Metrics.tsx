import MetricCard from "./MetricCard";

interface MetricsInterface {
    numLinks: number;
    numClicks: number;
}

export default function Metrics(values: MetricsInterface) {
    return (
        <div className="h-[25%] mx-5 w-auto">
            <div className="mt-3">   
                <h3 className="text-2xl font-semibold">Métricas</h3>
                <p className="text-neutral-500">Gerencie seus resultados</p>
            </div>
            <div className="flex justify-between h-[75%] items-center ">
                <MetricCard title="Total de Links" value={values.numLinks} />
                <MetricCard title="Total de Cliques" value={values.numClicks} />
                <MetricCard title="Média de Cliques" value={values.numLinks > 0 ? (values.numClicks / values.numLinks) : 0} />
            </div>
        </div>
    );
}