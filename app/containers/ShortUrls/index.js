import React, { useState, useEffect } from 'react';
import { Button, Container } from 'semantic-ui-react';

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
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button color="blue" basic floated="right" onClick={() => setOpen(true)}>
        Crear
      </Button>
      <FormUrl setOpen={setOpen} open={open} title="Acortar url" />
      <Container style={{ top: '10px', position: 'relative' }}>
        <LinkUrls websites={websites} deletesite={deletesite} />
      </Container>
    </>
  );
}
