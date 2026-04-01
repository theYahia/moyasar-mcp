import { z } from "zod";
import { MoyasarClient } from "../client.js";

const client = new MoyasarClient();

export const refundPaymentSchema = z.object({
  payment_id: z.string().describe("Payment ID to refund"),
  amount: z.number().int().positive().optional().describe("Refund amount in halalas (omit for full refund)"),
});

export async function handleRefundPayment(params: z.infer<typeof refundPaymentSchema>): Promise<string> {
  const body: Record<string, unknown> = {};
  if (params.amount) body.amount = params.amount;
  const result = await client.request("POST", `/payments/${params.payment_id}/refund`, body);
  return JSON.stringify(result, null, 2);
}
