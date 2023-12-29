import './CategoryList.style.scss';

import { getAllCategories } from 'Query/Category.query';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function CategoryList() {
  const [fetchedCategoriesNames, updateFetchedCategoriesNames] = useState([]);

  useEffect(() => {
    getAllCategoriesNames().then((categories) => {
      updateFetchedCategoriesNames(categories);
    });
  }, []);

  if (!fetchedCategoriesNames) {
    return null;
  }

  return (
    <div className='CategoryList'>
      <div className='CategoryList-CategoryLinks'>
        <ul className='CategoryList-CategoryLinksList'>
          { fetchedCategoriesNames.map(renderCategoryLink) }
        </ul>
      </div>
    </div>
  );
};

function renderCategoryLink(categoryName, index) {
  return (
    <li className='CategoryList-CategoryLink' key={ categoryName + '_' + index }>
      <NavLink to={ '/' + categoryName } className='CategoryList-Link'>{ categoryName }</NavLink>
    </li>
  );
};

async function getAllCategoriesNames() {
  const {
    categories,
    message: errorMessage
  } = await getAllCategories();

  const fetchedCategoriesNames = [];

  if (categories && categories.length) {
    categories.forEach((category) => {
      fetchedCategoriesNames.push(category.name);
    });
  }

  return errorMessage ? [] : fetchedCategoriesNames;
};
