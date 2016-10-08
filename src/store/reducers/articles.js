import { handleActions } from 'redux-actions';
import moment from 'moment';
import {
  SET_ARTICLES,
  ARTICLES_LOADING,
  ARTICLES_LOADED,
  ARTICLES_ERROR,
  ARTICLES_END
} from './../../actions';

function formatItem(item) {
  return {
    ...item,
    published: moment(item.published).format('MMMM D YYYY [at] h:mma')
  };
}

export default handleActions({
  [SET_ARTICLES]: (state, action) => ({
    ...state,
    items: [...state.items, ...action.payload.articles.map(formatItem)]
  }),
  [ARTICLES_LOADING]: (state, action) => ({
    ...state,
    loading: true
  }),
  [ARTICLES_LOADED]: (state, action) => ({
    ...state,
    loading: false
  }),
  [ARTICLES_ERROR]: (state, action) => ({
    ...state,
    loading: false,
    error: true
  }),
  [ARTICLES_END]: (state, action) => ({
    ...state,
    end: true
  }),
}, { items: [], limit: 20, loading: true, error: false, end: false });
