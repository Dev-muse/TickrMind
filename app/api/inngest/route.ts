import { serve } from "inngest/next";
import { inngest } from "@/lib/ingest/client";
import { sendDailyNewsSummary, sendSignUpEmail } from "@/lib/ingest/functions";
 

// ingest runs background jobs , we expose these via nextjs api
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions:[sendSignUpEmail , sendDailyNewsSummary]
});
