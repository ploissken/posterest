import React from 'react';
import { Table } from 'semantic-ui-react'

export default class SimpleTable extends React.Component {
  render() {
    const rows = this.props.rows.map(row => {
      const rowCells = row.columns.map(column => {
        return (<Table.Cell style={column.style}>{column.value}</Table.Cell>)
      })
      return(<Table.Row>{rowCells}</Table.Row>)
    })

    return (
      <Table.Body>
        {rows}
      </Table.Body>
    )
  }
}
