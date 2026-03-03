---
name: api-gateway
description: |
  Connect to 100+ APIs (Google Workspace, Microsoft 365, GitHub, Notion, Slack, Airtable, HubSpot, etc.) with managed OAuth.
  Use this skill when users want to interact with external services.
  Security: The MATON_API_KEY authenticates with Maton.ai but grants NO access to third-party services by itself. Each service requires explicit OAuth authorization by the user through Maton's connect flow. Access is strictly scoped to connections the user has authorized. Provided by Maton (https://maton.ai).
compatibility: Requires network access and valid Maton API key
metadata:
  author: maton
  version: "1.0"
  neuro:
    emoji: 🧠
    homepage: "https://maton.ai"
    requires:
      env:
        - MATON_API_KEY
---

# API Gateway

Passthrough proxy for direct access to third-party APIs using managed OAuth connections, provided by [Maton](https://maton.ai). The API gateway lets you call native API endpoints directly.

## Quick Start

```bash
# Native Slack API call
python <<'EOF'
import urllib.request, os, json
data = json.dumps({'channel': 'C0123456', 'text': 'Hello from gateway!'}).encode()
req = urllib.request.Request('https://gateway.maton.ai/slack/api/chat.postMessage', data=data, method='POST')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
req.add_header('Content-Type', 'application/json')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```


## Base URL

```
https://gateway.maton.ai/{app}/{native-api-path}
```

Replace `{app}` with the service name and `{native-api-path}` with the actual API endpoint path.

IMPORTANT: The URL path MUST start with the connection's app name (eg. `/google-mail/...`). This prefix tells the gateway which app connection to use. For example, the native Gmail API path starts with `gmail/v1/`, so full paths look like `/google-mail/gmail/v1/users/me/messages`.

## Authentication

All requests require the Maton API key in the Authorization header:

```
Authorization: Bearer $MATON_API_KEY
```

The API gateway automatically injects the appropriate OAuth token for the target service.

**Environment Variable:** You can set your API key as the `MATON_API_KEY` environment variable:

```bash
export MATON_API_KEY="YOUR_API_KEY"
```

## Getting Your API Key

1. Sign in or create an account at [maton.ai](https://maton.ai)
2. Go to [maton.ai/settings](https://maton.ai/settings)
3. Click the copy button on the right side of API Key section to copy it

## Connection Management

Connection management uses a separate base URL: `https://ctrl.maton.ai`

### List Connections

```bash
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://ctrl.maton.ai/connections?app=slack&status=ACTIVE')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

**Query Parameters (optional):**
- `app` - Filter by service name (e.g., `slack`, `hubspot`, `salesforce`)
- `status` - Filter by connection status (`ACTIVE`, `PENDING`, `FAILED`)

**Response:**
```json
{
  "connections": [
    {
      "connection_id": "21fd90f9-5935-43cd-b6c8-bde9d915ca80",
      "status": "ACTIVE",
      "creation_time": "2025-12-08T07:20:53.488460Z",
      "last_updated_time": "2026-01-31T20:03:32.593153Z",
      "url": "https://connect.maton.ai/?session_token=5e9...",
      "app": "slack",
      "metadata": {}
    }
  ]
}
```

### Create Connection

```bash
python <<'EOF'
import urllib.request, os, json
data = json.dumps({'app': 'slack'}).encode()
req = urllib.request.Request('https://ctrl.maton.ai/connections', data=data, method='POST')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
req.add_header('Content-Type', 'application/json')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### Get Connection

```bash
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://ctrl.maton.ai/connections/{connection_id}')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

Open the returned URL in a browser to complete OAuth.

### Delete Connection

```bash
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://ctrl.maton.ai/connections/{connection_id}', method='DELETE')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### Specifying Connection

If you have multiple connections for the same app, specify which to use with the `Maton-Connection` header:

```bash
python <<'EOF'
import urllib.request, os, json
data = json.dumps({'channel': 'C0123456', 'text': 'Hello!'}).encode()
req = urllib.request.Request('https://gateway.maton.ai/slack/api/chat.postMessage', data=data, method='POST')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
req.add_header('Content-Type', 'application/json')
req.add_header('Maton-Connection', '21fd90f9-5935-43cd-b6c8-bde9d915ca80')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

If omitted, the gateway uses the default (oldest) active connection for that app.

## Supported Services

| Service | App Name | Base URL Proxied |
|---------|----------|------------------|
| ActiveCampaign | `active-campaign` | `{account}.api-us1.com` |
| Acuity Scheduling | `acuity-scheduling` | `acuityscheduling.com` |
| Airtable | `airtable` | `api.airtable.com` |
| Apollo | `apollo` | `api.apollo.io` |
| Asana | `asana` | `app.asana.com` |
| Attio | `attio` | `api.attio.com` |
| Basecamp | `basecamp` | `3.basecampapi.com` |
| beehiiv | `beehiiv` | `api.beehiiv.com` |
| Box | `box` | `api.box.com` |
| Brevo | `brevo` | `api.brevo.com` |
| Calendly | `calendly` | `api.calendly.com` |
| Cal.com | `cal-com` | `api.cal.com` |
| CallRail | `callrail` | `api.callrail.com` |
| Chargebee | `chargebee` | `{subdomain}.chargebee.com` |
| ClickFunnels | `clickfunnels` | `{subdomain}.myclickfunnels.com` |
| ClickSend | `clicksend` | `rest.clicksend.com` |
| ClickUp | `clickup` | `api.clickup.com` |
| Clockify | `clockify` | `api.clockify.me` |
| Coda | `coda` | `coda.io` |
| Confluence | `confluence` | `api.atlassian.com` |
| CompanyCam | `companycam` | `api.companycam.com` |
| Cognito Forms | `cognito-forms` | `www.cognitoforms.com` |
| Constant Contact | `constant-contact` | `api.cc.email` |
| Dropbox | `dropbox` | `api.dropboxapi.com` |
| Dropbox Business | `dropbox-business` | `api.dropboxapi.com` |
| ElevenLabs | `elevenlabs` | `api.elevenlabs.io` |
| Eventbrite | `eventbrite` | `www.eventbriteapi.com` |
| Fathom | `fathom` | `api.fathom.ai` |
| Firebase | `firebase` | `firebase.googleapis.com` |
| Fireflies | `fireflies` | `api.fireflies.ai` |
| GetResponse | `getresponse` | `api.getresponse.com` |
| GitHub | `github` | `api.github.com` |
| Gumroad | `gumroad` | `api.gumroad.com` |
| Granola | `granola` | `mcp.granola.ai` (MCP) |
| Google Ads | `google-ads` | `googleads.googleapis.com` |
| Google BigQuery | `google-bigquery` | `bigquery.googleapis.com` |
| Google Analytics Admin | `google-analytics-admin` | `analyticsadmin.googleapis.com` |
| Google Analytics Data | `google-analytics-data` | `analyticsdata.googleapis.com` |
| Google Calendar | `google-calendar` | `www.googleapis.com` |
| Google Classroom | `google-classroom` | `classroom.googleapis.com` |
| Google Contacts | `google-contacts` | `people.googleapis.com` |
| Google Docs | `google-docs` | `docs.googleapis.com` |
| Google Drive | `google-drive` | `www.googleapis.com` |
| Google Forms | `google-forms` | `forms.googleapis.com` |
| Gmail | `google-mail` | `gmail.googleapis.com` |
| Google Merchant | `google-merchant` | `merchantapi.googleapis.com` |
| Google Meet | `google-meet` | `meet.googleapis.com` |
| Google Play | `google-play` | `androidpublisher.googleapis.com` |
| Google Search Console | `google-search-console` | `www.googleapis.com` |
| Google Sheets | `google-sheets` | `sheets.googleapis.com` |
| Google Slides | `google-slides` | `slides.googleapis.com` |
| Google Tasks | `google-tasks` | `tasks.googleapis.com` |
| Google Workspace Admin | `google-workspace-admin` | `admin.googleapis.com` |
| HubSpot | `hubspot` | `api.hubapi.com` |
| Instantly | `instantly` | `api.instantly.ai` |
| Jira | `jira` | `api.atlassian.com` |
| Jobber | `jobber` | `api.getjobber.com` |
| JotForm | `jotform` | `api.jotform.com` |
| Keap | `keap` | `api.infusionsoft.com` |
| Kit | `kit` | `api.kit.com` |
| Klaviyo | `klaviyo` | `a.klaviyo.com` |
| Lemlist | `lemlist` | `api.lemlist.com` |
| Linear | `linear` | `api.linear.app` |
| LinkedIn | `linkedin` | `api.linkedin.com` |
| Mailchimp | `mailchimp` | `{dc}.api.mailchimp.com` |
| MailerLite | `mailerlite` | `connect.mailerlite.com` |
| Mailgun | `mailgun` | `api.mailgun.net` |
| ManyChat | `manychat` | `api.manychat.com` |
| Manus | `manus` | `api.manus.ai` |
| Microsoft Excel | `microsoft-excel` | `graph.microsoft.com` |
| Microsoft Teams | `microsoft-teams` | `graph.microsoft.com` |
| Microsoft To Do | `microsoft-to-do` | `graph.microsoft.com` |
| Monday.com | `monday` | `api.monday.com` |
| Motion | `motion` | `api.usemotion.com` |
| Netlify | `netlify` | `api.netlify.com` |
| Notion | `notion` | `api.notion.com` |
| OneDrive | `one-drive` | `graph.microsoft.com` |
| Outlook | `outlook` | `graph.microsoft.com` |
| PDF.co | `pdf-co` | `api.pdf.co` |
| Pipedrive | `pipedrive` | `api.pipedrive.com` |
| Podio | `podio` | `api.podio.com` |
| PostHog | `posthog` | `{subdomain}.posthog.com` |
| QuickBooks | `quickbooks` | `quickbooks.api.intuit.com` |
| Quo | `quo` | `api.openphone.com` |
| Reducto | `reducto` | `platform.reducto.ai` |
| Salesforce | `salesforce` | `{instance}.salesforce.com` |
| Sentry | `sentry` | `{subdomain}.sentry.io` |
| SignNow | `signnow` | `api.signnow.com` |
| Slack | `slack` | `slack.com` |
| Snapchat | `snapchat` | `adsapi.snapchat.com` |
| Square | `squareup` | `connect.squareup.com` |
| Squarespace | `squarespace` | `api.squarespace.com` |
| Stripe | `stripe` | `api.stripe.com` |
| Systeme.io | `systeme` | `api.systeme.io` |
| Tally | `tally` | `api.tally.so` |
| Telegram | `telegram` | `api.telegram.org` |
| TickTick | `ticktick` | `api.ticktick.com` |
| Todoist | `todoist` | `api.todoist.com` |
| Toggl Track | `toggl-track` | `api.track.toggl.com` |
| Trello | `trello` | `api.trello.com` |
| Twilio | `twilio` | `api.twilio.com` |
| Typeform | `typeform` | `api.typeform.com` |
| Vimeo | `vimeo` | `api.vimeo.com` |
| WhatsApp Business | `whatsapp-business` | `graph.facebook.com` |
| WooCommerce | `woocommerce` | `{store-url}/wp-json/wc/v3` |
| WordPress.com | `wordpress` | `public-api.wordpress.com` |
| Xero | `xero` | `api.xero.com` |
| YouTube | `youtube` | `www.googleapis.com` |
| Zoho Bigin | `zoho-bigin` | `www.zohoapis.com` |
| Zoho Bookings | `zoho-bookings` | `www.zohoapis.com` |
| Zoho Books | `zoho-books` | `www.zohoapis.com` |
| Zoho Calendar | `zoho-calendar` | `calendar.zoho.com` |
| Zoho CRM | `zoho-crm` | `www.zohoapis.com` |
| Zoho Inventory | `zoho-inventory` | `www.zohoapis.com` |
| Zoho Mail | `zoho-mail` | `mail.zoho.com` |
| Zoho People | `zoho-people` | `people.zoho.com` |
| Zoho Projects | `zoho-projects` | `projectsapi.zoho.com` |
| Zoho Recruit | `zoho-recruit` | `recruit.zoho.com` |

See [references/](references/) for detailed routing guides per provider.

## Examples

### Slack - Post Message

```bash
python <<'EOF'
import urllib.request, os, json
data = json.dumps({'channel': 'C0123456', 'text': 'Hello!'}).encode()
req = urllib.request.Request('https://gateway.maton.ai/slack/api/chat.postMessage', data=data, method='POST')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
req.add_header('Content-Type', 'application/json; charset=utf-8')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### HubSpot - Create Contact

```bash
python <<'EOF'
import urllib.request, os, json
data = json.dumps({'properties': {'email': 'john@example.com', 'firstname': 'John', 'lastname': 'Doe'}}).encode()
req = urllib.request.Request('https://gateway.maton.ai/hubspot/crm/v3/objects/contacts', data=data, method='POST')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
req.add_header('Content-Type', 'application/json')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### Google Sheets - Get Values

```bash
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://gateway.maton.ai/google-sheets/v4/spreadsheets/{spreadsheetId}/values/Sheet1!A1:B2')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### Salesforce - SOQL Query

```bash
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://gateway.maton.ai/salesforce/services/data/v64.0/query?q=SELECT+Id,Name+FROM+Contact+LIMIT+10')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### Notion - Query Database

```bash
python <<'EOF'
import urllib.request, os, json
data = json.dumps({}).encode()
req = urllib.request.Request('https://gateway.maton.ai/notion/v1/data_sources/{database_id}/query', data=data, method='POST')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
req.add_header('Content-Type', 'application/json')
req.add_header('Notion-Version', '2025-09-03')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

## Code Examples

### JavaScript (Node.js)

```javascript
const response = await fetch('https://gateway.maton.ai/slack/api/chat.postMessage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.MATON_API_KEY}`
  },
  body: JSON.stringify({ channel: 'C0123456', text: 'Hello!' })
});
```

### Python

```python
import os, requests

