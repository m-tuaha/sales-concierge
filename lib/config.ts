import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

// Workflow + session endpoint stay the same
export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

// ---- GMS Sales Concierge copy ----

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Hyber product manual",
    prompt: "Share the Hyber user guide.",
  },
  {
    label: "RCS Product Deck",
    prompt: "Share the RCS product slide decks",
  },
  {
    label: "Gen AI content builder",
    prompt:
      "Share the Gen AI content builder materials for Campaign Platform",
  },
  {
    label: "WhatsApp demo video",
    prompt: "Share demo video of WhatsApp capabilities in Campaign Platform",
  },
];

export const PLACEHOLDER_INPUT =
  "Ask for product overview, slide deck, demo or training materials …";

export const GREETING =
  "Hey there, I’m the GMS Sales Assistant. Ask for any sales asset and I’ll return its SharePoint link.";

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
