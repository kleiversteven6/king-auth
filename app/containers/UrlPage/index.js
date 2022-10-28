/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { getWebsites, updateWebsite } from '../../firebase/api';

export default function UrlPage({ match }) {
  const websiteshort = async () => {
    const querySnapshot = await getWebsites();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    const url = docs.filter(q => q.short === match.params.short);
    const newLink = {
      cliks: url[0].cliks + 1,
    };
    console.log(url[0]);
    await updateWebsite(url[0].id, newLink);
  };

  useEffect(() => {
    websiteshort();
  }, []);
  return (
    <>
      Parametros
      <h1>{match.params.short}</h1>
    </>
  );
}
