import { ArrowRightFromLine, AlertTriangle } from "lucide-react";

interface SRProps {
  toggle: () => void;
}
export default function SideBarRight(props: SRProps) {
  return (
    <div className="flex flex-col w-[200px] min-w-[200px] h-full border-l border-neutral-200 bg-neutral-100">
      <div className="h-[5%] flex items-center px-3 justify-between">
        <button onClick={props.toggle}>
          <ArrowRightFromLine size={18} />
        </button>
      </div>
      <div className="grow flex px-3 text-neutral-400 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div>
            <AlertTriangle size={24} />
          </div>
          <p>Settings Comming Sooon...</p>
        </div>
      </div>
    </div>
  );
}
