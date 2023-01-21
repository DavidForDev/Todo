import axios from "axios";

export const UseGraphql = async (schema) => {
  const graphqlShcema = {
    query: schema,
  };

  const axiosRequest = await axios({
    url: "https://todonext-server.vercel.app/",
    method: "POST",
    data: JSON.stringify(graphqlShcema),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const requestResponse = await axiosRequest.data;

  return {
    data: requestResponse.data,
    errors: requestResponse.errors,
  };
};
