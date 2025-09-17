# 1️⃣ Tuer les process Node bloquant le port 4000
$port = 4000
$pid = netstat -ano | findstr ":$port" | ForEach-Object { ($_ -split '\s+')[-1] }
if ($pid) {
    Write-Host "🔹 Processus sur le port $port trouvé : $pid"
    foreach ($p in $pid) {
        taskkill /PID $p /F
        Write-Host "✅ Process $p tué"
    }
} else {
    Write-Host "🔹 Aucun process sur le port $port"
}

# 2️⃣ Lancer le serveur Node dans une nouvelle fenêtre
Write-Host "🚀 Lancement du backend Node..."
Start-Process powershell -ArgumentList "cd 'C:\Users\souss\Documents\p6-mon-vieux-grimoire'; node server.js"

# 3️⃣ Lancer le frontend React dans une autre nouvelle fenêtre
Write-Host "🌐 Lancement du frontend React..."
Start-Process powershell -ArgumentList "cd 'C:\Users\souss\Documents\p6-mon-vieux-grimoire'; npm start"

Write-Host "✅ Tout est lancé !"

