import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { getProfessorInstructions } from './ProfessorApi'; // You need to implement this function to fetch data from your backend API

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ProfessorInstructionsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professorData: []
        };
    }

    componentDidMount() {
        // Fetch professor data from backend API
        getProfessorInstructions()
            .then(data => {
                this.setState({ professorData: data });
            })
            .catch(error => {
                console.error('Error fetching professor data: ', error);
            });
    }

    render() {
        const { professorData } = this.state;

        const options = {
            title: {
                text: "Professor Instructions Chart"
            },
            data: [
                {
                    type: "column",
                    dataPoints: professorData.map(professor => ({
                        label: `${professor.name} ${professor.surname}`,
                        y: professor.countInstructions
                    }))
                }
            ]
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default ProfessorInstructionsChart;
