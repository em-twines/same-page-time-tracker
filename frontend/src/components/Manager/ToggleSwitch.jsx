import React, { Component, useState, useEffect } from "react";
import Switch from "react-switch";

export default function ToggleSwitch({toggle, setToggle, element}) {

    const [checked, setChecked] = useState(toggle)

    // onTintColor= '#41B3A3' tintColor='#41B3A3'

    return (
    <div >
    <label >
        <Switch     
        onColor = '#41B3A3'
        offColor = '#C38D9E'
           checked={element.is_manager} onChange={(event)=>setToggle(event,element)}/>
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

