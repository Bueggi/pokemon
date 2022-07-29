import { createRouter } from "./context";
import { z } from "zod";

import { PokemonClient  } from "pokenode-ts";

export const pokemonRouter =
    createRouter()
        .query('getPokemon', {
            input: z.object({ id: z.number() }),
            async resolve({ input }) {
                const api = new PokemonClient()
                const pokemon = await api.getPokemonById(input.id)
                return { name: pokemon.name, sprites: pokemon.sprites }
            }
        })
        .mutation('voteForPokemon', {
            input: z.object({ votedFor: z.number(), votedAgainst: z.number() }),
            async resolve({ctx, input}) { 
                const voteInDB : any = await ctx.prisma.vote.create({data: {votedFor: input.votedFor , votedAgains: input.votedAgainst }})
                return { success: true, voteInDB }
            }
        })
 
