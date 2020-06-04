import React from "react";
import ApolloClient from "apollo-boost";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
//import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";
import Launches from "./Components/Launches";
import Launch from "./Components/Launch";
import "./App.css";

// const client = new ApolloClient({
//   link: new HttpLink(),
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Container maxWidth="lg">
					<Typography align="center" variant="h5">
						SpaceX
					</Typography>
					<Route exact path="/" component={Launches} />
					<Route exact path="/launch/:flight_number" component={Launch} />
				</Container>
			</Router>
		</ApolloProvider>
	);
}

export default App;
