import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import './knowledgesharing.css'
import Swal from 'sweetalert2'

import Navbar from '../Navbar/navbar'
import SVGIcon from './svg'
import appconfig from '../../config/appconfig.json'

const KnowledgeSharing = () => {

  const TFS_Query = useRef()


  const [tfsCreds, setTfsCreds] = useState()
  const [jiraCreds, setjiraCreds] = useState()
  const [jiraName, setjiraName] = useState()
  const [loadingJira, setLoadingJira] = useState(true)
  const [connectedTFS, setConnectedTFS] = useState()
  const [connectedJira, setConnectedJira] = useState()
  const [savedItems, setSavedItems] = useState([])
  const [loadingTFS, setLoadingTFS] = useState(true)


  useEffect(() => {
    LoadCredentials()
    FetchTokenInfo()
    SanityTestTFS()
    FetchSavedItems()
  }, [])

  //Methods

  const FetchSavedItems = () => {
    if (!localStorage.getItem('saved-items')) {
      localStorage.setItem('saved-items', JSON.stringify([]))
    }
    const savedItemsjson = JSON.parse(localStorage.getItem('saved-items'))
    setSavedItems(savedItemsjson)
  }

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

  const LoadCredentials = () => {
    setTfsCreds(localStorage.getItem('tfs_creds'))
    setjiraCreds(localStorage.getItem('jira_creds'))
  }

  const UpdateSKItem = (index) => {
    const currentLS = JSON.parse(localStorage.getItem('saved-items'))
    Swal.fire({
      title: 'Updating Knowledge Sharing Item',
      input: 'textarea',
      inputValue: currentLS[index].item_desc,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (item_desc) => {
        currentLS[index].item_desc = item_desc
        const lspayload = JSON.stringify(currentLS)
        localStorage.setItem('saved-items', lspayload)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Knowledge Sharing Item Updated',
          text: 'The Work Item ' + currentLS[index].item_number + ' was updated'
        })
        FetchSavedItems()
      }
    })
  }

  const DeleteSKItem = (index) => {
    const currentLS = JSON.parse(localStorage.getItem('saved-items'))
    currentLS.splice(index, 1)
    const lspayload = JSON.stringify(currentLS)
    localStorage.setItem('saved-items', lspayload)
    FetchSavedItems()
  }

  return (
    <>
      <Navbar username={jiraName} connectTFS={connectedTFS} connectJira={connectedJira} />
      {!loadingJira && !loadingTFS ?
        <>
          <div className='title-container'>
            <h1>Knowledge Sharing</h1>
          </div>
          {
            savedItems.length > 0 ?
              <div className="ks-container-center">
                <div className='ks-container'>
                  <div className='ks-select-container'>
                    <div className="ks-select-group">
                      {/* <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                      </select>
                      <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                      </select> */}
                    </div>
                  </div>
                  <div className="ks-items-container">
                    {
                      savedItems.map((item, index) => (
                        <div className="ks-item">
                          <div className="ks-btns-container">
                            <div onClick={() => UpdateSKItem(index)} className='btn-blue'><SVGIcon type='edit' /></div>
                            <div onClick={() => DeleteSKItem(index)} className='btn-red'><SVGIcon type='delete' /></div>
                            <a href={'/work-item/' + item.item_number} className='btn-green'><SVGIcon type='open' /></a>
                          </div>
                          <div className="ks-item-body">
                            <div className="ks-item-body-header">
                              <SVGIcon type={item.item_type} />
                              <div>{item.item_name}</div>
                              <div>{item.item_version}</div>
                            </div>
                            <div className="ks-item-body-body">
                              {item.item_desc}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              :
              <div>there are no items</div>
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
          />
        </div>
      }
    </>
  )
}

export default KnowledgeSharing