import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
    
    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(null))
		this.props.history.push(`/`)
    }

    render() {
      const { user } = this.props;
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-white mb-5'>
                <div className="container-xl">
                    <NavLink to='/' exact className="navbar-brand">
                        Home
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        { user && (
                            <Fragment>
                                <ul className="navbar-nav align-items-center mr-auto">
                                    <li className="nav-item">
                                        <NavLink to='/add' exact className="nav-link" activeClassName='active'>New Question</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/leaderboard' exact className="nav-link" activeClassName='active'>Leaderboard</NavLink>
                                    </li>
                                </ul>
                                <ul className="navbar-nav align-items-center">
                                    <span className="d-flex align-items-center navbar-text">Hey, { user.name }
                                        <img className="navbar-avatar ml-2" src={ user.avatarURL } alt={`${user.name} avatar`} />
                                    </span>
                                    <li className="nav-item">
                                        <a href="/" className="text-link nav-link" onClick={(e) => this.handleLogout(e)}>Logout</a>
                                    </li>
                                </ul>
                            </Fragment>
                        )}
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        user: users[authedUser]
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
