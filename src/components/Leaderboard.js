import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
	render() {
		const { leaderboard } = this.props;

		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6">
						<h3 className="mb-4">Leader Board</h3>
						{ leaderboard.map(user => (
							<div className="card mb-4 border-0 shadow" key={user.id}>
								<div className="card-header border-0">
									<img className="card-header-avatar mr-2" src={ user.avatarURL } alt={`${user.name} avatar`} />
									<span>{ user.name }</span>
								</div>
								<div className="card-body">
									<p>Asked { user.asked } questions</p>
									<p>Answered { user.answered } questions</p>
									<p className="mb-0">Total points <strong>{user.answered + user.asked}</strong></p>
								</div>							
							</div>
						)) }
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ questions, users }) {
	const leaderboard = Object.keys(users).map(user => ({
		id: user,
		name: users[user].name,
		avatarURL: users[user].avatarURL,
		answered: Object.keys(users[user].answers).length,
		asked: Object.keys(questions).filter(question => questions[question].author === user).length,
	})).sort((a, b) => (b.answered + b.asked) - (a.answered + a.asked));

	return {
		leaderboard
	}
}

export default connect(mapStateToProps)(Leaderboard)
