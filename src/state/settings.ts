import {observable} from "@legendapp/state";
import {Settings} from "@prisma/client";

export const settingsState = observable<Partial<Settings>>();
