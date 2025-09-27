#!/bin/bash

# Security Check Script
# This script checks for common sensitive files that should not be committed

echo "🔍 Running Security Check..."

# Check for environment files
echo "Checking for environment files..."
git ls-files | grep -E "\.env" && echo "⚠️  WARNING: Environment files found in repository!" || echo "✅ No environment files found"

# Check for credential files
echo "Checking for credential files..."
git ls-files | grep -E "(credential|secret|\.pem|\.key|\.crt|\.cert)" && echo "⚠️  WARNING: Potential credential files found in repository!" || echo "✅ No credential files found"

# Check for database files
echo "Checking for database files..."
git ls-files | grep -E "\.(db|sqlite|sqlite3)" && echo "⚠️  WARNING: Database files found in repository!" || echo "✅ No database files found"

# Check for backup files
echo "Checking for backup files..."
git ls-files | grep -E "\.(bak|backup|~)" && echo "⚠️  WARNING: Backup files found in repository!" || echo "✅ No backup files found"

# Check for common cloud credential files
echo "Checking for cloud credential files..."
git ls-files | grep -E "(credentials|gcloud-service-key|azureProfile)" && echo "⚠️  WARNING: Cloud credential files found in repository!" || echo "✅ No cloud credential files found"

echo "✅ Security check completed!"