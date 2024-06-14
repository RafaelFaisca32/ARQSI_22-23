tamanhoRedeUser(User,Nivel,ListaFinal,Tamanho):-
    tamanhoRede2(Nivel,[User],[],[User],ListaFinal),
	length(ListaFinal,TamanhoRede),
    Tamanho is TamanhoRede - 1,
	!.

tamanhoRede2(_,[],[],ListaFinal,ListaFinal):-
    !.

% Quando a queue se encontra vazia, decrementa-se o nível e substitui-se a queue por todos os nós visitados no nível anterior
tamanhoRede2(Nivel,[],ProxQueue,ListaFinal,ListaResultado):-
    NivelAtual is Nivel - 1,
    tamanhoRede2(NivelAtual, ProxQueue, [], ListaFinal, ListaResultado).

tamanhoRede2(0,_,_,ListaFinal,ListaFinal):-
    !.

tamanhoRede2(Nivel, [User|QueueUsers], ProxQueue, ListaFinal, ListaResultado):-
    % X será utilizadores conectados ao primeiro Utilizador na queue e que não se encontre na Rede
    findall(X,(
                ligacao(User,X,_,_,_,_),
                \+member(X, ListaFinal)
            ),
            ListaUserNivel),
    % Adicionar lista de amigos ja visitados à Rede
    append(ListaUserNivel, ListaFinal, ListaCompleta),
    % Criar lista de amigos visitados sem os amigos que já se encontrem em queue
    findall(Y,(
                member(Y, ListaUserNivel),
                \+member(Y, ProxQueue)
            ), UserNivelSemRepetidos),            
    % Adicionar os amigos visitados que ainda não estão na queue à proxima queue
    append(UserNivelSemRepetidos, ProxQueue, NovaQueue),
    tamanhoRede2(Nivel, QueueUsers, NovaQueue, ListaCompleta, ListaResultado).