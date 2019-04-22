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

interface CategoryTableState {
  hidden: boolean;
};

export class CategoryTableComponent extends React.Component <CategoryTableProps, CategoryTableState> {
  updateHidden: () => void;

  constructor(props: CategoryTableProps) {
    super(props);

    this.state = {
      hidden: false,
    };

    this.updateHidden = () => {
      const height = window.innerHeight ||
                     document.documentElement.clientHeight ||
                     document.body.clientHeight;

      console.log(height);
      if (height < 800) {
        this.setState({ hidden: true });
      } else {
        this.setState({ hidden: false });
      }
    }
  }

  componentDidMount() {
    this.updateHidden();
    window.addEventListener("resize", this.updateHidden);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHidden);
  }

  buttonClicked() {
    this.setState({ hidden: !this.state.hidden });
    window.removeEventListener("resize", this.updateHidden);
  }

  render () {
    return (
      <>
        <CategoryTableVisibilityComponent
          hidden={this.state.hidden}
          onToggle={() => this.buttonClicked()}
        />
        <table
          className={`table mt-3 categories ${this.state.hidden?'hidden':''}`}
          id='categories-table'>
          <tbody>
            {
              this.props.categories.map((cat, idx) => {
                return <tr key={idx} className={cat.className}>
                  <td>{cat.name}</td><td>{cat.total}</td><td>{cat.count}</td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </>
    );
  }
}
