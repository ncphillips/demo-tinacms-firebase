import React from "react";
import { usePageCollection } from "../Firebase";

export function PageList() {
  const pages = usePageCollection();

  return (
    <ul>
      {pages.map(page => {
        console.log(page);
        return <li>{page.title}</li>;
      })}
    </ul>
  );
}
