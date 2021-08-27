import './styles.scss';

const createAlert = (title, isSuccessMessage = false) => {
	let parent = document.getElementById('errorsWrapper');
	if (!parent) {
		parent = document.createElement('div');
		parent.id = 'errorsWrapper';
		parent.className =
			'position-fixed start-0 m-3 top-0 d-flex flex-column gap-3';
		document.body.appendChild(parent);
	}

	const elm = document.createElement('div');
	//elm.className = `__my-notification ${isSuccessMessage ? 'bg-success' : 'bg-danger'}`;
	elm.innerHTML = title;
	parent.appendChild(elm);
	setTimeout(() => {
		// elm.remove();
	}, 3500);
};

const Alert = {
	success: (title) => createAlert(title, true),
	danger: (title) => createAlert(title),
};

export default Alert;
