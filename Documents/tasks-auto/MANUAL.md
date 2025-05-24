# AI Invoice Processing Workflow Manual

## 1. Installation

### a. Install Node.js and n8n
- Download and install Node.js from [nodejs.org](https://nodejs.org/)
- Install n8n globally:
  ```sh
  npm install -g n8n
  ```

### b. Download the Project
- Clone the repository or download the workflow files.

### c. Install jq (for formatting, optional)
  ```sh
  brew install jq
  ```

---

## 2. Configuration

### a. Environment Variables
Set the following environment variables in your shell or `.env` file:
- `OPENAI_API_KEY` — Your OpenAI API key (get it from https://platform.openai.com/)
- `GOOGLE_DRIVE_FOLDER_ID` — The ID of your target Google Drive folder
- `ERROR_NOTIFICATION_EMAIL` — Email address for error notifications

### b. n8n Credentials
- In the n8n UI, go to **Credentials** and add:
  - **OpenAI**: Paste your API key.
  - **Google Drive**: Authenticate with your Google account.
  - **Microsoft Outlook**: Authenticate with your Microsoft account.

---

## 3. Usage

### a. Start n8n
```sh
n8n start
```

### b. Import the Workflow
- Go to [http://localhost:5678](http://localhost:5678)
- Click "Import from File" and select `workflow.json`

### c. Activate the Workflow
- Click "Activate" in the n8n UI.

### d. Add Invoice Files
- Place `.txt` or `.pdf` invoice files in the `invoices` folder.

### e. View Results
- Processed invoices will appear in your Google Drive folder.
- You'll receive email notifications for each processed invoice.

---

## 4. Troubleshooting
- **Workflow not running:** Check n8n logs and Executions tab.
- **No output:** Ensure all credentials are set up and valid.
- **API errors:** Double-check your API keys and quotas.
- **Google Drive/Outlook issues:** Re-authenticate credentials in n8n. 