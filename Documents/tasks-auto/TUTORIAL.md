# AI Invoice Processing Workflow Tutorial

## Step-by-Step Guide

### 1. Install n8n
```sh
npm install -g n8n
```

### 2. Start n8n
```sh
n8n start
```

### 3. Set Environment Variables
```sh
export OPENAI_API_KEY="your-openai-key"
export GOOGLE_DRIVE_FOLDER_ID="your-google-drive-folder-id"
export ERROR_NOTIFICATION_EMAIL="your@email.com"
```

### 4. Import the Workflow
- Go to [http://localhost:5678](http://localhost:5678)
- Click “Import from File” and select `workflow.json`

### 5. Set Up Credentials
- In n8n, go to **Credentials** and add:
  - **OpenAI**: Paste your API key.
  - **Google Drive**: Authenticate with your Google account.
  - **Microsoft Outlook**: Authenticate with your Microsoft account.

### 6. Activate the Workflow
- Click “Activate” in the n8n UI.

### 7. Test
- Place a sample invoice in the `invoices` folder.
- The workflow will process it automatically.
- Check Google Drive for results and your email for notifications. 