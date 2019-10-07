import React from 'react';
import SimpleTable from 'components/commons/SimpleTable'
import { Link } from 'react-router-dom'

import { Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

const rightAligned = {
  'textAlign': 'right',
  'paddingRight' : '10px'
}

class MinimalMenu extends React.Component {
    render() {

      const favCount = this.props.favorites.ids
        ? this.props.favorites.ids.length
        : ''

      const pseudoMenu = [
        { _id: '0', columns: [{ value: '', }, { value: 'posterest', }] },
        { _id: '1', columns: [{ value: '', }, { value: '---------', }] },
        { _id: '2', columns: [{ value: favCount, style: rightAligned }, { value: <Link to="/favorites"> Favoritos </Link>, }] },
        { _id: '3', columns: [{ value: '', }, { value: <Link to="/instagram"> Instagram </Link>, }] },
        { _id: '4', columns: [{ value: '', }, { value: <Link to="/minimal"> Notícias </Link>, }] },
        { _id: '5', columns: [{ value: '', }, { value: <Link to="/profile"> Perfil </Link>, }] },
        { _id: '6', columns: [{ value: '', }, { value: <Link to="/settings"> Configurações </Link>, }] },
        { _id: '7', columns: [{ value: '', }, { value: <Link to="/logout"> Sair </Link>, }] },
      ]

      return (
        <Segment basic style={{ 'height': '100vh' }}>
          <Grid>
            <Grid.Column>
              <SimpleTable rows={pseudoMenu}/>
            </Grid.Column>
          </Grid>
        </Segment>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(MinimalMenu)
