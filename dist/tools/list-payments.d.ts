import { z } from "zod";
export declare const listPaymentsSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    per_page: z.ZodDefault<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["initiated", "paid", "failed", "authorized", "captured", "refunded", "voided"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    per_page: number;
    status?: "initiated" | "paid" | "failed" | "authorized" | "captured" | "refunded" | "voided" | undefined;
}, {
    status?: "initiated" | "paid" | "failed" | "authorized" | "captured" | "refunded" | "voided" | undefined;
    page?: number | undefined;
    per_page?: number | undefined;
}>;
export declare function handleListPayments(params: z.infer<typeof listPaymentsSchema>): Promise<string>;
