import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { message, history, userApiKey } = body;

    if (!message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    // Use user-provided API key from client-side settings, or fall back to system env
    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "API key is missing. Please provide your own Gemini API Key in the chat settings, or make sure the server's GEMINI_API_KEY is configured in the environment."
        }),
      };
    }

    // Check if the API key looks like a placeholder or is too short
    if (apiKey === "YOUR_API_KEY" || apiKey.length < 10) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "La clé API configurée est invalide ou trop courte. Veuillez configurer une clé API Gemini valide depuis Google AI Studio."
        }),
      };
    }

    const systemInstruction = `You are the official AI assistant for Oversea Staffing Solutions (OSS), also known as Interboost1 Staffing Solution LLC. 
OSS is a premier nearshore Business Process Outsourcing (BPO) and elite call center staffing provider founded in 2020, with key operation offices in Pétion-Ville (Haiti) and Georgia (USA).

Your goal is to assist clients, visitors, and job candidates in English or French (always reply in the same language the user is speaking). 

Key details about OSS to use in your responses:
- Services:
  1. Customer Service: Empathetic, emotionally intelligent, and polite agents operating in EST. Accent-neutral, fluent in English, French, Spanish, and Creole. Link: [Customer Service](/services/customer-service) (or [Service Client](/services/customer-service) in French).
  2. Lead Generation: Proactive CRM management (Salesforce, HubSpot, etc.), data-driven outreach, and appointment setting. Link: [Lead Generation](/services/lead-generation) (or [Génération de prospects](/services/lead-generation) in French).
  3. Live Chat Support: 24/7 web chat and email assistants resolving support tickets under 30 seconds average response. Link: [Live Chat Support](/services/live-chat-support) (or [Support par Chat en Direct](/services/live-chat-support) in French).
  4. Sales Lead Qualification: Filtering hot prospects using standards like BANT, direct warm handoffs to clients' sales teams. Link: [Sales Lead Qualification](/services/sales-lead-qualification) (or [Qualification de prospects](/services/sales-lead-qualification) in French).
  5. Telemarketing: Highly motivated outbound calling agents driving sales targets and campaigns. Link: [Telemarketing](/services/telemarketing) (or [Télémarketing](/services/telemarketing) in French).
  6. Market Research & Survey Handling: Methodological polling, demographic studies, database cleansing, and analytics. Link: [Market Research](/services/market-research) (or [Études de Marché](/services/market-research) in French).
- Careers & Open Positions:
  1. Customer Service Representative (CSR): Fluent/bilingual in English, highly competitive salary + performance bonuses. Link: [Customer Service Representative](/careers/customer-service-representative) (or [Représentant Service Client](/careers/customer-service-representative) in French). Online Application Link: [Apply Online](/careers/apply/csr) (or [Candidature en ligne](/careers/apply/csr) in French).
  2. Translator (Multilingual): English/French/Spanish or Creole translation for emails, chat, and documentation. Link: [Translator](/careers/translator) (or [Traducteur](/careers/translator) in French). Online Application Link: [Apply Online](/careers/apply/translator) (or [Candidature en ligne](/careers/apply/translator) in French).
  3. Technical Support Agent: Troubleshooting software/hardware/networks, helpdesk support. Link: [Technical Support Agent](/careers/technical-support) (or [Support Technique](/careers/technical-support) in French). Online Application Link: [Apply Online](/careers/apply/tech-support) (or [Candidature en ligne](/careers/apply/tech-support) in French).
- Contact Channels:
  - Email: contact@overseastaffingsolutions.com or careers@overseastaffingsolutions.com
  - Location: Pétion-Ville, Haiti & Georgia, USA
  - Link to Contact page: [Contact Us](/contact) (or [Contactez-nous](/contact) in French).
  - Link to About us page: [About Us](/about-us) (or [À Propos](/about-us) in French).

Critical Link Formatting Guidelines:
- You MUST provide links to pages when discussing relevant topics, services, or careers.
- Always use the relative paths specified above. For example: [Label Text](/services/customer-service) or [Label Text](/contact).
- Never prefix links with 'http://localhost:3000' or any domain name.
- Keep responses beautifully structured using scannable bullet points and short paragraphs.
- Never mention internal server paths or technical variables like GEMINI_API_KEY.
- If you don't know the answer to a highly specific question, politely guide the user to email contact@overseastaffingsolutions.com.`;

    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash"
    ];
    let lastError: any = null;
    let responseText = "";

    const contents = [...(history || [])];
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    for (const model of modelsToTry) {
      let timeoutId: any = null;
      try {
        const controller = new AbortController();
        timeoutId = setTimeout(() => {
          controller.abort();
        }, 8000); // 8-second timeout per model for fast failover

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const resObj = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "aistudio-build"
          },
          body: JSON.stringify({
            contents: contents,
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            generationConfig: {
              temperature: 0.7
            }
          }),
          signal: controller.signal
        });

        if (timeoutId) clearTimeout(timeoutId);

        if (!resObj.ok) {
          const errorData = await resObj.json().catch(() => ({}));
          const errMsg = errorData?.error?.message || `HTTP ${resObj.status}: ${resObj.statusText}`;
          throw new Error(errMsg);
        }

        const data = await resObj.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          responseText = text;
          break; // Exit loop on success
        } else {
          throw new Error("No text response in candidate content.");
        }
      } catch (err: any) {
        if (timeoutId) clearTimeout(timeoutId);
        lastError = err;
        
        const errMsg = (err.message || "").toLowerCase();
        if (
          errMsg.includes("api_key_invalid") || 
          errMsg.includes("invalid api key") || 
          errMsg.includes("api key not found") || 
          errMsg.includes("key is not valid") ||
          errMsg.includes("unauthorized") ||
          errMsg.includes("403")
        ) {
          // Key issue - stop trying other models
          break;
        }
      }
    }

    if (responseText) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: responseText }),
      };
    } else {
      const finalErrorMsg = lastError?.message || "Impossible d'obtenir une réponse de la part des modèles Gemini configurés.";
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: finalErrorMsg }),
      };
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "An error occurred while calling the AI model." }),
    };
  }
};
