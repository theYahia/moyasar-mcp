import { z } from "zod";
export declare const voidPaymentSchema: z.ZodObject<{
    payment_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    payment_id: string;
}, {
    payment_id: string;
}>;
export declare function handleVoidPayment(params: z.infer<typeof voidPaymentSchema>): Promise<string>;
