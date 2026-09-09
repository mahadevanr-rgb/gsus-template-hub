# TemplateHub Architecture Refactor Migration Script
# Run this script from the project root directory.
# Usage: powershell -ExecutionPolicy Bypass -File migrate.ps1

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

Write-Host "=== TemplateHub Architecture Refactor ===" -ForegroundColor Cyan
Write-Host "Working in: $root"

# ============================================================
# HELPER FUNCTIONS
# ============================================================
function EnsureDir($path) {
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Force -Path $path | Out-Null
    }
}

function CopyWithUpdatedImports($src, $dst, $replacements) {
    $content = Get-Content $src -Raw
    foreach ($rep in $replacements) {
        $content = $content -replace [regex]::Escape($rep.From), $rep.To
    }
    $content | Set-Content -Path $dst -NoNewline -Encoding UTF8
}

function CopyFile($src, $dst) {
    Copy-Item $src $dst -Force
}

function WriteFile($path, $content) {
    $content | Set-Content -Path $path -NoNewline -Encoding UTF8
}

# ============================================================
# PHASE 1 - CREATE ALL DIRECTORIES
# ============================================================
Write-Host "`n[Phase 1] Creating directory structure..." -ForegroundColor Yellow

$dirs = @(
    "src\app",
    "src\services\supabase",
    "src\services\storage",
    "src\utils",
    "src\hooks",
    "src\constants",
    "src\styles",
    "src\codeRegistry\buttons",
    "src\codeRegistry\cards\content",
    "src\codeRegistry\cards\events",
    "src\codeRegistry\cards\finance",
    "src\codeRegistry\cards\notifications",
    "src\codeRegistry\cards\pricing",
    "src\codeRegistry\cards\profile",
    "src\codeRegistry\cards\social",
    "src\codeRegistry\cards\stats",
    "src\codeRegistry\cards\tasks",
    "src\codeRegistry\forms",
    "src\codeRegistry\notifications",
    "src\codeRegistry\data-display",
    "src\codeRegistry\form-compositions",
    "src\components\ui\buttons\AnimatedButton",
    "src\components\ui\buttons\FloatingButton",
    "src\components\ui\buttons\GhostButton",
    "src\components\ui\buttons\GradientButton",
    "src\components\ui\buttons\IconButton",
    "src\components\ui\buttons\OutlineButton",
    "src\components\ui\buttons\PrimaryButton",
    "src\components\ui\buttons\PulseButton",
    "src\components\ui\buttons\SecondaryButton",
    "src\components\ui\buttons\ShadowButton",
    "src\components\ui\cards\Card",
    "src\components\ui\cards\content\FeatureCard",
    "src\components\ui\cards\content\RecommendationCard",
    "src\components\ui\cards\content\TestimonialCard",
    "src\components\ui\cards\events\AppointmentCard",
    "src\components\ui\cards\events\BookingCard",
    "src\components\ui\cards\events\EventCard",
    "src\components\ui\cards\finance\InvoiceCard",
    "src\components\ui\cards\finance\PaymentCard",
    "src\components\ui\cards\finance\TransactionCard",
    "src\components\ui\cards\notifications\AlertCard",
    "src\components\ui\cards\notifications\NotificationCard",
    "src\components\ui\cards\notifications\StatusCard",
    "src\components\ui\cards\pricing\ComparisonCard",
    "src\components\ui\cards\pricing\PricingCard",
    "src\components\ui\cards\pricing\SubscriptionCard",
    "src\components\ui\cards\profile\PhotoProfileCard",
    "src\components\ui\cards\profile\ProductCard",
    "src\components\ui\cards\profile\ProfileCard",
    "src\components\ui\cards\profile\TeamCard",
    "src\components\ui\cards\social\PhotoProfileCard",
    "src\components\ui\cards\stats\KpiCard",
    "src\components\ui\cards\stats\MetricCard",
    "src\components\ui\cards\stats\ProgressCard",
    "src\components\ui\cards\stats\StatCard",
    "src\components\ui\cards\tasks\KanbanCard",
    "src\components\ui\cards\tasks\ProjectCard",
    "src\components\ui\cards\tasks\TaskCard",
    "src\components\ui\forms\Checkbox",
    "src\components\ui\forms\DateInput",
    "src\components\ui\forms\FileUpload",
    "src\components\ui\forms\HelperText",
    "src\components\ui\forms\InputError",
    "src\components\ui\forms\InputLabel",
    "src\components\ui\forms\OTPInput",
    "src\components\ui\forms\PasswordInput",
    "src\components\ui\forms\RadioButton",
    "src\components\ui\forms\RangeSlider",
    "src\components\ui\forms\SearchInput",
    "src\components\ui\forms\SelectDropdown",
    "src\components\ui\forms\SwitchToggle",
    "src\components\ui\forms\Textarea",
    "src\components\ui\forms\TextInput",
    "src\components\ui\data-display\AvatarGroup",
    "src\components\ui\data-display\DataCard",
    "src\components\ui\data-display\DataTable",
    "src\components\ui\data-display\EmptyState",
    "src\components\ui\data-display\Misc",
    "src\components\ui\data-display\ProgressBar",
    "src\components\ui\data-display\Skeleton",
    "src\components\ui\data-display\Spinner",
    "src\components\ui\data-display\Tag",
    "src\components\ui\data-display\Timeline",
    "src\components\ui\feedback\Alert",
    "src\components\ui\feedback\Banner",
    "src\components\ui\feedback\ConfirmDialog",
    "src\components\ui\feedback\InlineMessage",
    "src\components\ui\feedback\NotificationBadge",
    "src\components\ui\feedback\NotificationCard",
    "src\components\ui\feedback\ProgressNotification",
    "src\components\ui\feedback\Snackbar",
    "src\components\ui\feedback\StatusDot",
    "src\components\ui\feedback\Toast",
    "src\components\shared\Avatar",
    "src\components\shared\Badge",
    "src\components\shared\Card",
    "src\components\shared\IconButton",
    "src\components\shared\Logo",
    "src\components\shared\SearchBar",
    "src\components\shared\SearchInput",
    "src\components\shared\StatCard",
    "src\components\shared\ThemeToggle",
    "src\components\layout\MainLayout",
    "src\components\layout\Header",
    "src\components\layout\Sidebar",
    "src\components\layout\Footer",
    "src\features\dashboard\components",
    "src\features\dashboard\pages",
    "src\features\buttons\pages",
    "src\features\buttons\components",
    "src\features\cards\pages",
    "src\features\cards\components",
    "src\features\forms\pages",
    "src\features\forms\components",
    "src\features\form-compositions\pages",
    "src\features\form-compositions\components",
    "src\features\notifications\pages",
    "src\features\notifications\components",
    "src\features\data-display\pages",
    "src\features\data-display\components",
    "src\features\sync\pages",
    "src\features\sync\components",
    "src\features\shared",
    "docs",
    "supabase"
)
foreach ($dir in $dirs) { EnsureDir (Join-Path $root $dir) }
Write-Host "  [OK] All directories created" -ForegroundColor Green

