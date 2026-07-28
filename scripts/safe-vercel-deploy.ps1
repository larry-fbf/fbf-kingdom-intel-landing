param(
  [switch]$AllowDirty,
  [switch]$SkipBuild,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Stop-Deploy($Message) {
  Write-Host ""
  Write-Host "Production deploy blocked." -ForegroundColor Red
  Write-Host $Message
  Write-Host ""
  Write-Host "Review with: git status --short"
  Write-Host "Use -AllowDirty only when the exact dirty files are intentional."
  exit 1
}

$insideWorkTree = git rev-parse --is-inside-work-tree 2>$null
if ($insideWorkTree -ne "true") {
  Stop-Deploy "This command must be run inside the project git worktree."
}

$status = git status --porcelain=v1
if ($status -and -not $AllowDirty) {
  Write-Host $status
  Stop-Deploy "The working tree is not clean. Commit, stash, or intentionally isolate the deployment before publishing production."
}

if (-not $SkipBuild) {
  npm run build
}

if ($DryRun) {
  Write-Host "Dry run passed. Production deploy would run now." -ForegroundColor Green
  exit 0
}

vercel deploy --prod --yes
