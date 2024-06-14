% Base de Conhecimento

no(1,1,[natureza]).
no(200,200,[natureza]).
no(11,11,[natureza]).
no(12,12,[natureza]).
no(21,21,[natureza]).
no(22,22,[natureza]).
ligacao(11,21,19,19).
ligacao(11,22,18,16).
ligacao(12,21,14,2).
ligacao(12,22,0,14).
ligacao(21,200,16,1).
ligacao(22,200,13,18).

ligacao(1,11,3,2).
ligacao(1,12,7,4).




:-dynamic melhor_sol_minlig/2.

all_dfs(Nome1,Nome2,LCam):-get_time(T1),
    findall(Cam,dfs(Nome1,Nome2,Cam),LCam),
    length(LCam,NLCam),
    get_time(T2),
    write(NLCam),write(' solucoes encontradas em '),
    T is T2-T1,write(T),write(' segundos'),nl,
    write('Lista de Caminhos possiveis: '),write(LCam),nl,nl.

dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam).


plan_minlig(Orig,Dest,LCaminho_minlig):-
		get_time(Ti),
		(melhor_caminho_minlig(Orig,Dest);true),
		retract(melhor_sol_minlig(LCaminho_minlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

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






