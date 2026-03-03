---
name: microsoft-todo
description: Manage tasks with Microsoft To Do via Graph API. Create, update, complete, and delete tasks across lists. Cross-platform (API-based).
homepage: https://todo.microsoft.com
metadata:
  {
    "neuro":
      {
        "emoji": "✅",
        "requires": { "env": ["MICROSOFT_GRAPH_TOKEN"] },
        "primaryEnv": "MICROSOFT_GRAPH_TOKEN",
      },
  }
---

# Microsoft To Do

Manage your tasks with Microsoft To Do using the Microsoft Graph API. Create, update, complete, and organize tasks across multiple lists.

## Setup

### Authentication

Microsoft To Do uses OAuth 2.0 device flow for authentication:

```bash
# Run authentication (this will be built into NEURO)
# Device flow will display a code to enter at Microsoft's website
```

The authentication flow:

1. NEURO displays a code and URL
2. You visit https://microsoft.com/devicelogin
3. Enter the code
4. Sign in with your Microsoft account
5. Grant permissions to NEURO

### Required Permissions

- `Tasks.ReadWrite` - Full access to your To Do tasks
- `User.Read` - Basic profile information

## Common Operations

### List All Task Lists

```bash
# Get all your task lists
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/todo/lists"
```

Returns list of task lists with IDs and names.

### List Tasks in a List

```bash
# Get tasks from a specific list
curl -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks"
```

### Create a Task

```bash
# Create a new task
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "importance": "high",
    "status": "notStarted",
    "body": {
      "content": "Milk, eggs, bread",
      "contentType": "text"
    },
    "dueDateTime": {
      "dateTime": "2026-02-10T17:00:00",
      "timeZone": "UTC"
    }
  }' \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks"
```

### Update a Task

```bash
# Update task properties
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and snacks",
    "importance": "normal"
  }' \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks/{taskId}"
```

### Complete a Task

```bash
# Mark task as completed
curl -X PATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }' \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks/{taskId}"
```

### Delete a Task

```bash
# Delete a task
curl -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks/{taskId}"
```

## Task Properties

### Status Values

- `notStarted` - Task not started
- `inProgress` - Task in progress
- `completed` - Task completed
- `waitingOnOthers` - Waiting on others
- `deferred` - Deferred/postponed

### Importance Levels

- `low` - Low priority
- `normal` - Normal priority
- `high` - High priority

### Example Task Object

```json
{
  "id": "AAMkAGI1...",
  "title": "Review quarterly report",
  "status": "notStarted",
  "importance": "high",
  "createdDateTime": "2026-02-06T10:00:00Z",
  "lastModifiedDateTime": "2026-02-06T10:00:00Z",
  "body": {
    "content": "Q4 2025 financial report",
    "contentType": "text"
  },
  "dueDateTime": {
    "dateTime": "2026-02-15T17:00:00",
    "timeZone": "UTC"
  },
  "completedDateTime": null
}
```

## Finding List IDs

Default lists:

- Tasks list: Usually the first list returned
- Use `GET /me/todo/lists` to find all lists
- Look for `"displayName": "Tasks"` or create a custom list

## Reminders

Set reminders on tasks:

```json
{
  "title": "Team meeting",
  "reminderDateTime": {
    "dateTime": "2026-02-10T09:00:00",
    "timeZone": "UTC"
  }
}
```

## Recurring Tasks

Create recurring tasks:

```json
{
  "title": "Weekly team sync",
  "recurrence": {
    "pattern": {
      "type": "weekly",
      "interval": 1,
      "daysOfWeek": ["monday"]
    },
    "range": {
      "type": "noEnd",
      "startDate": "2026-02-10"
    }
  }
}
```

## Subtasks (Checklist Items)

Add checklist items to tasks:

```bash
# Add checklist item
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "displayName": "Draft agenda"
  }' \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks/{taskId}/checklistItems"
```

## Tips

- **Default list**: Most users have a "Tasks" list by default
- **Time zones**: Always specify time zone in `dueDateTime` and `reminderDateTime`
- **Filtering**: Use `$filter` query parameter to filter tasks by status or importance
- **Ordering**: Use `$orderby` to sort tasks
- **Batching**: Use Graph API batch requests for multiple operations

## Example Queries

### Get high-priority incomplete tasks

```bash
curl -G \
  -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks" \
  --data-urlencode '$filter=importance eq '"'"'high'"'"' and status ne '"'"'completed'"'"''
```

### Get tasks due today

```bash
# Requires date calculation in your code
curl -G \
  -H "Authorization: Bearer $TOKEN" \
  "https://graph.microsoft.com/v1.0/me/todo/lists/{listId}/tasks" \
  --data-urlencode '$filter=dueDateTime/dateTime ge '"'"'2026-02-06T00:00:00'"'"' and dueDateTime/dateTime lt '"'"'2026-02-07T00:00:00'"'"''
```

## Notes

- Microsoft To Do syncs across all devices automatically
- Tasks created via API appear immediately in To Do apps
- Deleting a task moves it to "Deleted Items" (can be permanently deleted after 30 days)
- Maximum 1000 tasks per list recommended for performance
- API rate limits apply (standard Microsoft Graph throttling)

## Cross-Platform

This skill works on:

- ✅ Windows
- ✅ macOS
- ✅ Linux
- ✅ Any platform with internet access

No local dependencies required - purely API-based.
