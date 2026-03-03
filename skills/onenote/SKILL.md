---
name: onenote
description: Manage notes with Microsoft OneNote via Graph API. Create notebooks, sections, and pages. Search and organize notes. Cross-platform (API-based).
homepage: https://www.onenote.com
metadata:
  {
    "neuro":
      {
        "emoji": "📒",
        "requires": { "env": ["MICROSOFT_GRAPH_TOKEN"] },
        "primaryEnv": "MICROSOFT_GRAPH_TOKEN",
      },
  }
---

# OneNote

Manage your notes with Microsoft OneNote using the Microsoft Graph API. Create, read, and organize notebooks, sections, and pages.

## Setup

Uses the same Microsoft Graph authentication as Microsoft To Do. No additional setup needed if already authenticated.

**Required Permissions**:

- `Notes.ReadWrite` - Full access to OneNote notebooks
- `User.Read` - Basic profile information

## Structure

OneNote hierarchy:

```
Notebooks
└── Sections
    └── Pages
        └── Content (HTML)
```

## Common Operations

### List Notebooks

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/onenote/notebooks"
```

### List Sections in a Notebook

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/onenote/notebooks/{notebookId}/sections"
```

### List Pages in a Section

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/onenote/sections/{sectionId}/pages"
```

### Create a Page

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/xhtml+xml" \
  -d '<!DOCTYPE html>
<html>
  <head>
    <title>Meeting Notes</title>
  </head>
  <body>
    <h1>Team Sync - Feb 6, 2026</h1>
    <p>Key discussion points:</p>
    <ul>
      <li>Project status update</li>
      <li>Resource allocation</li>
      <li>Next steps</li>
    </ul>
  </body>
</html>' \
  "https://graph.microsoft.com/v1.0/me/onenote/sections/{sectionId}/pages"
```

### Get Page Content

```bash
# Get page metadata
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/onenote/pages/{pageId}"

# Get page HTML content
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/onenote/pages/{pageId}/content"
```

### Update a Page

```bash
# Append content to existing page
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type": "application/json" \
  -d '[
    {
      "target": "body",
      "action": "append",
      "content": "<p>Additional note added later</p>"
    }
  ]' \
  "https://graph.microsoft.com/v1.0/me/onenote/pages/{pageId}/content"
```

### Search Pages

```bash
# Search across all notebooks
curl -G \
  -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/onenote/pages" \
  --data-urlencode '$search=meeting notes'
```

## Creating Notebooks and Sections

### Create Notebook

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Work Projects"
  }' \
  "https://graph.microsoft.com/v1.0/me/onenote/notebooks"
```

### Create Section

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Q1 Planning"
  }' \
  "https://graph.microsoft.com/v1.0/me/onenote/notebooks/{notebookId}/sections"
```

## HTML Content

OneNote uses HTML for page content. Key elements:

- `<h1>` through `<h6>` - Headings
- `<p>` - Paragraphs
- `<ul>`, `<ol>`, `<li>` - Lists
- `<strong>`, `<em>` - Text formatting
- `<a href="">` - Links
- `<img src="">` - Images (data URIs supported)
- `<table>`, `<tr>`, `<td>` - Tables

## Tips

- **Default notebook**: Most users have a "Personal" or "Quick Notes" notebook
- **HTML required**: Page content must be valid HTML
- **Images**: Use data URIs or external URLs for images
- **Search**: Full-text search across all content
- **Sync**: Changes sync automatically across all devices
- **Rate limits**: Standard Microsoft Graph throttling applies

## Example: Quick Note

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/xhtml+xml" \
  -d '<!DOCTYPE html>
<html>
  <head><title>Quick Idea</title></head>
  <body>
    <p>Remember to follow up on project proposal by EOD</p>
  </body>
</html>' \
  "https://graph.microsoft.com/v1.0/me/onenote/pages?sectionName=Quick%20Notes"
```

The `sectionName` parameter automatically creates a page in the specified section (creates section if it doesn't exist).

## Cross-Platform

✅ Works on Windows, macOS, Linux - API-based, no local dependencies.
