import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

let imgData = require('../public/date/data.json');

let imgArr = ((imgData) => {
    for (let i = 0; i < imgData.length; i ++) {
        imgData[i].path = require('../public/images/' + imgData[i]['filename']);
    }
    return imgData;
})(imgData);


class App extends Component {
    constructor (props) {
        super(props);

    }

    componentDidMount () {
        let wrapper = this.refs.wrapper;
        let next = this.refs.next;
        let prev = this.refs.prev;
        let index = 0;
        let timer;
        timer = setInterval(() => {
            if (index === 4) {
                index = 0;
            }
            wrapper.style['transform'] = 'translate3d(-' + 640 * index  + 'px, 0px, 0px)';
            index ++;
        }, 1500);

        wrapper.addEventListener('mouseover', (e) => {
            e.preventDefault();
            clearInterval(timer);
        });
        wrapper.addEventListener('mouseout', (e) => {
            e.preventDefault();
            timer = setInterval(() => {
                if (index === 4) {
                    index = 0;
                }
                wrapper.style['transform'] = 'translate3d(-' + 640 * index  + 'px, 0px, 0px)';
                index ++;
            }, 1500);
        });

        next.addEventListener('click', (e) => {
            e.preventDefault();
            if (index === 4) {
                index = 0;
            }
            wrapper.style['transform'] = 'translate3d(-' + 640 * index  + 'px, 0px, 0px)';
            index ++;
        });
        prev.addEventListener('click', (e) => {
            e.preventDefault();
            if (index === 0) {
                index = 4;
            }
            wrapper.style['transform'] = 'translate3d(-' + 640 * index  + 'px, 0px, 0px)';
            index --;
        });
    }

    render() {

        let imgNode = [];

        imgArr.forEach((value, index) => {
            imgNode.push(
                <img src={value.path} key={index} className="slider-item"/>
            )
        });

        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="slider">
                    <div className="slider-wrapper" ref="wrapper">
                        {imgNode}
                    </div>
                    <div className="prev btn" ref="prev">{'<'}</div>
                    <div className="next btn" ref="next">{'>'}</div>
                </div>
            </div>
        );
    }
}

export default App;
