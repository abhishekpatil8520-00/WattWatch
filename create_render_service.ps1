$payload = @{
    type = "web_service"
    name = "wattwatch-backend"
    ownerId = "tea-dabgk5v10e5c73fv4ge0"
    repo = "https://github.com/abhishekpatil8520-00/WattWatch"
    autoDeploy = "yes"
    branch = "main"
    rootDir = "backend"
    serviceDetails = @{
        env = "python"
        plan = "free"
        region = "oregon"
        envSpecificDetails = @{
            buildCommand = "pip install -r requirements.txt"
            startCommand = "uvicorn main:app --host 0.0.0.0 --port 10000"
        }
        envVars = @(
            @{ key = "PYTHON_VERSION"; value = "3.10.13" },
            @{ key = "SUPABASE_URL"; value = "https://iqgajexpayvmerwgqyxt.supabase.co" },
            @{ key = "SUPABASE_KEY"; value = "sb_publishable_5z3c--Xsl1QgTQ-GLFSnQA_vk1Ou6of" }
        )
    }
}

$headers = @{
    "Authorization" = "Bearer rnd_Sx6TEP0A7YZ0JtzJRmV4dLOFqsG2"
    "Content-Type"  = "application/json"
    "Accept"        = "application/json"
}

$jsonPayload = $payload | ConvertTo-Json -Depth 5

$response = Invoke-RestMethod -Uri "https://api.render.com/v1/services" -Method Post -Headers $headers -Body $jsonPayload
$response | ConvertTo-Json -Depth 5