# ============================================================
# PHASE 2 - COPY BUTTONS
# ============================================================
Write-Host "`n[Phase 2] Copying button components..." -ForegroundColor Yellow

CopyFile "$root\src\components\atoms\buttons\buttons.css" "$root\src\components\ui\buttons\buttons.css"

$buttons = @("AnimatedButton","FloatingButton","GhostButton","GradientButton","IconButton","OutlineButton","PrimaryButton","PulseButton","SecondaryButton","ShadowButton")
foreach ($btn in $buttons) {
    $content = Get-Content "$root\src\components\atoms\buttons\$btn.jsx" -Raw
    $content = $content -replace '"./buttons.css"', '"../buttons.css"'
    $content | Set-Content "$root\src\components\ui\buttons\$btn\$btn.jsx" -NoNewline -Encoding UTF8
    WriteFile "$root\src\components\ui\buttons\$btn\index.js" "export { default } from './$btn';"
}
Write-Host "  [OK] Buttons done" -ForegroundColor Green

# ============================================================
# PHASE 3 - COPY CARDS
# ============================================================
Write-Host "`n[Phase 3] Copying card components..." -ForegroundColor Yellow

# Card base primitive
$cardContent = Get-Content "$root\src\components\atoms\cards\Card.jsx" -Raw
$cardContent | Set-Content "$root\src\components\ui\cards\Card\Card.jsx" -NoNewline -Encoding UTF8
WriteFile "$root\src\components\ui\cards\Card\index.js" "export { default, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';"

