import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

// Workflow + session endpoint stay the same
export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

// ---- GMS Sales Concierge copy ----

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Hyber product manual",
    prompt: "Share the latest Hyber product manual (SharePoint link only).",
  },
  {
    label: "CPaaS pricing deck",
    prompt: "Send me the CPaaS pricing deck we use for new sales prospects.",
  },
  {
    label: "WhatsApp chatbot case studies",
    prompt:
      "Link to GMS WhatsApp / chatbot case studies for telecom and enterprise clients.",
  },
  {
    label: "Sales training recording",
    prompt: "Share the latest GMS sales training Stream recording.",
  },
];

export const PLACEHOLDER_INPUT =
  "Ask for a manual, deck, case study, or Stream recording…";

export const GREETING =
  "Hi, I’m the GMS Sales Concierge. Ask for any sales asset and I’ll return the official SharePoint or Stream link.";

// ---- Theme: align with gms.net palette ----
// Palette you gave:
// #7fdfb8, #d9f6ea, #e8e8e8, #000000, #ffffff, #00c072

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: theme === "dark" ? 2 : 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#7fdfb8" : "#00c072",
      level: 1,
    },
  },
  radius: "round",
  // You can experiment more at https://chatkit.studio/playground and mirror values here
});
