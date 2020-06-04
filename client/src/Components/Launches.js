import React, { Component, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import {
	CircularProgress,
	InputLabel,
	Select,
	MenuItem,
	NativeSelect,
} from "@material-ui/core";
import LaunchItem from "./LaunchItem";
import MissionKeys from "./MissionKeys";

// apollo cache
const LAUNCHES_QUERY = gql`
	query LaunchesQuery {
		launches {
			flight_number
			mission_name
			launch_date_local
			launch_success
		}
	}
`;

// export class Launches extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { counter: 0, filter: "none" };
// 	}

// 	render() {
// 		return (
// 			<>
// 				<h1>Launches</h1>
// 				<InputLabel htmlFor="select">Filter</InputLabel>
// 				<NativeSelect
// 					id="select"
// 					onChange={(event) => {
// 						const currentValue = event.target.value;
// 						this.setState((state) => {
// 							return { filter: currentValue };
// 						});
// 					}}
// 				>
// 					<option value="none">None</option>
// 					<option value="success">Success</option>
// 					<option value="failed">Failed</option>
// 				</NativeSelect>
// 				{/* <h1>{this.state.counter}</h1>
// 				<button
// 					onClick={() =>
// 						this.setState((state) => {
// 							return { counter: state.counter + 1 };
// 						})
// 					}
// 				>
// 					+
// 				</button> */}
// 				<MissionKeys color="#CDE2AC" text="success" />
// 				<MissionKeys color="#CF6E6E" text="fail" />
// 				<Query query={LAUNCHES_QUERY}>
// 					{({ loading, error, data }) => {
// 						if (loading) return <CircularProgress />;
// 						if (error) {
// 							console.log(error);
// 							return <h1>error :(</h1>;
// 						}
// 						return (
// 							<>
// 								{this.state.filter === "none"
// 									? data.launches.map((launch) => (
// 											<LaunchItem key={launch.flight_number} launch={launch} />
// 									  ))
// 									: this.state.filter === "success"
// 									? data.launches
// 											.filter((launch) => launch.launch_success === true)
// 											.map((launch) => (
// 												<LaunchItem
// 													key={launch.flight_number}
// 													launch={launch}
// 												/>
// 											))
// 									: data.launches
// 											.filter((launch) => launch.launch_success !== true)
// 											.map((launch) => (
// 												<LaunchItem
// 													key={launch.flight_number}
// 													launch={launch}
// 												/>
// 											))}
// 							</>
// 						);
// 					}}
// 				</Query>
// 			</>
// 		);
// 	}
// }

const Launches = () => {
	const [filter, setFilter] = useState("none");

	const { loading, error, data } = useQuery(LAUNCHES_QUERY);

	const selectedData = (data) => {
		if (filter === "none") return data;
		if (filter === "success")
			return data.filter((launch) => launch.launch_success === true);
		if (filter === "failed")
			return data.filter((launch) => launch.launch_success !== true);
	};
	return (
		<>
			<h1>Launches</h1>
			<InputLabel htmlFor="select">Filter</InputLabel>
			<NativeSelect
				id="select"
				onChange={(event) => setFilter(event.target.value)}
			>
				<option value="none">None</option>
				<option value="success">Success</option>
				<option value="failed">Failed</option>
			</NativeSelect>
			<MissionKeys color="#CDE2AC" text="success" />
			<MissionKeys color="#CF6E6E" text="fail" />
			{/* using <Query> */}
			{/* <Query query={LAUNCHES_QUERY}>
				{({ loading, error, data }) => {
					if (loading) return <CircularProgress />;
					if (error) {
						console.log(error);
						return <h1>error :(</h1>;
					}
					const selectedData = () => {
						if (filter === "none") return data.launches;
						if (filter === "success")
							return data.launches.filter(
								(launch) => launch.launch_success === true
							);
						if (filter === "failed")
							return data.launches.filter(
								(launch) => launch.launch_success !== true
							);
					};
					return (
						<>
							{selectedData().map((launch) => (
								<LaunchItem key={launch.flight_number} launch={launch} />
							))}
						</>
					);
				}}
			</Query> */}
			{loading ? (
				<CircularProgress />
			) : error ? (
				<h1>error :(</h1>
			) : (
				<>
					{selectedData(data.launches).map((launch) => (
						<LaunchItem key={launch.flight_number} launch={launch} />
					))}
				</>
			)}
		</>
	);
};

export default Launches;
