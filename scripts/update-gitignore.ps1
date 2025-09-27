# Script to update .gitignore files with security-related entries
# This script ensures that all necessary security patterns are included in .gitignore files

Write-Host "🔒 Updating .gitignore files with security patterns..." -ForegroundColor Green

# Security patterns to ensure are in .gitignore files
$securityPatterns = @(
    "*.env",
    "*.env.*",
    "!*.env.example",
    "*.pem",
    "*.key",
    "*.crt",
    "*.cert",
    "config.json",
    "secrets.json",
    "credentials.json",
    "*config*.json",
    "*secret*.json",
    "*credential*.json",
    "*.db",
    "*.sqlite",
    "*.sqlite3",
    "*.bak",
    "*.backup",
    "*~",
    "id_rsa",
    "id_dsa",
    "id_ecdsa",
    "id_ed25519"
)

# Function to update .gitignore file
function Update-GitIgnore {
    param(
        [string]$filePath
    )
    
    if (Test-Path $filePath) {
        Write-Host "Updating $filePath..." -ForegroundColor Yellow
        
        # Read existing content
        $content = Get-Content $filePath -Raw
        
        # Check and add missing patterns
        $updated = $false
        foreach ($pattern in $securityPatterns) {
            if (-not ($content -match [regex]::Escape($pattern))) {
                # Add a newline and the pattern if it doesn't exist
                $content += "`n# Security pattern added by update script`n$pattern`n"
                $updated = $true
                Write-Host "  Added: $pattern" -ForegroundColor Cyan
            }
        }
        
        # Write back if updated
        if ($updated) {
            $content | Out-File -FilePath $filePath -Encoding UTF8
            Write-Host "✅ Updated $filePath with missing security patterns" -ForegroundColor Green
        } else {
            Write-Host "✅ $filePath already contains all security patterns" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ $filePath not found" -ForegroundColor Red
    }
}

# Update .gitignore files in different directories
$gitIgnoreFiles = @(
    ".\.gitignore",
    ".\client\.gitignore",
    ".\server\.gitignore"
)

foreach ($file in $gitIgnoreFiles) {
    Update-GitIgnore -filePath $file
}

Write-Host "🔒 .gitignore files update completed!" -ForegroundColor Green