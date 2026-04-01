const BASE_URL = "https://api.moyasar.com/v1";
const TIMEOUT = 15_000;

export class MoyasarClient {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.MOYASAR_SECRET_KEY ?? "";
    if (!this.secretKey) {
      throw new Error(
        "Environment variable MOYASAR_SECRET_KEY is required. " +
        "Get your key at https://docs.moyasar.com/"
      );
    }
  }

  async request(method: string, path: string, body?: unknown): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          "Authorization": `Basic ${Buffer.from(this.secretKey + ":").toString("base64")}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Moyasar HTTP ${response.status}: ${text}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timer);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Moyasar: request timeout (15s). Try again later.");
      }
      throw error;
    }
  }
}
