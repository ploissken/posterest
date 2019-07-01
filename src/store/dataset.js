const initialSettings = {
  news: {
    columns: [],
    rows: []
  },
  instagram: {
    columns: [],
    rows: []
  },
  paginationDate: {
    instagram: undefined,
    news: undefined
  },
  fetched: undefined
}

const postReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'ADD_PARSED_POSTS':
      console.log('dataset add_posts')
      return {
        ...state,
        news: {
          columns: [ ...state.news.columns, ...action.nCols ],
          rows: [ ...state.news.rows, ...action.nRows ]
        }
      }
    case 'ADD_PARSED_INSTA_POSTS':
      console.log('ADD_PARSED_INSTAS')
      return {
        ...state,
        instagram: {
          columns: [ ...state.instagram.columns, ...action.nCols ],
          rows: [ ...state.instagram.rows, ...action.nRows ]
        }
      }
    case 'NEXT_PG_NEWS_DATE':
      console.log('NEXT_PG_NEWS_DATE')
      return {
        ...state,
        paginationDate: {
          news: action.pgDate,
          instagram: state.paginationDate.instagram
        }
      }
    case 'NEXT_PG_INSTA_DATE':
      console.log('NEXT_PG_INSTA_DATE')
      return {
        ...state,
        paginationDate: {
          instagram: action.pgDate,
          news: state.paginationDate.news
        }
      }
    default:
      console.log('dataset default')
      return state
  }
}
export default postReducer
