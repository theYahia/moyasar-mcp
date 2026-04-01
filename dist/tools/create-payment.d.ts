import { z } from "zod";
export declare const createPaymentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    description: z.ZodString;
    callback_url: z.ZodString;
    source_type: z.ZodDefault<z.ZodEnum<["creditcard", "applepay", "stcpay", "token"]>>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    description: string;
    callback_url: string;
    source_type: "creditcard" | "applepay" | "stcpay" | "token";
}, {
    amount: number;
    description: string;
    callback_url: string;
    currency?: string | undefined;
    source_type?: "creditcard" | "applepay" | "stcpay" | "token" | undefined;
}>;
export declare function handleCreatePayment(params: z.infer<typeof createPaymentSchema>): Promise<string>;
