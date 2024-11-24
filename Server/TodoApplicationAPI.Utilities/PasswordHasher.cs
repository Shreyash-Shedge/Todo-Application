using Microsoft.AspNetCore.Identity;


namespace TodoApplicationAPI.Utilities
{
    public static class PasswordHasher
    {
        private static readonly PasswordHasher<object> _hasher = new();

        public static string HashPassword(string plainPassword)
        {
            return _hasher.HashPassword(null, plainPassword);
        }

        public static bool VerifyPassword(string plainPassword, string hashedPassword)
        {
            return _hasher.VerifyHashedPassword(null, hashedPassword, plainPassword) == PasswordVerificationResult.Success;
        }
    }
}
