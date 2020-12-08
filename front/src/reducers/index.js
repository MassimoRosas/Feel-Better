import { combineReducers } from 'redux';

import authReducer from './authentification';
import moodReducer from './moodReducer';
import satisfactionReducer from './satisfaction';
import profileReducer from './profileReducer';

// séparer le state en plusieurs morceaux ("tiroirs") pour mieux s'y retrouver
// createStore prend en argument un seul reducer, pour lui en fournir plusieurs
// je dois les combiner en un reducer principal qui contient les autres

const rootReducer = combineReducers({
  // nom du tiroir : reducer qui gère cette partie du state
  auth: authReducer,
  mood: moodReducer,
  satisfaction: satisfactionReducer,
  profile: profileReducer,
});

// pour accéder au state défini dans le reducer 'recipesReducer', il faudra que
// je descends dans le tiroir 'recipes' => state.recipes.xxxxx

export default rootReducer;
