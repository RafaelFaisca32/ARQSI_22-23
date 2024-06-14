% Base de Conhecimento

% no(user, nome, tags)

no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,carros,porto,moda]).
no(13,carlos,[musica,futebol,coimbra]).
no(14,daniel,[cinema,jogos,sw,moda]).
no(21,eduardo,[natureza,cinema,teatro,carros,coimbra]).
no(22,isabel,[porto,lisboa,cinema]).
no(23,jose,[pintura,sw,musica,carros,lisboa]).
no(24,luisa,[cinema,jogos,moda]).
no(31,maria,[pintura,musica,moda]).
no(32,anabela,[cinema,musica,tecnologia]).
no(33,andre,[natureza,pintura,musica,sw,porto]).
no(34,catia,[natureza,musica,cinema,lisboa,moda]).
no(41,cesar,[natureza,teatro,tecnologia,futebol,porto]).
no(42,diogo,[natureza,futebol,sw,jogos,porto]).
no(43,ernesto,[natureza,teatro,carros,porto]).
no(44,isaura,[natureza,moda,tecnologia,cinema]).
no(200,sara,[natureza,moda,musica,sw,coimbra]).

no(51,rodolfo,[natureza,musica,sw]).
no(61,rita,[moda,tecnologia,cinema]).

% ligacao(user1, user2, forcaLigacao1_2, forcaLigacao2_1, forcaRelacao1_2, forcaRelacao2_1)

ligacao(1,11,10,8,100,-80).
ligacao(1,12,2,6,80,-55).
ligacao(1,13,-3,-2,155,70).
%ligacao(1,14,1,-5,-172,-300).
ligacao(11,21,5,7,320,140).
ligacao(11,22,2,-4,266,20).
ligacao(11,23,-2,8,-30,-102).
%ligacao(11,24,6,0,103,73).
ligacao(12,21,4,9,-172,-50).
ligacao(12,22,-3,-8,20,24).
ligacao(12,23,2,4,59,-90).
%ligacao(12,24,-2,4,200,157).
ligacao(13,21,3,2,220,66).
ligacao(13,22,0,-3,-68,-210).
ligacao(13,23,5,9,-79,10).
%ligacao(13,24,-2, 4,59,40).
%ligacao(14,21,2,6,300,220).
%ligacao(14,22,6,-3,123,213).
%ligacao(14,23,7,0,-134,-250).
%ligacao(14,24,2,2,2,-5).
ligacao(21,31,2,1,30,-30).
ligacao(21,32,-2,3,0,0).
ligacao(21,33,3,5,50,59).
%ligacao(21,34,4,2,-90,-80).
ligacao(22,31,5,-4,-100,-80).
ligacao(22,32,-1,6,150,60).
ligacao(22,33,2,1,234,176).
%ligacao(22,34,2,3,-170,-120).
ligacao(23,31,4,-3,-35,-60).
ligacao(23,32,3,5,3,-40).
ligacao(23,33,4,1,5,-90).
%ligacao(23,34,-2,-3,90,70).
%ligacao(24,31,1,-5,252,146).
%ligacao(24,32,1,0,-128,-169).
%ligacao(24,33,3,-1,64,-50).
%ligacao(24,34,-1,5,50,-30).
ligacao(31,41,2,4,66,77).
ligacao(31,42,6,3,100,0).
ligacao(31,43,2,1,120,70).
%ligacao(31,44,2,1,5,-10).
ligacao(32,41,2,3,10,110).
ligacao(32,42,-1,0,152,10).
ligacao(32,43,0,1,0,200).
%ligacao(32,44,1,2,10,-80).
ligacao(33,41,4,-1,190,-120).
ligacao(33,42,-1,3,252,150).
ligacao(33,43,7,2,160,0).
%ligacao(33,44,5,-3,-62,-120).
%ligacao(34,41,3,2,-50,-80).
%ligacao(34,42,1,-1,100,40).
%ligacao(34,43,2,4,300,100).
%ligacao(34,44,1,-2,200,200).
ligacao(31,200,2,0,17,-50).
ligacao(32,200,7,-2,120,-100).
ligacao(33,200,-2,4,115,0).
%ligacao(44,200,-1,-3,17,0).