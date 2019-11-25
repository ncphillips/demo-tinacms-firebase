import React, { useState } from "react";
import { usePageCollection, useFirestore } from "../Firebase";
import { useLocalForm, usePlugins } from "react-tinacms";
import { AddContentPlugin, ActionButton } from "tinacms";

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
  const firestore = useFirestore();
  return useLocalForm({
    id: page.id,
    initialValues: page,
    label: page.title,
    fields: PAGE_FIELDS,
    onSubmit({ id, ...data }) {
      if (!firestore) return;
      firestore
        .collection("pages")
        .doc(id)
        .update(data)
        .then(a => console.log(a))
        .catch(e => console.log(e));
    },
    actions: [
      (props: any) => {
        return (
          <ActionButton
            onClick={() => {
              if (!firestore) return;
              firestore
                .collection("pages")
                .doc(props.form.values.id)
                .delete()
                .then(a => console.log(a))
                .catch(e => console.log(e));
            }}
          >
            Delete
          </ActionButton>
        );
      },
      ActionReset
    ]
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

const ActionReset = ({ form, close }: any) => {
  return (
    <ActionButton
      onClick={() => {
        form.finalForm.reset();
      }}
    >
      Reset
    </ActionButton>
  );
};
