# 1. Estágio de Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia e restaura dependências
COPY ["ReHope.csproj", "./"]
RUN dotnet restore "ReHope.csproj"

# Copia todo o código e gera os arquivos compilados
COPY . .
RUN dotnet publish "ReHope.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 2. Estágio de Runtime (Imagem leve para produção)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "ReHope.dll"]