# Card subcategory mapping
$cardMap = @(
    @{src="ProfileCard"; cat="profile"},
    @{src="TeamCard"; cat="profile"},
    @{src="ProductCard"; cat="profile"},
    @{src="PhotoProfileCard"; cat="profile"},
    @{src="StatCard"; cat="stats"},
    @{src="KpiCard"; cat="stats"},
    @{src="MetricCard"; cat="stats"},
    @{src="ProgressCard"; cat="stats"},
    @{src="PricingCard"; cat="pricing"},
    @{src="ComparisonCard"; cat="pricing"},
    @{src="SubscriptionCard"; cat="pricing"},
    @{src="NotificationCard"; cat="notifications"},
    @{src="AlertCard"; cat="notifications"},
    @{src="StatusCard"; cat="notifications"},
    @{src="EventCard"; cat="events"},
    @{src="BookingCard"; cat="events"},
    @{src="AppointmentCard"; cat="events"},
    @{src="TaskCard"; cat="tasks"},
    @{src="KanbanCard"; cat="tasks"},
    @{src="ProjectCard"; cat="tasks"},
    @{src="TestimonialCard"; cat="content"},
    @{src="FeatureCard"; cat="content"},
    @{src="RecommendationCard"; cat="content"},
    @{src="InvoiceCard"; cat="finance"},
    @{src="TransactionCard"; cat="finance"},
    @{src="PaymentCard"; cat="finance"}
)

foreach ($card in $cardMap) {
    $name = $card.src
    $cat = $card.cat
    $content = Get-Content "$root\src\components\atoms\cards\$name.jsx" -Raw
    # Update import of Card from same dir to subfolder
    $content = $content -replace '"./Card"', '"../Card/Card"'
    $dstDir = "$root\src\components\ui\cards\$cat\$name"
    EnsureDir $dstDir
    $content | Set-Content "$dstDir\$name.jsx" -NoNewline -Encoding UTF8
    WriteFile "$dstDir\index.js" "export { default } from './$name';"
}

# PhotoProfileCard also goes to social
$photoContent = Get-Content "$root\src\components\atoms\cards\PhotoProfileCard.jsx" -Raw
$photoContent | Set-Content "$root\src\components\ui\cards\social\PhotoProfileCard\PhotoProfileCard.jsx" -NoNewline -Encoding UTF8
WriteFile "$root\src\components\ui\cards\social\PhotoProfileCard\index.js" "export { default } from './PhotoProfileCard';"

Write-Host "  [OK] Cards done" -ForegroundColor Green

# ============================================================
# PHASE 4 - COPY FORMS
# ============================================================
Write-Host "`n[Phase 4] Copying form components..." -ForegroundColor Yellow

$forms = @("Checkbox","DateInput","FileUpload","HelperText","InputError","InputLabel","OTPInput","PasswordInput","RadioButton","RangeSlider","SearchInput","SelectDropdown","SwitchToggle","Textarea","TextInput")
foreach ($form in $forms) {
    $src = "$root\src\components\atoms\forms\$form.jsx"
    $dstDir = "$root\src\components\ui\forms\$form"
    CopyFile $src "$dstDir\$form.jsx"
    WriteFile "$dstDir\index.js" "export { default } from './$form';"
}
Write-Host "  [OK] Forms done" -ForegroundColor Green

# ============================================================
# PHASE 5 - COPY DATA-DISPLAY
# ============================================================
Write-Host "`n[Phase 5] Copying data-display components..." -ForegroundColor Yellow

$ddComponents = @("AvatarGroup","DataCard","DataTable","EmptyState","Misc","ProgressBar","Skeleton","Spinner","Tag","Timeline")
foreach ($dd in $ddComponents) {
    $src = "$root\src\components\atoms\data-display\$dd.jsx"
    $dstDir = "$root\src\components\ui\data-display\$dd"
    CopyFile $src "$dstDir\$dd.jsx"
    WriteFile "$dstDir\index.js" "export { default } from './$dd';"
}
Write-Host "  [OK] Data-display done" -ForegroundColor Green

# ============================================================
# PHASE 6 - COPY FEEDBACK (Notifications)
# ============================================================
Write-Host "`n[Phase 6] Copying feedback (notification) components..." -ForegroundColor Yellow

$fbComponents = @("Alert","Banner","ConfirmDialog","InlineMessage","NotificationBadge","NotificationCard","ProgressNotification","Snackbar","StatusDot","Toast")
foreach ($fb in $fbComponents) {
    $src = "$root\src\components\atoms\notifications\$fb.jsx"
    $dstDir = "$root\src\components\ui\feedback\$fb"
    CopyFile $src "$dstDir\$fb.jsx"
    WriteFile "$dstDir\index.js" "export { default } from './$fb';"
}
Write-Host "  [OK] Feedback done" -ForegroundColor Green

# ============================================================
# PHASE 7 - COPY SHARED COMPONENTS
# ============================================================
Write-Host "`n[Phase 7] Copying shared components..." -ForegroundColor Yellow

