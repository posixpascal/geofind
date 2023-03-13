import { trpc } from "@/utils/trpc";

export const CountryCapital = () => {
  const capital = trpc.countries.capital.useQuery({
    country: "1",
    planet: "2",
  });

  return <div></div>;
};
