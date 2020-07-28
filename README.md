This is a **proof-of-concept** integration between Google Sheets and the [Up Banking API](https://developer.up.com.au).

It can be deployed as an AppsScript app and listens for webhooks from the Up API.

It responds to `TRANSACTION_CREATED` events, and will also log out `PING` events.

## Set Up

### Get an Up API Token

Visit the [Up Developer Docs](https://developer.up.com.au) to get your token.

### Create New Project

#### Using Clasp

*I recommend using clasp if you plan to modify this code. You can work in a local, version-controlled environment.*

Install and setup [clasp](https://github.com/google/clasp).

Make sure you follow the steps to set it up properly and log in.

From the root directory of this repo:

```bash
clasp create --type sheets --title "Up Sheets"
```

Push the files to your project:

```
clasp push
```

Go to the Google Drive of the account you logged into clasp with, and you should see a spreadsheet called "Up Sheets".

Open the spreadsheet, and then open the script editor: `Tools > Script Editor`


#### Using the GUI

Go to Google Drive and create a new Sheet called "Up Sheets".

Open the script editor: `Tools > Script Editor`

Create each file in this repo and copy over the code. If this seems tedious, try using clasp (above).

### Run Setup Script

In the script editor, open `setup.gs` and run the `initialSetup` function.

Check that you now have sheets named "Up Transactions", "Credentials" and "Logs".

### Set API Key

In the credentials tab, copy your api key into cell B1.

### Deploy

Click `Publish > Deploy as Web App`.

Choose a new project version, and assign access to **"Anyone, even anonymous"**.

Click deploy. There will be some warnings because the app isn't verified.

Save the deployed url.

**NOTE**: Don't share this URL. See disclaimers below.

### Create Up Webhook

Remember to replace `your-deployed-url` and `your-token`.

```bash
curl -XPOST 'https://api.up.com.au/api/v1/webhooks' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer your-token' \
--data-raw '{
    "data": {
        "attributes": {
            "url": "your-deployed-url"
        }
    }
}'
```

Save the id of the returned webhook.

### Ping the Webhook

Remember to replace with `your-webhook-id` and `your-token`.

```bash
curl -XPOST 'https://api.up.com.au/api/v1/webhooks/your-webhook-id/ping' \
-H 'Authorization: Bearer your-token'
```

Confirm that pinging this new webhook creates a log in the "Logs" tab of your spreadsheet.

### Transactions

All done! Any transactions that are created in your account should now appear in the "Transactions" tab.

## Disclaimers

- This is in **no way production code** - it's just a proof of concept. There is no retry or data integrity logic, and minimal error handling. Please don't use it for anything important.
- **Signatures are not checked** as recommended in the [API docs](https://developer.up.com.au/#callback_post_webhookURL), so don't share the URL of your deployed application. Anyone who has the URL could create transaction logs. Google doesn't seem to expose request headers, so implementing this check will probably require a seperate API.
- There is no logic (yet) to match a held transaction to a settled transaction - all transactions created will appear as seperate rows.
