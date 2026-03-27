interface MetricCardProps { 
    title: string; 
    value: string | number; 
    icon: string; 
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
    return (
        <div className="metrics-card p-5 rounded-2xl border border-(--border-color) flex flex-col flex-1 mx-2 first:ml-0 last:mr-0 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-rounded text-(--primary-color) bg-(--primary-color)/10 p-2 rounded-lg">
                    {icon}
                </span>
            </div>
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest">{title}</h3>
            <p className="text-3xl font-bold mt-1 text-(--text-color)">{value}</p>
            <span className="material-symbols-rounded absolute -right-4 -bottom-4 text-8xl opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                {icon}
            </span>
        </div>
    );
}