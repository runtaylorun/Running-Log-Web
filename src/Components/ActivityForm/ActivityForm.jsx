import React from 'react';

const ActivityForm = () => {
	const s = 3;

	return (
		<div style={{ display: 'flex' }}>
			<form>
				<div>
					<label>Distance</label>
					<input type='text' name='Distance' />
				</div>
				<div>
					<label>Date</label>
					<input type='text' />
				</div>
				<div>
					<label>Elapsed Time</label>
					<input type='text' />
				</div>
				<div>
					<label>Comments</label>
					<input type='text' />
				</div>
				<div>
					<label>Difficulty Rating</label>
					<input type='text' />
				</div>
			</form>
		</div>
	);
};

export default ActivityForm;
