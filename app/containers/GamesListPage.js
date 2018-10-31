// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';
import GamesList from '../components/GamesList';
import * as GamesActions from '../actions/games';

function mapStateToProps({ auth, games }) {
  return { auth, games };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GamesActions, dispatch);
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
