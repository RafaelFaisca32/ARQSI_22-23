using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Moq;
using Xunit;

namespace DDDNetCoreTest.Service
{
    public class UserServiceTest
    {

        [Fact]
        public async Task AllSyncTest(){
            
            var user = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Hopeful",
                new List<string>(), new List<string>());

             var tagList = user.Tag.Select(tag => tag.Tag1).ToList();
             var friendshipList = user.Friendship.Select(friend => friend.FriendId1).ToList();

            var dto = new UserDto()
            {
                BirthDate = user.BirthDate.birthD, Email = user.Email.Address, Friendship = friendshipList,
                Id = user.Id.AsGuid(),
                Name = user.Name.Name1, Password = user.Password.Pass, State = user.State.State1, PhoneNumber = user.PhoneNumber.Number,
                Tag = tagList
            };

            List<User> list = new List<User>();
            list.Add(user);
            List<UserDto> listDto = new List<UserDto>();
            var serviceMock = new Mock<IUserRepository>();
            serviceMock.Setup(Repo => Repo.GetAllUsersAsync()).ReturnsAsync(list);
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object,serviceMock.Object);
            var result = service.GetAllAsync();
            Assert.Equal(dto.Email, result.Result[0].Email);
            Assert.Equal(dto.Friendship, result.Result[0].Friendship);
            Assert.Equal(dto.Id, result.Result[0].Id);
            Assert.Equal(dto.Name, result.Result[0].Name);
            Assert.Equal(dto.Password, result.Result[0].Password);
            Assert.Equal(dto.PhoneNumber, result.Result[0].PhoneNumber);
            Assert.Equal(dto.State, result.Result[0].State);
            Assert.Equal(dto.Tag, result.Result[0].Tag);
            Assert.Equal(dto.BirthDate, result.Result[0].BirthDate);
        }
        
        [Fact]
        public async Task GetByIdAsync(){

            var user = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Hopeful",
                new List<string>(), new List<string>());

             var tagList = user.Tag.Select(tag => tag.Tag1).ToList();
             var friendshipList = user.Friendship.Select(friend => friend.FriendId1).ToList();

            var dto = new UserDto()
            {
                BirthDate = user.BirthDate.birthD, Email = user.Email.Address, Friendship = friendshipList,
                Id = user.Id.AsGuid(),
                Name = user.Name.Name1, Password = user.Password.Pass, State = user.State.State1, PhoneNumber = user.PhoneNumber.Number,
                Tag = tagList
            };

            var serviceMock = new Mock<IUserRepository>();
            serviceMock.Setup(Repo => Repo.GetUserByIdAsync(It.IsAny<UserId>())).ReturnsAsync(user);
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object,serviceMock.Object);
            var result = service.GetByIdAsync(user.Id);
            Assert.Equal(dto.Email, result.Result.Email);
            Assert.Equal(dto.Friendship, result.Result.Friendship);
            Assert.Equal(dto.Id, result.Result.Id);
            Assert.Equal(dto.Name, result.Result.Name);
            Assert.Equal(dto.Password, result.Result.Password);
            Assert.Equal(dto.PhoneNumber, result.Result.PhoneNumber);
            Assert.Equal(dto.State, result.Result.State);
            Assert.Equal(dto.Tag, result.Result.Tag);
            Assert.Equal(dto.BirthDate, result.Result.BirthDate);
        }
