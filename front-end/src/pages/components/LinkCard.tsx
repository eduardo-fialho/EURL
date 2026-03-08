interface LinkCardProps {
    originalUrl: string;
    shortUrl: string;
    numClicks: number;
    onRefresh: () => void;
    onDelete: () => void;
}

export default function LinkCard(props : LinkCardProps) {

    const handleClick = () => {
        setTimeout(() => {
            props.onRefresh();
        }, 500);
    };

    return (
        <div className="flex border-on-top">
            <span className="w-[45%] inline-block p-4 text-white"><a href={props.originalUrl} target="_blank">{props.originalUrl}</a></span>
            <span className="w-[25%] inline-block p-4 text-sky-400"><a href={props.shortUrl} target="_blank" onClick={handleClick}>{props.shortUrl}</a></span>
            <span className="w-[10%] inline-block p-4 text-neutral-500 text-center">{props.numClicks}</span>
            <span className="w-[20%] inline-block p-4 text-neutral-500 text-center"><button className="p-1 deletar rounded-2xl" onClick={props.onDelete}>Deletar</button></span>
        </div>
    );
}