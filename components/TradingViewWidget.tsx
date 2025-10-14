"use client";

import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import { cn } from "@/lib/utils";
// TradingViewWidget.jsx
import React, { useRef, memo } from "react";

type TradingViewWidgetProps = {
  scriptUrl: string;
  className?: string;
  height?: number;
  config: Record<string, unknown>;
  title?: string;
};

/**
 * Render a TradingView widget container with an optional title.
 *
 * Renders a wrapper that mounts a TradingView widget (via the `useTradingViewWidget` hook),
 * optionally displays a centered title above the widget, and applies an outer class name.
 *
 * @param scriptUrl - URL of the TradingView script to load and initialize the widget
 * @param config - Configuration object passed to the TradingView widget initializer
 * @param height - Widget height in pixels (defaults to 600)
 * @param title - Optional title text displayed above the widget
 * @param className - Optional additional CSS class names applied to the widget container
 * @returns The React element containing the mounted TradingView widget and optional title
 */
function TradingViewWidget({
  scriptUrl,
  config,
  height = 600,
  title,
  className,
}: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-2xl mb-5 font-gray-100 font-semibold text-center">
          {title}
        </h3>
      )}
      <div
        className={cn("tradingview-widget-container", className)}
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: "calc(100% - 32px)", width: "100%" }}
        ></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);