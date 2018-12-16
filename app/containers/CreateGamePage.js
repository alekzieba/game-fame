// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';
import CreateGame from '../components/CreateGame';
import * as GameInvitesActions from '../actions/game_invites';

function mapStateToProps({ auth, games }) {
  return { auth, games };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GameInvitesActions, dispatch);
}

const afterSubmit = (result, dispatch) => dispatch(reset('CreateGameForm'));

export default reduxForm({
  form: 'CreateGameForm',
  onSubmitSuccess: afterSubmit
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateGame)
);
