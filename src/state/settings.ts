import { observable } from "@legendapp/state";
import type { Settings } from "@prisma/client";

// Partial<Settings> todo: type
export const settingsState = observable<any>();
