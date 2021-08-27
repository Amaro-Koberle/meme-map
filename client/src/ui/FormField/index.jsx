import './styles.scss';

export default function FormField(WrappedComponent, options = {}) {
	const App = (props) => {
		const { error, title, className, required } = props;
		const newProps = { ...props };
		delete newProps.className;

		const onBlur = (e) => {
			const elm = e.target;
			if (!elm.checkValidity()) elm.classList.add('invalid');
			props.onBlur && props.onBlur(e);
		};
		return (
			<label
				className={`__feildWrapper cursor-text d-flex flex-column position-relative ${className} ${options.className}`}>
				<WrappedComponent
					{...newProps}
					placeholder={props.placeholder || ' '}
					onBlur={onBlur}
				/>
				{title && (
					<span className='title position-absolute'>
						{title}{' '}
						{required && <span className='text-danger d-inline'>*</span>}
					</span>
				)}
				{error && error.trim().length > 0 && (
					<p className='text-danger mt-2 d-none'>{error}</p>
				)}
			</label>
		);
	};
	return App;
}
