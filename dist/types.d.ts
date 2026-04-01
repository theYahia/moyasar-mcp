export interface MoyasarPayment {
    id: string;
    status: string;
    amount: number;
    currency: string;
    description?: string;
    source: {
        type: string;
        company?: string;
        name?: string;
    };
    callback_url?: string;
}
export interface MoyasarInvoice {
    id: string;
    status: string;
    amount: number;
    currency: string;
    description?: string;
    url?: string;
}
export interface MoyasarApiResponse {
    [key: string]: unknown;
}
