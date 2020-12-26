import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const userIsAuth = (
  setOpenAuthForm: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [{ data, fetching }] = useMeQuery();

  if (!fetching && !data?.me) {
    setOpenAuthForm(true);
  }
};
