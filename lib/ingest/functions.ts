import { inngest } from "@/lib/ingest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/use.created" },
  async ({ event, step }) => {
    // we get user profile from form
    const userProfile = `
     -Country: ${event.data.country}
     -Investment goals: ${event.data.investmentGoals}
     -Risk tolerance: ${event.data.riskTolerance}
     -Preferred industry: ${event.data.preferredIndustry}
    `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = await (await response).candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining TickrMind you now have the tools to track markets and make smarter moves.";

      // email sending logic TODO:
    });

    return { success: true, message: "Welcome email sent successfully" };
  }
);
