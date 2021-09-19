import React from 'react'
import { Select } from 'semantic-ui-react'
import classes from './history.module.css'

const FilterList = () => {
	return (
		<div className={classes.filterContainer}>
			<div className={classes.filterList}>
				<p>Activity Type</p>
				<Select />
			</div>

		</div>
	)
}

export default FilterList
