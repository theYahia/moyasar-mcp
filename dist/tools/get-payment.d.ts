import { z } from "zod";
export declare const getPaymentSchema: z.ZodObject<{
    payment_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    payment_id: string;
}, {
    payment_id: string;
}>;
export declare function handleGetPayment(params: z.infer<typeof getPaymentSchema>): Promise<string>;
