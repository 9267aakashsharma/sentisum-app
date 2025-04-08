import { cn } from "@heroui/react";
import Icon from "./icons/icon";

const SlackButton = ({
  text = "Triage to Slack",
  onClick,
  className,
}: {
  text?: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-tiny group border border-primary/30 bg-primary-50 text-primary overflow-hidden h-7 px-3 rounded-lg min-w-16 relative",
        className
      )}
    >
      <div className="absolute rounded-lg inset-0 overflow-hidden z-[1]">
        <div
          className={cn(
            "h-3 w-3 absolute rounded-full bottom-1  right-8",
            "group-hover:-translate-x-4 group-hover:-translate-y-1 transition-transform duration-200 ease-in-out"
          )}
          style={{
            backgroundColor: "#E01E5A",
          }}
        />
        <div
          className={cn(
            "h-3 w-3 absolute rounded-full top-0 right-2",
            "group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-200 ease-in-out"
          )}
          style={{
            backgroundColor: "#36C5F0",
          }}
        />
        <div
          className={cn(
            "h-3 w-3 absolute rounded-full top-1 left-6",
            "group-hover:-translate-x-3 group-hover:translate-y-1 transition-transform duration-200 ease-in-out"
          )}
          style={{
            backgroundColor: "#2EB67D",
          }}
        />
        <div
          className={cn(
            "h-3 w-3 absolute rounded-full bottom-1 left-2",
            "group-hover:translate-x-8 group-hover:translate-y-2.5 transition-transform duration-200 ease-in-out"
          )}
          style={{
            backgroundColor: "#ffcc00",
          }}
        />
      </div>
      <div className="absolute inset-0 z-[2] bg-neutral-100/5 backdrop-blur-md"></div>
      <div className="z-10 relative h-full inline-flex gap-2 items-center">
        <Icon
          name="brand.slack"
          size={14}
          className="-mr-1 group-hover:scale-110 transition-transform duration-200 ease-in-out"
        />
        <span>{text}</span>
      </div>
    </button>
  );
};

export default SlackButton;