$sharedMap = @(
    @{name="Avatar"; src="Avatar.jsx"},
    @{name="Badge"; src="Badge.jsx"},
    @{name="Card"; src="Card.jsx"},
    @{name="IconButton"; src="IconButton.jsx"},
    @{name="Logo"; src="Logo.jsx"},
    @{name="SearchBar"; src="SearchBar.jsx"},
    @{name="SearchInput"; src="SearchInput.jsx"},
    @{name="StatCard"; src="StatCard.jsx"},
    @{name="ThemeToggle"; src="ThemeToggle.jsx"}
)
foreach ($item in $sharedMap) {
    $n = $item.name
    $srcPath = "$root\src\components\atoms\$($item.src)"
    $dstDir = "$root\src\components\shared\$n"
    # ThemeToggle has relative import for ThemeContext - update it
    $content = Get-Content $srcPath -Raw
    $content = $content -replace '"../../context/ThemeContext"', '"@/context/ThemeContext"'
    $content | Set-Content "$dstDir\$n.jsx" -NoNewline -Encoding UTF8
    WriteFile "$dstDir\index.js" "export { default } from './$n';"
}
Write-Host "  [OK] Shared components done" -ForegroundColor Green

# ============================================================
# PHASE 8 - COPY LAYOUT COMPONENTS
# ============================================================
Write-Host "`n[Phase 8] Copying layout components..." -ForegroundColor Yellow

# MainLayout
$mlContent = Get-Content "$root\src\components\layout\MainLayout.jsx" -Raw
$mlContent = $mlContent -replace '"../molecules/Header"', '"@/components/layout/Header"'
$mlContent = $mlContent -replace '"../molecules/Sidebar"', '"@/components/layout/Sidebar"'
$mlContent = $mlContent -replace '"./Footer"', '"@/components/layout/Footer"'
$mlContent | Set-Content "$root\src\components\layout\MainLayout\MainLayout.jsx" -NoNewline -Encoding UTF8
WriteFile "$root\src\components\layout\MainLayout\index.js" "export { default } from './MainLayout';"

# Header
$headerContent = Get-Content "$root\src\components\molecules\Header.jsx" -Raw
$headerContent = $headerContent -replace '"../atoms/Avatar"', '"@/components/shared/Avatar"'
$headerContent = $headerContent -replace '"../atoms/SearchInput"', '"@/components/shared/SearchInput"'
$headerContent = $headerContent -replace '"../atoms/ThemeToggle"', '"@/components/shared/ThemeToggle"'
$headerContent | Set-Content "$root\src\components\layout\Header\Header.jsx" -NoNewline -Encoding UTF8
WriteFile "$root\src\components\layout\Header\index.js" "export { default } from './Header';"

# Sidebar
CopyFile "$root\src\components\molecules\Sidebar.jsx" "$root\src\components\layout\Sidebar\Sidebar.jsx"
WriteFile "$root\src\components\layout\Sidebar\index.js" "export { default } from './Sidebar';"

# Footer
CopyFile "$root\src\components\layout\Footer.jsx" "$root\src\components\layout\Footer\Footer.jsx"
WriteFile "$root\src\components\layout\Footer\index.js" "export { default } from './Footer';"

Write-Host "  [OK] Layout done" -ForegroundColor Green

# ============================================================
# PHASE 9 - CREATE BARREL INDEX FILES
# ============================================================
Write-Host "`n[Phase 9] Creating barrel index files..." -ForegroundColor Yellow

# ui/buttons/index.js
$buttonsIdx = @"
export { default as AnimatedButton } from './AnimatedButton';
export { default as FloatingButton } from './FloatingButton';
export { default as GhostButton } from './GhostButton';
export { default as GradientButton } from './GradientButton';
export { default as IconButton } from './IconButton';
export { default as OutlineButton } from './OutlineButton';
export { default as PrimaryButton } from './PrimaryButton';
export { default as PulseButton } from './PulseButton';
export { default as SecondaryButton } from './SecondaryButton';
export { default as ShadowButton } from './ShadowButton';
"@
WriteFile "$root\src\components\ui\buttons\index.js" $buttonsIdx

