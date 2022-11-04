/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Header, Icon, Modal, Table } from 'semantic-ui-react';
import FormUrl from './FormUrl';

export default function LinkUrls({ websites, deletesite }) {
  const [open, setOpen] = useState(false);
  const [LinkUrl, setLinkUrl] = useState({ short: '', url: '', id: '' });
  return (
    <>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
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
              <Table.Cell>{row.id} </Table.Cell>
              <Table.Cell>
                <a href={`/url/${row.short}`} target="_blank">
                  {row.short}
                </a>
              </Table.Cell>
              <Table.Cell> {row.url} </Table.Cell>
              <Table.Cell> {row.DateTime.toDate().toString()} </Table.Cell>

              <Table.Cell>{row.cliks} </Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <NavLink to={`/graficas/${row.id}`}>
                    <Button icon="chart bar outline" color="violet" />
                  </NavLink>

                  <Button icon="share alternate" color="green" />
                  <Button
                    icon="trash"
                    onClick={() => deletesite(row.id)}
                    color="red"
                  />

                  <Button
                    icon="pencil"
                    color="teal"
                    onClick={() => {
                      setOpen(true);
                      setLinkUrl(row);
                    }}
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Modal closeIcon open={open} onClose={() => setOpen(false)}>
        <Header icon="archive" content="Archive Old Messages" />
        <Modal.Content>
          <FormUrl LinkUrl={LinkUrl} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Cerrar
          </Button>
        </Modal.Actions>
      </Modal>{' '}
    </>
  );
}
