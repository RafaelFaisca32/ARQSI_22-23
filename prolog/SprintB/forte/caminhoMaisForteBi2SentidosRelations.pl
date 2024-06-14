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
ligacao(11,21,10,10,10,10).
ligacao(11,22,10,10,10,10).
ligacao(11,23,10,10,10,10).
ligacao(12,21,10,10,10,10).
ligacao(12,22,10,10,10,10).
ligacao(12,23,10,10,10,10).
ligacao(13,21,10,10,10,10).
ligacao(13,22,10,10,10,10).
ligacao(13,23,10,10,10,10).
ligacao(21,31,10,10,10,10).
ligacao(21,32,10,10,10,10).
ligacao(21,33,10,10,10,10).
ligacao(22,31,10,10,10,10).
ligacao(22,32,10,10,10,10).
ligacao(22,33,10,10,10,10).
ligacao(23,31,10,10,10,10).
ligacao(23,32,10,10,10,10).
ligacao(23,33,10,10,10,10).
ligacao(31,200,10,10,10,10).
ligacao(32,200,10,10,10,10).
ligacao(33,200,10,10,10,10).
ligacao(1,11,10,10,10,10).
ligacao(1,12,10,10,10,10).
ligacao(1,13,10,10,10,10).

:-dynamic melhor_sol_forte/3.

dfs_forte(Orig,Dest,Cam,F):- dfs_forte2(Orig,Dest,[Orig],Cam,F).

dfs_forte2(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2(Act,Dest,LA,Cam,[R|RF]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1,FR,FR1);ligacao(NX,NAct,F,F1,FR,FR1)), multiCriterio(F+F1,FR+FR1,R), no(NX,X,_),
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
    melhor_sol_forte(_,_,N),
    sumlist(LF,SF),
    SF>N, retract(melhor_sol_forte(_,_,_)),
    asserta(melhor_sol_forte(LCaminho,_,SF)).

multiCriterio(FL,FR,R):- ( FR =< -200 -> R is((-0.5 * FL) + FL);
                         (FR >= 200 -> R is (0.5 * FL) + 50 ; 
                         (FR < 0 -> R is ((0.5 * FL) + (0.5*(50 - (FR / 200) * 50)));
                         (FR =:= 0 -> R is ((0.5 * FL) + (0.5 * 50));
                         (FR > 0 -> R is ((0.5 * FL) + (0.5*(50 + (FR / 200) * 50))); true))))).
