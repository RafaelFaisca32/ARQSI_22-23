using System;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using Moq;
using DDDSample1.Domain.ValueObjects;

namespace ListPendingFriendshipRequestsControllerTest
{
    public class ListPendingFriendshipRequestsControllerTest
    {
        [Fact]
        public async Task ListPendingFriendshipRequestTest()
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
                
            var friendship = new FriendshipDto()
            {
                Id = new Guid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "PENDING"
            };

            List<FriendshipDto> list = new List<FriendshipDto>();
            list.Add(friendship);
                        
            var friendServiceMock = new Mock<IFriendshipService>();
            friendServiceMock.Setup(workblockRepo => workblockRepo.GetPendingFriendshipsFromAsync(It.IsAny<UserId>())).ReturnsAsync(list);
            
            var controller = new ListPendingFriendshipRequestsController(friendServiceMock.Object);
            var result = controller.ListPendingFriendshipRequest(userA.Id.ToString());
            Assert.Equal(result.Result.Value, list);        
        }

        /*[Fact]
        public async Task ListPendingFriendshipRequestTest_Fail()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("teste"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("teste"), Tag = tags, Friendship = new List<string>()
            };
                
            var friendship = new FriendshipDto()
            {
                Id = new Guid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA.Id.ToString(), FriendB = userB.Id.ToString(), FriendshipState = "PENDING"
            };

            List<FriendshipDto> list = new List<FriendshipDto>();
            list.Add(friendship);
                        
            var friendServiceMock = new Mock<IFriendshipService>();
            friendServiceMock.Setup(workblockRepo => workblockRepo.GetPendingFriendshipsFromAsync(It.IsAny<FriendId>())).ReturnsAsync(list);
            
            var controller = new ListPendingFriendshipRequestsController(friendServiceMock.Object);
            var result = controller.ListPendingFriendshipRequest(userA.Id.ToString());
            Assert.NotEqual(result.Result.Value, list);        
        }*/
    }
}
