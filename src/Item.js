import styles from "./Item.module.css";

function Item(props) {
	return (
		<div className={styles.div}>
			<img src={props.image}></img>
			<div className={styles.text}>
				<h1>{props.name}</h1>
				<p>{props.club}</p>
				<p>{props.nationality}</p>
				<h4
					className={styles.delete}
					onClick={() => {
						props.onClick(props.id);
					}}
				>
					DELETE PLAYER
				</h4>
			</div>
		</div>
	);
}

export default Item;
