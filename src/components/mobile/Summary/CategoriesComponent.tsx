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
  categories: {
    total: string|number,
    name: string,
    count: number,
    id?: string,
    className: string,
  }[];

  constructor(props: CategoryTableProps) {
    super(props);

    // XXX HACK: move expenses to be the last item before 'in-out' (so move
    // from wherever it is to the penultimate array element!)
    const cats = [...this.props.categories];
    const expIdx = cats.findIndex(cat => cat.name === 'Expenditure');
    const [ exp ] = cats.splice(expIdx, 1);
    cats.splice(cats.length - 1, 0, exp);

    this.categories = cats;
  }

  render () {
    const mappings = {
      'Income': 'Income',
      'Expenditure': 'Everything else',
      'Bills': 'Bills',
      'Rent': 'Rent',
      'Commute': 'Commuting',
      'In-Out': 'Remaining to spend',
    };

    return (
      <>
        <table
          className={`table mt-3 categories`}
          id='categories-table-mobile'>
          <tbody>
            {
              this.categories.map((cat, idx) => {
                console.log(cat.name);

                if (!(cat.name in mappings)) {
                  return;
                }

                return <tr key={idx} className={`mobile ${cat.className}`}>
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
