import React, { useState, useEffect , useRef} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import MessageManager from "./MessageManager";
import moment from "moment";

export default function MailManager({
  requests,
  decision,
  stateChanger
  // defaultMessage,
  // setDefaultMesssage,
}) {
  // const [mail, setMail] = useState([]);
  // const [user, token] = useAuth();
  // const [pending, setPending] = useState([]);
  // const [senders, setSenders] = useState([]);
  const [combinedMessage, setCombinedMessage] = useState([]);
  const [newRenderer, setNewRenderer] = useState(false);
  // const [convertedSubmissionTime, setConvertedSubmissionTime] = useState();
  const previousStateChangerValue = useRef(stateChanger);



  const merge = (arr1, arr2) =>
    (arr1.length > arr2.length ? arr1 : arr2)
      .map((_, i) => [arr1[i], arr2[i]])
      .flat()
      .filter(Boolean);



  function setMailbox() {
    console.log('mailbox function running')
    console.log('stateChanger in setMailbox', stateChanger)
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
    console.log('combined', combined)
  }

  useEffect(() => {
    console.log('stateChanger before setMailbox', stateChanger);
    setMailbox();
    // console.log('combined Message in useEffect', combinedMessage)
    console.log('statechanger', stateChanger, Object.values({stateChanger})[0]);
  }, [requests]);

//if I include decision a dependency:
  //undefined => false = nothing
  //false => true = change
  //false=>false = nothing


// useEffect(() => {
//  setNewRenderer(true);
// }, [combinedMessage])


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
        
        {console.log('combinedMessages in return', combinedMessage)}
        {combinedMessage?.map((el, i) => {
          
          return (

              <div key = {i}>
                {i%2 === 0 ? (
                  <div >
                    <br></br>
                  <p style = {{fontSize: '1rem'}}>{el.first_name} {el.last_name}</p>
                  </div>
                ) : ( 
                  <div>
                    <p style = {{fontSize: '.9rem'}}>{el.request_text}</p>
                    <p style = {{fontSize: '.8rem'}}>{
                    moment(el.submission_time, "YYYY-MM-DD HH:mm").format('MM/DD/YY hh:mm a')}</p>
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
