import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";

export default function RQSuperHerosPage() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const [timer, setTimer] = useState(30000);
  const navigation = useNavigate();

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error");
    setTimer(false);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate: addHero,
    isLoading: isAddLoading,
    isError: isAddError,
    error: AddError,
  } = useAddSuperHeroData();

  const moveTopage = (heroId) => {
    navigation(`/rq-super-heroes/${heroId}`);
  };

  const handleAddHeroClick = () => {
    console.log(name, alterEgo);
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      {isAddLoading && <div>Add Loading</div>}
      {isAddError && <div>{AddError.message}</div>}
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.id} onClick={() => moveTopage(hero.id)}>
          {hero.name}
        </div>
      ))}

      {/* {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  );
}
