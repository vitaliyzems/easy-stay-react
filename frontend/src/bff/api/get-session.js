import { BASE_URL } from '../constants';
import { transformSession } from '../transformers/transform-session';

export const getSession = (hash) =>
  fetch(`${BASE_URL}sessions?hash=${hash}`)
    .then((loadedSession) => loadedSession.json())
    .then(
      ([loadedSession]) => loadedSession && transformSession(loadedSession)
    );
