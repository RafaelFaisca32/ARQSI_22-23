using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListPendingFriendshipRequestsController : ControllerBase
    {
        private readonly IFriendshipService _friendshipService;

        public ListPendingFriendshipRequestsController(IFriendshipService friendshipService)
        {
            _friendshipService = friendshipService;
        }

        // GET: api/ListPendingFriendshipRequests/id
        [HttpGet("{id}")]
        public async Task<ActionResult<List<FriendshipDto>>> ListPendingFriendshipRequest(string id)
        {
            return await _friendshipService.GetPendingFriendshipsFromAsync(new UserId(id));
        }
    }
}