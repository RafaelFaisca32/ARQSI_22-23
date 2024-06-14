
:-consult(baseConhecimento).
:-consult(multiCriterio).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% bestFirstForcaLigacao %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

bestfs(Orig,Dest,N,Cam,Custo):-
    get_time(Inicio),
    bestfs2(Dest,[[Orig]],N,Cam,Custo),
	get_time(Fim),
	Tempo is Fim-Inicio,
	write(Tempo),
	write(' s').

bestfs2(Dest,[[Dest|T]|_],N,Cam,Custo):-
	reverse([Dest|T],Cam),
	length(Cam,Temp),
	NLigacoes is Temp - 1,
	NLigacoes =< N,
	calculaCustoForcaLigacao(Cam,Custo).

bestfs2(Dest,[[Dest|_]|Lista],N,Cam,Custo):-
	!,
	bestfs2(Dest,Lista,N,Cam,Custo).

bestfs2(Dest,Lista,N,Cam,Custo):-
	primeiroElemento(CamAtual,Lista,ListaAtual),
	CamAtual = [Atual|_],
	((Atual == Dest,
	    !,
		bestfs2(Dest,[CamAtual|ListaAtual],N,Cam,Custo));
	 (findall((FL,[X|CamAtual]), (
			ligacao(Atual,X,FL,_,_,_),
	        \+member(X,CamAtual)
		), Novos),
	    Novos \== [],
		!,
	    % ordenar de forma decrescente e mantendo os repetidos 
	    sort(0,@>=,Novos,NovosOrd),
	    retiraCusto(NovosOrd,NovosOrd1),
	    append(NovosOrd1,ListaAtual,ListaCompleta),
	    bestfs2(Dest,ListaCompleta,N,Cam,Custo))).

% calculo do custo
calculaCustoForcaLigacao([Atual,X],Custo):-
    !,
	ligacao(Atual,X,Custo,_,_,_).

calculaCustoForcaLigacao([Atual,X|L],Res):-
    calculaCustoForcaLigacao([X|L],Res1),
	ligacao(Atual,X,FL,_,_,_),
	Res is Res1 + FL.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% bestFirstMultiCriterio %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

bestfsMultiCriterio(Orig,Dest,N,Cam,Custo):-    
    get_time(Inicio),
    bestfsMultiCriterio2(Dest,[[Orig]],N,Cam,Custo),
	get_time(Fim),
	Tempo is Fim-Inicio,
	write(Tempo),
	write(' s').   

bestfsMultiCriterio2(Dest,[[Dest|T]|_],N,Cam,Custo):-
	reverse([Dest|T],Cam),
	length(Cam,Temp),
	NLigacoes is Temp - 1,
    NLigacoes =< N,
	calculaMultiCriterio(Cam,Custo).

bestfsMultiCriterio2(Dest,[[Dest|_]|Lista],N,Cam,Custo):-
	!,
	bestfsMultiCriterio2(Dest,Lista,N,Cam,Custo).

bestfsMultiCriterio2(Dest,Lista,N,Cam,Custo):-
	primeiroElemento(CamAtual,Lista,ListaAtual),
	CamAtual = [Atual|_],
	((Atual == Dest,
		!,
		bestfsMultiCriterio2(Dest,[CamAtual|ListaAtual],N,Cam,Custo));
	 (findall((Res,[X|CamAtual]), (
			ligacao(Atual,X,FL,_,FR,_),
	        \+member(X,CamAtual),
			multiCriterio(FL,FR,Res)
		), Novos),
	    Novos \==[],
		!,
	    % ordenar de forma decrescente e mantendo os repetidos 
	    sort(0,@>=,Novos,NovosOrd),
	    retiraCusto(NovosOrd,NovosOrd1),
	    append(NovosOrd1,ListaAtual,ListaCompleta),
	    bestfsMultiCriterio2(Dest,ListaCompleta,N,Cam,Custo))).

calculaMultiCriterio([Atual,X],Res):-
    !,
	ligacao(Atual,X,FL,_,FR,_),
	multiCriterio(FL,FR,Res).

calculaMultiCriterio([Atual,X|L],Res):-
    calculaMultiCriterio([X|L],Res1),
	ligacao(Atual,X,FL,_,FR,_),
	multiCriterio(FL,FR,Res2),
	Res is Res1 + Res2.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

% retorna o primeiro elemento da lista (X) e retorna essa lista sem o primeiro elemento (ListaFinal)
primeiroElemento(X,[X|Lista],Lista).
primeiroElemento(X,[_|Lista],ListaFinal):-
    primeiroElemento(X,Lista,ListaFinal).

% retira o custo de uma lista com duplicados
retiraCusto([],[]).
retiraCusto([(_,LA)|L],[LA|L1]):-
    retiraCusto(L,L1).
