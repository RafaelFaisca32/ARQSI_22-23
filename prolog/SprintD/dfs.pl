:-consult(baseConhecimentoD).
:-consult(multiCriterio).
:-consult(considerarEstadosEmocionais).
:-dynamic melhor_sol_forte/3.


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% DFS FORTE COM MULTICRITERIO E ESTADOS EMOCIONAIS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  
 
dfs_forteMulti(Orig,Dest,Cam,F):- dfs_forte2Multi(Orig,Dest,[Orig],Cam,F).

dfs_forte2Multi(Dest,Dest,LA,Cam,LF):-!, reverse(LA,Cam), LF = [].
dfs_forte2Multi(Act,Dest,LA,Cam,[R|RF]):- no(NAct,Act,_), (ligacao(NAct,NX,F,F1,FR,FR1);ligacao(NX,NAct,F,F1,FR,FR1)), 
    multiCriterio(F+F1,FR+FR1,R), no(NX,X,_),
    \+ member(X,LA),dfs_forte2Multi(X,Dest,[X|LA],Cam,RF).

plan_forteMulti(Orig,Dest,LCaminho_forte,Forca,Emotions,MaxEmotion):-
    get_time(Inicio),
    (melhor_caminho_forteMulti(Orig,Dest,Emotions,MaxEmotion);true),
    get_time(Fim),
    Tempo is Fim-Inicio,
	write(Tempo),
	write(' s'),
    retract(melhor_sol_forte(LCaminho_forte,_,Forca)).

melhor_caminho_forteMulti(Orig,Dest,Emotions,MaxEmotion):-
    asserta(melhor_sol_forte(_,_,-10000)),
    dfs_forteMulti(Orig,Dest,LCaminho,LF),
    atualiza_melhor_forte(LCaminho,LF,Emotions,MaxEmotion),
    fail.        


atualiza_melhor_forte(LCaminho,LF,Emotions,MaxEmotion):-
    considerarEstados(LCaminho,Emotions,MaxEmotion),
    melhor_sol_forte(_,LCaminho,N),
    sumlist(LF,SF),
    SF>N, retract(melhor_sol_forte(_,_,_)),
    asserta(melhor_sol_forte(LCaminho,_,SF)).