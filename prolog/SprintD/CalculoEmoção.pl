:-consult(baseConhecimentoD).

calculoEmocao(U,Alegria,Angustia):- estado(U,'alegria',VA),estado(U,'angustia',VANG),
    likes(U,L),dislikes(U,D),
    V is (L - D),
    ( V > 0 -> aumentar(VA,V,Alegria),diminuir(VANG,V,Angustia);
    V1 is abs(V),diminuir(VA,V1,Alegria),aumentar(VANG,V1,Angustia)).

aumentar(Emocao,Value,R):-
R is (Emocao + (1 - Emocao) * (Value / 200)).

diminuir(Emocao,Value,R):-
R is (Emocao * (1 - Value / 200)).


calculoEmocoesPeloGrupoSugerido(NUsers,NTags,Orig,MandatoryTags,WantedUsers,UnwantedUsers,Esperanca,Dececao,Medo,Alivio):-
    estado(Orig,'esperanca',OldEsperanca),estado(Orig,'medo',OldMedo),estado(Orig,'alivio',OldAlivio),estado(Orig,'dececao',OldDececao),

    sugerirGrupos(Orig,NUsers,NTags,MandatoryTags,Res),flatten(Res,Res1),retirarRep(Res1,Res2),
    length(WantedUsers,N1),length(UnwantedUsers,N2),

    (N1 > 0 -> calculoEmocoes1(WantedUsers,Res2,OldEsperanca,Esperanca,OldDececao,Dececao);
    Esperanca is OldEsperanca, Dececao is OldDececao),
    
    (N2 > 0 -> calculoEmocoes2(UnwantedUsers,Res2,OldMedo,Medo,OldAlivio,Alivio);
    Medo is OldMedo, Alivio is OldAlivio),!.


calculoEmocoes1(LWantedU,LGrupoSugerido,OldEsperanca,NewEsperanca,OldDececao,NewDececao):-
    nElementosComum(LWantedU,LGrupoSugerido,UsersInCommon),
    length(LWantedU,Max),
    Fracao is UsersInCommon/Max,
    Esperanca is (OldEsperanca + (1-OldEsperanca)* Fracao), ((NewEsperanca is (Esperanca-((1-Esperanca) * (1-Fracao))), NewEsperanca>=0);(NewEsperanca is 0)),
    Dececao is (OldDececao + (1-OldDececao)*(1-Fracao)), ((NewDececao is (Dececao - ((1- Dececao)*Fracao)),NewDececao>=0);(NewDececao is 0)).

calculoEmocoes2(LUnwantedU,LGrupoSugerido,OldMedo,NewMedo,OldAlivio,NewAlivio):-
    nElementosComum(LUnwantedU,LGrupoSugerido,UsersInCommon),
    length(LUnwantedU,Max),
    Fracao is UsersInCommon/Max,
    Medo is (OldMedo + (1-OldMedo)* Fracao), ((NewMedo is (Medo-((1-Medo) * (1-Fracao))), NewMedo>=0);(NewMedo is 0)),
    Alivio is (OldAlivio + (1-OldAlivio)*(1-Fracao)), ((NewAlivio is (Alivio - ((1- Alivio)*Fracao)),NewAlivio>=0);(NewAlivio is 0)).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SugerirGrupos %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  

sugerirGrupos(Orig,NUsers, NTags, MandatoryTags, Res):-
    get_time(Begining),
    % retorna tags do user e o seu nome
    no(Orig,OrigName,All_Tags),
    findall(Combination,(
        combinations(NTags,All_Tags,Combination),
        % verifica que a combinacao tem todas as tags obrigatorias
        intersection(MandatoryTags,Combination,Temp),
        MandatoryTags==Temp
    ),Combinations),
    % retorna todos os users menos o origem
    findall(User,(
        no(_,User,_),
        User\==OrigName
    ),Users),
    users_tags_comuns_combination(NTags,Users,Combinations),
    findall(ListUsers,(
        users_combination(Comb,ListUsers),            
        % verifica que a combinacao de users tem o numero minimo de users
	    length(ListUsers,Temp),
	    Temp >= NUsers
     ),Res),
    retractall(users_combination(_,_)),
    write('Solution found at '),
    get_time(End),
	Time is End-Begining,
	write(Time),
	write(' s'),nl.

%=== obtain users with commun tags for each combination ===
users_tags_comuns_combination(_,_,[]).
users_tags_comuns_combination(NTags,Users,[Combination|Combinations]):-
    x_commun_user_tags2(NTags,Combination,Users,Users_Com_Tags),    
    users_tags_comuns_combination(NTags,Users,Combinations),
    !,
    assertz(users_combination(Combination,Users_Com_Tags)).

%=== obtain the list of users with commun tags from the combination ===
x_commun_user_tags2(_,_,[],[]):-!.
x_commun_user_tags2(NTags,Tags,[U|Users],Result):-
    no(_,U,User_Tags),
    intersection(Tags, User_Tags,Commun),
    length(Commun, Size),
    Size >= NTags, !,
    x_commun_user_tags2(NTags,Tags,Users,Result1),
    append([U], Result1, Result).
x_commun_user_tags2(NTags,Tags,[_|Users],Result):-
    !,
    x_commun_user_tags2(NTags,Tags,Users,Result).

%=== Combinations ===
combinations(0,_,[]).
combinations(N,[NTags|T],[NTags|Comb]):-N>0,N1 is N-1,combinations(N1,T,Comb).
combinations(N,[_|T],Comb):-N>0,combinations(N,T,Comb).

retirarRep([],[]).
retirarRep([H|L],[H|L1]):- retirarAll(H,L,R), retirarRep(R,L1).

retirarAll(_,[],[]).
retirarAll(H,[H|L],R):- retirarAll(H,L,R).
retirarAll(H,[H1|L],[H1|L1]):- H \== H1, retirarAll(H,L,L1).

% common elementes between two lists
nElementosComum(L,LGrupo,R):- common_element(L,LGrupo,L3),length(L3,R).

common_element([],_,[]).
common_element([H|T],L2, [H|L1]):- member(H, L2),!,common_element(T, L2, L1).
common_element([_|T],L2,L1):-common_element(T,L2,L1).
