import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostList, Message, Login, Register, Loading } from '../components';
import { getPosts, getPostAddedAction, createPost } from '../actions/post';
import { authLoginRequestingWithEmail, authLoginRequestingWithFacebook, authLoginDetected, authLogoutDetected, authLogoutRequesting, authRegisterRequesting } from '../actions/auth';
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
                  />
                <PublicRoute
                  path='/say/login'
                  authed={this.props.authReducer.authed}
                  component={Login}
                  onAuthLoginWithEmail={this.props.onAuthLoginWithEmail}
                  onAuthLoginWithFacebook={this.props.onAuthLoginWithFacebook}
                  closing={this.props.authReducer.authedLoading}
                  />
                <PublicRoute
                  path='/say/register'
                  authed={this.props.authReducer.authed}
                  component={Register}
                  onAuthRegisterRequesting={this.props.onAuthRegisterRequesting}
                  onAuthLoginWithFacebook={this.props.onAuthLoginWithFacebook}
                  closing={this.props.authReducer.authedLoading}
                  />
                <Message visible={this.props.authReducer.messageVisibility} message={this.props.authReducer.message}/>
                <Loading visible={this.props.authReducer.authedLoading}/>
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
    onGetPosts: () => dispatch(getPosts()),
    onGetPostAddedAction: (post) => dispatch(getPostAddedAction(post)),
    onCreatePost: (post, userInfo) => dispatch(createPost(post, userInfo)),
    onAuthLoginWithEmail: (email, pw) => dispatch(authLoginRequestingWithEmail(email, pw)),
    onAuthLoginWithFacebook: () => dispatch(authLoginRequestingWithFacebook()),
    onAuthLoginDetected: (user) => dispatch(authLoginDetected(user)),
    onAuthLogoutDetected: () => dispatch(authLogoutDetected()),
    onAuthLogoutRequesting: () => dispatch(authLogoutRequesting()),
    onAuthRegisterRequesting: (email, pw, name) => dispatch(authRegisterRequesting(email, pw, name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);
