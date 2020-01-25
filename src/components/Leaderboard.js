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
							<div className="card mb-4" key={user.id}>
								<div className="card-header border-0">
									<img className="card-header-avatar mr-2" src={ user.avatarURL } alt={`${user.name} avatar`} />
									<span>{ user.name }</span>
								</div>
								<div className="card-body">
									<p>Asked { user.questions.length } questions</p>
									<p>Answered { Object.keys(user.answers).length } questions</p>
									<p className="mb-0">Total points <strong>{user.questions.length + Object.keys(user.answers).length}</strong></p>
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
	const leaderboard = Object.values(users).sort((a, b) => {
		const sumA = Object.keys(a.answers).length + a.questions.length;
		const sumB = Object.keys(b.answers).length + b.questions.length;

		return sumB - sumA;
	})
	return {
		questions,
		leaderboard
	}
}

export default connect(mapStateToProps)(Leaderboard)
