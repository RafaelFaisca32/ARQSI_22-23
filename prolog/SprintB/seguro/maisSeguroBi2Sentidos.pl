no(1,1,[natureza]).
no(200,200,[natureza]).
no(11,11,[natureza]).
no(12,12,[natureza]).
no(13,13,[natureza]).
no(21,21,[natureza]).
no(22,22,[natureza]).
no(23,23,[natureza]).
no(31,31,[natureza]).
no(32,32,[natureza]).
no(33,33,[natureza]).
ligacao(11,21,4,20).
ligacao(11,22,11,3).
ligacao(11,23,15,12).
ligacao(12,21,0,4).
ligacao(12,22,20,7).
ligacao(12,23,18,9).
ligacao(13,21,2,20).
ligacao(13,22,20,12).
ligacao(13,23,0,6).
ligacao(21,31,5,13).
ligacao(21,32,13,6).
ligacao(21,33,5,14).
ligacao(22,31,1,14).
ligacao(22,32,11,5).
ligacao(22,33,17,12).
ligacao(23,31,9,2).
ligacao(23,32,13,7).
ligacao(23,33,16,0).
ligacao(31,200,14,2).
ligacao(32,200,15,12).
ligacao(33,200,0,20).
ligacao(1,11,9,8).
ligacao(1,12,9,8).
ligacao(1,13,9,8).


:-dynamic melhor_sol_forte/3.

dfs_forte(Orig,Dest,Cam,F):- dfs_forte2(Orig,Dest,[Orig],Cam,F).

dfs_forte2(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2(Act,Dest,LA,Cam,[F|[F1|RF]]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1);ligacao(NX,NAct,F,F1)), no(NX,X,_),
    \+ member(X,LA),dfs_forte2(X,Dest,[X|LA],Cam,RF).

plan_secure(Orig,Dest,LCaminho_forte,Forca,SEC):- get_time(Ti), 
    (melhor_caminho_secure(Orig,Dest,SEC);true),
    retract(melhor_sol_forte(LCaminho_forte,LForca,Forca)),
    get_time(Tf),
    T is Tf-Ti,
    write('Tempo de geracao da solucao: '), write(T),nl.

melhor_caminho_secure(Orig,Dest,SEC):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forte(Orig,Dest,LCaminho,LF),
    min_list(LF,Min), Min >= SEC,
    atualiza_melhor_forte(LCaminho,LF),
    fail.

atualiza_melhor_forte(LCaminho,LF):-
    melhor_sol_forte(_,LCaminho,N),
    sumlist(LF,SF),
    SF>N, retract(melhor_sol_forte(_,_,_)),
    asserta(melhor_sol_forte(LCaminho,F,SF)).

