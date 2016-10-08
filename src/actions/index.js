import { createAction } from 'redux-actions';
import delay from 'lodash/delay';

// action types

export const SET_ARTICLES = 'SET_ARTICLES';
export const ARTICLES_LOADING = 'ARTICLES_LOADING';
export const ARTICLES_LOADED = 'ARTICLES_LOADED';
export const ARTICLES_ERROR = 'ARTICLES_ERROR';
export const ARTICLES_END = 'ARTICLES_END';

// action creators

const setArticles = createAction(SET_ARTICLES);
const setArticlesLoading = createAction(ARTICLES_LOADING);
const setArticlesLoaded = createAction(ARTICLES_LOADED);
const setArticlesError = createAction(ARTICLES_ERROR);
const setArticlesEnd = createAction(ARTICLES_END);

/**
 * Loads articles from stellar biotechnologies server and dispatch action with it
 *
 * @returns {Promise} promise
 */
export function loadArticles() {
  return (dispatch, getState) => {
    const { limit, items } = getState().articles;
    const offset = items.length;

    dispatch(setArticlesLoading());

    fetch(`http://www.stellarbiotechnologies.com/media/press-releases/json?limit=${limit}&offset=${offset}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject();
      })
      .then(({ news = [] }) => {
        dispatch(news.length === 0 ? setArticlesEnd() : setArticles({ articles: news }));
        dispatch(setArticlesLoaded());
      })
      .catch(() => {
        dispatch(setArticlesError());
      });
  };
}
