import React,{useEffect, useState} from "react";
import CreateBoard from "../util/CreateBoard";
import Cell from "./Cell";
import { revealed } from "../util/Reveal";
import Modal from "./Modal";
import Timer from "./Timer";

const Board =()=>{
    //creating the board as a grid ie.2d array initialy empty
    const [grid, setGrid] = useState([]);

    //no of non mines on the board
    const [nonMineCount,setnonMineCount] = useState(0)
    const [mineLocations,setMineLocation] = useState([])
    const [gameover,setGameover] = useState(false)
    //componentDidMount
    useEffect(()=>{
        //function to create the fresh board on render
        
        //calls create board component
        freshBoard();
    },[])
    const freshBoard =()=>{
        const newBoard = CreateBoard(10,15,15);
        setnonMineCount(10*15-15)
        setMineLocation(newBoard.mineLocation)
        console.log(newBoard)
        //seting the state as board returned by the createboard comp
        setGrid(newBoard.board);
    }

    const restartGame=()=>{
        freshBoard()
        setGameover(false)
    }

    //right click flag functionality flag a cell
    //callback function
    const updateFlag = (e,x,y)=>{
        //to prevent default right click menu appearance
        e.preventDefault();
        //creates a deep copy of state- grid of array of objects
        //it will prevent to mess with state grid
        //it will reassgin the state by transforming grid into js object
        let newGrid = JSON.parse(JSON.stringify(grid))
        console.log(newGrid[x][y])
        //set the flagged to true as we clicked right
        newGrid[x][y].flagged  = true
        setGrid(newGrid)
    }
    //reveal the cell function 
    const revealCell = (x,y)=>{
        if(grid[x][y].revealed || gameover){
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid))
        //alert if we clicked a mine
        if(newGrid[x][y].value==='X'){
            
            for(let i =0;i<mineLocations.length;i++){
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true 
            }
            setGrid(newGrid)
            setGameover(true)
        }
        else{ 
            //calling the revealed function from Reveal.js util comp
            let newRevealedBoard = revealed(newGrid,x,y,nonMineCount)
            //revealing the cell
            newGrid[x][y].revealed =true;
            //changing the state now
            setGrid(newRevealedBoard.arr)
            setnonMineCount(newRevealedBoard.newNonMinesCount)
            if(newRevealedBoard.newNonMinesCount===0)
                setGameover(true)
        }
        
    }
    
    //map function to return the numbers and mines of board
    //and to apply required css(flex) when we return 
    //first map function for rows
    //second for each element in each row
    return(
        <div>
            <p>Minesweeper</p>
            <Timer/>
            <div style={{display:"flex",
                        alignItems:"center",
                        position:'relative',
                        flexDirection: "column"}}>
            {gameover && <Modal restartGame={restartGame}/>}                
            { grid.map((singleRow,index1)=>{
        //each row
        return(
            <div style={{display: "flex"}} key = {index1}>
                {singleRow.map((singleBlock,index2)=>{
                    return (
                        //each cell
                        <Cell   revealCell={revealCell}
                                details={singleBlock}
                                updateFlag={updateFlag} key = {index2}/>
                    )
                })}
            </div>
        )
    })}
            </div>
        </div>

    )
    
}
export default Board;