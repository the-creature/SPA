import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './../../actions';

import { Navbar } from 'react-bootstrap';
import Articles from './../../components/Articles/Articles';

import styles from './App.css';

import throttle from 'lodash/throttle';

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    articles: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.handleScrollThrottled = throttle(this.handleScroll, 200, {
      leading: true,
      trailing: true
    });
  }

  componentDidMount() {
    this.props.actions.loadArticles();
    window.addEventListener('scroll', this.handleScrollThrottled);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollThrottled);
  }

  handleScroll = () => {
    const { articles: { loading, end }, actions } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !loading && !end) {
      actions.loadArticles();
    }
  };

  render() {
    const { actions, articles } = this.props;

    return (
      <div className={styles.container}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Articles</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Articles
          actions={actions}
          articles={articles}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
