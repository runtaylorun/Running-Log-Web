import React, { useState } from 'react'
import { Pagination, Search } from 'semantic-ui-react'
import { calculatePacePerMile } from '../../Lib/pace'
import useDebounce from '../../Hooks/useDebounce'
import SortableHeader from './sortableHeader'
import classes from './history.module.css'
import useActivities from '../../Hooks/useActivities'

const History = () => {
  const LIMIT = 10
  const [offset, setOffset] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [column, setColumn] = useState('date')
  const [sortDirection, setSortDirection] = useState('DESC')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)
  const [activities, pages, count, isLoading, setIsLoading] = useActivities({ limit: LIMIT, offset, searchTerm: debouncedSearchTerm, column, sortDirection })

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
        <Search style={{ marginTop: 20 }} value={searchTerm} onSearchChange={searchChangeHandler} showNoResults={false} />
      </div>
      <table className={classes.historyTable}>
        <tr className={classes.historyTableHeader}>
          <SortableHeader onClick={sortDirectionHandler} name='date' sorted={column === 'date'} direction={sortDirection}>Date</SortableHeader>
          <th>Type</th>
          <SortableHeader onClick={sortDirectionHandler} name='title' sorted={column === 'title'} direction={sortDirection}>Title</SortableHeader>
          <SortableHeader onClick={sortDirectionHandler} name='distance' sorted={column === 'distance'} direction={sortDirection}>Distance</SortableHeader>
          <th style={{ textAlign: 'right' }}>Pace</th>
          <th>Action</th>
        </tr>
        {activities?.map((activity) => (
          <tr key={activity.activityId} className={classes.tableBodyRow}>
            <td>{activity.date}</td>
            <td>{activity.type}</td>
            <td>{activity.title}</td>
            <td style={{ textAlign: 'center' }}>{`${activity.distance} Mi`}</td>
            <td style={{ textAlign: 'right' }}>{calculatePacePerMile(activity?.hours, activity?.minutes, activity?.seconds, activity.distance, 'Mi')}</td>
            <td><a href={`/activityView/${activity.id}`}>View</a></td>
          </tr>
        ))}
      </table>
      <Pagination style={{ marginTop: 25 }} onPageChange={pageChangeHandler} totalPages={pages} activePage={activePage} />
      <p style={{ marginTop: 10 }}>{`Viewing ${activities?.length + offset} of ${count} Records`}</p>
    </div >
  )
}

export default History
