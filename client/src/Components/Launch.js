import React, { Component } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { CircularProgress, Grid, Box, Button } from "@material-ui/core";

const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: Int!) {
		launch(flight_number: $flight_number) {
			flight_number
			mission_name
			launch_year
			launch_success
			launch_date_local
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
		}
	}
`;

// export class Launch extends Component {
// 	render() {
// 		let { flight_number } = this.props.match.params;
// 		flight_number = parseInt(flight_number);
// 		return (
// 			<>
// 				<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
// 					{({ loading, error, data }) => {
// 						if (loading) return <CircularProgress />;
// 						if (error) {
// 							console.log(error);
// 							return <h1>no anda :(</h1>;
// 						}
// 						const {
// 							mission_name,
// 							flight_number,
// 							launch_year,
// 							launch_success,
// 							rocket: { rocket_id, rocket_name, rocket_type },
// 						} = data.launch;

// 						return (
// 							<>
// 								<h1>{mission_name}</h1>
// 								<Grid
// 									container
// 									direction="row"
// 									justify="space-between"
// 									alignItems="center"
// 								>
// 									<Box
// 										width={"45%"}
// 										my={2}
// 										p={2}
// 										border={1}
// 										borderColor={"gray"}
// 										borderRadius={10}
// 									>
// 										<h4>Launch Details</h4>
// 										<p>Flight Number: {flight_number}</p>
// 										<p>Launch Year: {launch_year}</p>
// 										<p>Launch Success: {launch_success ? "Yes" : "No"}</p>
// 									</Box>
// 									<Box
// 										width={"45%"}
// 										my={2}
// 										p={2}
// 										border={1}
// 										borderColor={"gray"}
// 										borderRadius={10}
// 									>
// 										<h4>Rocket Details</h4>
// 										<p>Rocket ID: {rocket_id}</p>
// 										<p>Rocket Name: {rocket_name}</p>
// 										<p>Rocket Type: {rocket_type}</p>
// 									</Box>
// 								</Grid>
// 								<Link to={"/"}>
// 									<Button variant="contained">Back</Button>
// 								</Link>
// 							</>
// 						);
// 					}}
// 				</Query>
// 			</>
// 		);
// 	}
// }

// export default Launch;

const Launch = (props) => {
	let { flight_number } = props.match.params;
	flight_number = parseInt(flight_number);

	const { loading, error, data } = useQuery(LAUNCH_QUERY, {
		variables: { flight_number },
	});

	return (
		// <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
		// 	{({ loading, error, data }) => {
		// 		if (loading) return <CircularProgress />;
		// 		if (error) {
		// 			console.log(error);
		// 			return <h1>no anda :(</h1>;
		// 		}
		// 		const {
		// 			mission_name,
		// 			flight_number,
		// 			launch_year,
		// 			launch_success,
		// 			rocket: { rocket_id, rocket_name, rocket_type },
		// 		} = data.launch;

		// 		return (
		// 			<>
		// 				<h1>{mission_name}</h1>
		// 				<Grid
		// 					container
		// 					direction="row"
		// 					justify="space-between"
		// 					alignItems="center"
		// 				>
		// 					<Box
		// 						width={"45%"}
		// 						my={2}
		// 						p={2}
		// 						border={1}
		// 						borderColor={"gray"}
		// 						borderRadius={10}
		// 					>
		// 						<h4>Launch Details</h4>
		// 						<p>Flight Number: {flight_number}</p>
		// 						<p>Launch Year: {launch_year}</p>
		// 						<p>Launch Success: {launch_success ? "Yes" : "No"}</p>
		// 					</Box>
		// 					<Box
		// 						width={"45%"}
		// 						my={2}
		// 						p={2}
		// 						border={1}
		// 						borderColor={"gray"}
		// 						borderRadius={10}
		// 					>
		// 						<h4>Rocket Details</h4>
		// 						<p>Rocket ID: {rocket_id}</p>
		// 						<p>Rocket Name: {rocket_name}</p>
		// 						<p>Rocket Type: {rocket_type}</p>
		// 					</Box>
		// 				</Grid>
		// 				<Link to={"/"}>
		// 					<Button variant="contained">Back</Button>
		// 				</Link>
		// 			</>
		// 		);
		// 	}}
		// </Query>
		<>
			{loading ? (
				<CircularProgress />
			) : error ? (
				<h1>error</h1>
			) : (
				<>
					<h1>{data.launch.mission_name}</h1>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Box
							width={"45%"}
							my={2}
							p={2}
							border={1}
							borderColor={"gray"}
							borderRadius={10}
						>
							<h4>Launch Details</h4>
							<p>Flight Number: {data.launch.flight_number}</p>
							<p>Launch Year: {data.launch.launch_year}</p>
							<p>Launch Success: {data.launch.launch_success ? "Yes" : "No"}</p>
						</Box>
						<Box
							width={"45%"}
							my={2}
							p={2}
							border={1}
							borderColor={"gray"}
							borderRadius={10}
						>
							<h4>Rocket Details</h4>
							<p>Rocket ID: {data.launch.rocket.rocket_id}</p>
							<p>Rocket Name: {data.launch.rocket.rocket_name}</p>
							<p>Rocket Type: {data.launch.rocket.rocket_type}</p>
						</Box>
					</Grid>
					<Link to={"/"}>
						<Button variant="contained">Back</Button>
					</Link>
				</>
			)}
		</>
	);
};

export default Launch;
