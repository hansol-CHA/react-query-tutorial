// list of superHeroes
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};
// const fetchSuperHeroes = () => {
//   return axios.get("http://localhost:4000/superheroes");
// };

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};
// const addSuperHero = (hero) => {
//   return axios.post("http://localhost:4000/superheroes", hero);
// };

const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);

    //   return superHeroNames;
    // },
  });
};

const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });

      return {
        previousHeroData,
      };
    },
    onError: (_error, _hero, context) => {
      console.log(_error);
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
    // onSuccess: (data) => {
    //   // post 반환값
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    //   // queryClient.invalidateQueries("super-heroes");
    // },
  });
};

export { useSuperHeroesData, useAddSuperHeroData };
