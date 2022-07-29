import React from "react";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import Image from "next/image";

const PokemonVotePage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "Christopher" },
  ]);

  const [ids, updateIds] = React.useState(() => getOptionsForVote());
  const [first, second]: number[] = ids;

  const firstPokemon = trpc.useQuery(["pokemon.getPokemon", { id: first! }]);
  const secondPokeomn = trpc.useQuery(["pokemon.getPokemon", { id: second! }]);

  const voteForRoundest = async (selected: number) => {
    if (selected === first) {
      const result = voteMutation.mutate({
        votedFor: first,
        votedAgainst: second!,
      });
      console.log(result);
    } else {
      voteMutation.mutate({ votedFor: second!, votedAgainst: first! });
    }
    updateIds(getOptionsForVote());
  };

  const voteMutation = trpc.useMutation("pokemon.voteForPokemon");

  return firstPokemon.isLoading || secondPokeomn.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Which Pokemon is rounder, {data?.greeting}?
      </div>
      <div className="pt-2"></div>
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        <div className="h-64 w-64 flex flex-col items-center">
          <div className="relative w-full h-full">
            <Image
              src={firstPokemon.data?.sprites.front_default!}
              alt="first Pokemon"
              layout="fill"
            />
          </div>
          <div className="text-xl">{firstPokemon.data?.name.toUpperCase()}</div>
          <div className="pt-4"></div>
          <button
            onClick={() => voteForRoundest(first!)}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Rounder
          </button>
        </div>
        <div className="p-8">vs</div>
        <div className="h-64 w-64 flex flex-col items-center relative">
          <div className="relative w-full h-full">
            <Image
              src={secondPokeomn.data?.sprites.front_default!}
              alt="second Pokemon"
              layout="fill"
            />
          </div>
          <div className="text-xl">
            {secondPokeomn.data?.name.toUpperCase()}
          </div>
          <div className="pt-4"></div>
          <button
            onClick={() => voteForRoundest(second!)}
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonVotePage;
