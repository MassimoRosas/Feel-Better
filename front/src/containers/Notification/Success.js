import { connect } from 'react-redux';
import Success from 'src/components/Notification/Success';
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

export default connect(mapStateToProps, mapDispatchToProps)(Success);
