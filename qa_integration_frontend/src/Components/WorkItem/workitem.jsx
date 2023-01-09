import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import SVGIcon from './svg'
import Navbar from '../Navbar/navbar'
import Swal from 'sweetalert2'
import appconfig from '../../config/appconfig.json'

import './workitem.css'

const WorkItem = () => {

    const initialState = {
        exp_beh: {
            open: false,
            value: '',
            reason: ''
        }
    }
    const { id } = useParams()
    let expBeh_reason = useRef()
    let expErr_reason = useRef()
    let autCreated_reason = useRef()
    let projFailLogVal_reason = useRef()
    let engPerfMet_reason = useRef()
    let autPassed_reason = useRef()
    let resultEval_reason = useRef()
    let qa_status = useRef()
    let test_summary = useRef()


    const [tfsCreds, setTfsCreds] = useState()
    const [jiraCreds, setjiraCreds] = useState()
    const [tfsWi, setTfsWi] = useState()
    const [accountIdJira, setAccountIdJira] = useState()
    const [jiraName, setjiraName] = useState()
    const [loadingJira, setLoadingJira] = useState(true)
    const [connectedTFS, setConnectedTFS] = useState()
    const [connectedJira, setConnectedJira] = useState()
    const [tfsItem, setTfsItem] = useState()

    const [apiResArr, setApiResArr] = useState([])

    const [expBeh, setExpBeh] = useState()
    const [expErr, setExpErr] = useState()
    const [autCreated, setAutCreated] = useState()
    const [projFailLogVal, setProjFailLogVal] = useState()
    const [engPerfMet, setEngPerfMet] = useState()
    const [autPassed, setAutPassed] = useState()
    const [resultEval, setResultEval] = useState()
    const [loadingTFS, setLoadingTFS] = useState(true)



    useEffect(() => {
        LoadCredentials()
        FetchTokenInfo()
        SanityTestTFS()
        FetchItemDetails()
        FetchSavedKS()
    }, [])

    //Methods

    const FetchSavedKS = () => {
        if (!localStorage.getItem('saved-items')) {
            localStorage.setItem('saved-items', JSON.stringify([]))
        }
    }

    const FetchItemDetails = async () => {
        const data = JSON.stringify({
            tfs_token: localStorage.getItem('tfs_creds'),
            item_id: id
        });
        console.log(data)

        const config = {
            method: 'post',
            url: appconfig.endpoints.tfsGetWorkItemsDetails[appconfig.runtime],
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const tfs_response = await axios(config)
        console.log('ITEM')
        console.log(tfs_response)
        setTfsItem(tfs_response.data)
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

    const ClearForm = () => {
        setExpBeh(null)
        setExpErr(null)
        setProjFailLogVal(null)
        setEngPerfMet(null)
        setAutPassed(null)
        setResultEval(null)

        expBeh_reason = null
        expErr_reason = null
        projFailLogVal_reason = null
        engPerfMet_reason = null
        autPassed_reason = null
        resultEval_reason = null

        setApiResArr([])
    }

    const AddApiResults = async () => {
        const newApiObj = {
            "pr_number": null,
            "results": null,
            "state": 'idle'
        }
        setApiResArr(apiResArr => [...apiResArr, newApiObj]);
    }

    const FetchAPIResults = async (pr_number) => {
        updateAPIFetchState(pr_number, 'idle')
        const config = {
            method: 'get',
            url: process.env.REACT_APP_PR_SUMMARY_IP + '/pr-summary-complete/' + pr_number,
            headers: {}
        };

        const api_res = await axios(config)

        const newState = apiResArr.map(obj => {
            if (obj.pr_number === pr_number) {
                obj.results = api_res.data
            }
            return obj;
        });

        updateAPIFetchState(pr_number, 'succ')

        setApiResArr(newState);
    }

    const updateAPIFetchState = (pr_number, state) => {
        const newState = apiResArr.map(obj => {
            if (obj.pr_number === pr_number) {
                obj.state = state
            }
            return obj;
        });

        setApiResArr(newState);
    }

    const SendQAStatusToTFS = async () => {
        const data = {
            expBeh_reason: expBeh_reason && expBeh === false ? ' | ' + expBeh_reason.current.value : '',
            expErr_reason: expErr_reason && expErr === false ? ' | ' + expErr_reason.current.value : '',
            autCreated_reason: autCreated_reason && autCreated === false ? ' | ' + autCreated_reason.current.value : '',
            projFailLogVal_reason: projFailLogVal_reason && projFailLogVal === false ? ' | ' + projFailLogVal_reason.current.value : '',
            engPerfMet_reason: engPerfMet_reason && engPerfMet === false ? ' | ' + engPerfMet_reason.current.value : '',
            autPassed_reason: autPassed_reason && autPassed === false ? ' | ' + autPassed_reason.current.value : '',
            resultEval_reason: resultEval_reason && resultEval === false ? ' | ' + resultEval_reason.current.value : '',
            expBeh,
            expErr,
            autCreated,
            projFailLogVal,
            engPerfMet,
            autPassed,
            resultEval
        }

        console.log(data)

        let api_section = ""
        if (apiResArr.length !== 0) {
            for (let i = 0; i < apiResArr.length; i++) {
                const pr = apiResArr[i];
                const pr_api_results = "<span>[API Results - " + pr.pr_number + "]</span><br><pre>" + JSON.stringify(pr.results) + "</pre>"
                api_section += pr_api_results
            }
        } else {
            api_section = "<span>[API Results]</span><br><div>There were no PRs made</div>"
        }

        const overall_status = "<div><span>QA Status: " + qa_status.current.value + "<br></span></div><div><div><br></div><div>Test summary: " + test_summary.current.value + "<br></div><div><br></div>"
        const tests_section = "<div>[Validation Criteria - " + id + "]<br></div><div>The expected behavior is happening: " + ConvertBoolToAnalysis(data.expBeh) + data.expBeh_reason + "<br></div><div>No exceptions or errors in the log: " + ConvertBoolToAnalysis(data.expErr) + data.expErr_reason + "<br></div><div>Automations or unit tests created:  " + ConvertBoolToAnalysis(data.autCreated) + data.autCreated_reason + "<br></div><div>No project started failing in log validation: " + ConvertBoolToAnalysis(data.projFailLogVal) + data.projFailLogVal_reason + "<br></div><div>Engine performance metrics: " + ConvertBoolToAnalysis(data.engPerfMet) + data.engPerfMet_reason + "<br></div><div>All automation have passed: - " + ConvertBoolToAnalysis(data.autPassed) + data.autPassed_reason + "<br></div><div>No result left without analysis: " + ConvertBoolToAnalysis(data.resultEval) + data.resultEval_reason + "<br></div><div><br></div> "
        const qa_status_string = overall_status + tests_section + api_section

        const data_axios = JSON.stringify({
            "tfs_token": tfsCreds,
            "item_id": id,
            "comment": qa_status_string
        });

        var config = {
            method: 'post',
            url: appconfig.endpoints.tfsCommentWorkItem[appconfig.runtime],
            headers: {
                'Content-Type': 'application/json'
            },
            data: data_axios
        };

        const api_res = await axios(config)
        console.log(api_res.data)

        Swal.fire({
            icon: 'success',
            title: "Item Reviewed!",
            text: 'QA Status for item ' + id + ' was published successfully',
            confirmButtonColor: '#000',
            iconColor: "#6C63FF"
        })

    }

    const ConvertBoolToAnalysis = (value) => {
        if (value === true) {
            return 'OK'
        } else {
            return 'FAIL'
        }
    }

    const handleChange = event => {
        let index = event.target.getAttribute('arr-index')
        console.log(index)

        let newState = apiResArr
        newState[index].pr_number = event.target.value
        setApiResArr(newState);
    };

    const OpenApiResults = async (results) => {
        Swal.fire({
            title: "Results API",
            text: JSON.stringify(results),
            confirmButtonColor: '#000',
            iconColor: "#6C63FF"
        })
    }

    const AddItemToSavedKS = async (item_number, item_name, item_type, item_version) => {
        Swal.fire({
            title: 'Save Item to Knowledge Sharing',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            showLoaderOnConfirm: true,
            preConfirm: (item_desc) => {
                const newItem = { item_number, item_name, item_type, item_version, item_desc }
                let ks_items = JSON.parse(localStorage.getItem('saved-items'))
                const found = ks_items.some(el => el.item_number === id);
                if (!found) {
                    ks_items.push(newItem)
                    localStorage.setItem('saved-items', JSON.stringify(ks_items))
                };
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Item added to Knowledge Sharing',
                    text: 'The Work Item ' + item_number + ' was added to Knowledge Sharing'
                })
            }
        })
    }



    return (
        <>
            <Navbar username={jiraName} connectTFS={connectedTFS} connectJira={connectedJira} />
            {tfsItem ?
                <>
                    <div className='wi-container'>
                        <div className='wi-header-container'>
                            <a className='wi-tfs-button' href={tfsItem._links.html.href}>
                                <div>Open in TSF</div>
                                <SVGIcon type='tfs-btn' />
                            </a>
                            <h2>{tfsItem.fields["System.Title"]}</h2>
                            <button className='wi-btn' onClick={() => AddItemToSavedKS(id, tfsItem.fields["System.Title"], tfsItem.fields["System.WorkItemType"], "9.5.4")}>Save for Knowledge Sharing</button>
                        </div>
                        <div className='wi-info-container'>
                            <div>Author: {tfsItem.fields["System.AssignedTo"].displayName}</div>
                            <div>State: {tfsItem.fields["System.BoardColumn"]}</div>
                            <div>Work Item Type: {tfsItem.fields["System.WorkItemType"]}</div>
                        </div>
                        <div className='wi-desc-container'>
                            <h2>Item Description</h2>
                            <p dangerouslySetInnerHTML={{ __html: tfsItem.fields["System.Description"] ? tfsItem.fields["System.Description"] : 'Item does not have Description' }}></p>
                            <h2>Item Steps</h2>
                            <p dangerouslySetInnerHTML={{ __html: tfsItem.fields["Microsoft.VSTS.TCM.ReproSteps"] ? tfsItem.fields["Microsoft.VSTS.TCM.ReproSteps"] : 'Item does not have reproducible steps' }}></p>
                        </div>

                        <div className='qa-status-div-container'>
                            <h2>QA Status</h2>
                            <div className='qa-status-container'>
                                <div className='qa-status-checklist'>
                                    <h2>QA Checklist</h2>

                                    {/* Expected Behaviour */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>The expected behaviour is happening</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${expBeh === true ? "btn-sel" : ""}`} onClick={() => setExpBeh((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${expBeh === false ? 'btn-sel' : ''}`} onClick={() => setExpBeh((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {expBeh === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={expBeh_reason}></textarea>}
                                    </div>


                                    {/* Exception errrors in log */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>No exceptions or errors in the log</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${expErr === true ? "btn-sel" : ""}`} onClick={() => setExpErr((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${expErr === false ? 'btn-sel' : ''}`} onClick={() => setExpErr((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {expErr === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={expErr_reason}></textarea>}
                                    </div>

                                    {/* Automation Created */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>Automations or Unit Tests created</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${autCreated === true ? "btn-sel" : ""}`} onClick={() => setAutCreated((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${autCreated === false ? 'btn-sel' : ''}`} onClick={() => setAutCreated((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {autCreated === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={autCreated_reason}></textarea>}
                                    </div>


                                    {/* Projects Failing in Log Validation */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>No project started failing in log validation</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${projFailLogVal === true ? "btn-sel" : ""}`} onClick={() => setProjFailLogVal((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${projFailLogVal === false ? 'btn-sel' : ''}`} onClick={() => setProjFailLogVal((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {projFailLogVal === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={projFailLogVal_reason}></textarea>}
                                    </div>


                                    {/* Engine Performance Metrics */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>Engine performance metrics</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${engPerfMet === true ? "btn-sel" : ""}`} onClick={() => setEngPerfMet((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${engPerfMet === false ? 'btn-sel' : ''}`} onClick={() => setEngPerfMet((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {engPerfMet === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={engPerfMet_reason}></textarea>}
                                    </div>


                                    {/* Automations Passed */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>All automation have passed</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${autPassed === true ? "btn-sel" : ""}`} onClick={() => setAutPassed((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${autPassed === false ? 'btn-sel' : ''}`} onClick={() => setAutPassed((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {autPassed === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={autPassed_reason}></textarea>}
                                    </div>


                                    {/* Results are all Analyzed */}
                                    <div className='qa-status-checklist-item'>
                                        <div className='qa-status-checklist-item-main'>
                                            <h2>No result left without analysis</h2>
                                            <div className='qa-status-checklist-item-main-btns'>
                                                <button className={`qa-status-ok-btn ${resultEval === true ? "btn-sel" : ""}`} onClick={() => setResultEval((true))}>OK</button>
                                                <button className={`qa-status-ok-fail ${resultEval === false ? 'btn-sel' : ''}`} onClick={() => setResultEval((false))}>Failed</button>
                                            </div>
                                        </div>
                                        {resultEval === false && <textarea placeholder='Please provide a reason for failure' rows={5} name="expected-behaviour-ta" id="expected-behaviour-ta" ref={resultEval_reason}></textarea>}
                                    </div>
                                </div>
                                <div className='qa-status-api-results'>
                                    <div className='qa-status-api-results-title-container'>
                                        <h2>API Results</h2>
                                        <button onClick={AddApiResults}>New Fetch</button>
                                    </div>
                                    {
                                        apiResArr.map((item, index) => (
                                            <div key={index} className='api-results-item'>
                                                <SVGIcon type={item.state} />
                                                <input arr-index={index} onChange={handleChange} type="text" placeholder='pr number' />
                                                <input type="text" placeholder='engine version' />
                                                <input type="text" placeholder='branch' />
                                                <button onClick={() => FetchAPIResults(item.pr_number)}>Fetch API Results</button>
                                                {
                                                    item.results && <div onClick={() => OpenApiResults(item.results)}>
                                                        <SVGIcon type='eye' />
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='overall-status'>
                                    <h2>Overall Status</h2>
                                    <textarea placeholder='QA Status' rows={5} id="expected-behaviour-ta" ref={qa_status}></textarea>
                                    <textarea placeholder='Test Summary' rows={5} id="expected-behaviour-ta" ref={test_summary}></textarea>
                                </div>
                                <div className='qa-status-buttons'>
                                    <button className='qa-status-buttons-clear' onClick={ClearForm}>Clear QA Status</button>
                                    <button className='qa-status-buttons-send' onClick={SendQAStatusToTFS}>Send QA Status</button>
                                </div>
                            </div>
                        </div>
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
                    /></div>}
        </>
    )
}

export default WorkItem