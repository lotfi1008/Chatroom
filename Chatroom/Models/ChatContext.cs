using Microsoft.EntityFrameworkCore;

namespace Chatroom.Models
{
    public class ChatContext : DbContext
    {
        public ChatContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
