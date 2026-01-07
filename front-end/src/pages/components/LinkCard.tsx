export default function LinkCard() {
    return (
        <div className="flex border-on-top">
            <span className="w-[45%] inline-block p-4 text-white"><a href="#">urlmuitolongaqueehlongademais.com</a></span>
            <span className="w-[25%] inline-block p-4 text-sky-400"><a href="">urlcurta.com</a></span>
            <span className="w-[10%] inline-block p-4 text-neutral-500 text-center">14</span>
            <span className="w-[20%] inline-block p-4 text-neutral-500 text-center"><button className="p-1 deletar rounded-2xl">Deletar</button> | <button className="p-1 copiar rounded-2xl text-neutral-500">Copiar</button></span>
        </div>
    );
}