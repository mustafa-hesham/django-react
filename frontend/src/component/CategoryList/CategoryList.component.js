import './CategoryList.style.scss';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

class CategoryListComponent extends PureComponent {
  static propTypes = {
    categoriesNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };

  renderCategoryLink(categoryName, index) {
    return (
      <li className='CategoryList-CategoryLink' key={ categoryName + '_' + index }>
        <NavLink to={ '/' + categoryName } className='CategoryList-Link'>{ categoryName }</NavLink>
      </li>
    );
  }

  renderCategoryLinks() {
    const {
      categoriesNames
    } = this.props;

    if (!categoriesNames) {
      return null;
    }
    return (
      <div className='CategoryList-CategoryLinks'>
        <ul className='CategoryList-CategoryLinksList'>
          { categoriesNames.map(this.renderCategoryLink) }
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className='CategoryList'>
        { this.renderCategoryLinks() }
      </div>
    );
  }
}

export default CategoryListComponent;
