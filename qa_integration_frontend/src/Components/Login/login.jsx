import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import { Buffer } from 'buffer';
import SVGIcons from './svg'
import appconfig from '../../config/appconfig.json'

const Login = () => {

  let navigate = useNavigate();

  const IR_TFS_Email = useRef()
  const IR_TFS_Password = useRef()
  const IR_JIRA_Email = useRef()
  const IR_JIRA_Token = useRef()

  const [tfsCreds, setTfsCreds] = useState()
  const [jiraCreds, setjiraCreds] = useState()

  useEffect(() => {
    LoadCredentials()
  }, [])

  const LoadCredentials = () => {
    setTfsCreds(localStorage.getItem('tfs_creds'))
    setjiraCreds(localStorage.getItem('jira_creds'))
  }

  const SaveCredentials = (ls_name, value) => {
    localStorage.setItem(ls_name, value)
    LoadCredentials()
  }

  const EncodeB64 = (key, secret) => {
    const string_to_encode = key + ':' + secret
    return Buffer.from(string_to_encode).toString('base64');
  }

  const Connect = () => {
    navigate('/dash')
  }

  const ClearCredentials = () => {
    localStorage.clear()
    LoadCredentials()
  }

  return (
    <>
      <div className='login-container'>
        <SVGIcons type='qalf' />
        <div className='creds-container'>
          <div className='tfs-container'>
            <SVGIcons type='tfs' />
            <input type="text" placeholder='email' name='tfs-email' ref={IR_TFS_Email} />
            <input type="password" placeholder='password' name='tfs-password' ref={IR_TFS_Password} />
            <button onClick={() => { SaveCredentials('tfs_creds', EncodeB64(IR_TFS_Email.current.value, IR_TFS_Password.current.value)) }}>Save</button>
            {tfsCreds && <SVGIcons type='check' />}
            {!tfsCreds && <SVGIcons type='n-check' />}

          </div>
          <div className='tfs-container'>
            <SVGIcons type='jira' />
            <input type="text" placeholder='email' name='jira-email' ref={IR_JIRA_Email} />
            <input type="password" placeholder='token' name='jira-token' ref={IR_JIRA_Token} />
            <button onClick={() => { SaveCredentials('jira_creds', EncodeB64(IR_JIRA_Email.current.value, IR_JIRA_Token.current.value)) }}>Save</button>
            {jiraCreds && <SVGIcons type='check' />}
            {!jiraCreds && <SVGIcons type='n-check' />}
          </div>
        </div>
        {
          tfsCreds && jiraCreds && <button className='connect-btn' onClick={Connect}>Connect</button>
        }
        <button className='clear-ls-btn' onClick={ClearCredentials}>Clear Credentials</button>
      </div>
      <div>QALF Team Portugal - <b>{appconfig.runtime}</b> environment</div>
    </>
  )
}

export default Login