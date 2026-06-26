import { z } from 'zod';

// Transaction History Entry Schema
export const transactionHistoryEntrySchema = z.object({
  transaction_id: z.string().min(1),
  timestamp: z.string().min(1), // Accepts ISO 8601 timestamp string
  type: z.enum(['transfer', 'payment', 'cash_in', 'cash_out', 'settlement', 'refund']),
  amount: z.number(),
  counterparty: z.string().min(1),
  status: z.enum(['completed', 'failed', 'pending', 'reversed']),
});

// Request Schema
export const analyzeTicketRequestSchema = z.object({
  ticket_id: z.string().min(1),
  complaint: z.string().min(1),
  language: z.enum(['en', 'bn', 'mixed']).optional(),
  channel: z.enum(['in_app_chat', 'call_center', 'email', 'merchant_portal', 'field_agent']).optional(),
  user_type: z.enum(['customer', 'merchant', 'agent', 'unknown']).optional(),
  campaign_context: z.string().optional(),
  transaction_history: z.array(transactionHistoryEntrySchema).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Response Schema from AI / Final Endpoint Response
export const analyzeTicketResponseSchema = z.object({
  ticket_id: z.string().min(1),
  relevant_transaction_id: z.string().nullable(),
  evidence_verdict: z.enum(['consistent', 'inconsistent', 'insufficient_data']),
  case_type: z.enum([
    'wrong_transfer',
    'payment_failed',
    'refund_request',
    'duplicate_payment',
    'merchant_settlement_delay',
    'agent_cash_in_issue',
    'phishing_or_social_engineering',
    'other',
  ]),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  department: z.enum([
    'customer_support',
    'dispute_resolution',
    'payments_ops',
    'merchant_operations',
    'agent_operations',
    'fraud_risk',
  ]),
  agent_summary: z.string().min(1),
  recommended_next_action: z.string().min(1),
  customer_reply: z.string().min(1),
  human_review_required: z.boolean(),
  confidence: z.number().min(0).max(1).optional(),
  reason_codes: z.array(z.string()).optional(),
});

// Type definitions
export type AnalyzeTicketRequest = z.infer<typeof analyzeTicketRequestSchema>;
export type AnalyzeTicketResponse = z.infer<typeof analyzeTicketResponseSchema>;
