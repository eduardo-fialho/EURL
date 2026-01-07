import SideMenu from "./components/SideMenu";
import Metrics from "./components/Metrics";
import LinksList from "./components/LinksList";

export default function dashboard() {
    return (
        <div className="default-theme flex">
                <SideMenu />
                <div className="h-full w-full">
                    <Metrics />
                    <LinksList />
                </div>
        </div>
    );
}