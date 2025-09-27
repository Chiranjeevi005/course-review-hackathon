# Security Check Script for Windows (PowerShell)
# This script checks for common sensitive files that should not be committed

Write-Host "🔍 Running Security Check..."

# Check for environment files
Write-Host "Checking for environment files..."
$envFiles = git ls-files | Where-Object { $_ -match "\.env" }
if ($envFiles) {
    Write-Host "⚠️  WARNING: Environment files found in repository!" -ForegroundColor Yellow
    $envFiles | ForEach-Object { Write-Host "  - $_" }
} else {
    Write-Host "✅ No environment files found" -ForegroundColor Green
}

# Check for credential files
Write-Host "Checking for credential files..."
$credFiles = git ls-files | Where-Object { $_ -match "(credential|secret|\.pem|\.key|\.crt|\.cert)" }
if ($credFiles) {
    Write-Host "⚠️  WARNING: Potential credential files found in repository!" -ForegroundColor Yellow
    $credFiles | ForEach-Object { Write-Host "  - $_" }
} else {
    Write-Host "✅ No credential files found" -ForegroundColor Green
}

# Check for database files
Write-Host "Checking for database files..."
$dbFiles = git ls-files | Where-Object { $_ -match "\.(db|sqlite|sqlite3)" }
if ($dbFiles) {
    Write-Host "⚠️  WARNING: Database files found in repository!" -ForegroundColor Yellow
    $dbFiles | ForEach-Object { Write-Host "  - $_" }
} else {
    Write-Host "✅ No database files found" -ForegroundColor Green
}

# Check for backup files
Write-Host "Checking for backup files..."
$backupFiles = git ls-files | Where-Object { $_ -match "\.(bak|backup|~)" }
if ($backupFiles) {
    Write-Host "⚠️  WARNING: Backup files found in repository!" -ForegroundColor Yellow
    $backupFiles | ForEach-Object { Write-Host "  - $_" }
} else {
    Write-Host "✅ No backup files found" -ForegroundColor Green
}

# Check for common cloud credential files
Write-Host "Checking for cloud credential files..."
$cloudFiles = git ls-files | Where-Object { $_ -match "(credentials|gcloud-service-key|azureProfile)" }
if ($cloudFiles) {
    Write-Host "⚠️  WARNING: Cloud credential files found in repository!" -ForegroundColor Yellow
    $cloudFiles | ForEach-Object { Write-Host "  - $_" }
} else {
    Write-Host "✅ No cloud credential files found" -ForegroundColor Green
}

Write-Host "✅ Security check completed!" -ForegroundColor Green