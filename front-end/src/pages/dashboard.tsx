import SideMenu from "./components/SideMenu";
import Metrics from "./components/Metrics";
import LinksList from "./components/LinksList";
import { useState } from "react";

export default function dashboard() {
    
    const [numClicks, setNumClicks] = useState(0);
    const [numLinks, setNumLinks] = useState(0);

    function getMetrics(numClicks: number, numLinks: number) {
        setNumClicks(numClicks);
        setNumLinks(numLinks);
    }

    return (
        <div className="default-theme flex">
                <SideMenu />
                <div className="h-full w-full">
                    <Metrics numClicks={numClicks} numLinks={numLinks} />
                    <LinksList getMetrics={getMetrics}/>
                </div>
        </div>
    );
}