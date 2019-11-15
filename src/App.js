import React from 'react';
import './App.css';

const test = [
  generateDummyTest('commas are rotated properly'),
  generateDummyTest('exclamation points stand up straight'),
  generateDummyTest("run-on sentences don't run forever"),
  generateDummyTest('question marks curl down, not up'),
  generateDummyTest('semicolons are adequately waterproof'),
  generateDummyTest('capital letters can do yoga'),
];

function generateDummyTest(description){
  const delay = 7000 + Math.random() * 7000;
  const testPassed = Math.random() > 0.5;

  return {
    description,
    run(callback) {
      setTimeout(() => {
        callback(testPassed);
      }, delay);
    },
  };
}
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      testResults: test.map((element) => {
        let obj = {};
        obj['testMethod'] = element;
        obj['result'] = ''
        return obj;
      })
    }
  }



  handleClickTest = () => {
    let results = JSON.parse(JSON.stringify(this.state.testResults));
    let final = results.map((element, index) => {
      element.result = test[index].run((testPassed) => {
        let r = results.map( (e, i)=> {
          if(index === i) {
            e.result = 'running';
          }
          return e;
        })
        this.setState({testResults: r});
        return testPassed ? 'passed': 'failed';
      });
      console.log(element.result);
      return element;
    });
    console.log(final);
    this.setState({testResults: final});
  }

  renderResult = () => {
    let results = JSON.parse(JSON.stringify(this.state.testResults));
  
    return results.map((e ,index)=> {

      return(
        <div key={index}>
          <div>{e.testMethod.description}</div>
          <div>{e.result}</div>
        </div>
      );
    });
  }
  

  render() {
    
    return (
      <div className="App">
        <h1>Pill Club Interview</h1>
        <button className="test-button" onClick={() => this.handleClickTest()}>Start Tests</button>
        {
          this.renderResult()
        }
      </div>
    );
  }
}

export default App;
