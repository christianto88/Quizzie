import React, { useState } from "react";
import "./ResultPage.css";
import { Container, Typography } from "@material-ui/core";
import axios from "axios";
import Loading from "./Loading";

function ResultPage(props) {
	const [quizId, setQuizId] = useState(props.match.params.id);
	const [loading, setLoading] = useState(true);

	const [marks, setMarks] = useState(null);
	const [responses, setResponses] = useState([]);


	const getResponses = async () => {
		let token = localStorage.getItem("authToken");
		let url = `https://quizzie-api.herokuapp.com/user/studentQuizResult/${quizId}`;

		try {
			await axios.get(url, {
				headers: {
					"auth-token": token
				}
			}).then(res => {
				console.log(res);
				setMarks(res.data.result.marks);
				setResponses(res.data.result.responses);
				setLoading(false);
			})
		} catch(error) {
			console.log(error);
		}
	}

	useState(() => {
		getResponses();
	}, [])

	if(loading) {
		return <Loading />
	}

	return (
		<Container className="result-page">
			<div className="result-head">
				<Typography variant="h4" className="result-title">Results</Typography>
			</div>
			<div className="result-quiz-info">
				<Typography variant="h5"><span className="profile-param">Name</span></Typography>
				<Typography variant="h5"><span className="profile-param">Scored:</span> <strong>{marks}</strong> out of <strong>{responses.length}</strong></Typography>
			</div>
			<div className="result-responses">
				<div className="result-response-title">
					<Typography variant="h5">Responses</Typography>
				</div>
				<div className="result-responses-list">
					
				</div>
			</div>
		</Container>
	)
}

export default ResultPage;