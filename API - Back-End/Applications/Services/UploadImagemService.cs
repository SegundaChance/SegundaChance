using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace ReHope.Applications.Services
{
    public class UploadImagemService
    {
        private readonly Cloudinary _cloudinary;

        public UploadImagemService(IConfiguration configuration)
        {
            var account = new Account(
                configuration["Cloudinary:CloudName"],
                configuration["Cloudinary:ApiKey"],
                configuration["Cloudinary:ApiSecret"]
            );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadImagemAsync(IFormFile imagem)
        {
            if (imagem == null || imagem.Length == 0)
            {
                throw new Exception("Nenhuma imagem foi enviada.");
            }

            using var stream = imagem.OpenReadStream();

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(imagem.FileName, stream),
                Transformation = new Transformation().Width(1000).Crop("limit") // Limita a largura a 1000px, mantendo a proporção")
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            return uploadResult.SecureUrl?.ToString();
        }
    }
}
