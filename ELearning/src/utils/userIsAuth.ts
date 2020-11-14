import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const userIsAuth = (navigate: any) => {
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      navigate("Login");
    }
  }, [fetching, data]);
};