# ui/forms/index.js
$formsIdx = @"
export { default as Checkbox } from './Checkbox';
export { default as DateInput } from './DateInput';
export { default as FileUpload } from './FileUpload';
export { default as HelperText } from './HelperText';
export { default as InputError } from './InputError';
export { default as InputLabel } from './InputLabel';
export { default as OTPInput } from './OTPInput';
export { default as PasswordInput } from './PasswordInput';
export { default as RadioButton } from './RadioButton';
export { default as RangeSlider } from './RangeSlider';
export { default as SearchInput } from './SearchInput';
export { default as SelectDropdown } from './SelectDropdown';
export { default as SwitchToggle } from './SwitchToggle';
export { default as Textarea } from './Textarea';
export { default as TextInput } from './TextInput';
"@
WriteFile "$root\src\components\ui\forms\index.js" $formsIdx

# ui/data-display/index.js
$ddIdx = @"
export { default as AvatarGroup } from './AvatarGroup';
export { default as DataCard } from './DataCard';
export { default as DataTable } from './DataTable';
export { default as EmptyState } from './EmptyState';
export { default as Misc } from './Misc';
export { default as ProgressBar } from './ProgressBar';
export { default as Skeleton } from './Skeleton';
export { default as Spinner } from './Spinner';
export { default as Tag } from './Tag';
export { default as Timeline } from './Timeline';
"@
WriteFile "$root\src\components\ui\data-display\index.js" $ddIdx

# ui/feedback/index.js
$fbIdx = @"
export { default as Alert } from './Alert';
export { default as Banner } from './Banner';
export { default as ConfirmDialog } from './ConfirmDialog';
export { default as InlineMessage } from './InlineMessage';
export { default as NotificationBadge } from './NotificationBadge';
export { default as NotificationCard } from './NotificationCard';
export { default as ProgressNotification } from './ProgressNotification';
export { default as Snackbar } from './Snackbar';
export { default as StatusDot } from './StatusDot';
export { default as Toast } from './Toast';
"@
WriteFile "$root\src\components\ui\feedback\index.js" $fbIdx

Write-Host "  [OK] Barrel indexes done" -ForegroundColor Green

# ============================================================
# PHASE 10 - COPY PAGES TO FEATURES
# ============================================================
Write-Host "`n[Phase 10] Copying pages to features..." -ForegroundColor Yellow

# Helper function to do all registry/lib import replacements on a file
function UpdateImports($content) {
    # Services
    $content = $content -replace [regex]::Escape('"../lib/db"'), '"@/services/supabase/components.service"'
    $content = $content -replace [regex]::Escape('"../../lib/db"'), '"@/services/supabase/components.service"'
    $content = $content -replace [regex]::Escape('"../lib/supabase"'), '"@/services/supabase/client"'
    $content = $content -replace [regex]::Escape('"../lib/fieldAdapter"'), '"@/utils/fieldAdapter"'
    $content = $content -replace [regex]::Escape('"../../lib/fieldAdapter"'), '"@/utils/fieldAdapter"'
    $content = $content -replace [regex]::Escape('"../lib/installContract"'), '"@/utils/installContract"'
    $content = $content -replace [regex]::Escape('"../../lib/installContract"'), '"@/utils/installContract"'
    # Registry -> codeRegistry
    $content = $content -replace '"../registry/', '"@/codeRegistry/'
    $content = $content -replace '"../../registry/', '"@/codeRegistry/'
    $content = $content -replace '"../registry/index"', '"@/codeRegistry/index"'
    $content = $content -replace '"../../registry/index"', '"@/codeRegistry/index"'
    $content = $content -replace '"../registry/forms"', '"@/codeRegistry/forms"'
    # Layout
    $content = $content -replace '"../components/layout/MainLayout"', '"@/components/layout/MainLayout"'
    $content = $content -replace '"../../components/layout/MainLayout"', '"@/components/layout/MainLayout"'
    # Atoms -> UI
    $content = $content -replace '"../components/atoms/buttons"', '"@/components/ui/buttons"'
    $content = $content -replace '"../../components/atoms/buttons"', '"@/components/ui/buttons"'
    $content = $content -replace '"../components/atoms/cards/', '"@/components/ui/cards/'
    $content = $content -replace '"../../components/atoms/cards/', '"@/components/ui/cards/'
    # Organisms -> features/shared
    $content = $content -replace '"../components/organisms/ButtonShowcase"', '"@/features/buttons/components/ButtonShowcase"'
    $content = $content -replace '"../components/organisms/SyncBanner"', '"@/features/sync/components/SyncBanner"'
    $content = $content -replace '"../components/organisms/AddToProjectModal"', '"@/features/shared/AddToProjectModal"'
    $content = $content -replace '"../../components/organisms/AddToProjectModal"', '"@/features/shared/AddToProjectModal"'
    $content = $content -replace '"../components/organisms/ComponentDetailsShell"', '"@/features/shared/ComponentDetailsShell"'
    $content = $content -replace '"../../components/organisms/ComponentDetailsShell"', '"@/features/shared/ComponentDetailsShell"'
    $content = $content -replace '"../components/organisms/TemplatesSection"', '"@/features/shared/TemplatesSection"'
    $content = $content -replace '"../components/organisms/DashboardStats"', '"@/features/dashboard/components/DashboardStats"'
    # Context
    $content = $content -replace '"../../context/ThemeContext"', '"@/context/ThemeContext"'
    # CSS relative paths in page files (cross-feature imports)
    $content = $content -replace '"../components/organisms/AddToProjectModal.css"', '"@/features/shared/AddToProjectModal.css"'
    $content = $content -replace '"../../components/organisms/AddToProjectModal.css"', '"@/features/shared/AddToProjectModal.css"'
    return $content
}

