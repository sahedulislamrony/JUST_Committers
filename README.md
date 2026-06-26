# JUST Committers - Fintech Ticket Analysis Server

A structured Node.js Express server built with TypeScript, featuring:
- API routing with path alias support (`@/*`).
- Security middleware (rate limiting, CORS protection, helmet security headers).
- Input/output schemas with strict Zod validation.
- Personal Identification Number (PIN/OTP) and Prompt Injection sanitization helper.
- DeepSeek AI Copilot integrations (compatible with the `openai` SDK).

---

## Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Configuration
Copy the template `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```
Ensure you provide a valid `DEEPSEEK_API_KEY`.

### 3. Running in Development
Start the local server with hot-reloading:
```bash
npm run dev
```
The server runs on http://localhost:3000 by default.

### 4. Compiling & Production Build
Compile TypeScript and post-process path aliases:
```bash
npm run build
npm start
```

---

## Core API Endpoints

### 1. Health Status
- **Endpoint**: `GET /api/v1/health`
- **Description**: Returns server status and current timestamp.

### 2. Simple Chat Test
- **Endpoint**: `POST /api/v1/ai/chat`
- **Payload**: `{"text": "your prompt"}`
- **Description**: Runs a simple query using the DeepSeek model.

### 3. Ticket Analysis (Fintech AI Copilot)
- **Endpoint**: `POST /api/v1/analyze-ticket`
- **Description**: Cross-references customer complaints against transaction history records, validating schemas, redacting PINs, stripping injection attempts, and returning structured JSON analysis.

---

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License. See the [LICENSE](LICENSE) file for the full terms and conditions.

