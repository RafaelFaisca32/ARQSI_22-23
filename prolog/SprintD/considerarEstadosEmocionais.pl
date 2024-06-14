:-consult(baseConhecimentoD).

% para nao incluir o proprio user
considerarEstadosNum([H|L], Emotions, Value):-length(Emotions,Temp), considerarNum(L,Emotions,Value,0,Temp,Emotions).

considerarNum([],_,_,_,_,_).

considerarNum([H|L], [HE|LE], Value, Counter,MaxC,Emotions):- C is Counter + 1, 
    (C < MaxC -> (estado(H,HE,V), V =< Value, considerarNum([H|L],LE,Value,C,MaxC,Emotions)); 
        estado(H,HE,V), V =< Value, considerarNum(L,Emotions,Value,0,MaxC,Emotions)).




% para nao incluir o proprio user
considerarEstados([H|L], Emotions, Value):-length(Emotions,Temp), considerar(L,Emotions,Value,0,Temp,Emotions).

considerar([],_,_,_,_,_).

considerar([H|L], [HE|LE], Value, Counter,MaxC,Emotions):- C is Counter + 1, 
    (C < MaxC -> (no(H1,H,_),estado(H1,HE,V), V =< Value, considerar([H|L],LE,Value,C,MaxC,Emotions)); 
        no(H1,H,_),estado(H1,HE,V), V =< Value, considerar(L,Emotions,Value,0,MaxC,Emotions)).




