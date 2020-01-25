import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
		}
	}

	selectUser = (e) => {
		this.setState({
			user: e.target.value,
		})
	}

    login = (e) => {
		e.preventDefault();
        const { dispatch } = this.props
		dispatch(setAuthedUser(this.state.user))
	}
	
	render() {
		const { users } = this.props;
		const { user } = this.state;
        
		return (
			<div className="container">
				<div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
						<div className="card border-0 shadow">
							<div className="card-header border-0">Login</div>
							<div className="card-body">
								<form>
									<div className="form-group">
										<select name="user" className="custom-select" onChange={(e) => this.selectUser(e)}>
											<option value="">Select a user</option>
											{ Object.keys(users).map(user => (
												<option value={ user } key={ user }>{ users[user].name }</option>
											))}
										</select>
									</div>
									<button className="btn btn-primary btn-block" onClick={(e) => this.login(e)} disabled={user === ''}>Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ users }) {
	return {
		users
	}
}

export default withRouter(connect(mapStateToProps)(Login))
