import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import './workitemselect.css'
import { Link } from 'react-router-dom'

import Navbar from '../Navbar/navbar'
import SVGIcon from './svg'
import SavedQueries from '../SavedQueries/savedqueries'
import Swal from 'sweetalert2'
import appconfig from '../../config/appconfig.json'

const WorkItemSelect = () => {

    const TFS_Query = useRef()


    const [tfsCreds, setTfsCreds] = useState()
    const [jiraCreds, setjiraCreds] = useState()
    const [tfsWi, setTfsWi] = useState()
    const [accountIdJira, setAccountIdJira] = useState()
    const [jiraName, setjiraName] = useState()
    const [loadingJira, setLoadingJira] = useState(true)
    const [connectedTFS, setConnectedTFS] = useState()
    const [connectedJira, setConnectedJira] = useState()
    const [loadingTFSWI, setLoadingTFSWI] = useState(false)
    const [savedQueriesModal, setSavedQueriesModal] = useState(false)
    const [selectedQuery, setSelectedQuery] = useState('')
    const [loadingTFS, setLoadingTFS] = useState(true)



    useEffect(() => {
        LoadCredentials()
        FetchTokenInfo()
        SanityTestTFS()
    }, [])

    //Methods

    const FetchTokenInfo = async () => {
      const data = JSON.stringify({
          jira_token: localStorage.getItem('jira_creds'),
      });
      
      var config = {
          method: 'post',
          url: appconfig.endpoints.jiraSanity[appconfig.runtime],
          headers: {
              'Content-Type': 'application/json'
          },
          data: data
      };
      const jira_response = await axios(config)
      console.log(jira_response)
      if (jira_response.data.status !== 500) {
          setAccountIdJira(jira_response.data.id)
          setjiraName(jira_response.data.name)
          setLoadingJira(false)
          setConnectedJira(true)
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed while connecting to Jira',
              text: 'There was an error when connecting to Jira using the provided credentials. Make sure they are correct before proceeding',
          }).then(() => {
              window.location = "/";
          });
      }
  }

  const SanityTestTFS = async () => {
      const data = JSON.stringify({
          "tfs_token": localStorage.getItem('tfs_creds'),
      });

      const config = {
          method: 'post',
          url: appconfig.endpoints.tfsSanity[appconfig.runtime],
          headers: {
              'Content-Type': 'application/json'
          },
          data: data
      };
      const tfs_response = await axios(config)
      console.log(tfs_response)
      if (tfs_response.data.status !== 500) {
          setLoadingTFS(false)
          setConnectedTFS(true)
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed while connecting to Azure Devops',
              text: 'There was an error when connecting to Azure Devops using the provided credentials. Make sure they are correct before proceeding',
          }).then(() => {
              window.location = "/";
          });
      }
  }

    const LoadCredentials = () => {
        setTfsCreds(localStorage.getItem('tfs_creds'))
        setjiraCreds(localStorage.getItem('jira_creds'))
    }

    const getWorkItemsTFS = async () => {
        setLoadingTFSWI(true)
        const data = JSON.stringify({
            tfs_token: tfsCreds,
            query_id: TFS_Query.current.value
        });

        var config = {
            method: 'post',
            url: appconfig.endpoints.tfsGetWorkItems[appconfig.runtime],
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const tfs_response = await axios(config)
        console.log(tfs_response.data)
        setTfsWi(tfs_response.data)
        setLoadingTFSWI(false)
    }

    return (
        <>
            <Navbar username={jiraName} connectTFS={connectedTFS} connectJira={connectedJira} />
            {!loadingJira && !loadingTFS ?
                <>
                    {
                        !savedQueriesModal &&
                        <>
                            <div className='title-container'>
                                <h1>Work Items</h1>
                            </div>
                            <div className='work-item-selector-container-1'>
                                <div className='query-container-1'>
                                    <input type="text" placeholder='tfs query id' name='tfs-query' ref={TFS_Query} defaultValue={selectedQuery} />
                                    <button className='query-select-btn' onClick={getWorkItemsTFS}>Get Work Items</button>
                                    <a className='query-save-btn' onClick={() => setSavedQueriesModal(!savedQueriesModal)}>
                                        <SVGIcon type='saved' />
                                        <div>Queries</div>
                                    </a>
                                </div>
                                <div className='work-items-container'>
                                    {loadingTFSWI ? <div className="item-loader">
                                        <ThreeCircles
                                            height="80"
                                            width="80"
                                            color="#5865F2"
                                            radius='12.5'
                                            ariaLabel="loading" />
                                    </div> : <div className='work-item-sel-container'>
                                        {tfsWi && tfsWi.map((item, index) => (
                                            <Link className='work-item-sel' to={'/work-item/' + item.id}>
                                                <SVGIcon type={item.type}/>
                                                <div>{item.title}</div>
                                            </Link>
                                        ))}
                                    </div>}
                                </div>
                            </div>
                        </>
                    }
                </>
                :
                <div className='loader-container'>
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#5865F2"
                        radius='12.5'
                        ariaLabel="loading"
                    /></div>}

            {
                savedQueriesModal && <SavedQueries setSavedQueriesModal={setSavedQueriesModal} SetQueryID={setSelectedQuery} />
            }
        </>
    )
}

export default WorkItemSelect