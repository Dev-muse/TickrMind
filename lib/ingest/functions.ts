import { inngest } from "@/lib/ingest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail } from "../nodemailer";

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
        const { data: { email, name } } = event;
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