# Dashboard
$dashContent = Get-Content "$root\src\pages\Dashboard.jsx" -Raw
$dashContent = UpdateImports $dashContent
$dashContent = $dashContent -replace '"../components/organisms/SyncBanner"', '"@/features/sync/components/SyncBanner"'
$dashContent | Set-Content "$root\src\features\dashboard\pages\Dashboard.jsx" -NoNewline -Encoding UTF8

# ButtonsPage - ButtonDetails reference is local now
$bpContent = Get-Content "$root\src\pages\ButtonsPage.jsx" -Raw
$bpContent = UpdateImports $bpContent
$bpContent = $bpContent -replace '"../pages/ButtonDetails"', '"./ButtonDetails"'
$bpContent = $bpContent -replace '"./ButtonsPage.css"', '"./ButtonsPage.css"'
$bpContent | Set-Content "$root\src\features\buttons\pages\ButtonsPage.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\ButtonsPage.css" "$root\src\features\buttons\pages\ButtonsPage.css"

$bdContent = Get-Content "$root\src\pages\ButtonDetails.jsx" -Raw
$bdContent = UpdateImports $bdContent
$bdContent = $bdContent -replace '"./ButtonDetails.css"', '"./ButtonDetails.css"'
$bdContent | Set-Content "$root\src\features\buttons\pages\ButtonDetails.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\ButtonDetails.css" "$root\src\features\buttons\pages\ButtonDetails.css"

# CardsPage
$cpContent = Get-Content "$root\src\pages\CardsPage.jsx" -Raw
$cpContent = UpdateImports $cpContent
$cpContent = $cpContent -replace '"./CardDetails"', '"./CardDetails"'
$cpContent | Set-Content "$root\src\features\cards\pages\CardsPage.jsx" -NoNewline -Encoding UTF8
$cdContent = Get-Content "$root\src\pages\CardDetails.jsx" -Raw
$cdContent = UpdateImports $cdContent
$cdContent | Set-Content "$root\src\features\cards\pages\CardDetails.jsx" -NoNewline -Encoding UTF8

# FormsPage
$fpContent = Get-Content "$root\src\pages\FormsPage.jsx" -Raw
$fpContent = UpdateImports $fpContent
$fpContent = $fpContent -replace '"./FormDetails"', '"./FormDetails"'
$fpContent | Set-Content "$root\src\features\forms\pages\FormsPage.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\FormsPage.css" "$root\src\features\forms\pages\FormsPage.css"
$fdContent = Get-Content "$root\src\pages\FormDetails.jsx" -Raw
$fdContent = UpdateImports $fdContent
$fdContent | Set-Content "$root\src\features\forms\pages\FormDetails.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\FormDetails.css" "$root\src\features\forms\pages\FormDetails.css"

# FormCompositionsPage - complex file, multiple imports need update
$fcpContent = Get-Content "$root\src\pages\FormCompositionsPage.jsx" -Raw
$fcpContent = UpdateImports $fcpContent
# Specific lib/db imports for FormCompositionsPage
$fcpContent = $fcpContent -replace 'from "../lib/db"', 'from "@/services/supabase/projects.service"'
$fcpContent = $fcpContent -replace 'from "../lib/fieldAdapter"', 'from "@/utils/fieldAdapter"'
$fcpContent = $fcpContent -replace 'import formFields from "../registry/forms"', 'import formFields from "@/codeRegistry/forms"'
$fcpContent | Set-Content "$root\src\features\form-compositions\pages\FormCompositionsPage.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\FormCompositionsPage.css" "$root\src\features\form-compositions\pages\FormCompositionsPage.css"
$fcdContent = Get-Content "$root\src\pages\FormCompositionDetails.jsx" -Raw
$fcdContent = UpdateImports $fcdContent
$fcdContent = $fcdContent -replace 'from "../lib/db"', 'from "@/services/supabase/projects.service"'
$fcdContent | Set-Content "$root\src\features\form-compositions\pages\FormCompositionDetails.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\FormCompositionDetails.css" "$root\src\features\form-compositions\pages\FormCompositionDetails.css"

