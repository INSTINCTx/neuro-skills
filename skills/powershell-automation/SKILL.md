---
name: powershell-automation
description: Windows automation via PowerShell. File operations, system info, process management, and safe scripting. Windows-only.
homepage: https://docs.microsoft.com/powershell
metadata: { "neuro": { "emoji": "⚙️", "os": ["win32"], "requires": { "bins": ["powershell"] } } }
---

# PowerShell Automation

Automate Windows tasks using PowerShell. Perform file operations, query system information, manage processes, and execute safe automation scripts.

## Prerequisites

PowerShell is built into Windows 10+ and Windows Server 2016+. No additional installation needed.

**Verify PowerShell**:

```powershell
pwsh --version  # PowerShell 7+ (recommended)
# or
powershell -v  # Windows PowerShell 5.1 (built-in)
```

## File Operations

### List Files

```powershell
# List files in directory
Get-ChildItem -Path "C:\Users\YourName\Documents"

# List with details
Get-ChildItem -Path "C:\Projects" -Recurse -File |
  Select-Object Name, Length, LastWriteTime

# Filter by extension
Get-ChildItem -Path "C:\Projects" -Filter "*.ts" -Recurse
```

### Copy/Move Files

```powershell
# Copy file
Copy-Item -Path "source.txt" -Destination "backup\source.txt"

# Copy directory recursively
Copy-Item -Path "C:\Projects\App" -Destination "C:\Backup\App" -Recurse

# Move file
Move-Item -Path "old_location.txt" -Destination "new_location.txt"

# Move with rename
Move-Item -Path "report.txt" -Destination "reports\jan_report.txt"
```

### Organize Files by Type

```powershell
# Move all PDFs to a folder
Get-ChildItem -Path "C:\Downloads" -Filter "*.pdf" |
  ForEach-Object { Move-Item $_.FullName -Destination "C:\Documents\PDFs\" }

# Organize downloads by extension
Get-ChildItem -Path "C:\Downloads" -File |
  ForEach-Object {
    $ext = $_.Extension.TrimStart('.')
    $targetDir = "C:\Downloads\$ext"
    if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir }
    Move-Item $_.FullName -Destination $targetDir
  }
```

### Create Archives

```powershell
# Create ZIP archive
Compress-Archive -Path "C:\Projects\MyApp" -DestinationPath "C:\Archives\MyApp.zip"

# Add to existing archive
Compress-Archive -Path "new_file.txt" -Update -DestinationPath "archive.zip"

# Extract archive
Expand-Archive -Path "archive.zip" -DestinationPath "C:\ExtractedFiles"
```

## System Information

### Hardware Info

```powershell
# CPU information
Get-WmiObject Win32_Processor | Select-Object Name, NumberOfCores, MaxClockSpeed

# Memory information
Get-WmiObject Win32_ComputerSystem | Select-Object TotalPhysicalMemory

# Disk space
Get-PSDrive -PSProvider FileSystem |
  Select-Object Name, @{N="Used(GB)";E={[math]::Round($_.Used/1GB,2)}},
                      @{N="Free(GB)";E={[math]::Round($_.Free/1GB,2)}}

# Battery status (laptops)
Get-WmiObject Win32_Battery | Select-Object EstimatedChargeRemaining, BatteryStatus
```

### Network Information

```powershell
# IP configuration
Get-NetIPAddress | Where-Object {$_.AddressFamily -eq "IPv4"} |
  Select-Object InterfaceAlias, IPAddress

# Network adapters
Get-NetAdapter | Select-Object Name, Status, LinkSpeed

# Test connectivity
Test-NetConnection -ComputerName google.com -Port 443

# DNS resolution
Resolve-DnsName google.com
```

### Process Management

```powershell
# List running processes
Get-Process | Select-Object Name, CPU, WorkingSet | Sort-Object CPU -Descending | Select-Object -First 10

# Find specific process
Get-Process | Where-Object {$_.Name -like "*chrome*"}

# Get process details
Get-Process -Name "node" | Select-Object *

# Stop process (use carefully!)
Stop-Process -Name "notepad" -Force
```

## Scheduled Tasks

### List Scheduled Tasks

```powershell
# List all scheduled tasks
Get-ScheduledTask | Where-Object {$_.State -ne "Disabled"}

# Task details
Get-ScheduledTask -TaskName "MyTask" | Get-ScheduledTaskInfo
```

### Create Scheduled Task (Example - requires admin)

```powershell
# Create a simple scheduled task
$action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-File C:\Scripts\backup.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -TaskName "DailyBackup" -Action $action -Trigger $trigger -Description "Daily backup script"
```

## Text Processing

### Search File Content

```powershell
# Search for text in files
Get-ChildItem -Path "C:\Projects" -Filter "*.cs" -Recurse |
  Select-String -Pattern "TODO" |
  Select-Object Path, LineNumber, Line

# Case-insensitive search
Select-String -Path "*.log" -Pattern "error" -CaseSensitive:$false
```

### File Content Manipulation

