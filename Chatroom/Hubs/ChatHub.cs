using System;
using System.Linq;
using Chatroom.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Chatroom.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatContext context;

        public ChatHub(ChatContext context)
        {
            this.context = context;
        }

        public async Task StartPrivateChat(string myName, string username, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("createOrOpenPv", myName, Context.ConnectionId);
        }

        public async Task JoinChat(string name)
        {
            AddUser(name);
            await Clients.Client(Context.ConnectionId).SendAsync("setConnectionDd", Context.ConnectionId);
            await Clients.All.SendAsync("refreshusers", context.Users.ToArray());
        }
        //SendToPv", connectionId, senderName, message)
        public async Task SendToPV(string connectionId,string senderName,string message)
        {
            await Clients.Client(connectionId).SendAsync("RecievePvMessage",Context.ConnectionId, senderName,message);
            await Clients.Client(Context.ConnectionId).SendAsync("RecievePvMessage",connectionId, senderName,message);
        }
        public async Task SendToAll(string name,string message)
        {
            await Clients.All.SendAsync("RecieveMessage", name,message);
        }

        public override Task OnConnectedAsync()
        {
            Clients.All.SendAsync("refreshusers", context.Users.ToArray());
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var user = context.Users.Where(c => c.ConnectionId == Context.ConnectionId).FirstOrDefault();
            context.Users.Remove(user);
            context.SaveChanges();
            Clients.All.SendAsync("refreshusers", context.Users.ToArray());

            return base.OnDisconnectedAsync(exception);
        }
        private void AddUser(string name)
        {
            context.Users.Add(new User
            {
                UserId = Guid.NewGuid().ToString(),
                ConnectionId = Context.ConnectionId,
                UserName = name
            });

            context.SaveChanges();
        }
    }
}
