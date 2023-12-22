import { getAllCategories } from 'Query/Category.query';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CategoryListComponent from './CategoryList.component';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = () => ({});

class CategoryListContainer extends PureComponent {
  state = {
    categoriesNames: []
  };

  containerFunctions = {
    getAllCategoriesNames: this.getAllCategoriesNames.bind(this)
  };

  componentDidMount() {
    this.getAllCategoriesNames();
  }

  containerProps() {
    const {
      categoriesNames
    } = this.state;

    return {
      categoriesNames
    };
  };

  async getAllCategoriesNames() {
    const {
      categories
    } = await getAllCategories();

    const fetchedCategoriesNames = [];

    if (categories && categories.length) {
      categories.forEach((category) => {
        fetchedCategoriesNames.push(category.name);
      });

      this.setState({
        categoriesNames: fetchedCategoriesNames
      });
    }
  }

  render() {
    return (
      <CategoryListComponent
        { ...this.containerFunctions }
        { ...this.containerProps() }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);
