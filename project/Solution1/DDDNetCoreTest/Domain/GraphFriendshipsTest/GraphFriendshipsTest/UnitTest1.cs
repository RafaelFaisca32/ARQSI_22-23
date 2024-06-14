using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using DDDSample1.Domain.GraphFriendships;
using Xunit;
using Xunit.Abstractions;

namespace GraphFriendshipsTest
{
    public class UnitTest1
    {

        private readonly ITestOutputHelper _testOutputHelper;

        public UnitTest1(ITestOutputHelper testOutputHelper)
        {
            _testOutputHelper = testOutputHelper;
        }


        [Fact]
        public void AddNodeTest()
        {
            var graph2D = new DDDSample1.Domain.GraphFriendships.Graph2D();

            graph2D.AddNode(new Graph2D.Node("Rafael"));
            var graph = new Graph2D.Graph();
            graph.Nodes = graph2D.Nodes.ToArray();
            Assert.True(graph.Nodes[0].US.Equals("Rafael"));
        }

        [Fact]
        public void AddLinkTest()
        {
            var graph2D = new DDDSample1.Domain.GraphFriendships.Graph2D();

            var listString = new List<string>();
            listString.Add("Vasco");
            graph2D.AddLink(new Graph2D.Link("Rafael", listString));
            var graph = new Graph2D.Graph();
            graph.Links = graph2D.Links.ToArray();
            Assert.True(graph.Links[0].Source.Equals("Rafael"));
            Assert.True(graph.Links[0].Target.Equals(listString));
        }

        [Fact]
        public void SerializeTest()
        {
            var graph2D = new DDDSample1.Domain.GraphFriendships.Graph2D();
            Dictionary<string, List<string>> map = new Dictionary<string, List<string>>();
            var listString = new List<string>();
            listString.Add("Vasco");
            map.Add("Rafael", listString);
            graph2D.AddNode(new Graph2D.Node("Rafael"));
            graph2D.AddLink(new Graph2D.Link("Rafael", listString));
            var graph = new Graph2D.Graph();
            graph.Nodes = graph2D.Nodes.ToArray();
            graph.Links = graph2D.Links.ToArray();
            Assert.True(graph2D.Serialize(map).Links[0].Source.Equals("Rafael"));
            Assert.True(graph2D.Serialize(map).Links[0].Target.Equals(listString));
            Assert.True(graph2D.Serialize(map).Nodes[0].US.Equals("Rafael"));
        }
    }
}