# NotificationsPage
$npContent = Get-Content "$root\src\pages\NotificationsPage.jsx" -Raw
$npContent = UpdateImports $npContent
$npContent = $npContent -replace '"./NotificationDetails"', '"./NotificationDetails"'
$npContent | Set-Content "$root\src\features\notifications\pages\NotificationsPage.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\NotificationsPage.css" "$root\src\features\notifications\pages\NotificationsPage.css"
$ndContent = Get-Content "$root\src\pages\NotificationDetails.jsx" -Raw
$ndContent = UpdateImports $ndContent
$ndContent | Set-Content "$root\src\features\notifications\pages\NotificationDetails.jsx" -NoNewline -Encoding UTF8

# DataDisplayPage
$ddpContent = Get-Content "$root\src\pages\DataDisplayPage.jsx" -Raw
$ddpContent = UpdateImports $ddpContent
$ddpContent = $ddpContent -replace '"./DataDisplayDetails"', '"./DataDisplayDetails"'
$ddpContent | Set-Content "$root\src\features\data-display\pages\DataDisplayPage.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\pages\DataDisplayPage.css" "$root\src\features\data-display\pages\DataDisplayPage.css"
$dddContent = Get-Content "$root\src\pages\DataDisplayDetails.jsx" -Raw
$dddContent = UpdateImports $dddContent
$dddContent | Set-Content "$root\src\features\data-display\pages\DataDisplayDetails.jsx" -NoNewline -Encoding UTF8

# SyncPage
$spContent = Get-Content "$root\src\pages\SyncPage.jsx" -Raw
$spContent = UpdateImports $spContent
$spContent = $spContent -replace 'from "../lib/db"', 'from "@/services/supabase/sync.service"'
$spContent | Set-Content "$root\src\features\sync\pages\SyncPage.jsx" -NoNewline -Encoding UTF8

Write-Host "  [OK] Pages/features done" -ForegroundColor Green

# ============================================================
# PHASE 11 - COPY ORGANISM COMPONENTS TO FEATURES
# ============================================================
Write-Host "`n[Phase 11] Copying organism components to features..." -ForegroundColor Yellow

# ButtonShowcase
$bsContent = Get-Content "$root\src\components\organisms\ButtonShowcase.jsx" -Raw
$bsContent = UpdateImports $bsContent
$bsContent = $bsContent -replace '"./ButtonShowcase.css"', '"./ButtonShowcase.css"'
$bsContent | Set-Content "$root\src\features\buttons\components\ButtonShowcase.jsx" -NoNewline -Encoding UTF8
CopyFile "$root\src\components\organisms\ButtonShowcase.css" "$root\src\features\buttons\components\ButtonShowcase.css"

# SyncBanner
$sbContent = Get-Content "$root\src\components\organisms\SyncBanner.jsx" -Raw
$sbContent = UpdateImports $sbContent
$sbContent = $sbContent -replace 'from "../../lib/db"', 'from "@/services/supabase/sync.service"'
$sbContent | Set-Content "$root\src\features\sync\components\SyncBanner.jsx" -NoNewline -Encoding UTF8

# DashboardStats
$dsContent = Get-Content "$root\src\components\organisms\DashboardStats.jsx" -Raw
$dsContent = $dsContent -replace '"../atoms/StatCard"', '"@/components/shared/StatCard"'
$dsContent | Set-Content "$root\src\features\dashboard\components\DashboardStats.jsx" -NoNewline -Encoding UTF8

# Shared feature components
$sharedOrgs = @("AddToProjectModal","ComponentDetailsShell","ComponentsNavigation","ComponentsSection","TemplatesSection")
foreach ($org in $sharedOrgs) {
    $content = Get-Content "$root\src\components\organisms\$org.jsx" -Raw
    $content = UpdateImports $content
    $content = $content -replace '"../atoms/Card"', '"@/components/shared/Card"'
    $content = $content -replace '"../atoms/SearchBar"', '"@/components/shared/SearchBar"'
    $content = $content -replace '"../atoms/StatCard"', '"@/components/shared/StatCard"'
    $content | Set-Content "$root\src\features\shared\$org.jsx" -NoNewline -Encoding UTF8
    # Copy associated CSS if exists
    $cssPath = "$root\src\components\organisms\$org.css"
    if (Test-Path $cssPath) { CopyFile $cssPath "$root\src\features\shared\$org.css" }
}

