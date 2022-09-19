import React from 'react';
import * as sortingAlgorithms from "../SortingAlgos/sortingAlgorithms.js";
import "./SortingVisualizer.css";

const ANIMATION_SPEED = 4;
const COMPLETE_COLOR = "#2EB086";
const DEFAULT_COLOR = "black";
const COMPARE_COLOR = "#B8405E";

export default class SortingVisulizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            value: 0,
        }
    }

    componentDidMount(){
        this.resetArray();
    }

    //creats an new random array based on screen size
    resetArray() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        const array = [];
        
        // creating size and height of array, based on screen size
        if(window.innerHeight>616){
            for (let i = 0; i<w/17;i++){
                array.push(getRandomIntRange(5,h*.8));
            }
        }else{
            for (let i = 0; i<w/17;i++){
                array.push(getRandomIntRange(5,h*.6));
            }
        }

        //setting the block colors back to black
        for(let i=0;i<this.state.array.length;i++){
                document.getElementsByClassName("array-bar")[i].style.backgroundColor = DEFAULT_COLOR;
        }

        const extraSpaceSides = w-(this.state.array.length)*15;
        this.setState({array,extraSpaceSides});
    }

    //makes the finished array a given color
    makeAllOneColor(){
        for(let i=0;i<this.state.array.length;i++){
            setTimeout(() => {
                document.getElementsByClassName("array-bar")[i].style.backgroundColor = COMPLETE_COLOR;
            }, i*ANIMATION_SPEED);
        }
    }

    //Animating bubble sort
    bubbleSort(){
        const animations = sortingAlgorithms.bubbleSort(this.state.array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for(let i=0;i<animations.length;i++){
            if(i%3!==2){
                const [firstBar, secondBar] = animations[i];
                const firstBarStyle = arrayBars[firstBar].style;
                const secondBarStyle = arrayBars[secondBar].style;
                let color = i%3===0 ? "red" : "black";
                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED);
            }else{
                setTimeout(() => {
                    const [firstIdx, firstValue,secondIdx,secondValue] = animations[i];
                    if(firstIdx>=0){
                        arrayBars[firstIdx].style.height = (`${firstValue}px`);
                        arrayBars[secondIdx].style.height = (`${secondValue}px`);
                    }
                }, i*ANIMATION_SPEED);
            }
            setTimeout(() => {
                if(i===animations.length-1) this.makeAllOneColor();
            }, i*ANIMATION_SPEED);
        }
    }
    
    //Animating merge sort
    mergeSort(){
        const animations = sortingAlgorithms.getAnimations(this.state.array);
        const normalColor = DEFAULT_COLOR;
        const switchColor = COMPARE_COLOR;
        const arrayBars = document.getElementsByClassName("array-bar");
        for(let i=0;i<animations.length;i++){
            if(i % 3 !== 2){
                const [firstBar, secondBar] = animations[i];
                const firstBarStyle = arrayBars[firstBar].style;
                const secondBarStyle = arrayBars[secondBar].style;
                let color = i%3===0 ? switchColor : normalColor;
                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED);
            } else{
                setTimeout(() => {
                    const [indexChange,height] = animations[i]
                    const changeBar = arrayBars[indexChange].style;
                    changeBar.height = `${height}px`;
                }, i*ANIMATION_SPEED);
            }
            setTimeout(() => {
                if(i===animations.length-1) this.makeAllOneColor();
            }, i*ANIMATION_SPEED);
        }
        
    }

    //Animating quick sort
    quickSort(){
        const animations = sortingAlgorithms.getAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName("array-bar");
        for(let i=0;i<animations.length;i++){
            if(i%3!==2){
                const [firstBar, secondBar] = animations[i];
                const firstBarStyle = arrayBars[firstBar].style;
                const secondBarStyle = arrayBars[secondBar].style;
                let color = i%3===0 ? COMPARE_COLOR : DEFAULT_COLOR;
                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, i*ANIMATION_SPEED);
            }else{
                setTimeout(() => {
                    if(animations[i[0]]!==-1){
                        // eslint-disable-next-line
                        const [firstIdx, firstValue,secondIdx,secondValue] = animations[i];
                        arrayBars[firstIdx].style.height = (`${firstValue}px`);
                    }
                }, i*ANIMATION_SPEED);
            }
            setTimeout(() => {
                if(i===animations.length-1) this.makeAllOneColor();
            }, i*ANIMATION_SPEED);
        }
    }

    //used for testing functions
    run100TestsMergeSort() {
        for(let i=0;i<3;i++){
            this.mergeSort();
            this.resetArray();
        }
    }

    render () {
        const {array} = this.state;
        return (
            <div>
                <div class="header">
                        <button onClick={() => this.resetArray()}>Create a new random array</button>
                        <button onClick={()=> this.quickSort()}>Start Quick Sort</button>
                        <button onClick={()=> this.mergeSort()}>Start Merge Sort</button>
                        <button onClick={()=> this.bubbleSort()}>Start Bubble Sort</button>
                </div>
                <div className="array-container"
                style={{left: `${this.state.extraSpaceSides/2}px`,}}
                >
                    {array.map((value, idx) => (
                        <div className="array-bar"
                        key={idx}
                        style={{height: `${value}px`,
                        width: "14px",
                        backgroundColor: DEFAULT_COLOR}}>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

//gets an random int within a range
function getRandomIntRange(min,max) {
    return Math.floor(Math.random() * (max-min+1)+min);
  }

//checks if arrays are equal (for testing)
// eslint-disable-next-line
function checkArraysEqual(first,second){
    if(first.length !== second.length) return false;
    for(let i=0; i<first.length; i++){
        if(first[i]!==second[i])return false;
    }
    return true;
}