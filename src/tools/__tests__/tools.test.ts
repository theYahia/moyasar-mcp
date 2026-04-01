import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
global.fetch = mockFetch;

process.env.MOYASAR_SECRET_KEY = "test-secret-key";

describe("moyasar-mcp tools", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("create_payment creates payment", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "pay_123", status: "initiated", amount: 10000, currency: "SAR" }),
    });
    const { handleCreatePayment } = await import("../create-payment.js");
    const result = await handleCreatePayment({
      amount: 10000, currency: "SAR", description: "Test", callback_url: "https://example.com/cb", source_type: "creditcard",
    });
    expect(JSON.parse(result).id).toBe("pay_123");
  });

  it("get_payment retrieves payment", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "pay_123", status: "paid", amount: 10000 }),
    });
    const { handleGetPayment } = await import("../get-payment.js");
    const result = await handleGetPayment({ payment_id: "pay_123" });
    expect(JSON.parse(result).status).toBe("paid");
  });

  it("list_payments returns list", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([{ id: "pay_1" }, { id: "pay_2" }]),
    });
    const { handleListPayments } = await import("../list-payments.js");
    const result = await handleListPayments({ page: 1, per_page: 25 });
    expect(JSON.parse(result)).toHaveLength(2);
  });

  it("refund processes refund", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "pay_123", status: "refunded" }),
    });
    const { handleRefundPayment } = await import("../refund-payment.js");
    const result = await handleRefundPayment({ payment_id: "pay_123", amount: 5000 });
    expect(JSON.parse(result).status).toBe("refunded");
  });

  it("create_invoice creates invoice", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "inv_456", status: "created", amount: 20000 }),
    });
    const { handleCreateInvoice } = await import("../create-invoice.js");
    const result = await handleCreateInvoice({
      amount: 20000, currency: "SAR", description: "Invoice test", callback_url: "https://example.com/cb",
    });
    expect(JSON.parse(result).id).toBe("inv_456");
  });

  it("get_invoice retrieves invoice", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "inv_456", status: "paid" }),
    });
    const { handleGetInvoice } = await import("../get-invoice.js");
    const result = await handleGetInvoice({ invoice_id: "inv_456" });
    expect(JSON.parse(result).status).toBe("paid");
  });

  it("list_invoices returns list", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([{ id: "inv_1" }, { id: "inv_2" }]),
    });
    const { handleListInvoices } = await import("../list-invoices.js");
    const result = await handleListInvoices({ page: 1, per_page: 25 });
    expect(JSON.parse(result)).toHaveLength(2);
  });

  it("void voids payment", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "pay_123", status: "voided" }),
    });
    const { handleVoidPayment } = await import("../void-payment.js");
    const result = await handleVoidPayment({ payment_id: "pay_123" });
    expect(JSON.parse(result).status).toBe("voided");
  });

  it("handles HTTP errors gracefully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false, status: 401, text: async () => "Unauthorized",
    });
    const { handleGetPayment } = await import("../get-payment.js");
    await expect(handleGetPayment({ payment_id: "bad" })).rejects.toThrow("Moyasar HTTP 401");
  });
});