# CreateProjectForm
CopyFile "$root\src\components\organisms\forms\CreateProjectForm.jsx" "$root\src\features\form-compositions\components\CreateProjectForm.jsx"

# forms molecules
CopyFile "$root\src\components\molecules\forms\FormField.jsx" "$root\src\features\forms\components\FormField.jsx"
CopyFile "$root\src\components\molecules\forms\PasswordStrengthField.jsx" "$root\src\features\forms\components\PasswordStrengthField.jsx"

Write-Host "  [OK] Organisms/features done" -ForegroundColor Green

# ============================================================
# PHASE 12 - COPY STYLES
# ============================================================
Write-Host "`n[Phase 12] Setting up styles..." -ForegroundColor Yellow

$cssContent = Get-Content "$root\src\index.css" -Raw
# Extract variables section
$variablesContent = @"
/* ============================================
   THEME DESIGN TOKENS (light / dark)
   Used by plain CSS files across the app via var(--token)
   ============================================ */
:root {
  --bg-page: black;
  --bg-surface: #ffffff;
  --bg-surface-2: #f8f9fa;
  --bg-elevated: #ffffff;
  --bg-muted: #f3f4f6;
  --bg-code: #1f2937;

  --border-color: #e5e7eb;
  --border-strong: #d1d5db;

  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;
  --text-on-accent: #ffffff;

  --accent: #4f46e5;
  --accent-hover: #4339ca;
  --accent-soft: rgba(79, 70, 229, 0.08);
  --accent-soft-border: rgba(79, 70, 229, 0.2);

  --shadow-color: rgba(15, 23, 42, 0.08);
  --shadow-color-strong: rgba(15, 23, 42, 0.14);

  color-scheme: light;
}

html.dark {
  --bg-page: #0c0f17;
  --bg-surface: #161a26;
  --bg-surface-2: #1b2030;
  --bg-elevated: #1b2030;
  --bg-muted: #20263a;
  --bg-code: #0c0f17;

  --border-color: #262c3f;
  --border-strong: #333b52;

  --text-primary: #f3f4f6;
  --text-secondary: #b6bccc;
  --text-muted: #7a8296;
  --text-on-accent: #ffffff;

  --accent: #6366f1;
  --accent-hover: #818cf8;
  --accent-soft: rgba(99, 102, 241, 0.16);
  --accent-soft-border: rgba(99, 102, 241, 0.32);

  --shadow-color: rgba(0, 0, 0, 0.35);
  --shadow-color-strong: rgba(0, 0, 0, 0.5);

  color-scheme: dark;
}
"@

WriteFile "$root\src\styles\variables.css" $variablesContent

$globalsContent = @"
/* Global reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 999px;
}
html.dark ::-webkit-scrollbar-thumb {
  background: #3a4258;
}
"@
WriteFile "$root\src\styles\globals.css" $globalsContent

$utilitiesContent = "/* Utility classes for the TemplateHub application */"
WriteFile "$root\src\styles\utilities.css" $utilitiesContent

$typographyContent = "/* Typography styles for the TemplateHub application */"
WriteFile "$root\src\styles\typography.css" $typographyContent

Write-Host "  [OK] Styles done" -ForegroundColor Green

# ============================================================
# PHASE 13 - COPY DOCS AND SUPABASE
# ============================================================
Write-Host "`n[Phase 13] Copying docs and supabase schema..." -ForegroundColor Yellow

if (Test-Path "$root\BUTTONS_COLLECTION.md") { CopyFile "$root\BUTTONS_COLLECTION.md" "$root\docs\BUTTONS_COLLECTION.md" }
if (Test-Path "$root\BUTTONS_QUICK_REFERENCE.md") { CopyFile "$root\BUTTONS_QUICK_REFERENCE.md" "$root\docs\BUTTONS_QUICK_REFERENCE.md" }
if (Test-Path "$root\supabase-schema.sql") { CopyFile "$root\supabase-schema.sql" "$root\supabase\schema.sql" }

Write-Host "  [OK] Docs and supabase done" -ForegroundColor Green

Write-Host "`n=== Migration Complete! ===" -ForegroundColor Cyan
Write-Host "Next steps:"
Write-Host "  1. Run 'npm run build' to check for errors"
Write-Host "  2. Fix any remaining import issues"
Write-Host "  3. Delete old directories after validation"
