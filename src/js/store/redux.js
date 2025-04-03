// @ts-check
/** @import { Article } from 'classes/Article' */
/** @import { User } from '../classes/User.js' */

/**
 * @module redux/store
 */

/**
 * @typedef {Object.<(string), any>} State
 * @property {Article[] | []} articles
 * @property {User[] | []} users
 * @property {boolean} isLoading
 * @property {boolean} error
 */
/**
 * @type {State}
 */
export const INITIAL_STATE = {
  articles: [],
  users: [],
  isLoading: false,// Podría usarse para controlar cuando estamos realizando un fetch
  error: false,// Podría usarse para controlar cuando sucede un error
}

/**
 * @typedef {Object} ActionTypeUser
 * @property {string} type
 * @property {User} [user]
 */
/**
 * @typedef {Object} ActionTypeArticle
 * @property {string} type
 * @property {Article} [article]
 */
const ACTION_TYPES = {
  // CRUD
  // Article
  CREATE_ARTICLE: 'CREATE_ARTICLE',
  READ_LIST: 'READ_LIST',
  UPDATE_ARTICLE: 'UPDATE_ARTICLE',
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  DELETE_ALL_ARTICLES: 'DELETE_ALL_ARTICLES',
  // User
  CREATE_USER: 'CREATE_USER',
  // READ_LIST: 'READ_LIST',// TODO arreglar este problema
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  DELETE_ALL_USERS: 'DELETE_ALL_USERS',
  // ...
}

/**
 * Reducer for the app state.
 *
 * @param {State} state - The current state
 * @param {ActionTypeArticle | ActionTypeUser} action - The action to reduce
 * @returns {State} The new state
 */
const appReducer = (state = INITIAL_STATE, action) => {
  const actionWithArticle = /** @type {ActionTypeArticle} */(action)
  const actionWithUser = /** @type {ActionTypeUser} */(action)
  switch (action.type) {
    // Articles
    case ACTION_TYPES.CREATE_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles,
          actionWithArticle.article
        ]
      };
    case ACTION_TYPES.READ_LIST:
      return {...state};
    case ACTION_TYPES.UPDATE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((/** @type {Article} */article) => {
          if (article._id === actionWithArticle?.article?._id) {
            return actionWithArticle.article
          }
          return article
        })
      };
    case ACTION_TYPES.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((/** @type {Article} */article) => article._id !== actionWithArticle?.article?._id)
      };
    case ACTION_TYPES.DELETE_ALL_ARTICLES:
      return {
        ...state,
        articles: []
      };
    // User
    case ACTION_TYPES.CREATE_USER:
      return {
        ...state,
        users: [
          ...state.users,
          actionWithUser.user// Equivalente a USER_DB.push(newUser)
        ]
      };
    default:
      return {...state};
  }
}

/**
 * @typedef {Object} PublicMethods
 * @property {function} create
 * @property {function} read
 * @property {function} update
 * @property {function} delete
 * @property {function} getById
 * @property {function} getAll
 * @property {function} deleteAll
 * @property {function} [getByEmail]
 */
/**
 * @typedef {Object} Store
 * @property {PublicMethods} article
 * @property {PublicMethods} user
 * @property {function} getState
 */
/**
 * Creates the store singleton.
 * @param {appReducer} reducer
 * @returns {Store}
 */
const createStore = (reducer) => {
  let currentState = INITIAL_STATE
  let currentReducer = reducer

  // Private methods
  /**
   *
   * @param {ActionTypeArticle | ActionTypeUser} action
   * @param {function | undefined} [onEventDispatched]
   */
  const _dispatch = (action, onEventDispatched) => {
    let previousValue = currentState;
    let currentValue = currentReducer(currentState, action);
    currentState = currentValue;

    window.dispatchEvent(new CustomEvent('stateChanged', {
        detail: {
          type: action.type,
          changes: _getDifferences(previousValue, currentValue)
        },
        cancelable: true,
        composed: true,
        bubbles: true
    }));
    if (onEventDispatched) {
      // console.log('onEventDispatched', onEventDispatched);
      onEventDispatched();
      // onEventDispatched.call(this, {
      //   type: action.type,
      //   changes: _getDifferences(previousValue, currentValue)
      // })
    }
  }
  /**
   * Returns a new object with the differences between the `previousValue` and
   * `currentValue` objects. It's used to create a payload for the "stateChanged"
   * event, which is dispatched by the store every time it changes.
   *
   * @param {State} previousValue - The old state of the store.
   * @param {State} currentValue - The new state of the store.
   * @returns {Object} - A new object with the differences between the two
   *     arguments.
   * @private
   */
  const _getDifferences = (previousValue, currentValue) => {
    return Object.keys(currentValue).reduce((diff, key) => {
        if (previousValue[key] === currentValue[key]) return diff
        return {
            ...diff,
            [key]: currentValue[key]
        };
    }, {});
  }

  // Actions
  /**
   * Creates a new Article inside the store
   * @param {Article} article
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const createArticle = (article, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_ARTICLE, article }, onEventDispatched);
  /**
   * Creates a new User inside the store
   * @param {User} user
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const createUser = (user, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_USER, user }, onEventDispatched);
  /**
   * Reads the list of articles
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const readList = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST }, onEventDispatched);
  /**
   * Updates an article
   * @param {Article} article
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const updateArticle = (article, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_ARTICLE, article }, onEventDispatched);
  /**
   * Deletes an article
   * @param {Article} article
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   */
  const deleteArticle = (article, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_ARTICLE, article }, onEventDispatched);

  /**
   * Deletes all the articles
   * @param {function | undefined} [onEventDispatched]
   * @returns void
   * */
  const deleteAllArticles = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_ALL_ARTICLES }, onEventDispatched);

  // Getters
  /**
   * Returns the article with the specified id
   * @param {string} id
   * @returns {Article | undefined}
   */
  const getArticleById = (id) => { return currentState.articles.find((/** @type {Article} */article) => article._id === id) };

  /**
   * Returns the user with the specified id
   * @param {string} id
   * @returns {User | undefined}
   */
  const getUserById = (id) => { return currentState.users.find((/** @type {User} */user) => user._id === id) };

  /**
   * Returns the user with the specified email
   * @param {string} email
   * @returns {User | undefined}
   */
  const getUserByEmail = (email) => { return currentState.users.find((/** @type {User} */user) => user.email === email) };

  /**
   * Returns all the articles
   * @returns {Array<Article>}
   */
  const getAllArticles = () => { return currentState.articles };

  // Public methods
  /**
   *
   * @returns {State}
   */
  const getState = () => { return currentState };

  // Namespaced actions
  /** @type {PublicMethods} */
  const article = {
    create: createArticle,
    read: readList,
    update: updateArticle,
    delete: deleteArticle,
    getById: getArticleById,
    getAll: getAllArticles,
    deleteAll: deleteAllArticles
  }
  /** @type {PublicMethods} */
  const user = {
    create: createUser,
    read: function () {console.log('read')},
    update: function () {console.log('update')},
    delete: function () {console.log('delete')},
    getById: getUserById,
    getByEmail: getUserByEmail,
    getAll: function () {console.log('getAll')},
    deleteAll: function () {console.log('deleteAll')}
  }

  return {
    // Actions
    article,
    user,
    // Public methods
    getState
  }
}

// Export store
export const store = createStore(appReducer)