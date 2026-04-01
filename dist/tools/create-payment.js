import { z } from "zod";
import { MoyasarClient } from "../client.js";
const client = new MoyasarClient();
export const createPaymentSchema = z.object({
    amount: z.number().int().positive().describe("Amount in halalas (smallest unit, e.g. 10000 = 100 SAR)"),
    currency: z.string().default("SAR").describe("Currency code"),
    description: z.string().describe("Payment description"),
    callback_url: z.string().url().describe("Callback URL after payment"),
    source_type: z.enum(["creditcard", "applepay", "stcpay", "token"]).default("creditcard").describe("Payment source type"),
});
export async function handleCreatePayment(params) {
    const body = {
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        callback_url: params.callback_url,
        source: { type: params.source_type },
    };
    const result = await client.request("POST", "/payments", body);
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=create-payment.js.map