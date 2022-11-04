/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { saveWebsite, updateWebsite } from '../firebase/api';

export default function FormUrl({ LinkUrl = { short: '', url: '', id: '' } }) {
  const [url, setUrl] = useState(LinkUrl.url);
  const [short, setShort] = useState(LinkUrl.short);

  const addOrEditLink = async () => {
    const DateTime = new Date();
    if (LinkUrl.id === '') {
      const newLink = { url, short, cliks: 0, DateTime };
      await saveWebsite(newLink);
    } else {
      const newLink = { url, short };
      await updateWebsite(LinkUrl.id, newLink);
    }
  };
  return (
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

        <Form.Button>Guardar</Form.Button>
      </Form.Group>
    </Form>
  );
}
