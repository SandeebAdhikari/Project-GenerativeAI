import * as Tooltip from "@radix-ui/react-tooltip";

import { ReactNode } from "react";

interface TooltipComponentProps {
  children: ReactNode;
  text: string;
}

const TooltipComponent = ({ children, text }: TooltipComponentProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Content
          side="bottom"
          align="center"
          className="h-full w-full bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-300 text-black text-sm px-2 py-1  shadow-md"
        >
          {text}
          <Tooltip.Arrow className="fill-white" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
