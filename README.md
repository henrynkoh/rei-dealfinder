# AI Invoice Processing Workflow (n8n + OpenAI)

This project is a fully automated, AI-powered invoice processing workflow built with [n8n](https://n8n.io/). It leverages OpenAI's GPT-4 to extract, validate, and structure data from invoices, then stores the results in Google Drive and sends notifications via email.

---

## Features

- **Automatic Folder Scanning:** Detects new invoices in a specified folder (supports `.txt` and `.pdf`).
- **AI-Powered Extraction:** Uses OpenAI to extract invoice data (number, date, vendor, line items, etc.) from unstructured text.
- **Data Validation & Formatting:** Ensures all required fields are present and standardized (dates, amounts, etc.).
- **Cloud Storage:** Uploads processed invoices as JSON to Google Drive.
- **Notifications:** Sends email alerts with processed invoice details and attachments.
- **Error Handling:** Notifies you if something goes wrong, with detailed error messages.
- **Modular & Extensible:** Easily add more integrations (e.g., Slack, Teams, databases).

---

## Requirements

- **n8n** (v1.44.0+ recommended)
- **Node.js** (v18+ recommended)
- **OpenAI API key** (for GPT-4)
- **Google Drive account** (for storage)
- **Microsoft Outlook account** (for notifications)
- **Basic command-line skills** (for setup)

---

## Setup

### 1. Install Prerequisites

- [Install Node.js](https://nodejs.org/)
- [Install n8n](https://docs.n8n.io/hosting/installation/)

```sh
npm install -g n8n
```

### 2. Clone This Repository

```sh
git clone git@github.com:henrynkoh/tasks-auto.git
cd tasks-auto
```

### 3. Set Environment Variables

You can use a `.env` file or export variables in your shell:

```sh
export OPENAI_API_KEY="your-openai-key"
export GOOGLE_DRIVE_FOLDER_ID="your-google-drive-folder-id"
export ERROR_NOTIFICATION_EMAIL="your@email.com"
```

### 4. Start n8n

```sh
n8n start
```

### 5. Import the Workflow

- Go to [http://localhost:5678](http://localhost:5678)
- Click "Import from File" and select `workflow.json`

### 6. Set Up Credentials

- In n8n, go to **Credentials** and add:
  - **OpenAI** (API Key)
  - **Google Drive** (OAuth2)
  - **Microsoft Outlook** (OAuth2)

### 7. Activate the Workflow

- Click "Activate" in the n8n UI.

### 8. Test

- Place a sample invoice in the `invoices` folder.
- The workflow will process it automatically.
- Check Google Drive for results and your email for notifications.

---

## File Structure

```
tasks-auto/
├── invoices/                # Folder to drop new invoice files
├── workflow.json            # n8n workflow definition
├── README.md                # This file
├── .env                     # (optional) Environment variables
└── ...                      # Other supporting files
```

---

## Troubleshooting

- **Node not recognized:** Make sure you're using HTTP Request nodes for OpenAI if the OpenAI node is not available.
- **No output:** Check the n8n Executions tab for errors.
- **API errors:** Ensure your API keys are correct and active.
- **Google Drive/Outlook issues:** Re-authenticate credentials in n8n.

---

## License

MIT 