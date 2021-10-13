import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const X_RAPIDAPI_KEY = process.env.REACT_APP_X_RAPIDAPI_KEY;

const cryptoNewsApiHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': X_RAPIDAPI_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

const baseURI = 'https://bing-news-search1.p.rapidapi.com';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&limit=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
