import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

export const useCurrentUser = () => {
  const user = trpc.session.user.useQuery();

  return { user };
};
