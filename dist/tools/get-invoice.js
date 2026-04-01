import { z } from "zod";
import { MoyasarClient } from "../client.js";
const client = new MoyasarClient();
export const getInvoiceSchema = z.object({
    invoice_id: z.string().describe("Invoice ID"),
});
export async function handleGetInvoice(params) {
    const result = await client.request("GET", `/invoices/${params.invoice_id}`);
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=get-invoice.js.map