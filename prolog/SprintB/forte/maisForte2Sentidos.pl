:-dynamic melhor_sol_forte/3.

dfs_forte(Orig,Dest,Cam,F):- dfs_forte2(Orig,Dest,[Orig],Cam,F).

dfs_forte2(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2(Act,Dest,LA,Cam,[F|[F1|RF]]):- no(NAct,Act,_), ligacao(NAct,NX,F,F1), no(NX,X,_),
    \+ member(X,LA),dfs_forte2(X,Dest,[X|LA],Cam,RF).

plan_forte(Orig,Dest,LCaminho_forte,Forca):- get_time(Ti), 
    (melhor_caminho_forte(Orig,Dest);true),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '), write(T),nl.

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