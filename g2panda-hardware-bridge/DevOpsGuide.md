# G2Panda Hardware Bridge - DevOps & Deployment Guide

## 1. Build & Publish instructions

To build the project for production:

```powershell
cd src/G2Panda.HardwareBridge
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o ../../publish
```

## 2. MSI Generation

1. Install **WiX Toolset v3.11** or higher.
2. Open the solution in Visual Studio or use the CLI.
3. If using CLI:
```powershell
candle.exe Product.wxs -dG2Panda.HardwareBridge.TargetDir="../../publish/"
light.exe Product.dto -o G2PandaHardwareBridge.msi
```

## 3. Hosting the Installer

Place the `.msi` file in your static file server (IIS/Nginx) under your backend:

**IIS Example Configuration:**
Add a MIME type for `.msi`: `application/octet-stream`

```xml
<configuration>
   <system.webServer>
      <staticContent>
         <mimeMap fileExtension=".msi" mimeType="application/octet-stream" />
      </staticContent>
   </system.webServer>
</configuration>
```

## 4. Versioning Strategy

- **Major.Minor.Patch** (SemVer)
- Use Git Tags to trigger CI/CD pipelines (GitHub Actions / Azure DevOps).
- The bridge sends its version in the registration payload to allowed central version tracking.

## 5. Auto-Update Design (Optional)

1. The Service checks a small XML/JSON file on `g2panda.com/hardware-version` every 24 hours.
2. If Local Version < Remote Version:
   - Download new `.msi`.
   - Execute `msiexec /i newsetup.msi /quiet`.
   - The installer handles service stop/start automatically as configured in `Product.wxs`.
