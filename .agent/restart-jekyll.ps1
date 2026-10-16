# Starter (eller restarter) Jekyll-serveren for lokal forhåndsvisning på Windows.
# Bruk (fra reporoten): powershell -ExecutionPolicy Bypass -File .agent\restart-jekyll.ps1
#
# Forutsetninger (installer én gang hvis ikke allerede gjort):
#   1. Installer Ruby+Devkit 3.3 (x64):
#        winget install RubyInstallerTeam.RubyWithDevKit.3.3
#      Åpne et nytt terminalvindu etterpå, slik at ruby og gem finnes i PATH.
#   2. Installer Jekyll og nødvendige gems:
#        gem install jekyll jekyll-redirect-from webrick --no-document
#
# For macOS/Linux, se restart-jekyll.sh.

$ErrorActionPreference = "Stop"

if (-not (Get-Command jekyll -ErrorAction SilentlyContinue)) {
    Write-Host "Fant ikke jekyll i PATH. Se forutsetningene øverst i denne filen."
    exit 1
}

# Stopp eventuell kjørende Jekyll-server (ruby-prosess med "jekyll serve" i kommandolinjen)
Get-CimInstance Win32_Process -Filter "Name = 'ruby.exe'" |
    Where-Object { $_.CommandLine -match "jekyll" -and $_.CommandLine -match "serve" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force }

Start-Sleep -Seconds 1

# --detach støttes ikke på Windows, så serveren startes i et eget, skjult vindu.
# Utdata logges til jekyll-serve.log i reporoten.
Set-Location (Join-Path $PSScriptRoot "..")
Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "jekyll serve > jekyll-serve.log 2>&1" `
    -WindowStyle Hidden

Write-Host ""
Write-Host "Åpne http://127.0.0.1:4000 i nettleseren (kan ta noen sekunder å starte)."
Write-Host "Logg: jekyll-serve.log"
