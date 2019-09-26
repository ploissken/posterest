import React from 'react';
import { Table } from 'semantic-ui-react'

export default class SimpleTable extends React.Component {
  render() {
    const rows = this.props.rows.map(row => {
      const rowCells = row.columns.map(column => {
        return (<Table.Cell style={column.style} key={column.value}>{column.value}</Table.Cell>)
      })
      console.log(row._id)
      return(<Table.Row key={row._id}>{rowCells}</Table.Row>)
    })

    return (
      <Table compact basic="very">
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    )
  }
}
