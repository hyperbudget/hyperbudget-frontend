import * as React from 'react';

import { CategoryAmounts } from '@hyperbudget/hyperbudget-core';
import { CategoryTableVisibilityComponent } from './CategoryTableVisibilityComponent';

interface CategoryTableProps {
  categories: CategoryAmounts,
};

export const CategoryTableComponent = (props: CategoryTableProps) => (
  <>
    <CategoryTableVisibilityComponent />
    <table className="table mt-3 collapse show categories" id='categories-table'>
      <tbody>
        {
          Object.keys(props.categories).map((catName, idx) => {
            let cat = props.categories[catName];
            return <tr key={idx} className={cat.className}>
              <td>{cat.name}</td><td>{cat.total}</td><td>{cat.count}</td>
            </tr>;
          })
        }
      </tbody>
    </table>
  </>
);
