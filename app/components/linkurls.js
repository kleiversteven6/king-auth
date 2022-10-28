/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';

export default function LinkUrls({ websites, deletesite }) {
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
                <NavLink to={`/url/${row.short}`}>{row.short}</NavLink>
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

                  <Button icon="pencil" color="teal" />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
