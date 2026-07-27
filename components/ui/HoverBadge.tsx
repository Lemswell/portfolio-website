interface WindowProps {
  trigger: React.ReactNode; // The thing you hover
  content: React.ReactNode; // The thing that pops up
  contentClassName?: string;
  pointer?: boolean;
  loc?: string;
}

const HoverBadge = ({ trigger, content, contentClassName, pointer, loc }: WindowProps) => {
  // todo: make more versitile
  if (pointer === undefined) pointer = false;
  if (loc === undefined) loc = "bottom";

  const contentClasses =
    contentClassName ??
    "rounded-sm border border-zinc-700/50 bg-zinc-800 px-2 py-1 text-sm shadow-xl z-0 font-medium whitespace-pre-line tracking-[0.001em]";

  // make function to get pointer class from border and bg of content class?

  const assignLocClass = (loc: string) => {
    if (loc === "top")
      return ["bottom-full left-1/2 -translate-x-1/2 pb-2", "bottom-1 left-1/2 -translate-x-1/2 rotate-225"];
    // if (loc === "left")
    //   return ["right-full", "left-full"];
    // if (loc === "right")
    //   return ["left-full", "right-full"];
    return ["top-full left-1/2 -translate-x-1/2 pt-2", "top-1 left-1/2 -translate-x-1/2 rotate-45"];
  };

  const [locClass, pointerClass] = assignLocClass(loc);


  return (
    <div className="group relative inline-block">
      <div className="trigger">{trigger}</div>
      <div
        className={`
          absolute ${locClass} opacity-0
          group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto duration-100
        `}
      >
        {pointer && <div className={`absolute h-2 w-2 ${pointerClass} border-l border-t border-zinc-700/50 bg-zinc-800 z-1`} />}
        <div className={`relative w-max ${contentClasses}`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default HoverBadge;
