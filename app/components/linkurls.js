/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { deleteWebsite } from '../firebase/api';

export default function LinkUrls({ websites }) {
  const deletesite = id => {
    deleteWebsite(id);
  };
  useEffect(() => {}, []);
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
              <Table.Cell>
                <Button.Group>
                  <Button
                    icon="trash"
                    onClick={() => deletesite(row.id)}
                    color="red"
                  />
                  <Button icon="pencil" color="teal" />
                  <Button icon="share alternate" primary />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