```powershell
# Read file content
Get-Content -Path "log.txt"

# Read specific lines
Get-Content -Path "log.txt" -TotalCount 10  # First 10 lines
Get-Content -Path "log.txt" -Tail 20         # Last 20 lines

# Replace text in file
(Get-Content "config.txt") -replace "old_value", "new_value" | Set-Content "config.txt"

# Append to file
Add-Content -Path "log.txt" -Value "New log entry: $(Get-Date)"
```

## Environment Variables

```powershell
# List all environment variables
Get-ChildItem Env:

# Get specific variable
$env:PATH

# Set variable (current session only)
$env:MY_VAR = "value"

# Set permanently (requires admin)
[System.Environment]::SetEnvironmentVariable("MY_VAR", "value", "User")
```

## Windows Features

### Check Installed Software

```powershell
# List installed programs
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
  Select-Object DisplayName, DisplayVersion, Publisher |
  Where-Object {$_.DisplayName} |
  Sort-Object DisplayName

# Check if specific software is installed
Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* |
  Where-Object {$_.DisplayName -like "*Visual Studio*"}
```

### Windows Updates (requires admin)

```powershell
# Check for updates (Windows 10+)
Get-WindowsUpdate

# Install specific update
Install-WindowsUpdate -KBArticleID "KB1234567"
```

## Useful Automation Scripts

### Cleanup Old Files

```powershell
# Delete files older than 30 days
$limit = (Get-Date).AddDays(-30)
Get-ChildItem -Path "C:\Temp" -Recurse -File |
  Where-Object {$_.LastWriteTime -lt $limit} |
  Remove-Item -Force

# Show what would be deleted (dry run)
Get-ChildItem -Path "C:\Temp" -Recurse -File |
  Where-Object {$_.LastWriteTime -lt $limit} |
  Select-Object FullName, LastWriteTime
```

### Bulk Rename Files

```powershell
# Add prefix to all files
Get-ChildItem -Path "C:\Photos" -Filter "*.jpg" |
  Rename-Item -NewName {$_.Name -replace '^', 'vacation_'}

# Replace text in filenames
Get-ChildItem -Filter "*.txt" |
  Rename-Item -NewName {$_.Name -replace 'old', 'new'}

# Add date prefix
Get-ChildItem -Filter "*.log" |
  Rename-Item -NewName {"$(Get-Date -Format 'yyyy-MM-dd')_$($_.Name)"}
```

### Monitor Directory Changes

```powershell
# Watch for file changes
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "C:\MonitoredFolder"
$watcher.Filter = "*.*"
$watcher.EnableRaisingEvents = $true

Register-ObjectEvent $watcher "Created" -Action {
    Write-Host "File created: $($Event.SourceEventArgs.FullPath)"
}
```

### Generate Reports

```powershell
# Create CSV report of large files
Get-ChildItem -Path "C:\Projects" -Recurse -File |
  Where-Object {$_.Length -gt 10MB} |
  Select-Object FullName, @{N="Size(MB)";E={[math]::Round($_.Length/1MB,2)}}, LastWriteTime |
  Export-Csv -Path "large_files.csv" -NoTypeInformation

# HTML report
Get-Process |
  Select-Object Name, CPU, WorkingSet |
  Sort-Object CPU -Descending |
  Select-Object -First 20 |
  ConvertTo-Html |
  Out-File "top_processes.html"
```

## Safety Guidelines

### ⚠️ Commands to Avoid or Use Carefully

**Never auto-run**:

- `Remove-Item -Recurse -Force` (can delete entire directories)
- `Stop-Process -Force` (can crash applications)
- Registry modifications (`Set-ItemProperty HKLM:\...`)
- Service management (`Stop-Service`, `Set-Service`)
- Firewall changes (`New-NetFirewallRule`)
- User account modifications

**Safe commands** (read-only):

- `Get-*` cmdlets (Get-Process, Get-ChildItem, etc.)
- `Test-*` cmdlets (Test-Path, Test-NetConnection)
- `Select-Object`, `Where-Object`, `Sort-Object`

### Execution Policy

```powershell
# Check current policy
Get-ExecutionPolicy

# Allow scripts (current user)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Tips

- **Test first**: Use `-WhatIf` parameter to preview changes

  ```powershell
  Remove-Item "file.txt" -WhatIf
  ```

- **Pipeline**: Chain commands with `|` for powerful operations

  ```powershell
  Get-Process | Where-Object {$_.CPU -gt 100} | Sort-Object CPU -Descending
  ```

- **Help system**: Use `Get-Help` for command documentation

  ```powershell
  Get-Help Get-ChildItem -Examples
  ```

- **Auto-completion**: Press Tab to auto-complete commands and paths

- **History**: Press Up/Down arrows or `Get-History` to see past commands

## Platform

**Windows Only**: This skill requires PowerShell and Windows-specific cmdlets.

- ✅ Windows 10/11
- ✅ Windows Server 2016+
- ❌ macOS, Linux (use bash/zsh skills instead)

## Security Notes

- Always review scripts before execution
- Avoid running scripts from untrusted sources
- Use `-WhatIf` to preview destructive operations
- Regular backups before bulk operations
- Prefer read-only operations when possible
