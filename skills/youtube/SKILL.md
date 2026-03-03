---
name: youtube
description: |
  YouTube Data API integration with managed OAuth. Search videos, manage playlists, access channel data, and interact with comments. Use this skill when users want to interact with YouTube. Requires MATON_API_KEY.
compatibility: Requires network access and valid Maton API key
metadata:
  author: maton
  version: "1.0"
  neuro:
    emoji: 📺
    requires:
      env:
        - MATON_API_KEY
---

# YouTube

Access the YouTube Data API v3 with managed OAuth authentication via Maton. Search videos, manage playlists, access channel information, and interact with comments and subscriptions.

## Quick Start

```bash
# Search for videos
python <<'EOF'
import urllib.request, os, json
req = urllib.request.Request('https://gateway.maton.ai/youtube/youtube/v3/search?part=snippet&q=coding+tutorial&type=video&maxResults=10')
req.add_header('Authorization', f'Bearer {os.environ["MATON_API_KEY"]}')
print(json.dumps(json.load(urllib.request.urlopen(req)), indent=2))
EOF
```

## Base URL

```
https://gateway.maton.ai/youtube/{native-api-path}
```

The gateway proxies requests to `www.googleapis.com` and automatically injects your OAuth token.

## Authentication

```
Authorization: Bearer $MATON_API_KEY
```

### Connect YouTube OAuth

```python
import urllib.request, os, json
data = json.dumps({'app': 'youtube'}).encode()
req = urllib.request.Request('https://ctrl.maton.ai/connections', data=data, method='POST')
req.add_header('Authorization', 'Bearer ' + os.environ['MATON_API_KEY'])
req.add_header('Content-Type', 'application/json')
result = json.load(urllib.request.urlopen(req))
print(result['connection']['url'])  # open this URL to complete OAuth
```

## API Reference

### Search Videos
```
GET /youtube/youtube/v3/search?part=snippet&q={query}&type=video&maxResults=10
```

### Get Video Details
```
GET /youtube/youtube/v3/videos?part=snippet,statistics,contentDetails&id={videoId}
```

### Get Trending Videos
```
GET /youtube/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=10
```

### Get My Channel
```
GET /youtube/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true
```

### List My Playlists
```
GET /youtube/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=25
```

### Create Playlist
```
POST /youtube/youtube/v3/playlists?part=snippet,status
{"snippet":{"title":"My Playlist","description":"..."},"status":{"privacyStatus":"private"}}
```

### List Video Comments
```
GET /youtube/youtube/v3/commentThreads?part=snippet,replies&videoId={videoId}&maxResults=100
```

### Subscribe to Channel
```
POST /youtube/youtube/v3/subscriptions?part=snippet
{"snippet":{"resourceId":{"kind":"youtube#channel","channelId":"UCxyz123"}}}
```

## Notes

- Video IDs are 11 characters (e.g., `dQw4w9WgXcQ`)
- Channel IDs start with `UC`
- Playlist IDs start with `PL` (user) or `UU` (uploads)
- Use `pageToken` for pagination
- Search is expensive (100 quota units); reads are cheap (1 unit)
- Use `curl -g` when URLs contain brackets

## Error Handling

| Status | Meaning |
|--------|---------|
| 400 | Missing YouTube connection |
| 401 | Invalid Maton API key |
| 403 | Quota exceeded or insufficient permissions |
| 429 | Rate limited (10 req/sec) |

## Resources

- [YouTube Data API Overview](https://developers.google.com/youtube/v3)
- [Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)
- See [api-gateway skill](../api-gateway/SKILL.md) for other third-party app connections
