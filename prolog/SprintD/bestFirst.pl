:-consult(baseConhecimentoD).
:-consult(considerarEstadosEmocionais).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% bestFirstForcaLigacao %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

bestfs(Orig,Dest,N,Cam,Custo,Emotions,MaxEmotion):-
    get_time(Inicio),
    bestfs2(Dest,[[Orig]],N,Cam,Custo,Emotions,MaxEmotion),
	get_time(Fim),
	Tempo is Fim-Inicio,
	write(Tempo),
	write(' s').

bestfs2(Dest,[[Dest|T]|_],N,Cam,Custo,Emotions,MaxEmotion):-
	reverse([Dest|T],Cam),
	length(Cam,Temp),
	NLigacoes is Temp - 1,
	NLigacoes =< N,
	calculaCustoForcaLigacao(Cam,Custo),
    considerarEstadosNum(Cam,Emotions,MaxEmotion).

bestfs2(Dest,[[Dest|_]|Lista],N,Cam,Custo,Emotions,MaxEmotion):-
	!,
	bestfs2(Dest,Lista,N,Cam,Custo,Emotions,MaxEmotion).

bestfs2(Dest,Lista,N,Cam,Custo,Emotions,MaxEmotion):-
	primeiroElemento(CamAtual,Lista,ListaAtual),
	CamAtual = [Atual|_],
	((Atual == Dest,
	    !,
		bestfs2(Dest,[CamAtual|ListaAtual],N,Cam,Custo,Emotions,MaxEmotion));
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
	    bestfs2(Dest,ListaCompleta,N,Cam,Custo,Emotions,MaxEmotion))).

% calculo do custo
calculaCustoForcaLigacao([Atual,X],Custo):-
    !,
	ligacao(Atual,X,Custo,_,_,_).

calculaCustoForcaLigacao([Atual,X|L],Res):-
    calculaCustoForcaLigacao([X|L],Res1),
	ligacao(Atual,X,FL,_,_,_),
	Res is Res1 + FL.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

% retorna o primeiro elemento da lista (X) e retorna essa lista sem o primeiro elemento (ListaFinal)
primeiroElemento(X,[X|Lista],Lista).
primeiroElemento(X,[_|Lista],ListaFinal):-
    primeiroElemento(X,Lista,ListaFinal).

% retira o custo de uma lista com duplicados
retiraCusto([],[]).
retiraCusto([(_,LA)|L],[LA|L1]):-
    retiraCusto(L,L1).