/*
        [Fact]
        public async Task GetByNameAsync(){

            var user = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Hopeful",
                new List<string>(), new List<string>());

             var tagList = user.Tag.Select(tag => tag.Tag1).ToList();
             var friendshipList = user.Friendship.Select(friend => friend.FriendId1).ToList();

            var dto = new UserDto()
            {
                BirthDate = user.BirthDate.birthD, Email = user.Email.Address, Friendship = friendshipList,
                Id = user.Id.AsGuid(),
                Name = user.Name.Name1, Password = user.Password.Pass, State = user.State.State1, PhoneNumber = user.PhoneNumber.Number,
                Tag = tagList
            };

            List<User> list = new List<User>();
            list.Add(user);
            List<UserDto> listDto = new List<UserDto>();
            var serviceMock = new Mock<IUserRepository>();
            serviceMock.Setup(Repo => Repo.GetAllUsersAsync()).ReturnsAsync(list);
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object,serviceMock.Object);
            var result = service.GetByNameAsync(dto.Name);
            Assert.Equal(dto.Email, result.Result.Email);
            Assert.Equal(dto.Friendship, result.Result.Friendship);
            Assert.Equal(dto.Id, result.Result.Id);
            Assert.Equal(dto.Name, result.Result.Name);
            Assert.Equal(dto.Password, result.Result.Password);
            Assert.Equal(dto.PhoneNumber, result.Result.PhoneNumber);
            Assert.Equal(dto.State, result.Result.State);
            Assert.Equal(dto.Tag, result.Result.Tag);
            Assert.Equal(dto.BirthDate, result.Result.BirthDate);
        }*/

        //[Fact]
        // public async Task AddAsync(){

        //      var user = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "sad",
        //         new List<string>(), new List<string>());

        //      var tagList = user.Tag.Select(tag => tag.Tag1).ToList();
        //      var friendshipList = user.Friendship.Select(friend => friend.FriendId1).ToList();

        //      var Cdto = new CreatingUserDto("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "sad",
        //         friendshipList, tagList);

        //     var dto = new UserDto()
        //     {
        //         BirthDate = user.BirthDate.birthD, Email = user.Email.Address, Friendship = friendshipList,
        //         Id = user.Id.AsGuid(),
        //         Name = user.Name.Name1, Password = user.Password.Pass, State = user.State.State1, PhoneNumber = user.PhoneNumber.Number,
        //         Tag = tagList
        //     };

        //     var serviceMock = new Mock<IUserRepository>();
        //     serviceMock.Setup(Repo => Repo.AddAsync(It.IsAny<User>())).ReturnsAsync(user);
        //     var unitMock = new Mock<IUnitOfWork>();
        //     var service = new UserService(unitMock.Object,serviceMock.Object);
        //     var result = service.AddAsync(Cdto);
        //     Assert.Equal(dto.Email, result.Result.Email);
        //     Assert.Equal(dto.Friendship, result.Result.Friendship);
        //     Assert.Equal(dto.Id, result.Result.Id);
        //     Assert.Equal(dto.Name, result.Result.Name);
        //     Assert.Equal(dto.Password, result.Result.Password);
        //     Assert.Equal(dto.PhoneNumber, result.Result.PhoneNumber);
        //     Assert.Equal(dto.State, result.Result.State);
        //     Assert.Equal(dto.Tag, result.Result.Tag);
        //     Assert.Equal(dto.BirthDate, result.Result.BirthDate);
        // }

        [Fact]
        public async Task ChangeMoodTest()
        {
            const string newSate = "Hopeful";
            var us = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Joyful",
                new List<string>(), new List<string>());

            var dto = new UserDto()
            {
                BirthDate = "10-02-2001", Email = "asdas@gmail.com", Friendship = new List<string>(),
                Id = us.Id.AsGuid(),
                Name = "nome", Password = "Pasdadsd1", State = "Hopeful", PhoneNumber = "911111111",
                Tag = new List<string>()
            };

            var serviceMock = new Mock<IUserRepository>();
            serviceMock.Setup(workblockRepo => workblockRepo.GetUserByIdAsync(It.IsAny<UserId>())).ReturnsAsync(us);
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object, serviceMock.Object);
            var result = service.ChangeMood(dto, newSate);
            dto.State = newSate;
            Assert.Equal(dto.Email, result.Result.Email);
            Assert.Equal(dto.Friendship, result.Result.Friendship);
            Assert.Equal(dto.Id, result.Result.Id);
            Assert.Equal(dto.Name, result.Result.Name);
            Assert.Equal(dto.Password, result.Result.Password);
            Assert.Equal(dto.PhoneNumber, result.Result.PhoneNumber);
            Assert.Equal(dto.State, result.Result.State);
            Assert.Equal(dto.Tag, result.Result.Tag);
            Assert.Equal(dto.BirthDate, result.Result.BirthDate);
        }

        [Fact]
        public async Task ChangeUserProfile()
        {
            var us = new User("nome", "Pasdadsd1", "10-02-2001", "asdas@gmail.com", "911111111", "Hopeful",
                new List<string>(), new List<string>());
            var tagList = new List<string>();
            tagList.Add("tag1");
            var dto = new UserDto()
            {
                BirthDate = "20-02-2000", Email = "novoemail@gmail.com", Friendship = new List<string>(),
                Id = us.Id.AsGuid(),
                Name = "novoNome", Password = "NovaPass", State = "Hopeful", PhoneNumber = "922222222", Tag = tagList
            };

            var serviceMock = new Mock<IUserRepository>();
            serviceMock.Setup(workblockRepo => workblockRepo.GetUserByIdAsync(It.IsAny<UserId>())).ReturnsAsync(us);
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object, serviceMock.Object);
            var result = service.ChangeUserProfile(dto);
            Assert.Equal(dto.Email, result.Result.Email);
            Assert.Equal(dto.Friendship, result.Result.Friendship);
            Assert.Equal(dto.Id, result.Result.Id);
            Assert.Equal(dto.Name, result.Result.Name);
            Assert.Equal(dto.Password, result.Result.Password);
            Assert.Equal(dto.PhoneNumber, result.Result.PhoneNumber);
            Assert.Equal(dto.State, result.Result.State);
            Assert.Equal(dto.Tag, result.Result.Tag);
            Assert.Equal(dto.BirthDate, result.Result.BirthDate);
        } 

        [Fact]
        public async Task AddFriendshipTest()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));

            var us = new User("Teste", "Teste123", "10/10/2000", "teste@isep.pt", "987654321", "Hopeful", tags, new List<string>());
            
            var userDto = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
            
            var friendship = new FriendshipDto()
            {
                Id = new Guid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userDto, FriendB = userDto, FriendshipState = "PENDING"
            };

            var list = new List<string>();
            list.Add(friendship.Id.ToString());

            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = list
            };

            var userServiceMock = new Mock<IUserRepository>();
            userServiceMock.Setup(workblockRepo => workblockRepo.GetUserByIdAsync(It.IsAny<UserId>())).ReturnsAsync(us);
            
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object, userServiceMock.Object);

            var result = service.AddFriendship(userA.Id.ToString(), friendship.Id.ToString());
            Assert.Equal(userA.Friendship, result.Result.Friendship);
        } 

        [Fact]
        public async Task GetFriendships()
        {
            var tags = new List<string>();
            tags.Add(new string("teste"));

            var us = new User("Teste", "Teste123", "10/10/2000", "teste@isep.pt", "987654321", "Hopeful", tags, new List<string>());
            
            var userDto = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = new List<string>()
            };
            
            var friendship = new FriendshipDto()
            {
                Id = new Guid(), RelationTag = "None", ConnectionStrength = "0", RelationshipStrength = "0", FriendA = userDto, FriendB = userDto, FriendshipState = "PENDING"
            };

            us.AddFriendship(new FriendId(friendship.Id.ToString()));

            var list = new List<string>();
            list.Add(friendship.Id.ToString());

            var userA = new UserDto()
            {                
                Id = new Guid(), Email = new string("teste@isep.pt"), Password = new string("Teste123"), Name = new string("TesteA"), BirthDate = new string("10/10/2000"), PhoneNumber = new string("987654321"), State = new string("Hopeful"), Tag = tags, Friendship = list
            };

            var userServiceMock = new Mock<IUserRepository>();
            userServiceMock.Setup(workblockRepo => workblockRepo.GetUserByIdAsync(It.IsAny<UserId>())).ReturnsAsync(us);
            
            var unitMock = new Mock<IUnitOfWork>();
            var service = new UserService(unitMock.Object, userServiceMock.Object);
            
            var expList = new List<FriendId>();

            foreach(var item in userA.Friendship){
                expList.Add(new FriendId(item));
            }

            var result = service.GetFriendships(userA.Id.ToString());
            Assert.Equal(expList.ToString(), result.Result.ToString());
        }
        
    }
}