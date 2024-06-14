% Base de Conhecimento

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


ligacao(1,11,10,8).
ligacao(1,12,2,6).
ligacao(1,13,-3,-2).
ligacao(1,14,1,-5).
ligacao(11,21,5,7).
ligacao(11,22,2,-4).
ligacao(11,23,-2,8).
ligacao(11,24,6,0).
ligacao(12,21,4,9).
ligacao(12,22,-3,-8).
ligacao(12,23,2,4).
ligacao(12,24,-2,4).
ligacao(13,21,3,2).
ligacao(13,22,0,-3).
ligacao(13,23,5,9).
ligacao(13,24,-2, 4).
ligacao(14,21,2,6).
ligacao(14,22,6,-3).
ligacao(14,23,7,0).
ligacao(14,24,2,2).
ligacao(21,31,2,1).
ligacao(21,32,-2,3).
ligacao(21,33,3,5).
ligacao(21,34,4,2).
ligacao(22,31,5,-4).
ligacao(22,32,-1,6).
ligacao(22,33,2,1).
ligacao(22,34,2,3).
ligacao(23,31,4,-3).
ligacao(23,32,3,5).
ligacao(23,33,4,1).
ligacao(23,34,-2,-3).
ligacao(24,31,1,-5).
ligacao(24,32,1,0).
ligacao(24,33,3,-1).
ligacao(24,34,-1,5).
ligacao(31,41,2,4).
ligacao(31,42,6,3).
ligacao(31,43,2,1).
ligacao(31,44,2,1).
ligacao(32,41,2,3).
ligacao(32,42,-1,0).
ligacao(32,43,0,1).
ligacao(32,44,1,2).
ligacao(33,41,4,-1).
ligacao(33,42,-1,3).
ligacao(33,43,7,2).
ligacao(33,44,5,-3).
ligacao(34,41,3,2).
ligacao(34,42,1,-1).
ligacao(34,43,2,4).
ligacao(34,44,1,-2).
ligacao(41,200,2,0).
ligacao(42,200,7,-2).
ligacao(43,200,-2,4).
ligacao(44,200,-1,-3).

ligacao(1,51,6,2).
ligacao(51,61,7,3).
ligacao(61,200,2,4).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
tamanhoRedeUser(User, Nivel, Rede, Tamanho):-
    tamanhoRedeUser2(Nivel,[User],[],[User],Rede),
    length(Rede, TamanhoRede),
    Tamanho is TamanhoRede - 1,
    !.

tamanhoRedeUser2(_,[], [], Rede, Rede):-
    !.

% Quando a queue se encontra vazia, decrementa-se o nível e substitui-se a queue por todos os nós visitados no nível anterior
tamanhoRedeUser2(Nivel,[], Next, Rede, ListaResultado):-
    NivelAtual is Nivel - 1,
    tamanhoRedeUser2(NivelAtual, Next, [], Rede, ListaResultado).

tamanhoRedeUser2(0,_,_,Rede,Rede):-
    !.

tamanhoRedeUser2(Nivel, [UserAtual|QueueUsers], ProxQueue, Rede, ListaResultado):-
    % X será utilizadores conectados ao primeiro Utilizador na queue e que não se encontre na Rede
    findall(X,(
                ligacao(UserAtual, X,_,_),
                \+member(X, Rede)
            ),
            ListaUserNivel),

    % Adicionar lista de amigos ja visitados à Rede
    append(ListaUserNivel, Rede, ListaCompleta),

    % Criar lista de amigos visitados sem os amigos que já se encontrem em queue
    findall(Y,(
                member(Y, ListaUserNivel),
                \+member(Y, ProxQueue)
            ), UserNivelSemRepetidos),

    % Adicionar os amigos visitados que ainda não estão na queue à proxima queue
    append(UserNivelSemRepetidos, ProxQueue, NovaQueue),

    tamanhoRedeUser2(Nivel, QueueUtilizadores, NovaQueue, ListaCompleta, ListaResultado).