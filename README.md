# moyasar-mcp

MCP server for Moyasar payment gateway (Saudi Arabia). Supports payments, invoices, refunds, and voids via Basic auth.

## Tools (8)

| Tool | Description |
|---|---|
| `create_payment` | Create a payment |
| `get_payment` | Get payment details |
| `list_payments` | List payments with filters |
| `refund` | Refund a captured payment |
| `create_invoice` | Create an invoice |
| `get_invoice` | Get invoice details |
| `list_invoices` | List invoices |
| `void` | Void an authorized payment |

## Quick Start

```json
{
  "mcpServers": {
    "moyasar": {
      "command": "npx",
      "args": ["-y", "@theyahia/moyasar-mcp"],
      "env": {
        "MOYASAR_SECRET_KEY": "<YOUR_SECRET_KEY>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MOYASAR_SECRET_KEY` | Yes | Secret API key from Moyasar dashboard |

## Demo Prompts

- "Create a payment of 100 SAR for a subscription"
- "Check payment pay_abc123 status"
- "List all paid payments"
- "Refund 50 SAR from payment pay_xyz789"
- "Create an invoice for 500 SAR"

## License

MIT
