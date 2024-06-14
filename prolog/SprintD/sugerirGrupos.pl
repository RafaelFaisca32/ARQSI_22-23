:-consult(baseConhecimentoD).

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
    findall([Comb,ListUsers],(
        users_combination(Comb,ListUsers),            
        % verifica que a combinacao de users tem o numero minimo de users
	    length(ListUsers,Temp),
	    Temp >= NUsers
     ),List_Result),
    write(List_Result),
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
