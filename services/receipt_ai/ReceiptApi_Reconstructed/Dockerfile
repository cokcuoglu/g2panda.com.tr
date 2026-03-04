FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["ReceiptApi.csproj", "./"]
RUN dotnet restore "ReceiptApi.csproj"
COPY . .
RUN dotnet publish "ReceiptApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "ReceiptApi.dll"]
