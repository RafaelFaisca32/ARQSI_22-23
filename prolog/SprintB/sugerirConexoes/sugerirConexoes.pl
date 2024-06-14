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

tamanhoRedeUser2(Nivel,[], Next, Rede, ListaResultado):-
    NivelAtual is Nivel - 1,
    tamanhoRedeUser2(NivelAtual, Next, [], Rede, ListaResultado).

tamanhoRedeUser2(0,_,_,Rede,Rede):-
    !.

tamanhoRedeUser2(Nivel, [UserAtual|QueueUsers], ProxQueue, Rede, ListaResultado):-
    findall(X,(
                ligacao(UserAtual, X,_,_),
                \+member(X, Rede)
            ),
            ListaUserNivel),

    append(ListaUserNivel, Rede, ListaCompleta),

    findall(Y,(
                member(Y, ListaUserNivel),
                \+member(Y, ProxQueue)
            ), UserNivelSemRepetidos),

    append(UserNivelSemRepetidos, ProxQueue, NovaQueue),

    tamanhoRedeUser2(Nivel, QueueUtilizadores, NovaQueue, ListaCompleta, ListaResultado).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Sugerir conexões com outros utilizadores tendo por base as tags e conexões partilhadas (até determinado nível).

sugerirConexoesPorTagComum(UserOrigem, Nivel, Resultado):-
    % Retorna a rede do utilizador ate ao nivel pretendido 
    tamanhoRedeUser(UserOrigem, Nivel, Rede, _),

    % Remove os utilizadores da rede que tenham 0 tags em comum com o user
    redeTagsComuns(UserOrigem, Rede, UsersSugeridos),
    write('Possiveis Users Sugeridos: '), 
    write(UsersSugeridos),
    nl,
    
    findall([UserDestino,Caminhos],(
                member(UserDestino, UsersSugeridos),                
                UserDestino \== UserOrigem,

                % Lista de tags em comum entre o user origem e destino
                tagsComuns(UserDestino, UserOrigem, TagsComuns),

                write('User '), write(UserDestino),

                % Todos os caminhos possiveis do user origem ate o user destino onde todos os users do caminho teem pelo menos 1 tag em comum
                dfsTagsComuns(UserOrigem, UserDestino, TagsComuns, Caminhos), 

                write(': '), write(Caminhos),nl),
                Resultado),nl.                

redeTagsComuns(User1, Rede, NovaRede):-
    no(User1, _, Tags),
    findall(User2, (
                member(User2, Rede),
                no(User2, _, Tags2),
                validaTagsComuns(Tags, Tags2)),
                NovaRede).
                
% verifica se a lista de tags do user1 tem pelo menos 1 tag em comum com a lista de tags do user2
validaTagsComuns([], _):- fail.

validaTagsComuns([Tag|_], ListaTags2):- 
	member(Tag, ListaTags2),
	!.

validaTagsComuns([_|ListaTags], ListaTags2):-
    validaTagsComuns(ListaTags, ListaTags2).

% Lista de tags em comum entre o user origem e destino
tagsComuns(UserA, UserB, ListaTags):-
    no(UserA, _, TagsA),
    no(UserB, _, TagsB),
    intersecao(TagsA, TagsB, ListaTags).

dfsTagsComuns(Orig, Dest, Tags, Caminhos):-
    findall(Caminho,(
                dfsTagsComuns2(Orig, Dest, [Orig], Caminho),
                validaCaminhoTags(Caminho, Tags)),
                Caminhos).

dfsTagsComuns2(Dest, Dest, Lista, Caminho):-
    !, 
    reverse(Lista, Caminho).

dfsTagsComuns2(UserAtual, Dest, Lista, Caminho):-
    % verifica ligaçao entre o UserAtual e um outro user X
    ligacao(UserAtual, X,_,_),
    
    % testar se X ja pertence à lista de users visitados
    \+member(X, Lista),

    dfsTagsComuns2(X, Dest, [X|Lista], Caminho).
    
% Verifica se todos os users de um caminho teem a mesma tag em comum
validaCaminhoTags(Caminho, ListaTags):-
    validaCaminhoTags2(Caminho, Caminho, ListaTags).

validaCaminhoTags2(_, _, []):-
    !,
    fail.

validaCaminhoTags2([], _, _):-
    !,
    true.

validaCaminhoTags2([User|Caminho], CaminhoOriginal, [Tag|ListaTags]):-
    no(User, _, TagsUser),
    member(Tag, TagsUser),
    !,
    validaCaminhoTags2(Caminho, CaminhoOriginal, [Tag|ListaTags]).

validaCaminhoTags2(_, CaminhoOriginal, [_|ListaTags]):-
    validaCaminhoTags2(CaminhoOriginal, CaminhoOriginal, ListaTags).

intersecao([],_,[]).
intersecao([X|L],L1,[X|LI]):-member(X,L1),!,intersecao(L,L1,LI).
intersecao([X|L],L1,LI):-intersecao(L,L1,LI).

