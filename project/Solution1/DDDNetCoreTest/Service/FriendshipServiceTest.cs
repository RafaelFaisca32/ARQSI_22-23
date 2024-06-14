using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using Moq;
using Xunit;

namespace DDDNetCoreTest.Service
{
    public class FriendshipServiceTest
    {
        [Fact]
        public async Task GetAllAsyncTest()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
                
            var friendship = new Friendship("None", "0", "0", new User(userA.Name,userA.Password,userA.BirthDate,userA.Email,userA.PhoneNumber,userA.State,userA.Tag,userA.Friendship), new User(userB.Name,userB.Password,userB.BirthDate,userB.Email,userB.PhoneNumber,userB.State,userB.Tag,userB.Friendship), "PENDING");

            List<Friendship> list = new List<Friendship>();
            list.Add(friendship);

            var friendshipDto = new FriendshipDto()
            {
                Id = friendship.Id.AsGuid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "PENDING"
            };

            List<FriendshipDto> listDto = new List<FriendshipDto>();
            listDto.Add(friendshipDto);

            var serviceMock = new Mock<IFriendshipRepository>();
            serviceMock.Setup(Repo => Repo.GetAllFriendshipsAsync()).ReturnsAsync(list);
            var unitMock = new Mock<IUnitOfWork>();
            var controller = new FriendshipService(unitMock.Object, serviceMock.Object, null);
            
            var result = controller.GetAllAsync();
            for (int i = 0; i < result.Result.Count; i++) 
                Assert.Equal(result.Result[i].Id, listDto[i].Id);
        }

        [Fact]
        public async Task GetByIdAsyncTest()
        {            
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };

            var friendship = new Friendship("None", "0", "0", new User(userA.Name,userA.Password,userA.BirthDate,userA.Email,userA.PhoneNumber,userA.State,userA.Tag,userA.Friendship), new User(userB.Name,userB.Password,userB.BirthDate,userB.Email,userB.PhoneNumber,userB.State,userB.Tag,userB.Friendship), "PENDING");
                
            var friendshipDto = new FriendshipDto()
            {
                Id = friendship.Id.AsGuid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "PENDING"
            };

            var serviceMock = new Mock<IFriendshipRepository>();
            serviceMock.Setup(Repo => Repo.GetFriendshipByIdAsync(It.IsAny<FriendshipId>())).ReturnsAsync(friendship);
            var unitMock = new Mock<IUnitOfWork>();
            var controller = new FriendshipService(unitMock.Object, serviceMock.Object, null);
            
            var result = controller.GetByIdAsync(friendship.Id);
            Assert.Equal(result.Result.Id, friendshipDto.Id);
        }

        /*[Fact]
        public async Task GetPendingFriendshipsFromAsyncTest()
        {            
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };

            var friendship = new Friendship("None", "0", "0", new User(userA.Name,userA.Password,userA.BirthDate,userA.Email,userA.PhoneNumber,userA.State,userA.Tag,userA.Friendship), new User(userB.Name,userB.Password,userB.BirthDate,userB.Email,userB.PhoneNumber,userB.State,userB.Tag,userB.Friendship), "PENDING");

            List<Friendship> list = new List<Friendship>();
            list.Add(friendship);
                
            var friendshipDto = new FriendshipDto()
            {
                Id = friendship.Id.AsGuid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "PENDING"
            };

            List<FriendshipDto> listDto = new List<FriendshipDto>();
            listDto.Add(friendshipDto);

            var serviceMock = new Mock<IFriendshipRepository>();
            serviceMock.Setup(Repo => Repo.GetAllFriendshipsAsync()).ReturnsAsync(list);
            var unitMock = new Mock<IUnitOfWork>();
            var controller = new FriendshipService(unitMock.Object, serviceMock.Object, null);
            
            var result = controller.GetPendingFriendshipsFromAsync(friendship.FriendA.Id);
            for (int i = 0; i < result.Result.Count; i++) 
                Assert.Equal(result.Result[i], listDto[i]);
        }*/
        
        [Fact]
        public async Task GetFriendshipsFromAsyncTest()
        {            
            var tags = new List<string>();
            tags.Add(new string("teste"));
            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };

            var friendship = new Friendship("None", "0", "0", new User(userA.Name,userA.Password,userA.BirthDate,userA.Email,userA.PhoneNumber,userA.State,userA.Tag,userA.Friendship), new User(userB.Name,userB.Password,userB.BirthDate,userB.Email,userB.PhoneNumber,userB.State,userB.Tag,userB.Friendship), "PENDING");

            List<Friendship> list = new List<Friendship>();
            list.Add(friendship);
                
            var friendshipDto = new FriendshipDto()
            {
                Id = friendship.Id.AsGuid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "PENDING"
            };

            List<FriendshipDto> listDto = new List<FriendshipDto>();
            listDto.Add(friendshipDto);

            var serviceMock = new Mock<IFriendshipRepository>();
            serviceMock.Setup(Repo => Repo.GetAllFriendshipsAsync()).ReturnsAsync(list);
            var unitMock = new Mock<IUnitOfWork>();
            var controller = new FriendshipService(unitMock.Object, serviceMock.Object, null);
            
            var result = controller.GetFriendshipsFromAsync(new UserId(friendship.FriendA.Id.Value));
            for (int i = 0; i < result.Result.Count; i++) 
                Assert.Equal(result.Result[i].Id, listDto[i].Id);
        }

        [Fact]
        public async Task ChangeRelationshipTagConnectionStrengthTest()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));
            const string conStrength = "5";
            const string tag = "new tag";
            var user = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Joyful",new List<string>(), new List<string>());
            var user2 = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Joyful",new List<string>(), new List<string>());
            
            var userA = new UserDto()
            {                
                Id = user.Id.AsGuid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };
            
            var userB = new UserDto()
            {                
                Id = user2.Id.AsGuid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteB"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Joyful"), Tag = tags, Friendship = new List<string>()
            };
            var friendship = new Friendship("None", "0", "0", new User(userA.Name,userA.Password,userA.BirthDate,userA.Email,userA.PhoneNumber,userA.State,userA.Tag,userA.Friendship), new User(userB.Name,userB.Password,userB.BirthDate,userB.Email,userB.PhoneNumber,userB.State,userB.Tag,userB.Friendship), "active");

            var friendshipDto = new FriendshipDto()
            {
                Id = friendship.Id.AsGuid(), RelationTag = tag, ConnectionStrength = conStrength, RelationshipStrength = "0", FriendA = userA, FriendB = userB, FriendshipState = "active"
            };
            var serviceMock = new Mock<IFriendshipRepository>();
            serviceMock.Setup(Repo => Repo.GetFriendshipByIdAsync(friendship.Id)).ReturnsAsync(friendship);
            var unitMock = new Mock<IUnitOfWork>();
            var controller = new FriendshipService(unitMock.Object, serviceMock.Object,null);

            var expected = controller.ChangeRelationshipTagConnectionStrength(friendship.Id.AsGuid().ToString(), tag, conStrength);
            Assert.Equal(expected.Result.RelationTag,friendshipDto.RelationTag);
            Assert.Equal(expected.Result.ConnectionStrength,friendshipDto.ConnectionStrength);


        }
    }    
}