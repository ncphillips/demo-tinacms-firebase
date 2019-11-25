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
  const [page] = usePageForm(props.page);

  return <li>{page.title}</li>;
};

function usePageForm(page: any) {
  return useLocalForm({
    id: page.id,
    initialValues: page,
    label: page.title,
    fields: [{ name: "title", component: "text" }],
    onSubmit() {
      alert("TODO");
    }
  });
}
