import { takeLatest , call, put, all } from 'redux-saga/effects';

import { firestore , convertCollectionsSnapshopToMap , } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import { fetchCollectionsSuccess , fetchCollectionsError } from './shop.actions';

export function* fetchCollectionsAsync () {
    try{
        const collectionRef = firestore.collection("collections");
        const snapShot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshopToMap,snapShot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsError(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START ,
        fetchCollectionsAsync )
}

export function* shopSagas () {
    yield all([call(fetchCollectionsStart)])
};