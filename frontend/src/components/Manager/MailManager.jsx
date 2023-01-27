import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export default function MailManager({ requests }) {
  const [mail, setMail] = useState([]);
  const [user, token] = useAuth();
  const [pendingRequests, setPendingRequests] = useState([]);

  function setMailbox() {
    let pending = [];
    if (requests.length > 0) {
      requests.map((el) => {
        if (el.request_for_pto.is_pending === true) {
          pending.push(el.request_for_pto);
        }
        return pending;
      });
      console.log(pending);
      setPendingRequests(pending);
    }
  }

  useEffect(() => {
    setMailbox();
  }, []);

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
        {pendingRequests?.map((el) => {
        //   return el.map((element) => {
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
                key = {el.id}
              >
                {" "}
                {el.request_text}
              </Box>
            );
        //   });
        })}
      </Box>
    </div>
  );
}
