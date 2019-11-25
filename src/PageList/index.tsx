import React from "react";
import { usePageCollection } from "../Firebase";
import { useLocalForm } from "react-tinacms";

export function PageList() {
  const pages = usePageCollection();

  return (
    <ul>
      {pages.map(page => {
        return <PageListItem page={page} key={page.id} />;
      })}
    </ul>
  );
}

const PageListItem = (props: any) => {
  const [page] = useLocalForm({
    id: props.page.id,
    initialValues: props.page,
    label: props.page.title,
    fields: [{ name: "title", component: "text" }],
    onSubmit() {
      alert("TODO");
    }
  });

  return <li>{page.title}</li>;
};
