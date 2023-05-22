import {trpc} from "@/utils/trpc";

export const useCurrentUser = () => {
  const user = trpc.session.user.useQuery();

  return { user };
};
