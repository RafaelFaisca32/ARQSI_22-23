using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace EditTagConnectionStrengthControllerTest
{
    public class UnitTest1
    {
        [Fact]
        public async Task EditTagConnectionStrengthTest()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };

            var friendship = new FriendshipDto
            {
                Id = new Guid("033f8012-77a0-4fbf-9566-9af956d477d7"), RelationTag = "teste passou",
                ConnectionStrength = "8",
                RelationshipStrength = "6", FriendA = userA,
                FriendB = userB, FriendshipState = "active"
            };
            const string tag = "teste passou";
            const string conStrength = "8";
            var serviceMock = new Mock<IFriendshipService>();
            //serviceMock.Setup(workblockRepo => workblockRepo.GetByIdAsync(It.IsAny<FriendshipId>())).ReturnsAsync(friendship);
            serviceMock.Setup(workblockRepo => workblockRepo.ChangeRelationshipTagConnectionStrength(It.IsAny<string>(),It.IsAny<string>(),It.IsAny<string>())).ReturnsAsync(friendship);            
            var controller = new EditTagConnectionStrengthController(serviceMock.Object);
            var actionResult = await controller.ChangeRelationshipTag(friendship.Id.ToString(), tag, conStrength);
            var result = actionResult.Result as OkObjectResult;
            Assert.Equal(result.Value, friendship);


        }
    }
}
