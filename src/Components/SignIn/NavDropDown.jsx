import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { showUserDropdownDisp } from '../../Redux/App/action';
import { logoutSuccess } from '../../Redux/Auth/action';

const Container = styled.div`
    width: 380px;
    min-height: 410px;
    position: absolute;
    top: 50px;
    right: 150px;
    color: #000;
    font-size: 1rem;
    line-height: 50px;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 1.5rem 0.25rem rgb(0 0 0 / 13%);
    z-index: 100;
`;

const Content = styled.div`
    cursor: pointer;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;

    &:hover {
        background: #ececec;
    }
`;

const H5 = styled.h5`
    padding: 10px 40px;
    font-size: 1.2rem;
`;

const Logout = styled.div`
    cursor: pointer;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    border-top: 1px solid #ececec;
    color: #085ff7;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
`;

export const NavDropdown = () => {

    const dispatch = useDispatch();

    const isAuth = useSelector(state=> state.authReducer.isAuth);
    const token = useSelector(state=> state.authReducer.token);

    const history = useHistory();

    const handleLogout = ()=>{
        dispatch(logoutSuccess())
    }

    const handleUserDisp = ()=>{
        dispatch(showUserDropdownDisp())
    }

    if( !isAuth ){
        history.push('/')
    }
    
    return (
        <Container onMouseLeave={handleUserDisp}>
            <div>
                <H5>{token.email}</H5>
                <Content>Profile <span style={{marginTop:'12px'}} class="material-icons-outlined">description</span></Content>
                <Content>My Jobs <span style={{marginTop:'10px'}} class="material-icons-outlined"><span class="material-icons-outlined">favorite_border</span></span></Content>
                <Content>My Reviews <span style={{marginTop:'10px'}} class="material-icons-outlined"><span class="material-icons-outlined">rate_review</span></span></Content>
                <Content>Email Preferences <span style={{marginTop:'10px'}} class="material-icons-outlined"><span class="material-icons-outlined">email</span></span></Content>
                <Content>Search Preferences <span style={{marginTop:'10px'}} class="material-icons-outlined"><span class="material-icons-outlined">search</span></span></Content>
                <Content>Account <span style={{marginTop:'10px'}} class="material-icons-outlined"><span class="material-icons-outlined">settings_input_component</span></span></Content>
            </div>
            <Logout onClick={handleLogout}>Logout</Logout>
        </Container>
    )
}
