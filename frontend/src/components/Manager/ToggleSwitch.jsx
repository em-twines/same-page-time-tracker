import React, { Component, useState } from "react";
import Switch from "react-switch";
import "react-toggle/style.css" 


export default function ToggleSwitch({toggle, setToggle, element}) {

    const [checked, setChecked] = useState(toggle)

  return (
    <div>
    <label>
        <Switch checked={element.is_manager} onChange={(event)=>setToggle(event,element)}/>
      </label>
    </div>
  )
}


// class ToggleSwitch extends Component {
//   constructor() {
//     super();
//     this.state ={ checked: false };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(checked) {
//     this.setState({ checked });
//   }

