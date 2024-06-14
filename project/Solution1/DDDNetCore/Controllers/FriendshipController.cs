using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private readonly IFriendshipService _service;
        private readonly IUserService _userService;

        public FriendshipController(IFriendshipService service, IUserService serv)
        {
            _service = service;
            _userService = serv;
        }

        // GET: api/Friendship
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FriendshipDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Friendship/id
        [HttpGet("{id}")]
        public async Task<ActionResult<FriendshipDto>> GetGetById(String id)
        {
            var f = await _service.GetByIdAsync(new FriendshipId(id));

            if (f == null)
            {
                return NotFound();
            }

            return f;
        }

        // POST: api/Friendship
        [HttpPost]
        public async Task<ActionResult<FriendshipDto>> Create(CreateFriendshipDto dto)
        {
            var f = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {id = f.Id}, f);
        }


        // PUT: api/Friendship/F5
        [HttpPut("{id}")]
        public async Task<ActionResult<FriendshipDto>> Update(Guid id, FriendshipDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var f = await _service.UpdateAsync(dto);

                if (f == null)
                {
                    return NotFound();
                }

                return Ok(f);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/Friendship/F5/accept
        [HttpPut("{id}/accept")]
        public async Task<ActionResult<FriendshipDto>> AcceptFriendship(Guid id)
        {
            try
            {
                var f = await _service.changeFriendshipState(id, new FriendshipState("Accepted"));
                // add that friendship to the user friendshiplist
                await _userService.AddFriendship(f.FriendA.Id.ToString(), f.Id.ToString());
                var createdto = new CreateFriendshipDto("None"
                    , "0", "0",
                    f.FriendB.Id.ToString(), f.FriendA.Id.ToString()
                    , "PENDING");
                var dto = await _service.AddAsync(createdto);
                var f1 = await _service.changeFriendshipState(dto.Id, new FriendshipState("Accepted"));
                await _userService.AddFriendship(dto.FriendA.Id.ToString(), dto.Id.ToString());
                if (f == null)
                {
                    return NotFound();
                }

                return Ok(f);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/Friendship/F5/reject
        [HttpPut("{id}/reject")]
        public async Task<ActionResult<FriendshipDto>> RejectFriendship(Guid id)
        {
            try
            {
                var f = await _service.changeFriendshipState(id, new FriendshipState("Rejected"));

                if (f == null)
                {
                    return NotFound();
                }

                return Ok(f);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // GET: api/Friendship/TagCloud
        [HttpGet("TagCloud")]
        public async Task<ActionResult<List<TagCloud>>> GetTagCloudFromFriendships()
        {
            var tagCloud = await _service.GetTagCloudFromFriendships();

            if (tagCloud == null)
            {
                return NotFound();
            }

            return tagCloud;
        }
        
        // GET: api/Friendship/TagCloud/id
        [HttpGet("TagCloud/{id}")]
        public async Task<ActionResult<List<TagCloud>>> GetTagCloudFromUserFriendships(String id)
        {
            var tagCloud = await _service.GetTagCloudFromUserFriendships(new UserId(id));

            if (tagCloud == null)
            {
                return NotFound();
            }

            return tagCloud;
        }
        //GET: api/Friendship/RelationStrength/id/name
        [HttpGet("RelationStrength/{id}/{name}")]
        public async Task<ActionResult<string>> GetRelationStrengthBetweenUsers(string id, string name)
        {
            var friendship = await _service.GetRelationStrengthBetweenUsers(id,name);
            return friendship.RelationshipStrength.Number;
        }

        // Inactivate: api/Friendship/F5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FriendshipDto>> SoftDelete(Guid id)
        {
            var f = await _service.InactivateAsync(new FriendshipId(id));

            if (f == null)
            {
                return NotFound();
            }

            return Ok(f);
        }

        // DELETE: api/Friendship/F5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<FriendshipDto>> HardDelete(Guid id)
        {
            try
            {
                var f = await _service.DeleteAsync(new FriendshipId(id));

                if (f == null)
                {
                    return NotFound();
                }

                return Ok(f);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}