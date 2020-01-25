import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Login from './Login'

class Home extends Component {
	constructor() {
		super();
		this.state = {
			filter: 'Unanswered',
		}
	}

	applyFilter = (label) => {
		this.setState({
			filter: label,
		})
	}

	render() {
		const { questions, authedUser } = this.props;
		const { filter } = this.state;

		if(! authedUser) {
			return <Login />
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 mb-4">
						<div className="btn-group" role="group" aria-label="Select Question Type">
							{Object.keys(questions).map((label, index) => (
								<button type="button" onClick={(e) => this.applyFilter(label)} className={"btn btn-primary" + (filter === label ? ' active' : '')} key={index}>{ label }</button>
							))}
						</div>
					</div>

					<div className="col-12 mb-4">
						<h3>{ filter }</h3>
					</div>
					{questions[filter].map(id => (
						<div className="col-12 col-md-4 col-lg-3" key={id}>
							<Question id={id}/>
						</div>
					))}
				</div>
			</div>
		)
	}
}

function mapStateToProps ({ questions, authedUser, users }) {
	const answered = Object.keys(users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp);
	const unanswered = Object.keys(questions)
					.filter(question => ! answered.includes(question))
					.sort((a,b) => questions[b].timestamp - questions[a].timestamp);
	const myQuestions = Object.keys(questions).filter(question => questions[question].author === authedUser)
							.sort((a,b) => questions[b].timestamp - questions[a].timestamp);
	return {
		authedUser,
		questions: {
			'Unanswered': unanswered,
			'Answered': answered,
			'My Questions': myQuestions,
		}
	}
}

export default connect(mapStateToProps)(Home)
