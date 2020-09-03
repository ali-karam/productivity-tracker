import React from 'react';
import ProductivityTracker from './containers/ProductivityTracker/ProductivityTracker';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        <ProductivityTracker/>
      </Layout>
    </div>
  );
}

export default App;
