import {Trash2} from "lucide-react";

const StickyControls = () => {
    return (
        <div className={"flex w-full h-16 top-0 sticky drop-shadow-2xl bg-slate-600"}>
           <Trash2 className={"w-6 h-6 text-red-400"} />
        </div>
    );
}

export default StickyControls;