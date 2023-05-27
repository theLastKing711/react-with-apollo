import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CharacterDetails from "./pages/character/CharacterDetails";
import CharacterMain from "./pages/character/CharacterMain";
import { setContext } from "@apollo/client/link/context";
import AnimeMain from "./pages/anime/AnimeMain";
import AnimeTrendingMain from "./pages/anime-trending/AnimeTrendingMain";
import AnimeSearchMain from "./pages/anime-search/AnimeSearchMain";
import AnimePopularThisSeasonMain from "./pages/anime-popular-this-season/AnimePopularThisSeasonMain";
import AnimePopularNextSeasonMain from "./pages/anime-popular-next-season/AnimePopularNextSeasonMain";
import AnimeAllTimePopularMain from "./pages/anime-all-time-popular/AnimeAllTimePopularMain";
import AnimeTopOneHundredMain from "./pages/anime-top-100-hundred/AnimeTopOneHundredMain";
import AnimeDetailsMain from "./pages/anime-details/AnimeDetailsMain";
import AnimeOverviewMain from "./pages/anime-details/pages/overview/AnimeOverviewMain";
import AnimeDetailsStatsMain from "./pages/anime-details/pages/stats/AnimeDetailsStatsMain";
import AnimeDetailsStaffMain from "./pages/anime-details/pages/staff/AnimeDetailsStaffMain";
import AnimeDetailsCharactersMain from "./pages/anime-details/pages/characters/AnimeDetailsCharactersMain";
import AnimeDetailsWatchMain from "./pages/anime-details/pages/watch/AnimeDetailsWatchMain";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route>
          <Route index element={<CharacterMain />} />
          <Route path=":id" element={<CharacterDetails />}></Route>
        </Route>
        {/* <Route path="t">
          <Route path="testFirst" element={<TestComponent />}></Route>
          <Route path="testSecond" element={<TestComponent />}></Route>
        </Route> */}
        <Route path="anime">
          <Route index element={<AnimeMain />} />
          <Route path="trending" element={<AnimeTrendingMain />} />
          <Route path="this-season" element={<AnimePopularThisSeasonMain />} />
          <Route path="next-season" element={<AnimePopularNextSeasonMain />} />
          <Route path="popular" element={<AnimeAllTimePopularMain />} />
          <Route path="top-100" element={<AnimeTopOneHundredMain />} />

          <Route path="search" element={<AnimeSearchMain />} />
          <Route path=":id" element={<AnimeDetailsMain />}>
            <Route index element={<AnimeOverviewMain />} />
            <Route path="stats" element={<AnimeDetailsStatsMain />} />
            <Route path="staff" element={<AnimeDetailsStaffMain />} />
            <Route path="characters" element={<AnimeDetailsCharactersMain />} />
            <Route path="watch" element={<AnimeDetailsWatchMain />} />
          </Route>
        </Route>
      </Route>
      {/* <Route element={<LayoutPage />}>
        <Route path="testing" element={<Testing />} />
      </Route> */}
    </>
  )
);

const httpLink = createHttpLink({
  uri: "https://graphql.anilist.co",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token");

  console.log("token", token);

  console.log("headers", headers);

  let authorizationHeader = {};

  if (token) {
    authorizationHeader = {
      authorization: `Bearer ${token}`,
    };
  }

  return {
    headers: {
      ...headers,
      ...authorizationHeader,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       Page: {
    //         keyArgs: (item, context) => {
    //           if (context.variables?.type === "ANIME") return false;
    //           return ["page"];
    //         },
    //       },
    //     },
    //   },
    //   Page: {
    //     fields: {
    //       media: {
    //         // keyArgs: [],
    //         merge(existing = [], incoming) {
    //           console.log("merging", incoming);
    //           // const merged = existing ? existing.slice(0) : [];
    //           // for (let i = 0; i < incoming.length; ++i) {
    //           //   merged[xa.offset + i] = incoming[i];
    //           // }
    //           console.log("existing", existing);
    //           console.log("incoming", incoming);
    //           return [...existing, ...incoming];
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
