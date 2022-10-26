import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { getWebsites } from '../firebase/api';

export default function LinkUrls() {
  const [websites, setWebsites] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getWebsites();
    // onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach(doc => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setWebsites(docs);
    console.log(docs);
    // });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Shorth url</Table.HeaderCell>
            <Table.HeaderCell>Url original</Table.HeaderCell>
            <Table.HeaderCell>Creada</Table.HeaderCell>
            <Table.HeaderCell>Clicks</Table.HeaderCell>
            <Table.HeaderCell>Opciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {websites.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.short} </Table.Cell>
              <Table.Cell> {row.url} </Table.Cell>
              <Table.Cell> {Date(row.DateTime)} </Table.Cell>

              <Table.Cell>{row.clicks} </Table.Cell>
              <Table.Cell>{row.id} </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
