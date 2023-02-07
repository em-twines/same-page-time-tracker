import React from 'react';
// import states from './states.json';
import states from './Manager/States.json'
import PropTypes from 'prop-types';

class SelectUsStateNew extends React.Component {

  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <select id={this.props.id} className={this.props.className} onChange={this._handleChange}>
        {states.map(item => <option key={item.abbreviation} value={item.abbreviation} defaultValue="--" >{item.name}</option>)}
      </select>
    );
  }
}

const propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

SelectUsStateNew.propTypes = propTypes;

export default SelectUsStateNew;