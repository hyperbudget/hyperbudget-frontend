import * as React from 'react';

import { CategoryAmounts } from '@hyperbudget/hyperbudget-core';

interface CategoryTableProps {
  categories: {
    total: string|number,
    name: string,
    count: number,
    id?: string,
    className: string,
  }[];
};

export class CategoriesComponent extends React.Component <CategoryTableProps, {}> {
  updateHidden: () => void;

  constructor(props: CategoryTableProps) {
    super(props);
  }

  render () {
    const mappings = {
      'Income': 'Income',
      'Expenditure': 'Expenses',
      'Bills': 'Bills',
      'Rent': 'Rent',
      'In-Out': 'Remaining to spend',
    };

    return (
      <>
        <table
          className={`table mt-3 categories`}
          id='categories-table-mobile'>
          <tbody>
            {
              this.props.categories.map((cat, idx) => {
                if (!cat.name in mappings) {
                  return;
                }

                return <tr key={idx} className={cat.className}>
                  <td>{mappings[cat.name]}</td><td>{cat.total}</td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </>
    );
  }
}
