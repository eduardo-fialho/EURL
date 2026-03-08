interface MetricCardProps {
    title: string;
    value: string | number;
}

export default function MetricCard(props: MetricCardProps) {
    return (
        <div className="metrics-card p-6 rounded-xl flex flex-col h-[70%] w-[15%] justify-around">
            <h3 className="text-sm text-neutral-500 mr-auto">{props.title}</h3>
            <p className="text-3xl mr-auto">{props.value}</p>
        </div>
    );
}