import { Link, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";

import HomePage from "./components/Home.page";
import SuperHerosPage from "./components/SuperHeroes.page";
import RQSuperHerosPage from "./components/RQSuperHeros.page";
import RQSuperHeroPage from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import DynamicParallelPage from "./components/DynamicsParaller.page";
import DependentQueriesPage from "./components/DependentQueries.page";
import PaginatedQueriesPage from "./components/PaginatedQueries.page";
import InfiniteQueriesPage from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

const list = [
  { id: 0, uri: "/", name: "Home" },
  { id: 1, uri: "/super-heroes", name: "Traditional" },
  { id: 2, uri: "/rq-super-heroes", name: "React Query" },
  { id: 3, uri: "/rq-parallel", name: "Parallel" },
  { id: 4, uri: "/rq-dependent", name: "Dependent" },
  { id: 5, uri: "/rq-paginated", name: "Pagination" },
  { id: 6, uri: "/rq-infinite", name: "Infinite" },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <Link to={item.uri}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/super-heroes" element={<SuperHerosPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHerosPage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route
            path="/rq-dependent"
            element={<DependentQueriesPage email="vishwas@example.com" />}
          />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
          <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
