%% Base Conhecimento secundaria


%% Base Conhecimento principal

:- dynamic no/3.
:- dynamic friendship/4.
:- dynamic ligacao/6.


%% Nossos modules

% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)). 
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
:- use_module(library(date)).
:- use_module(library(random)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- json_object caminho(caminho:string).
:- json_object tamanho(tamanho:string).


% Criacao de servidor HTTP no porto 'Port'					
server(Port) :-		
        http_server(http_dispatch, [port(Port)]).

stopServer(Port):-
   % retract(port(Port)),
    http_stop_server(Port,_).

adicionarBaseConhecimento():-
                adicionarUsers,
                adicionarFriendships,!.

removerBaseConhecimento():-
                retractall(no(_,_,_)),
                retractall(friendship(_,_,_)),
                retractall(ligacao(_,_,_,_)),
                %%Dynamic Stuff
                retractall(melhor_sol_minlig(_,_)),
                retractall(melhor_sol_forte(_,_,_)).


%Cors
:- set_setting(http:cors,[*]).

users_url("https://lapr5backend.azurewebsites.net/api/user").
friendships_url("https://lapr5backend.azurewebsites.net/api/friendship").

obterUsers(Data) :-
    users_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)
    ).

obterFriendships(Data) :-
    friendships_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [request_header('Accept'='application/json'),cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Data),
        close(In)
    ).   

adicionarFriendships():-
            obterFriendships(Data),
            parse_friendships(Data),
            parse_ligacoes(Data).


parse_friendships([]).
parse_friendships([H|Data]):- 
(H.get(friendshipState) = "Accepted" -> (asserta(friendship(H.get(friendA).get(id),H.get(friendB).get(id),H.get(connectionStrength), H.get(relationshipStrength))),
                                            parse_friendships(Data))
                                        ; (parse_friendships(Data))),true.
    
    

parse_ligacoes([]).
parse_ligacoes([H|Data]):-
    (H.get(friendshipState) = "Accepted" ->
    ((ligacao(H.get(friendA).get(id),H.get(friendB).get(id),_,_,_,_);ligacao(H.get(friendB).get(id),H.get(friendA).get(id),_,_,_,_)) -> parse_ligacoes(Data) ;
                                                                   ( 
                                                                   friendship(H.get(friendA).get(id),H.get(friendB).get(id),Fab,FRab), friendship(H.get(friendB).get(id),H.get(friendA).get(id),Fba,FRba),
                                                                   atom_number(Fab,FabN),atom_number(Fba,FbaN),atom_number(FRab,FRabN),atom_number(FRba,FRbaN),
                                                                   asserta(ligacao(H.get(friendA).get(id),H.get(friendB).get(id),FabN,FbaN,FRabN,FRbaN)),
                                                                   parse_ligacoes(Data)
                                                                   )
    ) ; parse_ligacoes(Data)).
    
adicionarUsers():-
            obterUsers(Data),
            parse_users(Data).
parse_users([]).
parse_users([H|Data]):-
    asserta(no(H.get(id),H.get(name),H.get(tag))),
    parse_users(Data).   

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% METODOS GET %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

:- http_handler('/api/ConsultSafestPath', consult_safest_path, [cert_verify_hook(cert_accept_any)]).
%https://vs-gate.dei.isep.ipp.pt:30817/api/ConsultSafestPath?nameOrig=userUM&nameDest=userSEIS&minimum=3.
consult_safest_path(Request) :-
    http_parameters(Request,
                    [ nameOrig(NameOrig, [string]),
                      nameDest(NameDest, [string]),
                      minimum(Min, [between(0,20)])
                    ]),
                     cors_enable(Request, [ methods([get])]),
                    removerBaseConhecimento,adicionarBaseConhecimento,
                    plan_secure(NameOrig,NameDest,Cam,_,Min),
                    R = json([caminho = Cam]),
                    reply_json(R).

