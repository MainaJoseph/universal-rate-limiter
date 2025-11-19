# PowerShell test script for Express rate limiter (Windows)

Write-Host "🧪 Testing Express Rate Limiter" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test endpoint 1: Public API (5 requests per minute)
Write-Host "Test 1: Public API (5 requests per minute)" -ForegroundColor Yellow
Write-Host "Making 7 requests to http://localhost:3000/api/public/data"
Write-Host ""

for ($i = 1; $i -le 7; $i++) {
    Write-Host "Request $i:" -ForegroundColor Green
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/public/data" -Method Get
        $response | ConvertTo-Json
    } catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host $responseBody -ForegroundColor Red
        }
    }
    Write-Host ""
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test endpoint 2: Protected API (3 requests per 30 seconds)
Write-Host "Test 2: Protected API (3 requests per 30 seconds)" -ForegroundColor Yellow
Write-Host "Making 5 requests to http://localhost:3000/api/protected/data"
Write-Host ""

for ($i = 1; $i -le 5; $i++) {
    Write-Host "Request $i:" -ForegroundColor Green
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/protected/data" -Method Get
        $response | ConvertTo-Json
    } catch {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host $responseBody -ForegroundColor Red
        }
    }
    Write-Host ""
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "✅ Test complete! Check the responses above." -ForegroundColor Green
Write-Host "You should see 429 errors for requests that exceeded the limit." -ForegroundColor Green
