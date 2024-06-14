using System;
using Xunit;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Users;
using Moq;
using Projeto.Domain.Users;

namespace FriendRequestControllerTest
{
    public class FriendRequestControllerTest
    {
        [Fact]
        public async Task CreateFriendshipRequestTest()
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
            
            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(workblockRepo => workblockRepo.AddAsync(It.IsAny<CreatingUserDto>())).ReturnsAsync(userA);
            userServiceMock.Setup(workblockRepo => workblockRepo.AddAsync(It.IsAny<CreatingUserDto>())).ReturnsAsync(userB);
            
            var friendServiceMock = new Mock<IFriendshipService>();
            friendServiceMock.Setup(workblockRepo => workblockRepo.GetByIdAsync(It.IsAny<FriendshipId>())).ReturnsAsync(friendship);
            friendServiceMock.Setup(workblockRepo => workblockRepo.AddAsync(It.IsAny<CreateFriendshipDto>())).ReturnsAsync(friendship);
            
            var controller = new FriendRequestController(userServiceMock.Object, friendServiceMock.Object);
            var result = controller.CreateFriendshipRequest(userA.Id.ToString(),userB.Name);
            Assert.Equal(result.Result.Value, It.IsAny<FriendshipDto>());
        }

        [Fact]
        public async Task CreateFriendshipRequestTest_Fail()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("123"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("456"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };
                
            var friendship = new FriendshipDto()
            {
                Id = new Guid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "PENDING"
            };
            
            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(workblockRepo => workblockRepo.AddAsync(It.IsAny<CreatingUserDto>())).ReturnsAsync(userA);
            userServiceMock.Setup(workblockRepo => workblockRepo.AddAsync(It.IsAny<CreatingUserDto>())).ReturnsAsync(userB);
            
            var friendServiceMock = new Mock<IFriendshipService>();
            friendServiceMock.Setup(workblockRepo => workblockRepo.GetByIdAsync(It.IsAny<FriendshipId>())).ReturnsAsync(friendship);
            friendServiceMock.Setup(workblockRepo => workblockRepo.AddAsync(It.IsAny<CreateFriendshipDto>())).ReturnsAsync(friendship);
            
            var controller = new FriendRequestController(userServiceMock.Object, friendServiceMock.Object);
            var result = controller.CreateFriendshipRequest(userA.Id.ToString(),userB.Name);            
            Assert.NotEqual(result.Result.Value,friendship);
        }

        [Fact]
        public async Task GetUserByNameTest(){

            var tags = new List<string>();
            tags.Add(new string("teste"));

            var user = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };

            var userServiceMock = new Mock<IUserService>();
            userServiceMock.Setup(Repo => Repo.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(user);

            var controller = new FriendRequestController(userServiceMock.Object, null);
            
            var result = controller.GetUserByName(user.Name);
            Assert.Equal(result.Result.Value.Name, user.Name);
        }

        [Fact]
        public async Task GetGetByIdTest(){

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
            
            var friendServiceMock = new Mock<IFriendshipService>();
            friendServiceMock.Setup(workblockRepo => workblockRepo.GetByIdAsync(It.IsAny<FriendshipId>())).ReturnsAsync(friendship);
            
            var controller = new FriendRequestController(null, friendServiceMock.Object);
            
            var result = controller.GetGetById(friendship.Id.ToString());
            Assert.Equal(result.Result.Value, friendship);
        }         

    }
}
