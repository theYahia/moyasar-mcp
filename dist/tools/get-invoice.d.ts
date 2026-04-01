import { z } from "zod";
export declare const getInvoiceSchema: z.ZodObject<{
    invoice_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoice_id: string;
}, {
    invoice_id: string;
}>;
export declare function handleGetInvoice(params: z.infer<typeof getInvoiceSchema>): Promise<string>;
