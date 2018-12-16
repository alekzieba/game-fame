// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';
import GamesList from '../components/GamesList';
import { getGames } from '../actions/games';
import {
  getGameInvites,
  declineGameInvite,
  acceptGameInvite
} from '../actions/game_invites';

function mapStateToProps({ auth, games, gameInvites }) {
  return { auth, games, gameInvites };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getGames, getGameInvites, declineGameInvite, acceptGameInvite },
    dispatch
  );
}

const afterSubmit = (result, dispatch) => dispatch(reset('GameCodeForm'));

export default reduxForm({
  form: 'GameCodeForm',
  onSubmitSuccess: afterSubmit
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GamesList)
);
