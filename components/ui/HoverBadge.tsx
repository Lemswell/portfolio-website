import react from 'react';

interface WindowProps {
  trigger: React.ReactNode;  // The thing you hover
  content: React.ReactNode;  // The thing that pops up
}

const HoverBadge = ({ trigger, content }: WindowProps) => {
  return (
    <div className="group relative inline-block">
      <div className="trigger">{trigger}</div>
      <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 
                      group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto duration-100">
        <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rotate-45 border-l border-t border-zinc-700/50 bg-zinc-800 z-1" />
        <div className="relative w-max rounded-sm border border-zinc-700/50 bg-zinc-800 px-2 py-1 text-sm shadow-xl z-0 font-medium whitespace-pre-line tracking-[0.001em]">
          {content}
        </div>
      </div>
    </div>
  );
};

export default HoverBadge;