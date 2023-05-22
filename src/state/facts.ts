import {CountryFact} from "@prisma/client";
import {observable} from "@legendapp/state";

export const factsState = observable([] as CountryFact[]);