import { z } from "zod";
export declare const createInvoiceSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    description: z.ZodString;
    callback_url: z.ZodString;
    expired_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: number;
    currency: string;
    description: string;
    callback_url: string;
    expired_at?: string | undefined;
}, {
    amount: number;
    description: string;
    callback_url: string;
    currency?: string | undefined;
    expired_at?: string | undefined;
}>;
export declare function handleCreateInvoice(params: z.infer<typeof createInvoiceSchema>): Promise<string>;
