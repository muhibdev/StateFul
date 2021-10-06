const formState = StateFull('#form-container');

document.querySelectorAll('input,textarea,select').forEach((input) =>
	input.addEventListener('input', (e) => {
		formState.setState({ [e.target.name]: e.target.value });
	})
);
