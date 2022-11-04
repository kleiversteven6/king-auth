import React, { useState, useEffect } from 'react';
import FormUrl from '../../components/FormUrl';

import LinkUrls from '../../components/linkurls';
import { getWebsites, deleteWebsite } from '../../firebase/api';

export default function ShortUrls() {
  const [websites, setWebsites] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getWebsites();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    console.log(docs);
    setWebsites(docs);
    // });
  };
  const deletesite = id => {
    deleteWebsite(id);
    getLinks();
  };
  useEffect(() => {
    getLinks();
  }, []);
  return (
    <>
      <FormUrl />
      <LinkUrls websites={websites} deletesite={deletesite} />
    </>
  );
}
