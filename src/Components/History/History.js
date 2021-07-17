import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'
import { Pagination, Search } from 'semantic-ui-react'
import { calculatePacePerMile } from '../../Lib/pace'
import { distanceUnits, convertToUserMeasurementSystem, roundTo2 } from '../../Lib/conversions'
import useDebounce from '../../Hooks/useDebounce'
import SortableHeader from './sortableHeader'
import classes from './history.module.css'
import useActivities from '../../Hooks/useActivities'
import { useWindowDimensions } from '../../Hooks/useWindowDimensions'

const History = () => {
  const LIMIT = 10
  const { width } = useWindowDimensions()
  const [offset, setOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [column, setColumn] = useState('date')
  const [sortDirection, setSortDirection] = useState('DESC')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [activities, pages, count, isLoading, setIsLoading] = useActivities({ limit: LIMIT, offset, searchTerm: debouncedSearchTerm, column, sortDirection })
  const measurementSystem = useSelector(getUserMeasurementSystem)

  const pageChangeHandler = (e, data) => {
    setOffset((data.activePage - 1) * LIMIT)
    setActivePage(data.activePage)
    setIsLoading(true)
  }

  const searchChangeHandler = (e, data) => {
    setSearchTerm(data.value)
    setIsLoading(true)
  }

  const sortDirectionHandler = (e, data) => {
    setSortDirection(data?.direction)
    setColumn(data?.column)
    setIsLoading(true)
  }

  return (
    <div className={classes.historyPageContainer}>
      <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
        <Search size={width < 576 ? 'mini' : 'small'} style={{ marginTop: 20 }} value={searchTerm} onSearchChange={searchChangeHandler} showNoResults={false} />
      </div>
      <table className={classes.historyTable}>
        <tr className={classes.historyTableHeader}>
          <SortableHeader onClick={sortDirectionHandler} name='date' sorted={column === 'date'} direction={sortDirection}>Date</SortableHeader>
          <th>Type</th>
          <SortableHeader onClick={sortDirectionHandler} name='title' sorted={column === 'title'} direction={sortDirection}>Title</SortableHeader>
          { width > 510 && <SortableHeader onClick={sortDirectionHandler} name='distance' sorted={column === 'distance'} direction={sortDirection}>Distance</SortableHeader>}
          { width > 510 && <th style={{ textAlign: 'right' }}>Pace</th>}
          <th>Action</th>
        </tr>
        {activities?.map((activity) => (
          <tr key={activity.activityId} className={classes.tableBodyRow}>
            <td>{activity.date}</td>
            <td>{activity.type}</td>
            <td>{activity.title}</td>
            {width > 576 && <td style={{ textAlign: 'center' }}>{`${roundTo2(convertToUserMeasurementSystem(activity.distanceUnit, activity.distance, measurementSystem))} ${distanceUnits[measurementSystem]}`}</td>}
            {width > 576 && <td style={{ textAlign: 'right' }}>{calculatePacePerMile(activity?.hours, activity?.minutes, activity?.seconds, activity.distance, 'Mi')}</td>}
            <td><a href={`/activityView/${activity.id}`}>View</a></td>
          </tr>
        ))}
      </table>
      <Pagination size={width < 576 ? 'mini' : 'large'} className={classes} style={{ marginTop: 25 }} onPageChange={pageChangeHandler} totalPages={pages} activePage={activePage} />
      <p className={classes.paginationLabel} style={{ marginTop: 10 }}>{`Viewing ${activities?.length + offset} of ${count} Records`}</p>
    </div >
  )
}

export default History