:- http_handler('/api/ConsultStrongestPath', consult_strongest_path, [cert_verify_hook(cert_accept_any)]).
%https://vs-gate.dei.isep.ipp.pt:30817/api/ConsultStrongestPath?nameOrig=userUM&nameDest=userSEIS.
consult_strongest_path(Request) :-
    http_parameters(Request,
                    [ nameOrig(NameOrig, [string]),
                      nameDest(NameDest, [string])
                    ]),
                    cors_enable(Request, [methods([get])]),
                    removerBaseConhecimento,adicionarBaseConhecimento,
                    plan_forte(NameOrig,NameDest,Cam,_),
                    R = json([caminho = Cam]),
                    reply_json(R).

:- http_handler('/api/ConsultSafestPathMulti', consult_safest_pathMulti, [cert_verify_hook(cert_accept_any)]).
%https://vs-gate.dei.isep.ipp.pt:30817/api/ConsultSafestPathMulti?nameOrig=userUM&nameDest=userSEIS&minimum=3.
consult_safest_pathMulti(Request) :-
    http_parameters(Request,
                    [ nameOrig(NameOrig, [string]),
                      nameDest(NameDest, [string]),
                      minimum(Min, [between(0,20)])
                    ]),
                     cors_enable(Request, [ methods([get])]),
                    removerBaseConhecimento,adicionarBaseConhecimento,
                    plan_secureMulti(NameOrig,NameDest,Cam,_,Min),
                    R = json([caminho = Cam]),
                    reply_json(R).

:- http_handler('/api/ConsultStrongestPathMulti', consult_strongest_pathMulti, [cert_verify_hook(cert_accept_any)]).
%https://vs-gate.dei.isep.ipp.pt:30817/api/ConsultStrongestPathMulti?nameOrig=userUM&nameDest=userSEIS.
consult_strongest_pathMulti(Request) :-
    http_parameters(Request,
                    [ nameOrig(NameOrig, [string]),
                      nameDest(NameDest, [string])
                    ]),
                    cors_enable(Request, [methods([get])]),
                    removerBaseConhecimento,adicionarBaseConhecimento,
                    plan_forteMulti(NameOrig,NameDest,Cam,_),
                    R = json([caminho = Cam]),
                    reply_json(R).                    

:- http_handler('/api/ConsultShortestPath', consult_shortest_path, [cert_verify_hook(cert_accept_any)]).
%https://vs-gate.dei.isep.ipp.pt:30817/api/ConsultShortestPath?nameOrig=userUM&nameDest=userSEIS.
consult_shortest_path(Request) :-
    http_parameters(Request,
                    [ nameOrig(NameOrig, [string]),
                      nameDest(NameDest, [string])
                    ]),
                    cors_enable(Request, [methods([get])]),
                    removerBaseConhecimento,adicionarBaseConhecimento,
                    plan_minlig(NameOrig,NameDest,Cam),
                    R = json([caminho = Cam]),
                    reply_json(R).

:- http_handler('/api/ConsultNetworkLength', consult_network_length, [cert_verify_hook(cert_accept_any)]).
%https://vs-gate.dei.isep.ipp.pt:30817/api/ConsultNetworkLength?userId=5a16300a-a6e8-441f-a46b-88e7cbd2185d&level=1.
consult_network_length(Request) :-
    http_parameters(Request,
                    [ userId(UserId, [string]),
                      level(Level, [number])
                    ]),
                    cors_enable(Request, [methods([get])]),
                    removerBaseConhecimento,adicionarBaseConhecimento,
                   tamanhoRedeUser(UserId,Level,_,Length),
                    R = json([tamanho = Length]),
                    reply_json(R).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% CAMINHOS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% CURTO %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

:-dynamic melhor_sol_minlig/2.

dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_,_,_);ligacao(NX,NAct,_,_,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam).


plan_minlig(Orig,Dest,LCaminho_minlig):-
		(melhor_caminho_minlig(Orig,Dest);true),
		retract(melhor_sol_minlig(LCaminho_minlig,_)).

