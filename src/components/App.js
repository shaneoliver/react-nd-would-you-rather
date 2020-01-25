import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import Add from './Add'
import Poll from './Poll'
import Login from './Login'
import Error from './Error'
import Leaderboard from './Leaderboard'

import Nav from './Nav'
import './App.css';

class App extends Component {

	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { authedUser } = this.props;

		return (
			<Router>
				<Fragment>
					<Nav />
					{authedUser === null
						? <Route component={Login} />
						: <Switch>
							<Route path='/' exact component={Home} />
							<Route path='/add' exact component={Add} />
							<Route path='/questions/:question_id' exact component={Poll} />
							<Route path='/leaderboard' exact component={Leaderboard} />
							<Route component={Error} />
						</Switch>
					}
				</Fragment>
			</Router>
		)
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(App)