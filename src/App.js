import { useCallback, useEffect, useState } from "react";
import Item from "./Item";
import Main from "./Main";

function App() {
	const [footballers, setFootballers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [exist, setExist] = useState(false);

	async function fetchData() {
		setIsLoading(true);
		const response = await fetch(
			"https://title-bedb3-default-rtdb.europe-west1.firebasedatabase.app/title.json"
		);
		const data = await response.json();

		const currentFootballers = [];

		for (const key in data) {
			currentFootballers.push({
				name: data[key].name,
				club: data[key].club,
				nationality: data[key].nationality,
				image: data[key].image,
				id: key,
			});
		}

		setFootballers(currentFootballers);
		setIsLoading(false);
	}

	async function sendInputsValues(item) {
		const existingFootballer = footballers.filter(
			(footballer) => footballer.name === item.name
		);
		if (existingFootballer.length === 0) {
			setExist(false);
		} else {
			setExist(true);
			return;
		}
		console.log(footballers);
		const response = await fetch(
			"https://title-bedb3-default-rtdb.europe-west1.firebasedatabase.app/title.json",
			{
				method: "POST",
				body: JSON.stringify(item),
				headers: {
					"Content-type": "application/json",
				},
			}
		);
	}

	async function deleteFootballer(id) {
		const footballersAfterRemove = footballers.filter((footballer) => {
			return footballer.id !== id;
		});
		const response = await fetch(
			`https://title-bedb3-default-rtdb.europe-west1.firebasedatabase.app/title/${id}.json`,
			{
				method: "DELETE",
			}
		);

		setFootballers(footballersAfterRemove);
	}

	let content = <p>Click button to send or show data!</p>;

	if (footballers.length > 0) {
		content = footballers.map((footballer) => {
			return (
				<Item
					name={footballer.name}
					club={footballer.club}
					nationality={footballer.nationality}
					image={footballer.image}
					id={footballer.id}
					key={footballer.id}
					onClick={deleteFootballer}
				></Item>
			);
		});
	}

	return (
		<div>
			<Main sendInputsValues={sendInputsValues} fetchData={fetchData}>
				{isLoading && <p>Your data is loading...</p>}
				{exist && <p>Player already exists, try another player!</p>}
				{content}
			</Main>
		</div>
	);
}

export default App;

// endDataHandler={sendData} footballers={footballers}
