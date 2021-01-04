import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export const useRate = (rateNumber: number) => {
  let arr = [];
  for (let i = 0; i < Math.floor(rateNumber); i++) {
    arr.push("star");
  }
  if (rateNumber > Math.floor(rateNumber)) {
    arr.push("star-half-empty");
  }
  while (arr.length < 5) {
    arr.push("star-o");
  }

  return arr.map((star, t) => (
    <FontAwesome key={t} name={star} size={15} color="#f2b20f" />
  ));
};