melhor_caminho_minlig(Orig,Dest):-
		asserta(melhor_sol_minlig(_,10000)),
		dfs(Orig,Dest,LCaminho),
		atualiza_melhor_minlig(LCaminho),
		fail.

atualiza_melhor_minlig(LCaminho):-
		melhor_sol_minlig(_,N),
		length(LCaminho,C),
		C<N,retract(melhor_sol_minlig(_,_)),
		asserta(melhor_sol_minlig(LCaminho,C)).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FORTE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     

:-dynamic melhor_sol_forte/3.

dfs_forte(Orig,Dest,Cam,F):- dfs_forte2(Orig,Dest,[Orig],Cam,F).

dfs_forte2(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2(Act,Dest,LA,Cam,[F|[F1|RF]]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1,_,_);ligacao(NX,NAct,F,F1,_,_)), no(NX,X,_),
    \+ member(X,LA),dfs_forte2(X,Dest,[X|LA],Cam,RF).

plan_forte(Orig,Dest,LCaminho_forte,Forca):-
    (melhor_caminho_forte(Orig,Dest);true),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).

melhor_caminho_forte(Orig,Dest):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forte(Orig,Dest,LCaminho,LF),
    atualiza_melhor_forte(LCaminho,LF),
    fail.

atualiza_melhor_forte(LCaminho,LF):-
    melhor_sol_forte(_,LCaminho,N),
    sumlist(LF,SF),
    SF>N, retract(melhor_sol_forte(_,_,_)),
    asserta(melhor_sol_forte(LCaminho,_,SF)).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FORTE COM MULTICRITERIO %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
 
dfs_forteMulti(Orig,Dest,Cam,F):- dfs_forte2Multi(Orig,Dest,[Orig],Cam,F).

dfs_forte2Multi(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2Multi(Act,Dest,LA,Cam,[R|RF]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1,FR,FR1);ligacao(NX,NAct,F,F1,FR,FR1)), multiCriterio(F+F1,FR+FR1,R), no(NX,X,_),
    \+ member(X,LA),dfs_forte2Multi(X,Dest,[X|LA],Cam,RF).

plan_forteMulti(Orig,Dest,LCaminho_forte,Forca):-
    (melhor_caminho_forteMulti(Orig,Dest);true),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).

melhor_caminho_forteMulti(Orig,Dest):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forteMulti(Orig,Dest,LCaminho,LF),
    atualiza_melhor_forte(LCaminho,LF),
    fail.        

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SEGURO %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


plan_secure(Orig,Dest,LCaminho_forte,Forca,SEC):- 
    (melhor_caminho_secure(Orig,Dest,SEC);true),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).

melhor_caminho_secure(Orig,Dest,SEC):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forte(Orig,Dest,LCaminho,LF),
    min_list(LF,Min), Min >= SEC,
    atualiza_melhor_forte(LCaminho,LF),
    fail.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SEGURO COM MULTICRITERIO %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

plan_secureMulti(Orig,Dest,LCaminho_forte,Forca,SEC):-
    (melhor_caminho_secureMulti(Orig,Dest,SEC);true),
    retract(melhor_sol_forte(LCaminho_forte,LForca,Forca)).

melhor_caminho_secureMulti(Orig,Dest,SEC):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forteMulti(Orig,Dest,LCaminho,LF),
    min_list(LF,Min), Min >= SEC,
    atualiza_melhor_forte(LCaminho,LF),
    fail.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MULTICRITERIO %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     

multiCriterio(FL,FR,R):- ( FR =< -200 -> R is((-0.5 * FL) + FL);
                         (FR >= 200 -> R is (0.5 * FL) + 50 ; 
                         (FR < 0 -> R is ((0.5 * FL) + (0.5*(50 - (FR / 200) * 50)));
                         (FR =:= 0 -> R is ((0.5 * FL) + (0.5 * 50));
                         (FR > 0 -> R is ((0.5 * FL) + (0.5*(50 + (FR / 200) * 50))); true))))).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TAMANHO DA REDE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     

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
                ligacao(UserAtual, X,_,_,_,_),
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