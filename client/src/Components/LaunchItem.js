import React from "react";
import { Button, Grid, Box } from "@material-ui/core";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function LaunchItem({
	launch: { flight_number, mission_name, launch_date_local, launch_success },
}) {
	return (
		<Box
			my={2}
			p={2}
			border={1}
			borderColor={"gray"}
			borderRadius={10}
			bgcolor={launch_success ? "#CDE2AC" : "#CF6E6E"}
		>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
			>
				<div>
					<h3>Mission: {mission_name}</h3>
					<p>
						Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
					</p>
				</div>
				<Link to={`/launch/${flight_number}`}>
					<Button variant="contained">Launch Details</Button>
				</Link>
			</Grid>
		</Box>
	);
}
