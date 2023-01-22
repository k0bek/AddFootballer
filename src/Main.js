import { useState } from "react";
import styles from "./Main.module.css";
import Item from "./Item";

function Main(props) {
	const [inputsValues, setInputsValues] = useState({
		name: "",
		club: "",
		nationality: "",
		image: "",
		id: "",
	});

	function getValues(event) {
		setInputsValues((prevValues) => {
			return {
				...prevValues,
				[event.target.name]: event.target.value,
			};
		});
	}

	return (
		<main>
			<div className={styles.inputs}>
				<label>Name</label>
				<input name="name" onChange={getValues}></input>
				<label>Club</label>
				<input name="club" onChange={getValues}></input>
				<label>Nationality</label>
				<input name="nationality" onChange={getValues}></input>
				<label>Image</label>
				<input name="image" onChange={getValues}></input>
				<button
					onClick={() => {
						props.sendInputsValues(inputsValues);
					}}
				>
					Send data!
				</button>
				<button onClick={props.fetchData}>Show Data!</button>
			</div>
			{props.children}
		</main>
	);
}

export default Main;
