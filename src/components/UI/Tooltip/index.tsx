import {
  Arrow,
  Content,
  Portal,
  Provider,
  TooltipProps as RadixTTProps,
  Root,
  TooltipArrowProps,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipProviderProps,
  TooltipTriggerProps,
  Trigger,
} from "@radix-ui/react-tooltip";
import classNames from "classnames";
import React from "react";

interface TooltipProps extends RadixTTProps {
  label: string;
  children: React.ReactNode;
  side?: TooltipContentProps["side"];
  providerProps?: TooltipProviderProps;
  triggerProps?: TooltipTriggerProps;
  portalProps?: TooltipPortalProps;
  contentProps?: Omit<TooltipContentProps, "side">;
  arrowProps?: TooltipArrowProps;
  className?: string;
}

const Tooltip = ({
  children,
  label,
  arrowProps,
  contentProps,
  portalProps,
  providerProps,
  triggerProps,
  side = "top",
  delayDuration = 100,
  className,
  ...props
}: TooltipProps) => {
  return (
    <Provider {...providerProps}>
      <Root delayDuration={delayDuration} {...props}>
        <Trigger asChild {...triggerProps}>
          {children}
        </Trigger>
        <Portal {...portalProps}>
          <Content
            className={classNames(
              "rounded-lg bg-primary-3 p-3 text-xs text-white shadow duration-300 z-[999]",
              "data-[state=delayed-open]:data-[side=left]:animate-slide-left-and-fade-in",
              "data-[state=delayed-open]:data-[side=right]:animate-slide-right-and-fade-in",
              "data-[state=delayed-open]:data-[side=top]:animate-slide-top-and-fade-in",
              "data-[state=delayed-open]:data-[side=bottom]:animate-slide-bottom-and-fade-in",
              className
            )}
            sideOffset={5}
            side={side}
            {...contentProps}
          >
            <div className={classNames("flex flex-col gap-[10px]")}>
              <p className="text-white text-xs font-bold">About Us</p>
              <p className="text-white text-xs font-normal">{label}</p>
            </div>
            <Arrow className="fill-primary-3" {...arrowProps} />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
};

export default Tooltip;
