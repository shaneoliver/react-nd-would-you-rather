import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Question extends Component {
	
	toQuestion = (e, id) => {
		e.preventDefault()
		this.props.history.push(`/questions/${id}`)
	}

	render() {
		const { question, users } = this.props
		const user = users[question.author];
		
		return (
			<div className="card shadow border-0 mb-4">
				<div className="card-header border-0">
					<img className="card-header-avatar mr-2" src={ user.avatarURL } alt={`${user.name} avatar`} />
					<span>{ user.name }</span> asked
				</div>	
				<div className="card-body">
					<p>Would you rather { question.optionOne.text } or { question.optionTwo.text }?</p>
					<button onClick={(e) => this.toQuestion(e, question.id)} className="btn btn-primary btn-block">View Poll</button>
				</div>	
			</div>	
		)
	}
}
	
function mapStateToProps ({authedUser, users, questions}, { id }) {
	const question = questions[id]
	
	return {
		authedUser,
		question,
		users,
	}
}

export default withRouter(connect(mapStateToProps)(Question))