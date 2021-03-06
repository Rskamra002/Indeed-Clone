import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    diaplay: flex;
    padding-top: 15%;
    justify-content: center;
`;
    
const Icon = styled.div`
    width: 200px;
    margin: auto;
    color: grey;
`;
    
const Head = styled.h2`
    font-size: 50px;
    text-align: center;
    color: grey;
`;

export const HiringPage = () => {
    return (
        <Container>
            <Icon>
                <span style={{fontSize:'200px'}} class="material-icons-round">settings</span>
            </Icon>
                <Head>Page under maintenance</Head>
        </Container>
    )
}
