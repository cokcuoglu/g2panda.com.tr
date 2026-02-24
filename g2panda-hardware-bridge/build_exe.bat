@echo off
SETLOCAL EnableDelayedExpansion

echo ========================================================
echo G2Panda Hardware Bridge - Build Utility (Single-File EXE)
echo ========================================================

:: Check if dotnet is installed
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] .NET SDK bulunamadı! Lütfen .NET 8 SDK'nın yüklü olduğundan emin olun.
    pause
    exit /b %errorlevel%
)

:: Set paths
SET "SRC_DIR=%~dp0src\G2Panda.HardwareBridge"
SET "OUTPUT_DIR=%~dp0release"

echo [1/3] Temizleniyor...
if exist "%OUTPUT_DIR%" rd /s /q "%OUTPUT_DIR%"
mkdir "%OUTPUT_DIR%"

echo [2/3] Yayınlanıyor (Publishing)... 
echo Bu işlem bir dakika sürebilir (Self-contained, Single-File)...

cd /d "%SRC_DIR%"
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:PublishReadyToRun=true -o "%OUTPUT_DIR%"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build işlemi başarısız oldu!
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Tamamlandı!
echo.
echo ========================================================
echo İşlem Başarılı!
echo EXE Konumu: %OUTPUT_DIR%\G2Panda.HardwareBridge.exe
echo ========================================================
echo.
echo Bu dosyayı kullanıcıya gönderebilirsiniz. 
echo Not: Servis olarak kurmak için yönetici olarak çalıştırılması önerilir.
echo.
pause
