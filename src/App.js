import React, { Component } from 'react';
import { Button, Col, Container, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      input : '',
      members:[],
      count: ''
    }
  }

  funcAllDel = () => {
    this.setState({
      input : '',
      members:[],
      count: ''
    });
  }

  funcAdd = () => {
    const name = this.state.input;
    this.state.members = [
      ...this.state.members,
      {
        name : name,
        val : 0
      } 
    ]
    this.setState({
      input : ''
    })
  }

  funcDel = (a,i) => {
    let list = this.state.members
    list.splice(i, 1);
    this.setState({
      members: list
    })
  }

  funcChange = (e) =>{
    this.setState({
      input : e.target.value
    });
  }
  
  funcEnter = (e) => {
    const name = e.target.value;
    if(e.keyCode === 13){
      this.state.members = [
        ...this.state.members,
        {
          name : name,
          val : 0
        }
      ]
      this.setState({
        input : ''
      })
    }
    if(!e.keyCode === 13){
      this.setState({
        input : e.target.value
      });
    }
  }

  funcCountChange = (e) =>{
    let cnt = String(e.target.value);
    const regex = /[^0-9]/g;				// 숫자가 아닌 문자열을 선택하는 정규식
    const result = cnt.replace(regex, "");
    cnt = Number(result);
    
    this.setState({
      count : cnt
    });
  }


  funcCalc = () => {
    let members = this.state.members;
    let count = this.state.count;
    let rm = [];
    // List<String> members, int count;
		// Map<String, Integer> rm = new HashMap<String, Integer>();

		let limit = (members.length / count);
    let lml = []
		for(let i=0; i<count; i++){
      lml[i] = 0;
    }

		
		let alc = 0;
		let lll = [];
		let ch = true;
		for (let i = 0; i < members.length; i++) {
			alc = Number(Math.floor(Math.random() * count + 1));
			if (lml[alc - 1] === limit) {
				if (rm.length === members.length) {
					return false;
				} else {
					let chk = 0;
					for (let j = 0; j < lml.length; j++) {
						if (lml[j] === limit) {
							chk++;
						}
					}
					if (chk === lml.length) {
						if ((members.length - rm.length) > 0) {
							alc = Number(Math.floor(Math.random() * count + 1));
							if (lll[alc - 1] < 1) {
								ch = false;
								lll[alc - 1] = lll[alc - 1] + 1;
                rm = [
                  ...rm,
                  { name: members[i].name, val : alc}
                ]
								// rm.put(members.get(i), alc);
							}else{i--;continue;}
						}
					} else {
						i--;
						continue;
					}
				}
			}
			if (ch) {
				lml[alc - 1] = lml[alc - 1] + 1;
				// rm.put(members.get(i), alc);
        rm = [
          ...rm,
          { name: members[i].name, val : alc}
        ]
			}
		}
    rm.sort(function(a,b){
      return a.val - b.val;
    });
    this.setState({
      members : rm
    })
		// return rm;
	}

  render() {

    console.log(this.state)
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            <h1>Team Maker V.1.0</h1>
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>이름 | 개수</InputGroup.Text>
            </InputGroup.Prepend>
              <FormControl
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                id = "name"
                value = {this.state && this.state.input}
                onChange = {(e)=>{this.funcChange(e)}}
                onKeyDown = {(e)=>{this.funcEnter(e)}}
              />
              <FormControl 
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                id = "count"
                value = {(this.state.count===0)?'':this.state && this.state.count}
                onChange = {(e)=>{this.funcCountChange(e)}}
                // onKeyDown = {(e)=>{this.funcCountKey(e)}}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick = {()=>{this.funcAdd()}}>등록</Button>
                <Button variant="danger" onClick = {()=>{this.funcAllDel()}}>Reset</Button>
                <Button onClick = {()=>{this.funcCalc()}}>계산</Button>
              </InputGroup.Append>
            </InputGroup>

          </Col>
        </Row>
        <Row>
        <Col xs lg="6">
        {
          this.state.members!=null && Array.isArray(this.state.members) && this.state.members.length > 0
          ?
          this.state.members.map((a,i,v)=>{
            return(
              <ListGroup key ={i} defaultActiveKey="#link1">
              <ListGroup.Item action onClick={()=>{this.funcDel(a, i)}}>
              {a.name},{a.val}
              </ListGroup.Item>
              </ListGroup>
            );
          })
          :
          ''
        }
        </Col>
        </Row>

      </Container>
    );
  }
}

export default App;
