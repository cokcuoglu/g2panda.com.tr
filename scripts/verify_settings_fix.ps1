
$ErrorActionPreference = "Stop"

try {
    $rand = Get-Random -Minimum 1000 -Maximum 9999
    $email = "test_$rand@example.com"
    Write-Host "1. Registering new user: $email"
    
    $registerBody = @{
        email         = $email
        password      = "Password123!"
        full_name     = "Original Name"
        business_name = "Test Biz"
    } | ConvertTo-Json

    $regResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    $token = $regResponse.data.token
    Write-Host "Registration Successful. Token obtained."

    Write-Host "2. Attempting to Update Name to 'Ahmet Debug'..."
    $updateBody = @{
        full_name = "Ahmet Debug"
    } | ConvertTo-Json

    $updateResponse = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" -Method Put -Headers @{Authorization = "Bearer $token" } -Body $updateBody -ContentType "application/json"
    
    Write-Host "Update Result:"
    Write-Host ($updateResponse | ConvertTo-Json -Depth 5)

    if ($updateResponse.success -eq $true -and $updateResponse.data.full_name -eq "Ahmet Debug") {
        Write-Host "SUCCESS: Name updated correctly."
    }
    else {
        Write-Host "FAILURE: Name did not update."
        exit 1
    }

}
catch {
    Write-Error "Script Failed: $_"
    exit 1
}
