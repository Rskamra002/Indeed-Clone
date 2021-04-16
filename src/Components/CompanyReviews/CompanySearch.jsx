import React, { useEffect,useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {Button,Input,H1,P,Label} from '../../Custom UI/ACustomUI';
import style from './CompanySearch.module.css';
import Select from 'react-select'
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { companiesRequest, companiesSuccess, companiesFailure } from "../../Redux/company/action";

export const CompanySearch=()=>{
    useEffect(()=>{
        document.title = 'Find the Best Companies Hiring Now | Indeed.com';
    });
    // const options = [
    //     { value: 'Amazon', label: 'Amazon' },
    //     { value: 'Google', label: 'Google' },
    //     { value: 'Facebook', label: 'Facebook' }
    //   ]
    const[options,setOptions] = React.useState([]);
      const dispatch = useDispatch();
  const { isLoading, isError,companies } = useSelector(
    (state) => state.company,
    shallowEqual
  );

  const getData = () => {
    const requestAction = companiesRequest();
    dispatch(requestAction);
    axios
      .get("https://json-server-mocker-ajmal.herokuapp.com/companies")
      .then((res) => {
        const successAction = companiesSuccess(res.data);
        dispatch(successAction);
        // console.log(res.data);
      })
      .catch((err) => {
        const failureAction = companiesFailure(err);
        dispatch(failureAction);
      });
  };
  useEffect(()=>{
      getData();
    //   setOptions()
    setOptions(companies.map((element)=>({value:element.company_name, label: element.company_name})));
      
  },[])
  const [searchText,setSearchText] = useState('');
  const history = useHistory();
  const handleSearch=()=>{
      history.push(`/companies/search/${searchText}`);
  }
    return(
        <div className={style.container}>
            <H1>Find great places to work</H1>
            <P>Discover millions of company reviews</P>
            <div style={{marginTop:'3%'}}>
                <div>
                {/* <Label>
                    Company name or job title */}
                    <Input className={style.inputCompany} onChange={(e)=>setSearchText(e.target.value)} placeholder='Enter a company name'/><br/>
                    <Link to='/career/salaries' style={{ textDecoration: 'none',color:'#085ff7',fontSize:'13px' }}>Do you want to search for salaries?</Link>
                    {/* <Select options={options} placeholder='Enter a company name' components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} style={{width:'150px'}}/> */}
                {/* </Label> */}
                </div>
                <div>
                {/* <Label>
                    City, state, or zip (optional)
                    <Input className={style.inputLocation}/>
                     
                {/* </Label> */}
                </div>
                <div style={{marginTop:'1%',textAlign:'center'}}>
                    <Button onClick={handleSearch}>Find Companies</Button>
                    
                </div>
            </div>           
        </div>
    )
}