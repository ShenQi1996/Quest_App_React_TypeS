import React from "react"

//Bootstrap
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"

//Style
import "../style/BackDrop.css";

type Props = {
    difficulty: string;
    totalQuestions: number;
}
const BackDrop: React.FC<Props> = ({difficulty, totalQuestions}) => {
    return (
        <div className="container1">
            <span className="sliding">
                <span>Difficulty Level:</span>
                <span>  {difficulty}</span>
                <span> - </span>
                <span>Total Number of Questions:</span>
                <span>  {totalQuestions}</span>
            </span>
            <div className="wrapper">
            <span className="sliding2">
                <span>Difficulty Level:</span>
                <span>  {difficulty}</span>
                <span> - </span>
                <span>Total Number of Questions:</span>
                <span>  {totalQuestions}</span>
            </span>
            </div>
        </div>
    )
}


export default BackDrop;