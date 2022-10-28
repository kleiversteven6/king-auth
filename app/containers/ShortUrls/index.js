import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import LinkUrls from '../../components/linkurls';
import { saveWebsite, getWebsites, deleteWebsite } from '../../firebase/api';

export default function ShortUrls() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');
  const addOrEditLink = async () => {
    const DateTime = new Date();
    const newLink = { url, short, cliks: 0, DateTime };
    await saveWebsite(newLink);
    getLinks();
  };
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
      <Form unstackable onSubmit={addOrEditLink}>
        <Form.Group widths={2}>
          <Form.Input
            label="Url "
            placeholder="https://"
            name="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <Form.Input
            label="Alias"
            placeholder=" "
            name="short"
            value={short}
            onChange={e => setShort(e.target.value)}
          />
          <Button type="submit">Acortar Url</Button>
        </Form.Group>
      </Form>
      <LinkUrls websites={websites} deletesite={deletesite} />
    </>
  );
}
