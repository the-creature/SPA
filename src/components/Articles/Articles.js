import React, { Component, PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './Articles.css';

export default class Articles extends Component {
  static propTypes = {
    articles: PropTypes.object.isRequired
  };

  render() {
    const {
      articles: {
        items,
        loading,
        end
      }
    } = this.props;

    return (
      <ListGroup componentClass="ul" className={styles.articles}>
        {
          items.map((article, index) => (
            <ListGroupItem key={index} header={article.title}>
              {article.published}
            </ListGroupItem>
          ))
        }
        {loading &&
          <div className={classnames(styles.loader, 'list-group-item')}>
            <i className="fa fa-spinner fa-pulse fa-2x fa-fw" />
          </div>
        }
        {end &&
          <ListGroupItem className={styles.end} key="end">No more articles</ListGroupItem>
        }
      </ListGroup>
    );
  }
}
