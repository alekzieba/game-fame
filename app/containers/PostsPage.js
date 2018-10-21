// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset, reduxForm } from 'redux-form';
import Posts from '../components/Posts';
import * as PostsActions from '../actions/posts';

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostsActions, dispatch);
}

const afterSubmit = (result, dispatch) => dispatch(reset('NewPostForm'));

export default reduxForm({
  form: 'NewPostForm',
  onSubmitSuccess: afterSubmit
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Posts)
);
