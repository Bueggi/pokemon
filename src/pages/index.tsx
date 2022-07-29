import React from "react";
import { trpc } from "../utils/trpc";

const PokemonVotePage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "Christopher" },
  ]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">
        Which Pokemon is rounder, {data?.greeting}?
      </div>
      <div className="pt-2"></div>
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        <div className="h-16 w-16 bg-red-100"></div>
        <div className="p-8">vs</div>
        <div className="h-16 w-16 bg-red-100"></div>
      </div>
    </div>
  );
};

export default PokemonVotePage;
