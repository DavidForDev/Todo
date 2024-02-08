// ========== Helper ========== \\
import { useGraphql } from "./useGraphql";

export const thunkResponser = async (
  graphqlSchema: string,
  variables?: object
) => {
  const { response, errors } = await useGraphql(graphqlSchema, variables);

  return {
    response: response.data,
    errors: errors,
  };
};
