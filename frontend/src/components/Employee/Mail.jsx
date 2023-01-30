import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export default function Mail() {
  const [mail, setMail] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    getMail();
  }, []);

  async function getMail() {
    try {
      let res = await axios.get(`http://127.0.0.1:8000/api/message/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setMail(res.data);
    } catch (error) {
      console.log(error);
      toast("Sorry! We have encountered an error getting all the requests!");
    }
  }

  return (
    <div>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            height: 400,
            overflowY: "scroll",

          }}
        >
          {mail?.map((el) => {
            return (
              <Box
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  minWidth: 300,
                  margin: 2,
                }}
              >
                {el.message_text}
              </Box>
            );
          })}
        </Box>
      </div>
  );
}
