import { z } from "zod";
import { MoyasarClient } from "../client.js";

const client = new MoyasarClient();

export const createInvoiceSchema = z.object({
  amount: z.number().int().positive().describe("Amount in halalas"),
  currency: z.string().default("SAR").describe("Currency code"),
  description: z.string().describe("Invoice description"),
  callback_url: z.string().url().describe("Callback URL"),
  expired_at: z.string().optional().describe("Expiry date (ISO 8601)"),
});

export async function handleCreateInvoice(params: z.infer<typeof createInvoiceSchema>): Promise<string> {
  const body: Record<string, unknown> = {
    amount: params.amount,
    currency: params.currency,
    description: params.description,
    callback_url: params.callback_url,
  };
  if (params.expired_at) body.expired_at = params.expired_at;
  const result = await client.request("POST", "/invoices", body);
  return JSON.stringify(result, null, 2);
}
