import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

export default function Del({ el, getAllEmployees }) {
    const [user, token] = useAuth();

    async function deleteEmployee() {
        try {
          let res = await axios.delete(
            `http://127.0.0.1:8000/api/requests_for_pto/staff/${el.id}/`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
    
          getAllEmployees();
        } catch (error) {
          console.log(error);
          toast("Sorry! We have encountered an error getting all the requests!");
        }
      }
    

  return (
    <div>
      <button className = 'same-page-button-mauve' onClick={() => deleteEmployee()} variant="contained">Delete</button>
    </div>
  );
}
