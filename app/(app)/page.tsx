import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";
const scriptBase = "https://s3.tradingview.com/external-embedding/embed-widget";
const Home = () => {
  return (
    <div>
      <div className="flex min-h-screen home-wrapper">
        <section className="grid w-full gap-8 home-section">
          <div className="md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              title="Market overview"
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              scriptUrl={`${scriptBase}-market-overview.js`}
              className="custom-chart"
            />
          </div>
          <div className="md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              title="Stock Heatmap"
              config={HEATMAP_WIDGET_CONFIG}
              scriptUrl={`${scriptBase}-stock-heatmap.js`}
            />
          </div>
        </section>
        <section className="grid w-full gap-8 home-section">
          <div className="h-full md:col-span-1 xl:col-span-1">
            <TradingViewWidget
              config={TOP_STORIES_WIDGET_CONFIG}
              scriptUrl={`${scriptBase}-timeline.js`}
              className="custom-chart"
            />
          </div>
          <div className="md:col-span-1 xl:col-span-2">
            <TradingViewWidget
              config={MARKET_DATA_WIDGET_CONFIG}
              scriptUrl={`${scriptBase}-market-quotes.js`}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
