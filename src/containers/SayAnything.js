import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList, Message, Login, Loading } from '../components';
import * as postActions from '../actions/post';
import * as authActions from '../actions/auth';
import { Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { firebaseAuth } from '../database/database'

function PrivateRoute ({component: Component, authed, authedLoading, path, ...rest}) {
  return (
    <Route
      path={path}
      render={
          function(props){
            if (authedLoading===true){
              return <Loading visible={authedLoading} />
            }else if (authed===true){
              return <Component {...props} {...rest} authed={authed} />
            }else{
              return <Redirect to={{pathname: '/say/login', state: {from: props.location}}} />
            }
          }
        }
    />
  )
}

function PublicRoute ({component: Component, authed, path, ...rest}) {
  return (
    <Route
      path={path}
      render={(props) => authed === false
        ? <Component {...props} {...rest} />
      : <Redirect to='/say/' />}
    />
  )
}


class Instagram extends Component {
    componentDidMount () {
      this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
        if (user) {
          this.props.onAuthLoginDetected(user)
          this.props.onGetPosts();
        } else {
          this.props.onAuthLogoutDetected()
        }
      })
    }
    componentWillUnmount () {
      this.removeListener()
    }
    render() {
      return(
          <Container>
            <div>
                <PrivateRoute
                  path='/say/'
                  component={PostList}
                  authed={this.props.authReducer.authed}
                  userInfo={this.props.authReducer.userInfo}
                  posts={this.props.postReducer.posts}
                  onCreatePost={this.props.onCreatePost}
                  onAuthLogoutRequesting={this.props.onAuthLogoutRequesting}
                  authedLoading={this.props.authReducer.authedLoading}
                  onPostShowMessage={this.props.onPostShowMessage}
                  />
                <PublicRoute
                  path='/say/login'
                  authed={this.props.authReducer.authed}
                  component={Login}
                  onAuthAnonymouslyLoginFromGirl={this.props.onAuthAnonymouslyLoginFromGirl}
                  onAuthAnonymouslyLoginFromBoy={this.props.onAuthAnonymouslyLoginFromBoy}
                  closing={this.props.authReducer.authedLoading}
                  />
                <Message visible={this.props.postReducer.messageVisibility} message={this.props.postReducer.message}/>
                <Message visible={this.props.authReducer.messageVisibility} message={this.props.authReducer.message}/>
                <Loading visible={this.props.authReducer.authedLoading}/>
                <Loading visible={this.props.postReducer.postLoading}/>
            </div>
          </Container>

      );
    }
}

function mapStateToProps(state) {
  return {
    postReducer: state.postReducer,
    authReducer: state.authReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetPosts: () => dispatch(postActions.getPosts()),
    onGetPostAddedAction: (post) => dispatch(postActions.getPostAddedAction(post)),
    onCreatePost: (userInfo, contents, file) => dispatch(postActions.createPost(userInfo, contents, file)),
    onPostShowMessage: (message) => dispatch(postActions.postShowMessage(message)),
    onAuthLoginDetected: (user) => dispatch(authActions.authLoginDetected(user)),
    onAuthLogoutDetected: () => dispatch(authActions.authLogoutDetected()),
    onAuthLogoutRequesting: () => dispatch(authActions.authLogoutRequesting()),
    onAuthAnonymouslyLoginFromGirl: () => dispatch(authActions.authAnonymouslyLoginFromGirl()),
    onAuthAnonymouslyLoginFromBoy: () => dispatch(authActions.authAnonymouslyLoginFromBoy())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);
