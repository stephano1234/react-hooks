import { useState } from "react";

const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVXYWZ1234567890";

const genId = (length: number) => {
  return Array.from<string>({ length })
    .map(() => possibleChars[Math.floor(Math.random() * possibleChars.length)])
    .join("");
};

export default function useIdList(length: number) {
  const [ids, setIds] = useState(() =>
    Array.from<string>({ length }).reduce((list) => {
      let id = genId(8);
      while (list.includes(id)) {
        id = genId(8);
      }
      return [...list, id];
    }, [] as string[]),
  );

  const addId = (id: string) => {
    if (id.length !== 8) {
      return;
    }
    const fixedCaseId = id.toUpperCase();
    if (
      fixedCaseId.split("").some((idChar) => !possibleChars.includes(idChar))
    ) {
      return;
    }
    if (ids.includes(fixedCaseId)) {
      return;
    }
    setIds([...ids, fixedCaseId]);
  };

  return { ids, addId };
}
