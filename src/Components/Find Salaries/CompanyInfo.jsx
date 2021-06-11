import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Divider, Box } from "@material-ui/core";
import StarRatings from "react-star-ratings";
import { getCompanyData } from "../../Redux/CompanyInfo/action";
import { loadData, saveData } from "../../Utils/localStorage";
import { Faq, Follow } from "../../Custom UI/stylesFindSalaries";
import styles from "./Salaries.module.css";
import { JobByCategory } from "../../Components/Find Salaries/JobByCategory";
import { categories } from "./data";
import { Loading } from "../Loading/Loading";

const CompanyInfo = () => {
  const [category, setCategory] = useState("Popular Jobs");
  const [follow, setFollow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.companyInfo.isLoading);
  const data = useSelector((state) => state.companyInfo.data);
  const { name, logo, poster, reviews, stars } = data;

  const loadedData = loadData("following");

  document.title = `${name} Salaries in India | Indeed.com`;

  const handleFollow = () => {
    const isauth = loadData("auth");
    if (isauth === undefined || isauth === false) {
      history.push("/account/login");
    } else {
      if (!follow) {
        if (loadedData !== null && loadedData.indexOf(name) === -1) {
          saveData("following", [...loadedData, name]);
        } else {
          saveData("following", [name]);
        }
      }
      setFollow(!follow);
    }
  };
  const { id } = useParams();
  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value);
  };
  useEffect(() => {
    dispatch(getCompanyData(id));
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.poster}>
      <img src={poster} alt="poster" />
      <div className={styles.companyInfo}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <h4>{name}</h4>
          <br />

          <div className={styles.rating}>
            <div>{stars}</div>
            <StarRatings
              rating={stars}
              starRatedColor="#9D2B6B"
              starDimension="16px"
              starSpacing="0px"
              numberOfStars={5}
            />
            <p>{reviews}</p>
          </div>
        </div>
        <div>
          <Follow onClick={handleFollow}>
            {follow ? "Following" : "Follow"}
          </Follow>

          <p>Get weekly updates, new jobs, and reviews</p>
        </div>
      </div>

      <div className={styles.category}>
        <div>Snapshot</div>
        <div>Why Join Us</div>
        <div>Reviews</div>
        <div>Salaries</div>
        <div>Photos</div>
        <div>Jobs</div>
        <div>Questions</div>
        <div>Interviews</div>
      </div>

      <Box mt={5} mb={5}>
        <Divider />
      </Box>
      <div className={styles.salaryInfo}>
        <div>
          <div>
            <h2>{`${name} - Salaries in India`}</h2>
          </div>
          <div>
            <button>Add a Salary</button>
          </div>
        </div>

        <div>
          <div>
            <p>
              Salary estimated from 910 employees, users, and past and present
              job advertisements on Indeed in the past 36 months.Last updated: 7
              April, 2021
            </p>
          </div>
          <div></div>
        </div>

        <div>
          <div>
            <select onChange={handleChange}>
              {categories.map((opt, index) => {
                return (
                  <option key={index} value={opt}>
                    {opt}
                  </option>
                );
              })}
            </select>
            <select disabled={true} value="India">
              <option value="India">India</option>
            </select>
          </div>

          <div>
            <Faq className={styles.faq}>
              <h4>Question about {name}</h4>
              <br />
              <div>What qualifications refer to get job</div>
              <p>395 People answered</p>
              <div>What should you wear to an interview at {name}</div>
              <p>192 People answered</p>
              <div>How are the working hours</div>
              <p>134 People answered</p>
            </Faq>
          </div>
        </div>
      </div>
      <JobByCategory category={category} />
    </div>
  );
};

export { CompanyInfo };