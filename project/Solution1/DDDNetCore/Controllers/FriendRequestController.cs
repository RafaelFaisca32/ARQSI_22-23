using System;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendRequestController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IFriendshipService _friendshipService;

        public FriendRequestController(IUserService userService, IFriendshipService friendshipService){
            _userService = userService;
            _friendshipService = friendshipService;
        } 

        // POST: api/FriendRequest/user
        [HttpPost("{user}/{name}")]
        public async Task<ActionResult<FriendshipDto>> CreateFriendshipRequest(string user, string name)
        {
            var userA = await _userService.GetByIdAsync(new UserId(user));
            var userB = await GetUserByName(name);
            
            if (userA == null)
            {
                return NotFound();
            }
            
            if (userB == null)
            {
                return NotFound();
            }

            try
            {
                // when creating a friendship it starts with the pending state
                var friendshipDto = new CreateFriendshipDto("None", "0", "0", userA.Id.ToString(),userB.Value.Id.ToString(), "PENDING");
                var f = await _friendshipService.AddAsync(friendshipDto);
                
                if (f == null)
                {
                    return NotFound();
                }
                
                CreatedAtAction(nameof(GetGetById), new {id = f.Id}, f);

                return Ok(f);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {ex.Message});
            }
        }

        // Get: api/FriendRequest/name
        [HttpGet("{name}")]
        public async Task<ActionResult<UserDto>> GetUserByName(string name)
        {
            var us = await _userService.GetByNameAsync(name);
            
            if (us == null)
            {
                return NotFound();
            }
            
            return new UserDto {Id = us.Id, Name = us.Name, Password = us.Password, BirthDate = us.BirthDate, Email = us.Email, PhoneNumber = us.PhoneNumber, State = us.State, Tag = us.Tag};
        }
        
        /// GET: api/FriendRequest/1
        [HttpGet]
        public async Task<ActionResult<FriendshipDto>> GetGetById(String id)
        {
            var f = await _friendshipService.GetByIdAsync(new FriendshipId(id));

            if (f == null)
            {
                return NotFound();
            }

            return f;
        }

    }
}