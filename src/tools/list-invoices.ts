import { z } from "zod";
import { MoyasarClient } from "../client.js";

const client = new MoyasarClient();

export const listInvoicesSchema = z.object({
  page: z.number().int().positive().default(1).describe("Page number"),
  per_page: z.number().int().min(1).max(100).default(25).describe("Items per page"),
});

export async function handleListInvoices(params: z.infer<typeof listInvoicesSchema>): Promise<string> {
  const query = new URLSearchParams({ page: String(params.page), per_page: String(params.per_page) });
  const result = await client.request("GET", `/invoices?${query}`);
  return JSON.stringify(result, null, 2);
}
