import React from "react";

import { Route } from "react-router-dom";

import { connect } from "react-redux";

import CollectionPageContainer from "../collection/collection.container";

// import {  selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";

// import { createStructuredSelector } from "reselect";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

// import CollectionPage from "../collection/collection.component";

// import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";

// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />

        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   isCollectionLoaded : selectIsCollectionsLoaded
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});
export default connect(null, mapDispatchToProps)(ShopPage);
