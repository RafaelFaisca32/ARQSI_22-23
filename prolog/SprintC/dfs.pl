:-consult(baseConhecimento).
:-consult(multiCriterio).
:-dynamic melhor_sol_forte/3.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DFS FORTE COM MULTICRITERIO %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
 
dfs_forteMulti(Orig,Dest,Cam,F):- dfs_forte2Multi(Orig,Dest,[Orig],Cam,F).

dfs_forte2Multi(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2Multi(Act,Dest,LA,Cam,[R|RF]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1,FR,FR1);ligacao(NX,NAct,F,F1,FR,FR1)), 
    multiCriterio(F+F1,FR+FR1,R), no(NX,X,_),
    \+ member(X,LA),dfs_forte2Multi(X,Dest,[X|LA],Cam,RF).

plan_forteMulti(Orig,Dest,LCaminho_forte,Forca):-
    get_time(Inicio),
    (melhor_caminho_forteMulti(Orig,Dest);true),
    get_time(Fim),
    Tempo is Fim-Inicio,
	write(Tempo),
	write(' s'),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).

melhor_caminho_forteMulti(Orig,Dest):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forteMulti(Orig,Dest,LCaminho,LF),
    atualiza_melhor_forte(LCaminho,LF),
    fail.        


atualiza_melhor_forte(LCaminho,LF):-
    melhor_sol_forte(_,LCaminho,N),
    sumlist(LF,SF),
    SF>N, retract(melhor_sol_forte(_,_,_)),
    asserta(melhor_sol_forte(LCaminho,_,SF)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DFS FORTE COM MULTICRITERIO E MAXIMO DE LIGACOES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
 
plan_forteMultiL(Orig,Dest,N,LCaminho_forte,Forca):-
    get_time(Inicio),
    (melhor_caminho_forteMultiL(Orig,Dest,N);true),
    get_time(Fim),
    Tempo is Fim-Inicio,
	write(Tempo),
	write(' s'),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).
    

melhor_caminho_forteMultiL(Orig,Dest,N):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forteMulti(Orig,Dest,LCaminho,LF),
    atualiza_melhor_forteL(LCaminho,LF,N),
    fail.        


atualiza_melhor_forteL(LCaminho,LF,N):-
    length(LCaminho,Temp),
    NLigacoes is Temp - 1,
    NLigacoes =< N,
    melhor_sol_forte(_,LCaminho,N1),
    sumlist(LF,SF),
    SF>N1, retract(melhor_sol_forte(_,_,_)),
    asserta(melhor_sol_forte(LCaminho,_,SF)).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DFS FORTE COM MAXIMO DE LIGACOES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     


dfs_forte(Orig,Dest,Cam,F):- dfs_forte2(Orig,Dest,[Orig],Cam,F).

dfs_forte2(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2(Act,Dest,LA,Cam,[F|[F1|RF]]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1,_,_);ligacao(NX,NAct,F,F1,_,_)), no(NX,X,_),
    \+ member(X,LA),dfs_forte2(X,Dest,[X|LA],Cam,RF).

plan_forteL(Orig,Dest,N,LCaminho_forte,Forca):-
    get_time(Inicio),
    (melhor_caminho_forteL(Orig,Dest,N);true),
    get_time(Fim),
    Tempo is Fim-Inicio,
	write(Tempo),
	write(' s'),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).

melhor_caminho_forteL(Orig,Dest,N):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forte(Orig,Dest,LCaminho,LF),
    atualiza_melhor_forteL(LCaminho,LF,N),
    fail.
