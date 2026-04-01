export declare class MoyasarClient {
    private secretKey;
    constructor();
    request(method: string, path: string, body?: unknown): Promise<unknown>;
}
