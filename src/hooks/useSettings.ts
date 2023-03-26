import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import {useState} from "react";
import {Settings} from "@prisma/client";

export const useSettings = () => {
  const [settings, setSettings] = useState<Partial<Settings>>({});
  trpc.settings.subscribe.useSubscription({}, {
    onData(result){
      setSettings(result);
    }
  });


  return settings
};
