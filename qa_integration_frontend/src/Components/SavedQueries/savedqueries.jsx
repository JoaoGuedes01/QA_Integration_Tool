import React, { useState, useEffect } from 'react'
import SVGIcon from './svg'
import './savedqueries.css'


const SavedQueries = ({ setSavedQueriesModal, SetQueryID }) => {

  const [savedQueries, setSavedQueries] = useState([])
  const [selectedQuery, setSelectedQuery] = useState([])

  useEffect(() => {
    FetchSavedQueries()
  }, [])

  const FetchSavedQueries = () => {
    if (!localStorage.getItem('saved-queries')) {
      localStorage.setItem('saved-queries', JSON.stringify([]))
    }
    const savedQueriesjson = JSON.parse(localStorage.getItem('saved-queries'))
    setSavedQueries(savedQueriesjson)
  }

  const handleChange = event => {
    let index = event.target.getAttribute('arr-index')
    let jsonAttribute = event.target.getAttribute('json-attribute')

    console.log(index)
    console.log('updating' + jsonAttribute)

    let newState = savedQueries
    newState[index][jsonAttribute] = event.target.value
    setSavedQueries(newState);
  };

  const SaveQuery = (index) => {
    ChangeItemState(index, 'saved')
    const query = savedQueries[index]
    console.log(query)
    const currentLS = JSON.parse(localStorage.getItem('saved-queries'))
    currentLS[index] = query
    const lspayload = JSON.stringify(currentLS)
    localStorage.setItem('saved-queries', lspayload)
  }

  const DeleteQuery = (index) => {
    const currentLS = JSON.parse(localStorage.getItem('saved-queries'))
    currentLS.splice(index, 1)
    const lspayload = JSON.stringify(currentLS)
    localStorage.setItem('saved-queries', lspayload)
    FetchSavedQueries()
  }

  const ChangeItemState = (index, state) => {
    const newState = savedQueries.map((obj, index_obj) => {
      if (index === index_obj) {
        obj.state = state
      }
      return obj;
    });
    setSavedQueries(newState);

  }

  const AddNewQuery = async () => {
    const newItem = {
      'queryname': '',
      'tfs_query': '',
      'state': 'edit'
    }
    setSavedQueries(savedQueries => [...savedQueries, newItem]);
  }

  return (
    <>
      <div className='saved-queries-container'>
        <div className='saved-queries-title-container'>
          <h1>Saved Queries</h1>
        </div>
        <div className='saved-queries-select-container'>
          <button className='new-query-btn' onClick={AddNewQuery}>New Query</button>
          <div className='saved-query-items-container'>
            {savedQueries && savedQueries.map((item, index) => (
              <div className={selectedQuery === item ? 'saved-queries-item highlight' : 'saved-queries-item'}>
                {
                  item.state === 'edit' ?
                    <div className='normal-block'>
                      <div className='edit-query'>
                        <div className='input-holder'>
                          <input arr-index={index} json-attribute="queryname" onChange={handleChange} placeholder='query name' type="text" defaultValue={item.queryname} />
                          <input arr-index={index} json-attribute="tfs_query" onChange={handleChange} placeholder='query id' type="text" defaultValue={item.tfs_query} />
                        </div>
                        <button className='close-btn' onClick={() => ChangeItemState(index, 'saved')}><SVGIcon type='close' /></button>
                      </div>
                      <button className='edit-save-btn' onClick={() => SaveQuery(index)}>save</button>
                    </div> :
                    <>
                      <div className='select-query' onClick={()=>{setSelectedQuery(item); SetQueryID(item.tfs_query); console.log(item.tfs_query)}}>
                        <div className='query-info'>
                          <h2>{item.queryname}</h2>
                          <p>{item.tfs_query}</p>
                        </div>
                        <div className='query-item-btns'>
                          <button className='blue-btn' onClick={() => ChangeItemState(index, 'edit')}><SVGIcon type='edit' /></button>
                          <button className='red-btn' onClick={() => DeleteQuery(index)}><SVGIcon type='delete' /></button>
                        </div>
                      </div>
                    </>
                }
              </div>
            ))}
          </div>
        </div>
        <button className='saved-queries-close-btn' onClick={() => setSavedQueriesModal(false)}>Close</button>
      </div>
    </>
  )
}

export default SavedQueries