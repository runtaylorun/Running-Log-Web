/* eslint-disable react/prop-types */
import React from 'react'
import { Icon } from 'semantic-ui-react'

const SortableHeader = ({ children, sorted, name, direction, onClick }) => {
	const clickHandler = (e) => {
		const newDirection = !sorted ? 'DESC' : direction === 'DESC' ? 'ASC' : 'DESC'

		onClick(e, { direction: newDirection, column: name })
	}

	return (
		<th onClick={clickHandler} style={{ cursor: 'pointer' }}>
			{children}
			{sorted && <Icon style={{ color: 'white', marginLeft: 3 }} size='tiny' name={direction === 'DESC' ? 'angle down' : 'angle up'} />}
		</th>
	)
}

export default SortableHeader
