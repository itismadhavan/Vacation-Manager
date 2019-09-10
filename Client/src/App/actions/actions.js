import * as types from "./actionTypes"

export function createUser(user) {
  return { type: types.USER_DETAIL, user }
}

