import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './dashboard.css'
import SVGIcons from './svg'
import Swal from 'sweetalert2'
import { ThreeCircles } from 'react-loader-spinner'

import Navbar from '../Navbar/navbar'
import appconfig from '../../config/appconfig.json'


const Dashboard = (props) => {

    //Input References
    const TFS_Query = useRef()
    const JIRA_Query = useRef()
    const JIRA_Assign = useRef()

    //State
    const [tfsCreds, setTfsCreds] = useState()
    const [jiraCreds, setjiraCreds] = useState()
    const [tfsWi, setTfsWi] = useState()
    const [jiraWi, setJiraWi] = useState()
    const [accountIdJira, setAccountIdJira] = useState()
    const [jiraName, setjiraName] = useState()
    const [loadingJira, setLoadingJira] = useState(true)
    const [loadingTFS, setLoadingTFS] = useState(true)
    const [connectedTFS, setConnectedTFS] = useState()
    const [connectedJira, setConnectedJira] = useState()
    const [loadingTFSWI, setLoadingTFSWI] = useState(false)
    const [loadingJiraWI, setLoadingJiraWI] = useState(false)


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

    const getWorkItemsJira = async () => {
        setLoadingJiraWI(true)
        const data = JSON.stringify({
            jira_token: jiraCreds,
            item_id: JIRA_Query.current.value
        });

        var config = {
            method: 'post',
            url: appconfig.endpoints.jiraGetWorkItems[appconfig.runtime],
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const jira_response = await axios(config)
        setJiraWi(jira_response.data.fields.subtasks)
        setLoadingJiraWI(false)
    }

    const MigrateItems = async () => {
        console.log('Migrating Items')
        const data = JSON.stringify({
            tfs_token: tfsCreds,
            jira_token: jiraCreds,
            item_list: tfsWi,
            jira_test_plan: JIRA_Query.current.value
        });

        var config = {
            method: 'post',
            url: appconfig.endpoints.migrateItems[appconfig.runtime],
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const jira_response = await axios(config)
        console.log(jira_response)
        Swal.fire({
            icon: 'success',
            title: "Items Migrated Successfully",
            text: "The selected items were migrated from TFS to Jira",
            confirmButtonColor: '#000',
            iconColor: "#6C63FF"
        })
    }

    const handleSelect = (index) => {
        const newArr = [...tfsWi];
        newArr[index].selected = !newArr[index].selected;
        if (newArr[index].selected === true) {
            if (jiraWi.some(e => e.fields.summary === newArr[index].title)) {
                newArr[index].repeated = true
            }
        } else {
            newArr[index].repeated = false
        }
        setTfsWi(newArr);
    }

    //Components
    return (
        <div>
            <Navbar username={jiraName} connectTFS={connectedTFS} connectJira={connectedJira} />
            {!loadingJira && !loadingTFS ?
                <>
                    <div className='title-container'>
                        <h1>Migrate to Jira</h1>
                    </div>
                    <div className='work-item-migrator-container'>
                        <div className='platform-section'>
                            <div className='icon-container'>
                                <SVGIcons type='tfs' />
                            </div>
                            <div className='query-container'>
                                <input type="text" placeholder='query id' name='tfs-query' ref={TFS_Query} />
                                <button className='mig-btn' onClick={getWorkItemsTFS}>Get Work Items</button>
                            </div>
                            <div className='work-items'>
                                {loadingTFSWI ? <div className="item-loader">
                                    <ThreeCircles
                                        height="80"
                                        width="80"
                                        color="#5865F2"
                                        radius='12.5'
                                        ariaLabel="loading" />
                                </div> : <>
                                    {tfsWi && tfsWi.map((item, index) => (
                                        <div className={`work-item ${item.selected && !item.repeated ? "selected" : ""} ${item.repeated && item.repeated ? "repeated" : ""}`} onClick={() => handleSelect(index)}>{item.title}</div>
                                    ))}
                                </>}

                            </div>
                        </div>

                        <div className='platform-section'>
                            <SVGIcons type='jira' />
                            <div className='query-container'>
                                <input type="text" placeholder='assign to' name='tfs-query' ref={JIRA_Query} />
                                <button className='mig-btn' onClick={getWorkItemsJira}>Get Work Items</button>
                            </div>
                            <div className='work-items'>
                                {loadingJiraWI ? <div className="item-loader">
                                    <ThreeCircles
                                        height="80"
                                        width="80"
                                        color="#5865F2"
                                        radius='12.5'
                                        ariaLabel="loading" />
                                </div> : <>
                                    {jiraWi && jiraWi.map((item, index) => (
                                        <div className={`work-item ${item.selected && !item.repeated ? "selected" : ""} ${item.repeated && item.repeated ? "repeated" : ""}`}>{item.fields.summary}</div>
                                    ))}
                                </>}
                            </div>
                        </div>
                    </div>
                    <div className='title-container'>
                        {tfsWi && jiraWi &&
                            <div className='migrate-container'>
                                <button className='mig-btn-final' onClick={MigrateItems}>Migrate Items</button>
                                <input type="text" placeholder='assign to' name='tfs-query' ref={JIRA_Assign} defaultValue={accountIdJira} />

                            </div>
                        }

                    </div>
                </> : <div className='loader-container'>
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#5865F2"
                        radius='12.5'
                        ariaLabel="loading"
                    /></div>
            }

        </div>
    )
}

export default Dashboard