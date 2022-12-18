function Error(props) {
    const {errors} = props

	return (
		<div className="mt-3 Error alert alert-secondary">
            {errors}
        </div>
	);
}

export default Error;
