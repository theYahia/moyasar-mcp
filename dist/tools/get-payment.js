import { z } from "zod";
import { MoyasarClient } from "../client.js";
const client = new MoyasarClient();
export const getPaymentSchema = z.object({
    payment_id: z.string().describe("Payment ID"),
});
export async function handleGetPayment(params) {
    const result = await client.request("GET", `/payments/${params.payment_id}`);
    return JSON.stringify(result, null, 2);
}
//# sourceMappingURL=get-payment.js.map