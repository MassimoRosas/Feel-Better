import { connect } from 'react-redux';

// === on importe le composant de présentation
import Home from 'src/components/Home';

// === mapStateToProps
const mapStateToProps = (state) => ({
  // nom de la prop à remplir : élément à récupérer dans le state
  isLogged: state.auth.isLogged,
  firstname: state.auth.data.firstname,
  isLoading: state.auth.isLoading,
  showSatisfactionForm: state.satisfaction.showSatisfactionForm,
  satisfactionSuccess: state.satisfaction.satisfactionSuccess,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Home);
