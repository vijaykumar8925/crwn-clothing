import { connect } from "react-redux";

import { compose } from "redux";

import { selectionIsFetching } from "../../redux/shop/shop.selector";

import { createStructuredSelector } from "reselect";

import CollectionOverview from './collections-overview.component'

import WithSpinner from "../with-spinner/with-spinner.component";

const mapStateToProps = createStructuredSelector ({
    isLoading : selectionIsFetching
});


const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;