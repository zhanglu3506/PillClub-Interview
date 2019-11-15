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
        obj['result'] = 'Not Started Yet'
        return obj;
      }),
      isFinished: 0,
      isPassed: 0,
      isFailed: 0
    }
  }

  handleClickTest = () => {
    test.forEach((e, index) =>{
      e.run((testPassed) => {
        _helperSetState(index);
        _helperSetState(testPassed, index);
      });   
    });

    let _helperSetState = (testPassed, index) => {
      let display = typeof testPassed === 'boolean' ? (testPassed ? 'passed': 'failed') : 'running';

      let results = JSON.parse(JSON.stringify(this.state.testResults));
      let r = results.map((e, i) => {
        if(index === i) {
          console.log( index + '  '+ display);
          e.result = display;
          if(display !== 'running') {
            let finished = this.state.isFinished;
            this.setState({isFinished: finished + 1});
            if(display === 'passed') {
              let passed = this.state.isPassed;
              this.setState({isPassed: passed + 1});
            } else{
              let failed = this.state.isFailed;
              this.setState({isFailed: failed + 1});
            }
          }
        }
        return e;
      });
      this.setState({testResults: r});
    };
  }

  renderResult = () => {
    let results = JSON.parse(JSON.stringify(this.state.testResults));
    // results.sort((a, b)=>{
    //   if()
    // });
    return results.map((e ,index)=> {
      return(
        <div key={index} className="result-table">
          <div className="result-name">{e.testMethod.description}</div>
          <div className="result-status">{e.result}</div>
        </div>
      );
    });
  }
  

  render() {
    let {isFinished, isFailed, isPassed} = this.state;
    console.log(isFinished);
    return (
      <div className="App">
        <h1>Pill Club Interview</h1>
        <button className="test-button" onClick={() => this.handleClickTest()}>Start Tests</button>
        {this.renderResult()}
        { isPassed === 0 ? null : <span>Is Passed: {isPassed}</span>}
        <br></br>
        { isFailed === 0 ? null : <span>Is Failed: {isFailed}</span>}
        <br></br>     
        { isFinished === test.length ? <p>FINISHED!</p> : null}
      </div>
    );
  }
}

export default App;
