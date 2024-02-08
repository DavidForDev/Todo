import axios from "axios";

export const useGraphql = async (schema: string, variables?: object) => {
  const graphqlSchema = {
    query: schema,
    variables: variables,
  };

  try {
    const sendRequest = await axios({
      url: "https://todo-mu-murex.vercel.app/",
      method: "POST",
      data: JSON.stringify(graphqlSchema),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = sendRequest.data;
    const errors = response.errors;

    return {
      response: response,
      errors: errors,
    };
  } catch (error) {
    throw error;
  }
};
