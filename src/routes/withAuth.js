import React from 'react';
import axios from 'axios';

function withAuth(Component) {
  return class extends React.Component {
    state = {
      isAuthenticated: false,
      isLoading: true,
    };

    componentDidMount() {
      axios.get('/verify', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then(response => {
        this.setState({ isAuthenticated: true, isLoading: false });
      })
      .catch(error => {
        this.setState({ isAuthenticated: false, isLoading: false });
      });
    }

    render() {
      if (this.state.isLoading) {
        return <div>Loading...</div>;
      }
      if (this.state.isAuthenticated) {
        return <Component {...this.props} />;
      }
      window.location.href = '/login';
    }
  }
}

export default withAuth;
