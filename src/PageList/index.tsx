import React, { useState } from "react";
import { usePageCollection, useFirestore } from "../Firebase";
import { useLocalForm, usePlugin, usePlugins } from "react-tinacms";
import { AddContentPlugin } from "tinacms";

export function PageList() {
  usePageCreatorPlugin();

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

const PAGE_FIELDS = [
  { name: "title", label: "Title", component: "text" },
  { name: "published", label: "Publisehd", component: "toggle" },
  { name: "body", label: "Body", component: "markdown" }
];

function usePageForm(page: any) {
  return useLocalForm({
    id: page.id,
    initialValues: page,
    label: page.title,
    fields: PAGE_FIELDS,
    onSubmit() {
      alert("TODO");
    }
  });
}

function usePageCreatorPlugin() {
  const firestore = useFirestore();

  const [plugin] = useState<AddContentPlugin<any>>(() => ({
    __type: "content-button",
    name: "Page",
    fields: PAGE_FIELDS,
    async onSubmit(formValues) {
      if (firestore) {
        firestore.collection("pages").add(formValues);
      }
    }
  }));
  usePlugins(plugin);
}
