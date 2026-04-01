import { z } from "zod";
import { MoyasarClient } from "../client.js";
const client = new MoyasarClient();
export const listPaymentsSchema = z.object({
    page: z.number().int().positive().default(1).describe("Page number"),
    per_page: z.number().int().min(1).max(100).default(25).describe("Items per page"),
    status: z.enum(["initiated", "paid", "failed", "authorized", "captured", "refunded", "voided"]).optional().describe("Filter by status"),
});
export async function handleListPayments(params) {
    const query = new URLSearchParams({ page: String(params.page), per_page: String(params.per_page) });
    if (params.status)
        query.set("status", params.status);
    const result = await client.request("GET", `/payments?${query}`);
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=list-payments.js.map