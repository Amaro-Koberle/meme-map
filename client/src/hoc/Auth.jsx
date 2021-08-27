import styles from './auth.module.scss';

export default function Auth(props) {
	return (
		<div className={`d-flex ${styles.root}`}>
			<div className={`flex-1 d-flex flex-column ${styles.formWrapper}`}>
				{props.children}
			</div>
		</div>
	);
}
