using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Controllers;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Introductions;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Moq;
using Xunit;

namespace DDDNetCoreTest.Controller
{
    public class IntroductionRequestControllerTest
    {
        [Fact]
        public async Task getAll()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "Joyful", "12-32-2010",
                true);
            var list = new List<IntroductionDto>();
            list.Add(introDto);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.GetAllAsync()).ReturnsAsync(list);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.GetAll();
            Assert.Equal(list, Result.Result.Value);
        }

        [Fact]
        public async Task getById()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "Joyful", "12-32-2010",
                true);
            var list = new List<IntroductionDto>();
            list.Add(introDto);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.GetByIdAsync(It.IsAny<IntroductionId>())).ReturnsAsync(introDto);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.GetById(introDto.Id);
            Assert.Equal(introDto, Result.Result.Value);
        }

        [Fact]
        public async Task ListPendingIntroductionRequest()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "Joyful", "12-32-2010",
                true);
            var list = new List<IntroductionDto>();
            list.Add(introDto);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.GetPendingIntroductionsByFriendAsync(It.IsAny<FriendId>())).ReturnsAsync(list);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.ListPendingIntroductionRequest("033f8012-77a0-4fbf-9566-9af956d477d7");
            Assert.Equal(list, Result.Result.Value);
        }

        [Fact]
        public async Task CreateIntroductionRequest()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "Joyful", "12-32-2010",
                true);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.AddAsync(It.IsAny<CreatingIntroductionDto>())).ReturnsAsync(introDto);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.CreateIntroductionRequest(It.IsAny<CreatingIntroductionDto>());
            Assert.Equal(It.IsAny<IntroductionDto>(), Result.Result.Value);
        }
        
        [Fact]
        public async Task FailCreateIntroductionRequest()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "estado", "12-32-2010",
                true);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.AddAsync(It.IsAny<CreatingIntroductionDto>())).ReturnsAsync(introDto);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.CreateIntroductionRequest(It.IsAny<CreatingIntroductionDto>());
            Assert.NotEqual(introDto, Result.Result.Value);
        }

        [Fact]
        public async Task AcceptIntroductionRequest()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "Joyful", "12-32-2010",
                true);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.changeIntroductionState(It.IsAny<Guid>(),It.IsAny<State>())).ReturnsAsync(introDto);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.AcceptIntroductionRequest("033f8012-77a0-4fbf-9566-9af956d477d7");
            Assert.Equal(It.IsAny<IntroductionDto>(), Result.Result.Value);
        }
        
        [Fact]
        public async Task RejectIntroductionRequest()
        {
            var introDto = new IntroductionDto("033f8012-77a0-4fbf-9566-9af956d477d7", "asdasd", "asdasdadsad", "asdsadadasd", "Joyful", "12-32-2010",
                true);

            var serviceMock = new Mock<IIntroductionService>();
            serviceMock.Setup(Repo => Repo.changeIntroductionState(It.IsAny<Guid>(),It.IsAny<State>())).ReturnsAsync(introDto);
            var userServiceMock = new Mock<IUserService>();
            var ctrl = new IntroductionRequestController(userServiceMock.Object, serviceMock.Object);
            var Result = ctrl.RejectIntroductionRequest("033f8012-77a0-4fbf-9566-9af956d477d7");
            Assert.Equal(It.IsAny<IntroductionDto>(), Result.Result.Value);
        }
        
    }
}