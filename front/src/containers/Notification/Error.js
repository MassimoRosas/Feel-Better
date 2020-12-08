import { connect } from 'react-redux';
import Error from 'src/components/Notification/Error';
import { closeMessage } from 'src/actions/authentification';

// === mapStateToProps
const mapStateToProps = (state) => ({
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  closeMessage: () => {
    dispatch(closeMessage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
