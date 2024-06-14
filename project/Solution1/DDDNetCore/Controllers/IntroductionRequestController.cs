using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users; 
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.ValueObjects;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Introductions;
using System.Collections.Generic;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntroductionRequestController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IIntroductionService _introductionService;

        public IntroductionRequestController(IUserService userService, IIntroductionService introductionService){
            _userService = userService;
            _introductionService = introductionService;
        } 


        // GET: api/IntroductionRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IntroductionDto>>> GetAll()
        {
            return await _introductionService.GetAllAsync();
        }

        // GET: api/IntroductionRequest/5                
        [HttpGet("{id}")]
        public async Task<ActionResult<IntroductionDto>> GetById(string id)
        {
            var prod = await _introductionService.GetByIdAsync(new IntroductionId(id));

            if (prod == null)
            {
                return NotFound();
            }

            return prod;
        }

        // GET: api/IntroductionRequest/pending/{userId}
        [HttpGet("pending/{id}")]
        public async Task<ActionResult<List<IntroductionNames>>> ListPendingIntroductionRequest(string id)
        {
            return await _introductionService.GetPendingIntroductionsByFriendAsync(new FriendId(id));
        }        


        // POST: api/IntroductionRequest
        [HttpPost]
        public async Task<ActionResult<IntroductionDto>> CreateIntroductionRequest(CreatingIntroductionDto creatingIntroductionDto)
        {

            try
            {
                // when creating a introduction request it starts with the pending state
                // creatingIntroductionDto.state= new State("PENDING");    
                var f = await _introductionService.AddAsync(creatingIntroductionDto);
                
                if (f == null)
                {
                    return NotFound();
                }
                else
                {
                    return CreatedAtAction(nameof(GetById), new {id = f.Id}, f);
                }
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {ex.Message});
            }
        }



        // PUT: api/IntroductionRequest/F5/accept
        [HttpPut("{id}/accept")]
        public async Task<ActionResult<IntroductionDto>> AcceptIntroductionRequest(string id)
        {
            try
            {
                var f = await _introductionService.changeIntroductionState(new Guid(id), new State("Accepted"));
                
                if (f == null)
                {
                    return NotFound();
                }
                return Ok(f);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PUT: api/Friendship/F5/reject
        [HttpPut("{id}/reject")]
        public async Task<ActionResult<IntroductionDto>> RejectIntroductionRequest(string id)
        {
            try
            {
                var f = await _introductionService.changeIntroductionState(new Guid(id), new State("Rejected"));
                
                if (f == null)
                {
                    return NotFound();
                }
                return Ok(f);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }        



    }
}