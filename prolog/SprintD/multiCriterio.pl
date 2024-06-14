multiCriterio(FL,FR,R):- ( FR =< -200 -> R is((-0.5 * FL) + FL);
                         (FR >= 200 -> R is (0.5 * FL) + 50 ; 
                         (FR < 0 -> R is ((0.5 * FL) + (0.5*(50 - (FR / 200) * 50)));
                         (FR =:= 0 -> R is ((0.5 * FL) + (0.5 * 50));
                         (FR > 0 -> R is ((0.5 * FL) + (0.5*(50 + (FR / 200) * 50))); true))))).
