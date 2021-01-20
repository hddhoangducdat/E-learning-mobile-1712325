import { SearchContentProps } from "../components/SearchContent";

export const toParamsMap = (params?: any) => {
  const paramMap: Record<string, object> = {};
  if (!params) return paramMap;
  if (params?.categoryId) {
    paramMap["categoryId"] = params.categoryId;
  }
  return paramMap;
};