response = requests.post(
    'https://gateway.maton.ai/slack/api/chat.postMessage',
    headers={'Authorization': f'Bearer {os.environ["MATON_API_KEY"]}'},
    json={'channel': 'C0123456', 'text': 'Hello!'}
)
```

## Error Handling

| Status | Meaning |
|--------|---------|
| 400 | Missing connection for the requested app |
| 401 | Invalid or missing Maton API key |
| 429 | Rate limited (10 requests/second per account) |
| 500 | Internal Server Error |
| 4xx/5xx | Passthrough error from the target API |

### Troubleshooting: API Key Issues

```bash
# Verify key is set
echo $MATON_API_KEY

# Test by listing connections
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://ctrl.maton.ai/connections')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

### Troubleshooting: Invalid App Name

URL path MUST start with the correct app name:
- ✅ `https://gateway.maton.ai/google-mail/gmail/v1/users/me/messages`
- ❌ `https://gateway.maton.ai/gmail/v1/users/me/messages`

### Troubleshooting: Server Error (500)

Usually an expired OAuth token. Create a new connection and complete OAuth, then delete the old one.

## Rate Limits

- 10 requests per second per account
- Target API rate limits also apply

## Tips

1. **Use native API docs**: Refer to each service's official API docs for endpoint paths.
2. **Headers are forwarded**: Custom headers (except `Host` and `Authorization`) pass through.
3. **Query params work**: URL query parameters are passed through to the target API.
4. **All HTTP methods supported**: GET, POST, PUT, PATCH, DELETE.
5. **QuickBooks special case**: Use `:realmId` in the path — it's replaced with the connected realm ID.
6. **curl with brackets**: Use `-g` flag to disable glob parsing for URLs with `fields[]`, `sort[]`, etc.

## Optional

- [GitHub](https://github.com/maton-ai/api-gateway-skill)
- [API Reference](https://www.maton.ai/docs/api-reference)
- [Maton Community](https://discord.com/invite/dBfFAcefs2)
- [Maton Support](mailto:support@maton.ai)
