import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/questions'
import Error from './Error';

class Question extends Component {

    constructor() {
        super();
        this.state = {
            answer: '',
        }
    }

	answer = (e) => {
        e.preventDefault()
        const { dispatch, question_id } = this.props
        const { answer } = this.state

        dispatch(handleAddQuestionAnswer({
            question_id,
            answer
        }))
    }
    
    handleChange = (e) => {
        this.setState({
            answer: e.target.value,
        })
    }

	render() {
        if(! this.props.question) {
            return <Error />
        }
        
        const { question, users, user, stats } = this.props
        const author = users[question.author];
		
		return (
			<div className="container">
                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">
                    <h1 className="mb-4">Would You Rather</h1>
                        <div className="card shadow border-0 mb-4">
                            <div className="card-header border-0">
                                <img className="card-header-avatar mr-2" src={ author.avatarURL } alt={`${author.name} avatar`} />
                                <span>{ author.name }</span> asked
                            </div>	
                            <div className="card-body">
                                <p>Would you rather <em>{ question.optionOne.text }</em> or <em>{ question.optionTwo.text }</em>?</p>
                                { ! user.answers[question.id] ? (
                                    <form>
                                        <div className="custom-control custom-radio mb-2">
                                            <input type="radio" id="optionOne" name="option" className="custom-control-input" value="optionOne" checked={this.state.answer === 'optionOne'} onChange={this.handleChange}/>
                                            <label className="custom-control-label" htmlFor="optionOne">{question.optionOne.text}</label>
                                        </div>
                                        <div className="custom-control custom-radio mb-4">
                                            <input type="radio" id="optionTwo" name="option" className="custom-control-input" value="optionTwo" checked={this.state.answer === 'optionTwo'} onChange={this.handleChange}/>
                                            <label className="custom-control-label" htmlFor="optionTwo">{question.optionTwo.text}</label>
                                        </div>
                                        <button onClick={(e) => this.answer(e)} className="btn btn-primary btn-block" disabled={ this.state.answer === '' }>Submit</button>
                                    </form>
                                ) : (
                                    <div>
                                        <h5>Results</h5>
                                        <div className="mb-2">You Polld for <strong>{ question[user.answers[question.id]].text }</strong></div>
                                        <div className={'alert alert-' + (user.answers[question.id] === 'optionOne' ? 'primary' : 'light border')}>
                                            <h6>{ question.optionOne.text } <span className="badge badge-light">{ question.optionOne.votes.length } votes</span></h6>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{width: stats.optionOne + '%'}} aria-valuenow={ stats.optionOne } aria-valuemin="0" aria-valuemax="100">{ stats.optionOne }%</div>
                                            </div>
                                        </div>
                                        <div className={'alert alert-' + (user.answers[question.id] === 'optionTwo' ? 'primary' : 'light border')}>
                                            <h6>{ question.optionTwo.text } <span className="badge badge-light">{ question.optionTwo.votes.length } votes</span></h6>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{width: stats.optionTwo + '%'}} aria-valuenow={ stats.optionTwo } aria-valuemin="0" aria-valuemax="100">{ stats.optionTwo }%</div>
                                            </div>
                                        </div>
                                    </div>
                                ) }
                            </div>	
                        </div>	
                    </div>
                </div>
            </div>
		)
	}
}
	
function mapStateToProps ({authedUser, users, questions}, props) {
    
    const { question_id } = props.match.params
    const question = questions[question_id]
    const user = users[authedUser];
    let stats = {};
    
    if(question) {
        const total = question.optionOne.votes.length + question.optionTwo.votes.length
        
        stats = {
            optionOne: question.optionOne.votes.length / total * 100,
            optionTwo: question.optionTwo.votes.length / total * 100,
        }
    }
	
	return {
        question_id,
		authedUser,
		question,
        users,
        user,
        stats
	}
}

export default withRouter(connect(mapStateToProps)(Question))