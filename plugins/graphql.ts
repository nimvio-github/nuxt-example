import { GraphQLClient } from "graphql-request";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { CLIENT_APICD_URL, NIMVIO_PROJECT_ID } = config.public;
  const endpoint = `${CLIENT_APICD_URL}/${NIMVIO_PROJECT_ID}`;
  const client = new GraphQLClient(endpoint, { headers: {} });
  return {
    provide: {
      gqlClient: client,
    },
  };
});
