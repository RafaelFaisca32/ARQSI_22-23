using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace DDDNetCoreTest.Controller
{
    public class ChangeProfileControllerTest
    {
        private readonly ITestOutputHelper _testOutputHelper;

        public ChangeProfileControllerTest(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }

        [Fact]
        public async Task ChangeUserProfile()
        {
            var listaF = new List<string>();
            listaF.Add("asd");
            var listaT = new List<string>();

            const string id = "033f8012-77a0-4fbf-9566-9af956d477d7";
            var dto = new UserDto()
            {
                BirthDate = "10-02-2001", Email = "asdas@gmail.com", Friendship = listaF, Id = new Guid(id),
                Name = "nome", Password = "Pasdadsd1", State = "Hopeful", PhoneNumber = "911111111", Tag = listaT
            };

            const string newBirth = "09-02-2000";
            const string newEmail = "qqqqqqqq@gmail.com";
            const string newPhone = "922222222";
            const string newPass = "NovaPass";
            const string newName = "novoNome";
            var newListaT = new List<string>();
            newListaT.Add("tag1");
            newListaT.Add("tag2");

            var newDto = new UserDto()
            {
                BirthDate = newBirth, Email = newEmail, Friendship = listaF, Id = new Guid(id),
                Name = newName, Password = newPass, State = "Hopeful", PhoneNumber = newPhone, Tag = newListaT
            };
            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(workblockRepo => workblockRepo.GetByIdAsync(It.IsAny<UserId>())).ReturnsAsync(dto);
            serviceMock.Setup(workblockRepo => workblockRepo.ChangeUserProfile(It.IsAny<UserDto>()))
                .ReturnsAsync(newDto);
            var controller = new ChangeProfileController(serviceMock.Object);
            var actionResult = await controller.ChangeUserProfile(id, newDto);
            var result = actionResult.Result as OkObjectResult;
            Assert.Equal(newDto, (UserDto) result.Value);
        }
    }
}