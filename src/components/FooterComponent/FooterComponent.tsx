import * as React from 'react';
import './FooterComponent.css';

const FooterComponent = () => (
  <footer className="footer d-none d-md-block">
      <div className="container">
          <p>
              <span className="text-muted">
                  &copy; Forever Hyperbudget contributors. Made with &hearts; in London. 100% organic.
                  <a href='https://www.github.com/hyperbudget'>Github</a>
              </span>
          </p>
      </div>
  </footer>
);

export default FooterComponent;
