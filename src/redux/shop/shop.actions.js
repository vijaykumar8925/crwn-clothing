import ShopActionTypes from "./shop.types";

import { firestore , convertCollectionsSnapshopToMap } from "../../firebase/firebase.utils";
import { type } from "@testing-library/user-event/dist/type";



export const fetchCollectionsStart = () => ({
    type : ShopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type : ShopActionTypes.FETCH_COLLECTION_SUCCESS ,
    payload : collectionsMap
});

export const fetchCollectionsError = errorMessage => ({
    type : ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload : errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
          const collectionsMap = convertCollectionsSnapshopToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsError(error.message)));
    }
};