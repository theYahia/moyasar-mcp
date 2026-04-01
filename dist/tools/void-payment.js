import { z } from "zod";
import { MoyasarClient } from "../client.js";
const client = new MoyasarClient();
export const voidPaymentSchema = z.object({
    payment_id: z.string().describe("Payment ID to void"),
});
export async function handleVoidPayment(params) {
    const result = await client.request("POST", `/payments/${params.payment_id}/void`, {});
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=void-payment.js.map