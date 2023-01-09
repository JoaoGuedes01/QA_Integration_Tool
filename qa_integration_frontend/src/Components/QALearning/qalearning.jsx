import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import './qalearning.css'

import Navbar from '../Navbar/navbar'
import SVGIcon from './svg'
import Swal from 'sweetalert2'
import appconfig from '../../config/appconfig.json'

const QALearning = () => {

  const TFS_Query = useRef()


  const [tfsCreds, setTfsCreds] = useState()
  const [jiraCreds, setjiraCreds] = useState()
  const [jiraName, setjiraName] = useState()
  const [loadingJira, setLoadingJira] = useState(true)
  const [connectedTFS, setConnectedTFS] = useState()
  const [connectedJira, setConnectedJira] = useState()
  const [qaTeams, setQaTeams] = useState()
  const [loadingTFS, setLoadingTFS] = useState(true)



  useEffect(() => {
    LoadCredentials()
    FetchTokenInfo()
    SanityTestTFS()
    FetchQATeams()
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

  const FetchQATeams = async () => {

    const config = {
      method: 'get',
      url: appconfig.endpoints.qadbteams[appconfig.runtime],
    };
    const jira_response = await axios(config)
    console.log(jira_response)
    setQaTeams(jira_response.data)
  }

  const LoadCredentials = () => {
    setTfsCreds(localStorage.getItem('tfs_creds'))
    setjiraCreds(localStorage.getItem('jira_creds'))
  }

  const NextSprint = async () => {
    const config = {
      method: 'get',
      url: appconfig.endpoints.nextSprint[appconfig.runtime],
    };
    const jira_response = await axios(config)
    console.log(jira_response)
    FetchQATeams()
  }

  return (
    <>
      <Navbar username={jiraName} connectTFS={connectedTFS} connectJira={connectedJira} />
      {!loadingJira ?
        <>
          <div className='title-container'>
            <h1>QA Learning</h1>
          </div>
          <div className='qal-container'>
            {
              qaTeams.map((item, index) => (
                <div className='team-config-container'>
                  <div className='tcc-header'>
                    <div className='tcc-title'>
                      <SVGIcon type={item.team_id} />
                      <div>{item.team_title}</div>
                    </div>
                    <div className='edit-btn'>
                      <SVGIcon type='edit' />
                    </div>
                  </div>
                  <div className='tcc-body'>
                    {
                      item.team_members.map((member, index) => (
                        <>
                          {item.chosen === member ? <div className='chosen'>{member}</div> : <div>{member}</div>}
                          {index !== item.team_members.length - 1 ? <SVGIcon type='arrow' /> : ''}
                        </>
                      ))
                    }
                  </div>
                </div>
              ))
            }
            <button className='qal-next-sprint' onClick={NextSprint}>Next Sprint</button>
          </div>
        </>
        :
        <div className='loader-container'>
          <ThreeCircles
            height="100"
            width="100"
            color="#5865F2"
            radius='12.5'
            ariaLabel="loading"
          />
        </div>
      }
    </>
  )
}

export default QALearning