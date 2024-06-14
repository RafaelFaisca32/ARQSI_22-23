using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EditTagConnectionStrengthController : Controller
    {
        private readonly IFriendshipService _friendshipService;
        private readonly IUserService _userService;

        public EditTagConnectionStrengthController(IFriendshipService friendshipService, IUserService userService)
        {
            _friendshipService = friendshipService;
            _userService = userService;
        }

        // Put: api/EditTagConnectionStrength/id/name/newTag/conStrength
        [HttpPut("{id}/{name}/{newTag}/{conStrength}")]
        public async Task<ActionResult<FriendshipDto>> ChangeRelationshipTag(string id,string name, string newTag, string conStrength)
        {
            try
            {
                int validation;
                Int32.TryParse(conStrength, out validation);
                if (validation < 0 || validation > 10)
                {
                    return ValidationProblem();
                }
                var friendship2 = await _friendshipService.ChangeRelationshipTagConnectionStrength(id,name, newTag,conStrength);
                if (friendship2 == null)
                {
                    return NotFound();
                }
                return Ok(friendship2);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {ex.Message});
            }

            

        }

    }
}