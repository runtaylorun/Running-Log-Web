import React, { useEffect, useState } from 'react'
import { Pagination, Search } from 'semantic-ui-react'
import { calculatePacePerMile } from '../../Lib/pace'
import { getActivities } from '../../Services/activities'
import useDebounce from '../../Hooks/useDebounce'
import SortableHeader from './sortableHeader'
import classes from './history.module.css'

const History = () => {
  const LIMIT = 10
  const [activities, setActivities] = useState([])
  const [offset, setOffset] = useState(0)
  const [pages, setPages] = useState(0)
  const [count, setCount] = useState(0)
  const [activePage, setActivePage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [column, setColumn] = useState('date')
  const [sortDirection, setSortDirection] = useState('DESC')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const results = await getActivities({ limit: LIMIT, offset, searchTerm: debouncedSearchTerm, column, sortDirection })

        setActivities(results?.data?.activities)
        setPages(results?.data?.pages)
        setCount(results?.data?.count)
      } catch (error) {
        console.log('Error getting history', error)
      }
    }

    loadActivities()
  }, [activePage, debouncedSearchTerm, sortDirection, column])

  const pageChangeHandler = (e, data) => {
    setOffset((data.activePage - 1) * LIMIT)
    setActivePage(data.activePage)
  }

  const searchChangeHandler = (e, data) => {
    setSearchTerm(data.value)
  }

  const sortDirectionHandler = (e, data) => {
    setSortDirection(data?.direction)
    setColumn(data?.column)
  }

  return (
    <div className={classes.historyPageContainer}>
      <div style={{ width: '50%' }}>
        <Search style={{ marginTop: 20 }} value={searchTerm} onSearchChange={searchChangeHandler} showNoResults={false} />
      </div>
      <table className={classes.historyTable}>
        <tr className={classes.historyTableHeader}>
          <SortableHeader onClick={sortDirectionHandler} name='date' sorted={column === 'date'} direction={sortDirection}>Date</SortableHeader>
          <th>Type</th>
          <SortableHeader onClick={sortDirectionHandler} name='title' sorted={column === 'title'} direction={sortDirection}>Title</SortableHeader>
          <SortableHeader onClick={sortDirectionHandler} name='distance' sorted={column === 'distance'} direction={sortDirection} style={{ textAlign: 'right' }}>Distance</SortableHeader>
          <th style={{ textAlign: 'right' }}>Pace</th>
          <th>Action</th>
        </tr>
        {activities?.map((activity) => (
          <tr key={activity.activityId} className={classes.tableBodyRow}>
            <td>{activity.date}</td>
            <td>{activity.type}</td>
            <td>{activity.title}</td>
            <td style={{ textAlign: 'right' }}>{`${activity.distance} Mi`}</td>
            <td style={{ textAlign: 'right' }}>{calculatePacePerMile(activity.elapsedTime, activity.distance, 'Mi')}</td>
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
