using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace SugestedFriendshipsController
{
    public class UnitTest1
    {
        private readonly ITestOutputHelper output;

        public UnitTest1(ITestOutputHelper output)
        {
            this.output = output;
        }
        [Fact]
        public async Task SugestedFriendshipsControllerTest()
        {
            const string tag1 = "a";
            const string tag2 = "b";
            
            var lista1 = new List<string>();
            lista1.Add("a");
            var lista2 = new List<string>();
            lista2.Add(tag2);
            lista2.Add(tag1);
            var lista3 = new List<string>();
            lista3.Add(tag2);
            var lista4 = new List<string>();
            lista4.Add(tag2);
            
            var dto1 = new UserDto()
            {
                BirthDate = "10-02-2001", Email = "asdas@gmail.com", Friendship = lista1, Id = new Guid(),
                Name = "nome", Password = "Pasdadsd1", State = "sad", PhoneNumber = "911111111", Tag = lista1
            };
            var dto2 = new UserDto()
            {
                BirthDate = "10-02-2001", Email = "asdas@gmail.com", Friendship = lista2, Id = new Guid(),
                Name = "nome", Password = "Pasdadsd1", State = "sad", PhoneNumber = "911111111", Tag = lista2
            };

            List<UserDto> expected = new List<UserDto>();
            expected.Add(dto2);

            var serviceMock = new Mock<IUserService>();
            serviceMock.Setup(workBlockRepo => workBlockRepo.SugestedFriendships(It.IsAny<UserId>(),It.IsAny<List<UserDto>>())).ReturnsAsync(expected);
            var controller = new DDDSample1.Controllers.SugestedFriendshipsController(serviceMock.Object);
            var actionResult =  controller.SugestedFriendships(dto1.Id.ToString());
            Assert.Equal(actionResult.Result.Value[0].Tag[1],expected[0].Tag[1]);

        }
    }
}
