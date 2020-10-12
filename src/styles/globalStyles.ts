import { createGlobalStyle } from 'styled-components';
import { ENVS } from '@src/utils/index';

export const GlobalStyled = createGlobalStyle`
    @font-face {
        font-family: 'Inter-Regular';
        src: url("${ENVS?.DOMAIN_URL}/fonts/Inter/Inter-Regular.ttf"); 
        font-style: normal;
        font-display: swap;
        font-weight: 100;
    }
    @font-face {
        font-family: 'Inter-Regular';
        src: url("${ENVS?.DOMAIN_URL}/fonts/Inter/Inter-Bold.ttf"); 
        font-style: normal;
        font-display: swap;
        font-weight: 500;
    }
    @font-face {
        font-family: 'Inter-Regular';
        src: url("${ENVS?.DOMAIN_URL}/fonts/Inter/Inter-Medium.ttf"); 
        font-style: normal;
        font-display: swap;
        font-weight: 200;
    }
    #root {
        font-family: 'Inter-Regular';
        font-size: 16px;
        line-height: 20px;
        color: #000;
        background-color: #fff;
        min-height: 100vh;   
        max-width: 100vw;
        font-style: normal;
        font-display: swap;
        width: auto;
        box-sizing: border-box;
        font-weight: 100;
    }

`;
