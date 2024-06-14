
:-consult(tamanhoRedeUser).
:-consult(multiCriterio).
:-consult(baseConhecimento).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% AStarForcaLigacao %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

aStar(Orig,Dest,N,Cam,Custo):-
    get_time(Inicio),
    aStar2(Dest,[(_,0,[Orig],[])],N,Cam,Custo),
	get_time(Fim),
	Tempo is Fim-Inicio,
	write(Tempo),
	write(' s').

aStar2(Dest,[(_,Custo,[Dest|T],Lista)|_],N,Cam,Custo):-
	length(Lista,NLigacoes),
	NLigacoes =< N,
    reverse([Dest|T],Cam).

aStar2(Dest,[(_,CustoAtual,CamAtual,Lista)|Outros],N,Cam,Custo):-
    CamAtual=[Atual|_],
    findall((CustoEstX,CustoaX,[X|CamAtual],[CustoX|Lista]), (
        Dest\==Atual,	
		ligacao(Atual,X,CustoX,_,_,_),
        \+member(X,CamAtual),	
		%calculo da estimativa
        estimativaFL(X,Lista,N,EstX),
		CustoaX is CustoX + CustoAtual,	
        CustoEstX is CustoaX + EstX	
	), Novos),
    append(Outros,Novos,Todos),
	% ordenar de forma decrescente e mantendo os repetidos 
	sort(0,@>=,Todos,TodosOrd),
    aStar2(Dest,TodosOrd,N,Cam,Custo).

estimativaFL(X,Lista,N,EstX):-
    length(Lista,NLigacoesAtual),
	Nivel is N-NLigacoesAtual,
	forcasLigacaoUser(X,Nivel,ListaForcas),
	% ordenar de forma decrescente e mantendo os repetidos 
    sort(0,@>=,ListaForcas,ListaForcasOrd),
    removeForcas(Lista,ListaForcasOrd,ListaForcasAtual),
    elementosNivel(ListaForcasAtual,Nivel,ListaForcasFinal),
	soma(ListaForcasFinal,EstX).

% forças de ligaçao do user para Nivel N
forcasLigacaoUser(User,Nivel,ListaForcas):-
	%retorna lista de users ate Nivel N
	tamanhoRedeUser(User,Nivel,ListaUserRede,_),
	forcaLigacaoLista(ListaUserRede,[],ListaForcas).

forcaLigacaoLista([],ListaFinal,ListaFinal):-
	!.

% forças de ligaçao para lista de users
forcaLigacaoLista([User|ListaUserRede],ListaAtual,ListaFinal):-
    findall(FL, (
	    member(X,ListaUserRede),
	    X \== User,
		forcaLigacao(User,X,FL)), Lista),
	append(Lista,ListaAtual,ListaCompleta),
	forcaLigacaoLista(ListaUserRede,ListaCompleta,ListaFinal).

forcaLigacao(_,_,_):-
	fail,
	!.

forcaLigacao(X,Y,FL):-
    ligacao(Y,X,_,FL,_,_),
	!.

% força de ligaçao entre 2 users
forcaLigacao(X,Y,FL):-
    ligacao(X,Y,FL,_,_,_),
	!.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% AStarMulticriterio %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

aStarMulticriterio(Orig,Dest,N,Cam,Custo):-
	get_time(Inicio),
    aStarMulticriterio2(Dest,[(_,0,[Orig],[])],N,Cam,Custo),
	get_time(Fim),
	Tempo is Fim-Inicio,
	write(Tempo),
	write(' s').    

aStarMulticriterio2(Dest,[(_,Custo,[Dest|T],Lista)|_],N,Cam,Custo):-
	length(Lista,NLigacoes),
	NLigacoes =< N,
    reverse([Dest|T],Cam).

aStarMulticriterio2(Dest,[(_,CustoAtual,CamAtual,Lista)|Outros],N,Cam,Custo):-
    CamAtual=[Atual|_],
    findall((CustoEstX,CustoaX,[X|CamAtual],[CustoX|Lista]), (
        Dest\==Atual,	
		ligacao(Atual,X,FL,_,FR,_),
		\+member(X,CamAtual),	
		%calculo do custo com multi criterio	
        multiCriterio(FL,FR,CustoX),
		%calculo da estimativa	
        estimativaMultiCriterio(X,Lista,N,EstX),	
		CustoaX is CustoX + CustoAtual,		
        CustoEstX is CustoaX + EstX	
	), Novos),
    append(Outros,Novos,Todos),
	% ordenar de forma decrescente e mantendo os repetidos 
    sort(0,@>=,Todos,TodosOrd),
    aStarMulticriterio2(Dest,TodosOrd,N,Cam,Custo).

estimativaMultiCriterio(X, Lista, N, EstX):-
    length(Lista,NLigacoesAtual),
	Nivel is N - NLigacoesAtual,
	forcasMultiCriterioUser(X,Nivel,ListaForcas),
    sort(0,@>=,ListaForcas,ListaForcasOrd),
    removeForcas(Lista,ListaForcasOrd,ListaForcasAtual),
    elementosNivel(ListaForcasAtual,Nivel,ListaForcasFinal),
	soma(ListaForcasFinal,EstX).

% forças com multi criterio do user para Nivel N
forcasMultiCriterioUser(User,N,ListaForcas):-
	%retorna lista de users ate Nivel N
	tamanhoRedeUser(User,N,ListaUserRede, _),
	forcaMultiCriterioLista(ListaUserRede,[],ListaForcas).

forcaMultiCriterioLista([],ListaFinal,ListaFinal):-
	!.

% forças com multi criterio para lista de users
forcaMultiCriterioLista([User|ListaUserRede],ListaAtual,ListaFinal):-
    findall(Res, (
	    member(X,ListaUserRede),
	    X \== User,
		forcaMultiCriterio(User,X,Res)), Lista),
	append(Lista,ListaAtual,ListaCompleta),
	forcaMultiCriterioLista(ListaUserRede,ListaCompleta,ListaFinal).

forcaMultiCriterio(_,_,_):-
	fail,
	!.

forcaMultiCriterio(X,Y,Res):-
    ligacao(Y,X,_,FL,_,FR),
	multiCriterio(FL,FR,Res),
	!.

% força com multi criterio entre 2 users
forcaMultiCriterio(X,Y,Res):-
    ligacao(X,Y,FL,_,FR,_),
	multiCriterio(FL,FR,Res),
	!.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
	
removeForcas([],Lista,Lista):-
	!.

% elimina os elementos da primeira lista coincidentes na segunda lista
removeForcas([L|ListaLigacoes],Lista,ResFinal):-
	apaga(L,Lista,Res),
	removeForcas(ListaLigacoes,Res,ResFinal).

apaga(X,[X|L],L):-
    !.

apaga(_,[],[]):-
    !.

apaga(X,[Y|L],[Y|L1]):-
    apaga(X, L, L1).

elementosNivel([],_,[]):-
    !.

elementosNivel(_,0,[]):-
    !.

% primeiros elementos ate nivel N
elementosNivel([X|ListaOrd],N,[X|ListaFinal]):-
    Count is N - 1,
    elementosNivel(ListaOrd,Count,ListaFinal).


soma([],0):-
    !.

% soma de uma lista de elementos
soma([X|Lista],Res):-
    soma(Lista,Res1),
    Res is Res1 + X.
