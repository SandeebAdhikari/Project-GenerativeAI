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
          side="top"
          align="center"
          className="bg-black text-white text-sm px-2 py-1 rounded shadow-md"
        >
          {text}
          <Tooltip.Arrow className="fill-black" />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
