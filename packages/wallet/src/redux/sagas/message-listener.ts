import { actionChannel, take, put, fork } from "redux-saga/effects";


import * as incoming from 'wallet-comm/lib/interface/to-wallet';

import * as actions from "../actions";
import { eventChannel } from 'redux-saga';

function* postMessageListener() {
  const postMessageEventChannel = eventChannel(emitter => {
    window.addEventListener('message', (event: Event) => {
      emitter(event);
    });
    return () => { /* End channel here*/ };
  });
  while (true) {

    const event = yield take(postMessageEventChannel);
    console.log(event);
    if (event.data.type === 'INITIALIZE_WALLET') {

      yield put(actions.loggedIn(event.data.userId));
    }
  }

}
// this is the only thing in the wallet which is allowed to listen for app actions
// if we move to an iframe, this would be modified to listen to events on a given
// postMessage channel
export function* messageListener() {
  yield fork(postMessageListener);
  // todo: restrict this to the application actions we actually
  // want to listen for
  const channel = yield actionChannel('*');

  while (true) {
    // todo: figure out what types action can be
    const action = yield take(channel);

    switch (action.type) {
      case incoming.CREATE_CHALLENGE_REQUEST:
        yield put(actions.challengeRequested());
        break;
      case incoming.FUNDING_REQUEST:
        yield put(actions.fundingRequested());
        break;
      case "LOGIN_SUCCESS":
        yield put(actions.loggedIn(action.user.uid));
        break;
      case incoming.SIGNATURE_REQUEST:
        yield put(actions.ownPositionReceived(action.data));
        break;
      case incoming.VALIDATION_REQUEST:
        yield put(actions.opponentPositionReceived(action.data, action.signature));
        break;
      case incoming.RECEIVE_MESSAGE:
        yield put(actions.messageReceived(action.data, action.signature));
        break;
      case incoming.RESPOND_TO_CHALLENGE:
        yield put(actions.challengePositionReceived(action.position));
        break;
      case incoming.CONCLUDE_CHANNEL_REQUEST:
        yield put(actions.concludeRequested());
        break;
      default:
      // do nothing
    }
  }
}
