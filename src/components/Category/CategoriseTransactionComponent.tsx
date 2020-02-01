import * as React from 'react';

import {
  Category, FormattedTransaction
} from '@hyperbudget/hyperbudget-core';

interface CategoriseTransactionState {
  categoriesForceAdd: Set<string>,
  categoriesForceRemove: Set<string>,
};

interface CategoriseTransactionProps {
  categories: Category[];
  transaction: FormattedTransaction;
  onDoneCategorise: () => void;
  onSaveCustomCategories: (forceAdd: Set<string>, forceRm: Set<string>) => void;
};

export class CategoriseTransactionComponent extends React.Component
    <CategoriseTransactionProps, CategoriseTransactionState> {
  categoriesMatching: { [id: string]: boolean };
  shownCategories: Category[];

  txnHasCustomCategory(category: Category): boolean {
    return (
      category.category_rules.identifier &&
      category.category_rules.identifier.rules &&
      !!category.category_rules.identifier.rules.find(
        ([op, identifier]: [string, string]) => (
          op == '=' && identifier == this.props.transaction.identifier
        )
      )
    )
  }

  txnIncludesCat(category: Category): boolean {
    return !!this.props.transaction.categories.find(cat => cat.id === category.id);
  }

  shouldShowCat(category: Category): boolean {
    return !['lloyds', 'rbs', 'midata', 'ffxcorp', 'hsbc'].includes(category.id);
  }

  constructor(props: CategoriseTransactionProps) {
    super(props);
    this.shownCategories = this.props.categories.filter(this.shouldShowCat);

    this.categoriesMatching = this.shownCategories
      .filter(this.txnIncludesCat.bind(this))
      .map(cat => cat.id)
      .reduce((a,b)=> (a[b]=true, a), {});

    this.state = {
      categoriesForceAdd: new Set(),
      categoriesForceRemove: new Set(),
    };
  }

  inputChanged(evt): void {
    const checkbox = evt.target;
    const catId = checkbox.value;
    console.log(checkbox.checked);

    if (this.categoriesMatching[catId] && !checkbox.checked) {
      this.state.categoriesForceAdd.delete(catId);
      this.state.categoriesForceRemove.add(catId);
    }
    else if (this.categoriesMatching[catId] && checkbox.checked) {
      this.state.categoriesForceAdd.delete(catId);
      this.state.categoriesForceRemove.delete(catId);
    }
    else if (!this.categoriesMatching[catId] && checkbox.checked) {
      this.state.categoriesForceAdd.add(catId);
      this.state.categoriesForceRemove.delete(catId);
    }
    else if (!this.categoriesMatching[catId] && !checkbox.checked) {
      this.state.categoriesForceAdd.delete(catId);
      this.state.categoriesForceRemove.delete(catId);
    }
  }

  render () {
    return (
      <div className='categorise_transaction'>
        <button
            className='btn-outline-primary btn'
            role='button' value="Close"
            onClick={ this.props.onDoneCategorise }
            style={{ position: 'relative', right: "30px", "float": "right" }}
        >
          Close
        </button>
        <h2>Categorise this transaction</h2>
        {(
          this.shownCategories.map((category, idx) => (
            <label className='categorise_transaction--label' key={category.name+"-"+idx}>
              <input
                onChange={this.inputChanged.bind(this)}
                defaultChecked={this.txnIncludesCat(category)}
                disabled={this.txnIncludesCat(category) && !this.txnHasCustomCategory(category)}
                value={category.id}
                type="checkbox" /> { category.name }
            </label>
          ))
        )}
        <button
            className='btn-primary btn'
            role='button' value="Save"
            onClick={
              () => this.props.onSaveCustomCategories(
                      this.state.categoriesForceAdd,
                      this.state.categoriesForceRemove,
                    )
            }
        >
          Save
        </button>
      </div>
    );
  }
}
