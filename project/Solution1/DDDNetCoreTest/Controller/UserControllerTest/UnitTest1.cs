using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Users;
using Moq;
using Projeto.Domain.Users;
using Xunit;

namespace UserControllerTest
{
    public class UnitTest1
    {
        [Fact]
        public async Task Create_User()
        {
            var user = new UserDto(){
                Id = new Guid(), Name = new string("Rafael Faísca"), Password = new string("Rafael9"),
                    BirthDate = new string("05/05/2000"), Email = new string("1180658@isep.ipp.pt"),
                    PhoneNumber = new string("919191919"), State = new string("Hopeful"),
                    Tag = new List<string>(),
                    Friendship = new List<string>()
            };

            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(Repo => Repo.GetByIdAsync(It.IsAny<UserId>())).ReturnsAsync(user);
            serviceMock.Setup(Repo => Repo.AddAsync(It.IsAny<CreatingUserDto>())).ReturnsAsync(user);
            var controller = new UserController(serviceMock.Object);
            var result = controller.Create(It.IsAny<CreatingUserDto>());
            Assert.Equal(result.Result.Value,It.IsAny<UserDto>());
        }

        [Fact]
        public async Task Create_Failing_User()
        {
            var user = new UserDto(){
                Id = new Guid(), Name = new string("29323"), Password = new string("Rafael9"),
                    BirthDate = new string("05/05/2000"), Email = new string("1180658@isep.ipp.pt"),
                    PhoneNumber = new string("919191919"), State = new string("Hopeful"),
                    Tag = new List<string>(),
                    Friendship = new List<string>()
            };

            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(Repo => Repo.GetByIdAsync(It.IsAny<UserId>())).ReturnsAsync(user);
            serviceMock.Setup(Repo => Repo.AddAsync(It.IsAny<CreatingUserDto>())).ReturnsAsync(user);
            var controller = new UserController(serviceMock.Object);
            var result = controller.Create(It.IsAny<CreatingUserDto>());
            Assert.NotEqual(result.Result.Value,user);
        }

        [Fact]
        public async Task getAll(){
            
            var user = new UserDto(){
                Id = new Guid(), Name = new string("Rafael Faísca"), Password = new string("Rafael9"),
                    BirthDate = new string("05/05/2000"), Email = new string("1180658@isep.ipp.pt"),
                    PhoneNumber = new string("919191919"), State = new string("Hopeful"),
                    Tag = new List<string>(),
                    Friendship = new List<string>()
            };

            List<UserDto> list = new List<UserDto>();
            list.Add(user);

            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(Repo => Repo.GetAllAsync()).ReturnsAsync(list);
            var controller = new UserController(serviceMock.Object);
            
            var result = controller.GetAll();
            Assert.Equal(result.Result.Value, list);
        }

        [Fact]
        public async Task getById(){

            var user = new UserDto(){
                Id = new Guid(), Name = new string("Rafael Faísca"), Password = new string("Rafael9"),
                    BirthDate = new string("05/05/2000"), Email = new string("1180658@isep.ipp.pt"),
                    PhoneNumber = new string("919191919"), State = new string("Hopeful"),
                    Tag = new List<string>(),
                    Friendship = new List<string>()
            };

            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(Repo => Repo.GetByIdAsync(It.IsAny<UserId>())).ReturnsAsync(user);
            var controller = new UserController(serviceMock.Object);
            var result = controller.GetGetById(user.Id.ToString());
            Assert.Equal(result.Result.Value, user);
        }        
    }
}
