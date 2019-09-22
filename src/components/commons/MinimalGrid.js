import React from 'react';
import FavButton from 'components/commons/FavButton'
import LoadMoreNews from 'components/commons/LoadMoreNews'
import SimpleTable from 'components/commons/SimpleTable'
import { Grid, Segment, Button, Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'
const rightAligned = {
  'textAlign': 'right',
  'paddingRight' : '10px'
}
const loadingStyle = {
  height: '100vh'
}
function getSource(url) {
  try {
    let clear = url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .replace('www1.', '')
      .replace(/-/g, '')
      .match(/(.*?)\//)
    return clear[0].replace('/', '')
  } catch (e) {
    console.log('error', url)
    return 'error :('
  }
}
class MinimalGrid extends React.Component {
    render() {

      const favCount = this.props.favorites.ids
        ? this.props.favorites.ids.length
        : ''

      const pseudoMenu = [
        { columns: [{ value: '', }, { value: 'posterest', }] },
        { columns: [{ value: '', }, { value: '---------', }] },
        { columns: [{ value: favCount, style: rightAligned }, { value: 'Favoritos', }] },
        { columns: [{ value: '', }, { value: 'Instagram', }] },
        { columns: [{ value: '', }, { value: 'Notícias', }] },
        { columns: [{ value: '', }, { value: 'Perfil', }] },
        { columns: [{ value: '', }, { value: 'Configurações', }] },
        { columns: [{ value: '', }, { value: 'Sair', }] },
      ]

      const neo = this.props.dataset.news.raw.map(post => {
        return (
          <Table.Row key={post._id}>
            <Table.Cell>
              <FavButton compact="true" postID={post._id} />
            </Table.Cell>
            <Table.Cell>
              {post.title} | <a href={post.href}>{getSource(post.href)}</a>
            </Table.Cell>
          </Table.Row>
        )
      })

      return (
        <Segment basic >
          <Grid padded>
            <Grid.Row stretched>
              <Grid.Column width={4}>
              <Segment fluid basic>
                <SimpleTable rows={pseudoMenu}/>
              </Segment>

              </Grid.Column>
              <Grid.Column width={12}>
                <Segment fluid basic style={{ 'overflow': 'auto', 'height': '90vh' }}>
                  <Table.Body>
                    {neo}
                  </Table.Body>
                  <LoadMoreNews />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    dataset: state.dataset,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(MinimalGrid)
