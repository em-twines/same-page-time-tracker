import React, { useState, useEffect } from "react";
import NewPTOSetting from '../../components/Manager/NewPTOSetting'
import UpdatePTO from '../../components/Manager/UpdatePTO'
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";


export default function SettingsPage() {

  const [allPtoFrequenciesPerYear, setAllPtoFrequenciesPerYear] = useState([]);
  const [allPtoHoursPerYear, setAllPtoHoursPerYear] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    getAllPtoFrequenciesPerYear();
    getAllPtoHoursPerYear();
  }, []);

  async function getAllPtoHoursPerYear() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/hours/
        `,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setAllPtoHoursPerYear(res.data);
    } catch (error) {
      console.log(error);
      toast(
        "Sorry! We have encountered an error getting your pto hours allowance per year!"
      );
    }
  }

  async function getAllPtoFrequenciesPerYear() {
    try {
      let res = await axios.get(
        `http://127.0.0.1:8000/api/requests_for_pto/manager/settings/frequencies/
        `,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setAllPtoFrequenciesPerYear(res.data);
    } catch (error) {
      console.log(error);
      toast(
        "Sorry! We have encountered an error getting your pto rate allowance per year!"
      );
    }
  }








  return (
    <div >
        <UpdatePTO allPtoFrequenciesPerYear = {allPtoFrequenciesPerYear} setAllPtoFrequenciesPerYear = {setAllPtoFrequenciesPerYear} allPtoHoursPerYear = {allPtoHoursPerYear} setAllPtoHoursPerYear = {setAllPtoHoursPerYear} />
        <NewPTOSetting getAllPtoHoursPerYear = {getAllPtoHoursPerYear} getAllPtoFrequenciesPerYear = {getAllPtoFrequenciesPerYear}/>
    </div>
  )
}
