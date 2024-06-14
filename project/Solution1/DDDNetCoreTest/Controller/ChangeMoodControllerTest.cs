using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace DDDNetCoreTest.Controller
{
    public class UnitTest1
    {

        [Fact]
        public async Task ChangeHumorState()
        {
            var listaF = new List<string>();
            var listaT = new List<string>();

            const string newState = "Hopeful";
            const string id = "033f8012-77a0-4fbf-9566-9af956d477d7";
            var dto = new UserDto()
            {
                BirthDate = "10-02-2001", Email = "asdas@gmail.com", Friendship = listaF, Id = new Guid(id),
                Name = "nome", Password = "Pasdadsd1", State = "Hopeful", PhoneNumber = "911111111", Tag = listaT
            };
            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(workblockRepo => workblockRepo.GetByIdAsync(It.IsAny<UserId>())).ReturnsAsync(dto);
            dto.State = newState;
            serviceMock.Setup(workblockRepo => workblockRepo.ChangeMood(It.IsAny<UserDto>(), newState))
                .ReturnsAsync(dto);
            var controller = new ChangeMoodController(serviceMock.Object);
            var actionResult = await controller.ChangeHumorState(id, newState);
            var result = actionResult.Result as OkObjectResult;
            Assert.Equal(result.Value, dto);
        }
    }
}