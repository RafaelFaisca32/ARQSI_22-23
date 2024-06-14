using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SugestedFriendshipsController : ControllerBase
    {
        private readonly IUserService _service;

        public SugestedFriendshipsController(IUserService service)
        {
            _service = service;
        }
    //Get: api/SugestedFriendships/id
    [HttpGet("{id}")]
 
     public async Task<ActionResult<List<UserDto>>> SugestedFriendships (String id)
     {
        UserId idd= new UserId(id);
        UserDto user = await _service.GetByIdAsync(idd);
        if (user.Friendship.Count>0)
        {
            return ValidationProblem();
        }
        List<UserDto> allUsersDtos = await _service.GetAllAsync();
        var sugestedFriendships = await _service.SugestedFriendships(idd,allUsersDtos);
        return sugestedFriendships;
 
     }
    
        
    }
}