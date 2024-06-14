using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Projeto.Domain.Users;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        
        private readonly IFriendshipService _friendshipService;

        public UserController(IUserService service, IFriendshipService fService)
        {
            _service = service;
            _friendshipService = fService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // POST: api/Login
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(CreatingUserDto dto)
        {
            try
            {
                var us = await _service.GetAllAsync();
                var user = await _service.GetLogin(us, dto);

                if (user is null)
                {
                    return NotFound();
                }

                return CreatedAtAction(nameof(GetGetById), new {id = user.Id}, user);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // GET: api/User/F1
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetGetById(String id)
        {
            var us = await _service.GetByIdAsync(new UserId(id));

            if (us == null)
            {
                return NotFound();
            }

            return us;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserDto>> Create(CreatingUserDto dto)
        {
            var us = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new {id = us.Id}, us);
        }

        // GET: api/User/NetworkStrength/id
        [HttpGet("NetworkStrength/{id}")]
        public async Task<ActionResult<int>> GetNetworkStrengthByUserId(String id)
        {
            var u = await _service.GetByIdAsync(new UserId(id));
            if (u == null)
            {
                return NotFound();
            }

            return await _friendshipService.getNetWorkStrengthByUser(u);
        }
        // GET: api/User/TagCloud
        [HttpGet("TagCloud")]
        public async Task<ActionResult<List<TagCloud>>> GetTagCloudFromUsers()
        {
            var tagCloud = await _service.GetTagCloudFromUsers();

            if (tagCloud == null)
            {
                return NotFound();
            }

            return tagCloud;
        }
        
        // GET: api/User/TagCloud/id
        [HttpGet("TagCloud/{id}")]
        public async Task<ActionResult<List<TagCloud>>> GetTagCloudFromUser(String id)
        {
            var tagCloud = await _service.GetTagCloudFromUser(id);

            if (tagCloud == null)
            {
                return NotFound();
            }

            return tagCloud;
        }


        // GET: api/User/Posts/email
        [HttpGet("Posts/{email}")]
        public async Task<ActionResult<UserDto>> GetEmailFromUser(String email)
        {
            var user = await _service.GetByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        // // PUT: api/User/F5
        // [HttpPut("{id}")]
        // public async Task<ActionResult<UserDto>> Update(Guid id, UserDto dto)
        // {
        //     if (id != dto.Id)
        //     {
        //         return BadRequest();
        //     }

        //     try
        //     {
        //         var us = await _service.UpdateAsync(dto);

        //         if (us == null)
        //         {
        //             return NotFound();
        //         }

        //         return Ok(us);
        //     }
        //     catch (BusinessRuleValidationException ex)
        //     {
        //         return BadRequest(new {Message = ex.Message});
        //     }
        // }

        // Inactivate: api/User/F5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDto>> SoftDelete(Guid id)
        {
            var us = await _service.InactivateAsync(new UserId(id));

            if (us == null)
            {
                return NotFound();
            }

            return Ok(us);
        }

        // DELETE: api/User/F5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<UserDto>> HardDelete(Guid id)
        {
            try
            {
                var us = await _service.DeleteAsync(new UserId(id));

                if (us == null)
                {
                    return NotFound();
                }

                return Ok(us);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
    }
}