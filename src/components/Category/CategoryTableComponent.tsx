import * as React from 'react';

import { CategoryAmounts } from '@hyperbudget/hyperbudget-core';
import { CategoryTableVisibilityComponent } from './CategoryTableVisibilityComponent';

interface CategoryTableProps {
  categories: {
    total: string|number,
    name: string,
    count: number,
    id?: string,
    className: string,
  }[];
};

export const CategoryTableComponent = (props: CategoryTableProps) => (
  <>
    <CategoryTableVisibilityComponent />
    <table className="table mt-3 collapse show categories" id='categories-table'>
      <tbody>
        {
          props.categories.map((cat, idx) => {
            return <tr key={idx} className={cat.className}>
              <td>{cat.name}</td><td>{cat.total}</td><td>{cat.count}</td>
            </tr>;
          })
        }
      </tbody>
    </table>
  </>
);
