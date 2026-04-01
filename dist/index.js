#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createPaymentSchema, handleCreatePayment } from "./tools/create-payment.js";
import { getPaymentSchema, handleGetPayment } from "./tools/get-payment.js";
import { listPaymentsSchema, handleListPayments } from "./tools/list-payments.js";
import { refundPaymentSchema, handleRefundPayment } from "./tools/refund-payment.js";
import { createInvoiceSchema, handleCreateInvoice } from "./tools/create-invoice.js";
import { getInvoiceSchema, handleGetInvoice } from "./tools/get-invoice.js";
import { listInvoicesSchema, handleListInvoices } from "./tools/list-invoices.js";
import { voidPaymentSchema, handleVoidPayment } from "./tools/void-payment.js";
const server = new McpServer({ name: "moyasar-mcp", version: "1.0.0" });
server.tool("create_payment", "Create a payment via Moyasar.", createPaymentSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleCreatePayment(params) }] }));
server.tool("get_payment", "Get payment details by ID.", getPaymentSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleGetPayment(params) }] }));
server.tool("list_payments", "List payments with filters.", listPaymentsSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleListPayments(params) }] }));
server.tool("refund", "Refund a captured payment.", refundPaymentSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleRefundPayment(params) }] }));
server.tool("create_invoice", "Create a payment invoice.", createInvoiceSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleCreateInvoice(params) }] }));
server.tool("get_invoice", "Get invoice details by ID.", getInvoiceSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleGetInvoice(params) }] }));
server.tool("list_invoices", "List invoices.", listInvoicesSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleListInvoices(params) }] }));
server.tool("void", "Void an authorized payment.", voidPaymentSchema.shape, async (params) => ({ content: [{ type: "text", text: await handleVoidPayment(params) }] }));
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[moyasar-mcp] Server started. 8 tools available.");
}
main().catch((error) => { console.error("[moyasar-mcp] Error:", error); process.exit(1); });
//# sourceMappingURL=index.js.map