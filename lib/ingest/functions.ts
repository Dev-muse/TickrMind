import { inngest } from "@/lib/ingest/client";
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "./prompts";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "../nodemailer";
import { getAllUsersForNewsEmail } from "../actions/user.actions";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.actions";
import { getNews } from "../actions/finnhub.actions";
import { getFormattedTodayDate } from "../utils";

export const sendSignUpEmail = inngest.createFunction(
  {
    id: "sign-up-email",
    name: "Send Sign-Up Email",
  },
  {
    event: "app/user.created", // make sure this matches the published event
  },
  async ({ event, step }) => {
    try {
      // Build user profile prompt
      const userProfile = `
        - Country: ${event.data.country}
        - Investment goals: ${event.data.investmentGoals}
        - Risk tolerance: ${event.data.riskTolerance}
        - Preferred industry: ${event.data.preferredIndustry}
      `;
      const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
        "{{userProfile}}",
        userProfile
      );

      // Await the AI response before running any step
      const response = await step.ai.infer("generate-welcome-intro", {
        model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
        body: {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
      });

      // Extract intro text
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining TickrMind! You now have the tools to track markets and make smarter moves.";

      // Send welcome email inside its own Inngest step
      await step.run("send-welcome-email", async () => {
        const {
          data: { email, name },
        } = event;
        await sendWelcomeEmail({ email, name, intro: introText });
        console.log("Welcome email sent to:", email);
      });

      return { success: true, message: "Welcome email sent successfully" };
    } catch (err) {
      console.error("Error in sendSignUpEmail function:", err);
      return { success: false, message: "Failed to send welcome email" };
    }
  }
);

export const sendDailyNewsSummary = inngest.createFunction(
  { id: "daily-news-summary" },
  // create cron job everyday 12pm utc
  [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }],
  async ({ step }) => {
    // step 1 : Get all users for news delivery
    const users = await step.run("get-all-users", getAllUsersForNewsEmail);
    if (!users || users.length === 0)
      return { succes: false, message: "No users found for new email" };

    // step 2 : Fetch personalised news for each user
    const results = await step.run("fetch-user-news", async () => {
      const perUser: Array<{
        user: UserForNewsEmail;
        articles: MarketNewsArticle[];
      }> = [];
      for (const user of users as UserForNewsEmail[]) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbols);
          // Enforce max 6 articles per user
          articles = (articles || []).slice(0, 6);
          // If still empty, fallback to general
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }
          perUser.push({ user, articles });
        } catch (e) {
          console.error("daily-news: error preparing user news", user.email, e);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    //step 3:  Summarize each news item via inngest AI using gemini
    const userNewsSummaries: {
      user: UserForNewsEmail;
      newsContent: string | null;
    }[] = [];

    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          "{{newData}}",
          JSON.stringify(articles, null, 2)
        );
        const response = await step.ai.infer(`summarize-news-${user.email}`, {
          model: step.ai.models.gemini({
            model: "gemini-2.5-flash-lite-preview-06-17",
          }),
          body: {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          },
        });

        const part = response.candidates?.[0]?.content.parts?.[0];
        const newsContent =
          (part && "text" in part ? part.text : null) || "No market news!";

        userNewsSummaries.push({ user, newsContent });
      } catch (e) {
        console.log("Unable to summarize news for :", user.email);
        userNewsSummaries.push({ user, newsContent: null });
      }
    }
    // step 4: Send emails
    await step.run("send-news-emails", async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;

          return await sendNewsSummaryEmail({
            email: user.email,
            date: getFormattedTodayDate(),
            newsContent,
          });
        })
      );
    });

    return {
      success: true,
      message: "Daily news summary emails sent successfully",
    };
  }
);
