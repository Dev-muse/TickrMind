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
