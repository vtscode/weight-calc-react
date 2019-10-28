import React from 'react';
// import logo from './logo.svg';
import './App.css';

class BMICalculator {
  bmi(length, weight) {
    return weight / length*length;
  }
}

class Controller {
  saveToDatabase() {
    
  }
  
  calculateBMI(length, weight) {
    let bmi = new BMICalculator();
    return bmi.bmi(length, weight);
  }
}

var controller = new Controller();

class MinMaxField extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
        error: "",
        value: null
     }
     this.handleChange = this.handleChange.bind(this);
   }
   render() {
      return (
        <div>
         <input name="{this.props.name}" type="text" onBlur={this.handleChange} /><br/>
         <div className="error">{this.state.error}</div></div>  
      );
   }
   handleChange(event) {
     this.setState({value: event.target.value});
     this.props.inError(this.checkBusinessRule(event.target.value));
     if (!this.checkBusinessRule(event.target.value)) {
       this.props.onValue(this.props.name, event.target.value);
     }
   }
   checkBusinessRule(value) {
     let temp = parseInt(value);
     if (isNaN(temp) || temp < this.props.min || temp > this.props.max) {
        this.setState({error: "Waarde moet een getal zijn tussen " + this.props.min + " en "
        + this.props.max});
        return true;
     } else {
       this.setState({error: ""});
       return false; 
     }
   }
}

class BMIFormulier extends React.Component {
   constructor(props) {
     super(props);
     this.state = { inError: true };
     this.inError = this.inError.bind(this);
     this.onValue = this.onValue.bind(this);
     this.onClickBereken = this.onClickBereken.bind(this);
   }
   
   inError(value) {
     this.setState({inError:value});
     
   }
   
   onValue(name, value) {
     let state = {};
     state[name] = value;
     this.setState(state);
   }

   render() {
      return (
        <div>
         <fieldset>
            <legend>BMI calculator</legend>
               <label>Leeftijd</label><MinMaxField value="" min="18" max="125" name="age" inError={this.inError} onValue={this.onValue}/>
               <label>Lengte</label><MinMaxField value="" min="130" max="270" name="length" onValue={this.onValue}  inError={this.inError} />
               <label>Gewicht (kg)</label><MinMaxField value="" min="40" max="300" name="weight" onValue={this.onValue}  inError={this.inError} />
         </fieldset><br/>
        <button disabled={this.state.inError} onClick={this.onClickBereken}>Bereken</button></div>
        );
    }
    
    onClickBereken() {
      console.log(controller.calculateBMI(this.state.length, this.state.weight));
    }
}

export default BMIFormulier;
