import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import MessageManager from "./MessageManager";
import moment from "moment";

export default function MailManager({
  requests,
  // defaultMessage,
  // setDefaultMesssage,
}) {
  // const [mail, setMail] = useState([]);
  // const [user, token] = useAuth();
  // const [pendingRequests, setPendingRequests] = useState([]);
  // const [senders, setSenders] = useState([]);
  const [combinedMessage, setCombinedMessage] = useState([]);
  // const [convertedSubmissionTime, setConvertedSubmissionTime] = useState();




  const merge = (arr1, arr2) =>
    (arr1.length > arr2.length ? arr1 : arr2)
      .map((_, i) => [arr1[i], arr2[i]])
      .flat()
      .filter(Boolean);

  function setMailbox() {
    let pending = [];
    let senders = [];
    if (requests.length > 0) {
      requests.map((el) => {
        if (el.request_for_pto.is_pending === true) {
          pending.push(el.request_for_pto);
          senders.push(el.user);
        }
        return pending, senders;
      });


    }
    let combined = merge(senders, pending);
    setCombinedMessage(combined);
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
        {" "}
        Inbox
        <br></br>
        <hr></hr>
        

        {combinedMessage?.map((el, i) => {

          return (
            // <Box
            //   sx={{
            //     bgcolor: "background.paper",
            //     boxShadow: 1,
            //     borderRadius: 2,
            //     p: 2,
            //     minWidth: 300,
            //     margin: 2,
            //   }}
            //   key={el.id}
            // >
              // {" "}
              <div>
                {i%2 === 0 ? (
                  <div>
                     <br></br>
                  <p style = {{fontSize: '1rem'}}>{el.first_name} {el.last_name}</p>
                  </div>
                ) : ( 
                  <div>
                    <p style = {{fontSize: '.9rem'}}>{el.request_text}</p>
                    <p style = {{fontSize: '.8rem'}}>{
                    moment(el.submission_time, "YYYY-MM-DD hh:mm").format('MM/DD/YY h:mm A')}</p>
                    {/* <p style = {{fontSize: '.8rem'}}>{el.submission_time}</p> */}
                    <br></br>
                    <hr></hr>

                  </div>
                )}
              </div>
            // </Box>
          );
        })}
      </Box>{" "}
    </div>
  );
}
