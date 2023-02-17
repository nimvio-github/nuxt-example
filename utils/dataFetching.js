import { GraphQLClient } from "graphql-request"

const globalCache = {}

export const getContentById = async (_client, id, option = {}) => {
  try {
    const query = /* GraphQL */ `
      query getContentById {
        content(contentId: "${id}") {
          Name
          ContentID
          Data
          TemplateName
          PublishedAt
        }
      }
    `;
    const response = await _client.request(query);
    if (!response) return { data: response }
    if (option && option.deep && response[0] && response[0].Data) {
      const referenceCache = option.cache || globalCache;
      referenceCache[id] = response[0]
      const responseData = response[0].Data;
      const responseDataKey = Object.keys(responseData);
      // Recursively fetch Reference Content
      for (const key of responseDataKey) {
        if (
          typeof responseData[key] === "object" &&
          responseData[key].Type === "Reference" &&
          responseData[key].ReferenceType === "Content" &&
          Array.isArray(responseData[key].ContentIDs)
        ) {
          responseData[key] = await Promise.all(
            responseData[key].ContentIDs.map(async (contentId) => {
              if (referenceCache[contentId]) {
                return referenceCache[contentId];
              } else {
                const { data } = await getContentById(_client, contentId, {
                  deep: true,
                  cache: referenceCache,
                });
                referenceCache[contentId] = data
                return data;
              }
            })
          );
        }
      }
    }
    return { data: response[0] };
  } catch (error) {
    console.log("error fetching id ", id, error);
    console.log("error :", error);
  }
}