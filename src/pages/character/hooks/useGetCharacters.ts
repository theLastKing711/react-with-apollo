import { useQuery } from "@apollo/client";
import {  useLocation, useSearchParams } from "react-router-dom";
import { Page } from "../../../shared/shared.type";
import { Characters } from "../character.type";
import { GET_CHARACTERS } from "../queries/character.query";


export const useGetCharacters = () => { 

    const location = useLocation();
    
    const initalPage: Record<string, string | string[]> = {
      page: "1",
      searchTerm: "",
    }
    
    const [queryParams, setQueryParams] = useSearchParams(initalPage);

  
    const searchTermNullIfEmpty = queryParams.get('searchTerm') ? 
      queryParams.get('searchTerm') 
      :
      null;

    const pageQueryParamsAsString = queryParams.get("page") ?? "1"; 
    
    console.log("page", pageQueryParamsAsString);

    console.log("query", pageQueryParamsAsString);
  
    const { loading, error, data } = useQuery<Page<Characters>>(GET_CHARACTERS, {
      variables: {
        page: parseInt(pageQueryParamsAsString),
        search: searchTermNullIfEmpty,
        sort: ["ID"]
      },
    });
  
    const hasNextPage = (data?.Page.pageInfo.hasNextPage) == true;
  
    const hasPreviousPage = pageQueryParamsAsString != "1";


  
    console.log("total", data?.Page.pageInfo.total);


    const PageQueryParamsAsString = () => {
      return queryParams.get("page") ?? "";
    }

    const getSearchTermQueryParamsAsString = () => {

      return queryParams.get("searchTerm") ?? "";
    }

    const getNextPageUrl = () => {

      const nextPageUrl = location.pathname + buildNextPageQueryParams();
  
      return nextPageUrl;
    };
  
    const getPreviousPageUrl = () => {

      const previousPageUrl = location.pathname + buildPreviousPageQueryParams();
      
      return previousPageUrl;
    };

    const updateSearchTerm = (value: string) => {

      if(value === "")
      {
        setQueryParams()

        return 
      }
      
      setQueryParams(prev => ({
        searchTerm: value
      }))
    }

    const buildNextPageQueryParams = () => {

      const searchUrl = appendSearchTermQueryParams();

      const pageUrl = appendNextPageQueryParams();

      const paramsUrl = addQuerySymbols(searchUrl, pageUrl);

      return paramsUrl;
      
    }

    const buildPreviousPageQueryParams = () => {

      const searchUrl = appendSearchTermQueryParams();

      const pageUrl = appendPreviousPageQueryParams();

      const paramsUrl = addQuerySymbols(searchUrl, pageUrl);

      return paramsUrl;
      
    }

    const addQuerySymbols = (...queryParams: string[]) => {

      const queryWithSymbols = queryParams
                                .filter(item => item !== "")
                                .reduce((prev, curr, index) => {

                                  if(index === 0) {
                                    return `?${curr}`
                                  }
                                  
                                  return prev + `&${curr}`;

                                }, "")
      
      return queryWithSymbols;
    }

    const appendSearchTermQueryParams = () => {
      const SearchTermQueryParamsAsString = getSearchTermQueryParamsAsString();

      if(SearchTermQueryParamsAsString) {
        return `searchTerm=${SearchTermQueryParamsAsString}`
      }
      return "";
   }

    const appendNextPageQueryParams = () => {
      const pageQueryParamsAsString = PageQueryParamsAsString();
      
      const nextPageAsInt = (parseInt(pageQueryParamsAsString) + 1) || 2;
      
      return `page=${ nextPageAsInt.toString() }`
      
    }

    const appendPreviousPageQueryParams = () => {
      
      const pageQueryParamsAsString = PageQueryParamsAsString();

      const previousPageAsInt = parseInt(pageQueryParamsAsString) - 1; 

      if(previousPageAsInt == 1) 
      {
        return "";
      }

      if(pageQueryParamsAsString) {
        return `page=${ previousPageAsInt.toString() }`
      }

      return ""
      
    }

    return {
        loading,
        error,
        pageQueryParamsAsString,
        searchQueryParamsAsString: getSearchTermQueryParamsAsString(),
        getNextPageUrl,
        getPreviousPageUrl,
        updateSearchTerm,
        data,
        hasNextPage,
        hasPreviousPage,
        queryParams
    }
    
}