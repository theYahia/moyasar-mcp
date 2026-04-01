import { z } from "zod";
export declare const listInvoicesSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    per_page: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    per_page: number;
}, {
    page?: number | undefined;
    per_page?: number | undefined;
}>;
export declare function handleListInvoices(params: z.infer<typeof listInvoicesSchema>): Promise<string>;
