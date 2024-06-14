using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphController : ControllerBase
    {
        private readonly IFriendshipService _service;
        private readonly IUserService _userService;

        public GraphController(IFriendshipService service, IUserService service1)
        {
            _service = service;
            _userService = service1;
        }

        //GET: api/Graph/CommonFriends/id1/id2
        [HttpGet("CommonFriends/{id}/{friendName}")]
        public async Task<ActionResult<List<List<FriendshipDto>>>> GraphCommonFriends(string id, string friendName)
        {
            var u = await _userService.GetByIdAsync(new UserId(id));
            var friend = await _userService.GetByNameAsync(friendName);
            
            if (u == null || friend == null)
            {
                return NotFound();
            }

            return await _service.GetCommonFriendshipsFromAsync(u, friend);
        }

        // GET: api/Graph
        [HttpGet("{id}/{nivel}/GraphFriendshipsPrint")]
        public async Task<ActionResult<List<List<FriendshipDto>>>> GraphFriendshipsPrint(string id, int nivel)
        {
            List<List<FriendshipDto>> llf = new List<List<FriendshipDto>>();
            llf.Add(await _service.GetFriendshipsFromAsync(new UserId(id)));
            return await _service.GetNetwork(llf,nivel);
        }
    }
}