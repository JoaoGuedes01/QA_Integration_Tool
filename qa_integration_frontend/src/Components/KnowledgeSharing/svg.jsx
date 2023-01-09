import React from 'react'

const SVGIcon = (props) => {
  const type = props.type
  return (
    <>
      {
        type === 'edit' &&
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.4057 3.57007L17.5469 2.45141C18.1232 1.87509 18.1458 1.25364 17.6373 0.733872L17.2531 0.349673C16.7446 -0.158816 16.1231 -0.102312 15.5469 0.451351L14.4056 1.58134L16.4057 3.57007ZM3.08338 16.8584L15.4113 4.54182L13.4339 2.55309L1.09469 14.881L0.0212099 17.3895C-0.0804686 17.6607 0.202004 17.9771 0.473195 17.8641L3.08338 16.8584Z" fill="white" />
        </svg>
      }

      {
        type === 'delete' &&
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4503 3.60181H1.55012C0.976719 3.60181 0.511719 4.06676 0.511719 4.63981C0.511719 5.15136 0.882119 5.57656 1.36902 5.66216V17.1045C1.36902 17.5991 1.76982 18.0001 2.26457 18.0001H11.7359C12.2305 18.0001 12.6313 17.5991 12.6313 17.1045V5.66216C13.1182 5.57656 13.4886 5.15136 13.4886 4.63981C13.4887 4.06676 13.0237 3.60181 12.4503 3.60181ZM5.65282 14.2427C5.65282 14.8492 5.16087 15.3409 4.55447 15.3409C3.94807 15.3409 3.45657 14.8492 3.45657 14.2427V7.37496C3.45657 6.76851 3.94807 6.27701 4.55447 6.27701C5.16087 6.27701 5.65282 6.76851 5.65282 7.37496V14.2427ZM10.5439 14.2427C10.5439 14.8492 10.0524 15.3409 9.44597 15.3409C8.83957 15.3409 8.34762 14.8492 8.34762 14.2427V7.37496C8.34762 6.76851 8.83957 6.27701 9.44597 6.27701C10.0524 6.27701 10.5439 6.76851 10.5439 7.37496V14.2427Z" fill="white" />
          <path d="M1.55012 3.04275H12.4503C13.0237 3.04275 13.4887 2.5778 13.4887 2.00475C13.4887 1.4313 13.0236 0.96635 12.4503 0.96635H10.3567C10.3199 0.4264 9.87052 0 9.32147 0H4.67902C4.12992 0 3.68057 0.4264 3.64367 0.9664H1.55012C0.976719 0.9664 0.511719 1.43135 0.511719 2.0048C0.511719 2.57785 0.976719 3.04275 1.55012 3.04275Z" fill="white" />
        </svg>

      }

      {
        type === 'open' &&
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5815 9V15.0694C15.5818 15.1367 15.5688 15.2034 15.5432 15.2657C15.5177 15.328 15.48 15.3845 15.4324 15.4322C15.3848 15.4798 15.3282 15.5175 15.2659 15.543C15.2036 15.5686 15.1369 15.5816 15.0696 15.5812H2.93083C2.8635 15.5816 2.79677 15.5686 2.7345 15.543C2.67223 15.5175 2.61565 15.4798 2.56805 15.4322C2.52044 15.3845 2.48275 15.328 2.45716 15.2657C2.43157 15.2034 2.41858 15.1367 2.41895 15.0694V2.93062C2.41858 2.8633 2.43157 2.79657 2.45716 2.7343C2.48275 2.67202 2.52044 2.61545 2.56805 2.56784C2.61565 2.52023 2.67223 2.48254 2.7345 2.45695C2.79677 2.43136 2.8635 2.41837 2.93083 2.41875H9.0002" stroke="white" stroke-width="2" />
          <path d="M11.3398 2.41875H15.5811V6.80062" stroke="white" stroke-width="2" />
          <path d="M5.43359 12.8587L15.3589 2.50594" stroke="white" stroke-width="2" />
        </svg>

      }

      {
        type === 'Bug' &&
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.4181 3.26902C19.9381 3.52901 20.1488 4.16131 19.8888 4.68127C19.5169 5.42517 18.8349 6.07691 18.1497 6.53374C17.8431 6.73819 17.4966 6.92958 17.1325 7.07738C17.4373 7.82526 17.6577 8.63032 17.7808 9.47368H20C20.5814 9.47368 21.0526 9.94495 21.0526 10.5263C21.0526 11.1077 20.5814 11.5789 20 11.5789H17.8819C17.8215 12.8123 17.5503 14.0029 17.1036 15.0814C17.7051 15.4285 18.1171 15.9857 18.3757 16.5029C18.7905 17.3325 18.9474 18.2888 18.9474 18.9474C18.9474 19.5287 18.4761 20 17.8947 20C17.3549 20 16.91 19.5937 16.8492 19.0701L16.8421 18.9474C16.8421 18.5533 16.7358 17.9306 16.4927 17.4444C16.3559 17.1707 16.2195 17.014 16.0869 16.9295C14.7692 18.7835 12.8178 20 10.5263 20C8.23483 20 6.28346 18.7835 4.96564 16.9295C4.83311 17.014 4.69679 17.1707 4.55993 17.4444C4.31684 17.9306 4.21053 18.5533 4.21053 18.9474C4.21053 19.5287 3.73924 20 3.15789 20C2.57655 20 2.10526 19.5287 2.10526 18.9474C2.10526 18.2888 2.26211 17.3325 2.67692 16.5029C2.93556 15.9857 3.3476 15.4285 3.94901 15.0814C3.50228 14.0029 3.23116 12.8123 3.17077 11.5789H1.05263C0.471284 11.5789 0 11.1077 0 10.5263C0 9.94495 0.471284 9.47368 1.05263 9.47368H3.27184C3.39499 8.63032 3.61536 7.82526 3.92008 7.07738C3.55604 6.92958 3.20962 6.73819 2.90295 6.53374C2.21771 6.07691 1.53571 5.42517 1.16376 4.68127C0.903769 4.16131 1.11454 3.52901 1.63452 3.26902C2.11734 3.0276 2.69702 3.19209 2.98553 3.63315L3.04677 3.73978C3.20114 4.04852 3.57177 4.44941 4.07074 4.78205C4.58175 5.12273 5.0328 5.26316 5.26316 5.26316H15.7895C16.0198 5.26316 16.4708 5.12273 16.9819 4.78205C17.4185 4.49099 17.7568 4.14767 17.938 3.85956L18.0059 3.73978C18.2659 3.2198 18.8981 3.00903 19.4181 3.26902ZM14.9561 7.36842H6.09648C5.57304 8.42474 5.26316 9.68632 5.26316 11.0526C5.26316 14.5354 7.19664 17.1294 9.47368 17.7516V10.5263C9.47368 9.94495 9.94495 9.47368 10.5263 9.47368C11.1077 9.47368 11.5789 9.94495 11.5789 10.5263V17.7516C13.856 17.1294 15.7895 14.5354 15.7895 11.0526C15.7895 9.68632 15.4796 8.42474 14.9561 7.36842ZM10.5263 0C12.4758 0 14.1763 1.0604 15.0847 2.63081L15.9985 4.21053H5.05414L5.96795 2.63081C6.87638 1.0604 8.57695 0 10.5263 0Z" fill="white" />
        </svg>
      }
      {
        type === 'Product Backlog Item' &&
        <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4241 19.5603C10.1977 19.4198 9.86423 19.229 9.4496 19.0377C8.61113 18.6506 7.49351 18.2857 6.28571 18.2857C4.8241 18.2857 3.49998 18.82 2.65226 19.2705C2.05946 19.5856 1.40478 19.5145 0.921497 19.248C0.432663 18.9783 0 18.4373 0 17.7143V3.42857C0 2.71858 0.337211 1.98505 1.02573 1.56682C1.91097 1.0291 3.90139 0 6.28571 0C8.09289 0 9.87966 0.582949 11.4286 1.49671C12.9775 0.582949 14.7642 0 16.5714 0C18.9558 0 20.9462 1.0291 21.8314 1.56682C22.5199 1.98505 22.8571 2.71858 22.8571 3.42857V17.7143C22.8571 18.4373 22.4245 18.9783 21.9357 19.248C21.4523 19.5145 20.7977 19.5856 20.2049 19.2705C19.3571 18.82 18.033 18.2857 16.5714 18.2857C15.3637 18.2857 14.2461 18.6506 13.4075 19.0377C12.9929 19.229 12.6594 19.4198 12.433 19.5603C12.1083 19.7618 11.8345 20 11.4291 20C11.023 20 10.7495 19.7623 10.4241 19.5603ZM2.28571 16.907V3.47634C3.0553 3.01973 4.57201 2.28571 6.28571 2.28571C7.69193 2.28571 9.08365 2.76306 10.2857 3.47634V16.907C9.27463 16.4544 7.8704 16 6.28571 16C4.70704 16 3.30439 16.451 2.28571 16.907ZM12.5714 16.907C13.5825 16.4544 14.9867 16 16.5714 16C18.1501 16 19.5528 16.451 20.5714 16.907V3.47634C19.8018 3.01973 18.2851 2.28571 16.5714 2.28571C15.1653 2.28571 13.7735 2.76306 12.5714 3.47634V16.907Z" fill="white" />
        </svg>
      }


    </>
  )
}

export default SVGIcon