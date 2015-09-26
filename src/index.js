import { isFSA, isError } from 'flux-standard-action';

const ARGUMENT_NOT_FSA_ERROR = 'Argument is not a Flux Standard Action';
const SYMBOL_WITHOUT_KEY_ERROR = 'Action type is a Symbol without key';

export function fsaToJSON(action) {
  if (!isFSA(action)) {
    throw new Error(ARGUMENT_NOT_FSA_ERROR);
  }
  const json = Object.assign({}, action);
  if (typeof action.type !== 'string') {
    json.type = action.type.toString();
  }
  if (json.type === 'Symbol()') {
    throw new Error(SYMBOL_WITHOUT_KEY_ERROR);
  }
  if (isError(action) && action.payload instanceof Error) {
    json.payload = action.payload.message;
  }
  return JSON.stringify(json);
}

const PARSE_SYMBOL_REGEX = /^Symbol\(([^)]*)\)$/;

export function fsaFromJSON(json) {
  const action = JSON.parse(json);
  if (!isFSA(action)) {
    throw new Error(ARGUMENT_NOT_FSA_ERROR);
  }
  const match = action.type.match(PARSE_SYMBOL_REGEX);
  if (match) {
    if (match[1] === '') {
      throw new Error(SYMBOL_WITHOUT_KEY_ERROR);
    }
    action.type = Symbol.for(match[1]);
  }
  if (isError(action)) {
    action.payload = new Error(action.payload);
  }
  return action;
}
