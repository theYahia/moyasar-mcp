import { z } from "zod";
export declare const refundPaymentSchema: z.ZodObject<{
    payment_id: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    payment_id: string;
    amount?: number | undefined;
}, {
    payment_id: string;
    amount?: number | undefined;
}>;
export declare function handleRefundPayment(params: z.infer<typeof refundPaymentSchema>): Promise<string>;
