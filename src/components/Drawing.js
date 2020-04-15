import React, { useRef, useState, Fragment } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SwatchesPicker } from 'react-color'
class Drawing extends React.Component {


  constructor() {
    super()

    this.state = {
      corpse: {


      },
      click: false,
      color: 'black',
      brushShape: 'rect',
      brushH: 4,
      brushW: 4,
      circle: 8,
      image: '',
      fill: false,
      straight: false,
      new: {
        first: 'first',
        second: 'second',
        third: 'third'
      }

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.draw = this.draw.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.increaseB = this.increaseB.bind(this)
    this.decreaseB = this.decreaseB.bind(this)
    this.submit = this.submit.bind(this)
    this.newGame = this.newGame.bind(this)
    this.clear = this.clear.bind(this)
    this.toggleFill = this.toggleFill.bind(this)
    this.fill = this.fill.bind(this)
    this.toggleStraight = this.toggleStraight.bind(this)
    this.keyUp = this.keyUp.bind(this)
    this.keyDown = this.keyDown.bind(this)


  }


  componentDidMount() {
    axios.get(`/api/drawings/${this.props.match.params.id}`)
      .then(res => this.setState({corpse: res.data}))




      }




  componentDidUpdate(prevProps){
    if (this.props.match.params.id !== prevProps.match.params.id) {
      axios.get(`/api/drawings/${this.props.match.params.id}`)
        .then(res => this.setState({corpse: res.data}))
    }

  }

  mouseUp(e){



  }

  mouseDown(e){


      }





  newGame(e){
    e.preventDefault()
    axios.post('/api/drawings', this.state.new)
      .then(res  => this.props.history.push(`/corpse/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }))

  }

  clear(){

  }

  draw(e){

  }

  submit(e){

    let canvas, ctx
    if(this.state.corpse.first ==='first'){
      canvas = document.getElementById('first')
      ctx = canvas.getContext('2d')
      const image = canvas.toDataURL()
      const corpse = {...this.state.corpse}
      corpse.first = image
      delete corpse.id
      this.setState({corpse: corpse})
      axios.put(`/api/drawings/${this.props.match.params.id}`, corpse)
        .then(res => console.log(res))


    } else if(this.state.corpse.second ==='second'){
      canvas = document.getElementById('second')
      ctx = canvas.getContext('2d')
      const image = canvas.toDataURL()
      const corpse = {...this.state.corpse}
      corpse.second = image
      delete corpse.id
      this.setState({corpse: corpse})
      axios.put(`/api/drawings/${this.props.match.params.id}`, corpse)
        .then(res => console.log(res))

    } else if(this.state.corpse.third ==='third'){
      canvas = document.getElementById('third')
      ctx = canvas.getContext('2d')
      const image = canvas.toDataURL()
      const corpse = {...this.state.corpse}
      corpse.third = image
      delete corpse.id
      this.setState({corpse: corpse})
      axios.put(`/api/drawings/${this.props.match.params.id}`, corpse)
        .then(res => console.log(res))





    }

  }

  handleChangeComplete(color){
    this.setState({ color: color.hex })
    console.log(color.hex)
  }

  increaseB(e){


  }

  decreaseB(e){

  }
  toggleFill(){

  }

  toggleStraight(){

  }

  keyDown(e){

  }

  keyUp(e){



  }

  fill(e){

  }





  render(){


    return(

      <div className='container'
        tabIndex="0">
        <div className='columns is-multiline'>

          <div className='column is-4 side'>
            <SwatchesPicker onChangeComplete={ this.handleChangeComplete }/>
            </div>
              <div className='column'>

                <div className='clear'  onClick={this.clear}>
                CLEAR
                </div>

                <div className='submit' onClick={this.submit}>
                SUBMIT
                </div>

                <div className='new' onClick={this.newGame}>
                New Game

              </div>
            </div>
          </div>


          <div className='column main'>
            <div className='board'>
              {this.state.corpse && this.state.corpse.first ==='first' && this.state.corpse.third ==='third' && <Canvas>   </Canvas>}

              {this.state.corpse.first !=='first' && this.state.corpse.third ==='third' && <img src={this.state.corpse.first} className={'firstImage '  +  (this.state.corpse.second!=='second' ? 'blur' : '') +  (this.state.corpse.second==='second' ? 'clip' : '')}/>}

              {this.state.corpse && this.state.corpse.second ==='second' && this.state.corpse.first !=='first' && this.state.corpse.third ==='third' && <Canvas  className='second' id='second' width={640} height={240} onMouseMove={this.draw} onTouchMove={this.draw} onClick={this.fill}> </Canvas>}

              {this.state.corpse.second !=='second' && this.state.corpse.third ==='third' && <img src={this.state.corpse.second} className={'secondImage'}/>}

              {this.state.corpse && this.state.corpse.third ==='third' && this.state.corpse.first !=='first' && this.state.corpse.second !=='second' && <Canvas  className='third' id='third' width={640} height={240} onMouseMove={this.draw} onTouchMove={this.draw} onClick={this.fill}> </Canvas>}

              {this.state.corpse.third !=='third' && <canvas  className='final' id='final' width={640} height={720} > </canvas>}
            </div>


          </div>
        </div>



    )
  }
}
export default Drawing
