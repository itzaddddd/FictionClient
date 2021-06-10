import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Bai Jamjuree', sans-serif;

        /* Color */
        --color-menu-bg-main: #39004d;
        --color-menu-bg-sec: #5e0080;
        
        --color-disable: #d3d3d3;
        --color-bg-base: #eed9fa;
        --color-topic-main: #A214CD;  
        
        --color-new-story: #4d0e72; 
        --color-new-chap: #8017bd;
        --color-result: #aa42e8;
        --color-reset: #cc8df1;

        --color-y-label: #DB51EB;
        --color-radar: #FFE91B;
        --color-chart-label: #086AFC;
    }
`

export default GlobalStyle