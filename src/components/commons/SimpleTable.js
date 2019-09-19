import React from 'react';
import { Table } from 'semantic-ui-react'

export default class SimpleTable extends React.Component {
  render() {
    let rows = []

    this.props.rows.forEach(row => {
      let rowCells = []
      row.columns.forEach(column => {
        rowCells.push(<Table.Cell style={column.style}>{column.value}</Table.Cell>)
      })
      rows.push(<Table.Row>{rowCells}</Table.Row>)
    })

    return (
      <Table.Body>
        {rows}
      </Table.Body>
    )
  }
}
