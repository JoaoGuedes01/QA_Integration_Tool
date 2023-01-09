import React from 'react'

import './workitem.css'
const SVGIcon = (props) => {
    const type = props.type
    return (
        <>
            {
                type === 'tfs-btn' &&
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 11.0865L2.80781 7.37318L13.3153 3.09243V0L22.5291 6.75225L3.70594 10.4121V20.7161L0 19.6443L0 11.0865ZM30 5.51321V23.8649L22.8075 30L11.1816 26.1739V30L3.70594 20.7142L22.5291 22.965V6.75131L30 5.51321Z" fill="white" />
                </svg>

            }
            {
                type === 'eye' &&
                <svg className='eye' width="60" height="40" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.758 10.2035C13.421 10.2035 12.3423 9.20023 12.3423 7.96327C12.3423 6.72414 13.421 5.71875 14.758 5.71875C16.0949 5.71875 17.1794 6.72414 17.1794 7.96327C17.1801 9.20167 16.0956 10.2035 14.758 10.2035Z" fill="white" />
                    <path d="M26.776 6.58181C26.776 6.58181 22.5717 0 14.6329 0C6.69687 0 2.49191 6.58181 2.49191 6.58181C1.63107 7.46854 0 8.00072 0 8.00072C0 8.00072 1.63107 8.53146 2.49191 9.4182C2.49191 9.4182 6.69759 16 14.6336 16C22.5725 16 26.7767 9.4182 26.7767 9.4182C27.639 8.53218 29.4132 8.00072 29.4132 8.00072C29.4132 8.00072 27.639 7.46854 26.776 6.58181ZM14.6724 12.7077C11.8741 12.7077 9.60302 10.6034 9.60302 8.00791C9.60302 5.41532 11.8741 3.3096 14.6724 3.3096C17.4736 3.3096 19.7461 5.41532 19.7461 8.00791C19.7461 10.6027 17.4736 12.7077 14.6724 12.7077Z" fill="white" />
                </svg>
            }
            {
                type === 'succ' &&
                <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="14" fill="#3BA55C" />
                </svg>

            }

            {
                type === 'fail' &&
                <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="14" fill="#D83C3E" />
                </svg>

            }

            {
                type === 'idle' &&
                <svg width="60" height="60" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="28" height="28" rx="14" fill="#e1ad01" />
                </svg>
            }
        </>
    )
}

export default SVGIcon