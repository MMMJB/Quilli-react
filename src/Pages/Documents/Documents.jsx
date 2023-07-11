import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AccountButton from "../../Components/Account/AccountButton";
import Doc from "./Components/Doc";

import { useAuth } from "../../Contexts/AuthContext";

import { collection, getDocs } from "firebase/firestore";
import { database } from "../../Utils/firebase-config";

export default function Documents() {
  const [docs, setDocs] = useState([]);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  useEffect(
    (_) => {
      const getAllDocuments = async (_) => {
        const collectionRef = collection(
          database,
          "users",
          currentUser.uid,
          "docsData",
        );

        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
          setDocs((p) => [
            ...p,
            {
              id: doc.id,
              title: doc.data().title,
              content: doc.data().content,
            },
          ]);
        });
      };

      getAllDocuments();

      return (_) => setDocs([]);
    },
    [currentUser],
  );

  const searchDocuments = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="relative flex w-full justify-center bg-salmon">
        <div className="absolute top-6 flex w-1/2 max-w-[570px] items-center gap-4 rounded-xl border-[1px] border-home-lgt/50 bg-white/10 px-4 py-2">
          <span className="material-symbols-outlined text-2xl text-home-lgt">
            search
          </span>
          <input
            onSubmit={searchDocuments}
            type="search"
            placeholder="Search"
            className="flex-grow bg-transparent font-sans text-base text-home placeholder:text-home-lgt focus-visible:outline-none focus-visible:placeholder:text-home-lgt/50"
          ></input>
          <AccountButton />
        </div>
        <img
          className="max-h-[40vh] w-full"
          src="/images/quilli_illustration.svg"
        />
      </header>
      <main className="relative flex w-full flex-grow justify-center px-16 py-8">
        <ul className="relative grid grid-cols-4 gap-8">
          {docs.length > 0 ? (
            docs.map((doc, i) => {
              // return <Doc title={doc.title} type={doc.type} meter={doc.meter} key={i} />
              return (
                <Doc
                  onClick={(_) => navigate(`/documents/${doc.id}`)}
                  data={{ title: doc.title, content: doc.content }}
                  key={doc.id}
                />
              );
            })
          ) : (
            <span className="absolute left-1/2 w-max -translate-x-1/2 font-roboto text-editor-lgt/50">
              You haven't created any documents yet.
            </span>
          )}
        </ul>
        <img
          src="/images/corner.svg"
          alt=""
          className="fixed bottom-0 right-0 h-40"
        />
        <button
          onClick={(_) => navigate("/new")}
          className="fixed bottom-6 right-6 grid h-16 w-16 place-items-center rounded-full bg-brand text-4xl/[1px] text-white shadow-lg transition-colors hover:bg-brand-dark"
        >
          +
        </button>
      </main>
    </div>
  );
}
