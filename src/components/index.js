import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from 'react-bootstrap/Modal'
import Row from "react-bootstrap/Row";

import ChatBot from 'react-simple-chatbot'



import { Line } from 'react-chartjs-2';

import { observer } from 'mobx-react';

import Maps from './map'


import './styles/main.css'
import chatpic from '../assets/image/chatimg.jpg'




const Analytics = observer(class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://covid19dataset.herokuapp.com/',
            dataset: [],
            case_confirmed: [],
            dates: [],
            state_name: [],
            loading: true,
            imgloading: true,
            deathcount: [],
            showHelp: false,
            showMaps: false,
            chatMessage: 'Help',
            mapMessage: 'Show Map',
            Total_recovered: '',
            Total_deceased: '',
            Recovery_rate: '',
            max_confirmed_date: '',
            stat_message: '',
            detailed_message: '',
            aboutMessage: 'Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus. Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness. '
        }
    }

    getalldata(pgload) {
        var proxyUrl = 'https://cors-anywhere-eu.herokuapp.com/',
        targetUrl = this.state.url
        fetch(targetUrl)
       
            .then(res => res.json())
            .then(
                (result) => {
                    if (Object.keys(result).length > 0 && result.constructor === Object) {
                        if (Object.keys(result['main_data']).length > 0 && result['main_data'].constructor === Object) {

                            console.log(result['main_data']['confirmed_data']['confirmed_max_date'])
                            this.setState({
                                dataset: result['main_data'],
                                case_confirmed: result['main_data']['case_confirmed'],
                                deathcount: result['main_data']['deaths'],
                                dates: result['main_data']['dates'],
                                loading: false,
                                imgloading: false,
                                state_name: result['State_Name'],
                                stat_message: 'As on date ' + result['main_data']['confirmed_data']['confirmed_max_date'] + ' there are ' + result['main_data']['confirmed_data']['totalconfirmed'] + ' confirmed cases',
                                detailed_message: 'As on date ' + result['main_data']['confirmed_data']['confirmed_max_date'] + ' Number of Recovered Cases = ' + result['main_data']['Detailed_data']['totalrecovered'] + ', Number of Deaths =' + result['main_data']['Detailed_data']['totalrecovered'] + ', and Recovery Rate = ' + result['main_data']['recovery_rate']['rate'] + '.'
                            });
                            this.setState({

                                loading: false,
                                imgloading: false,
                            });
                            //console.log(ds)
                        }
                        else {
                            this.setState({
                                dataset: [],
                                case_confirmed: [],
                                loading: false,
                                imgloading: false,
                            });
                        }

                    }
                    else {
                        this.setState({
                            dataset: [],
                            case_confirmed: [],
                            loading: false,
                            imgloading: false,
                        });
                    }
                },
                (error) => {
                    this.setState({
                        dataset: [],
                        case_confirmed: [],
                        loading: false,
                        imgloading: false,
                    });
                }
            )

    }
    get_PageLoadInfo() {

        var steps2 = []
       steps2 = [
            {
                id: '1',
                message: 'Welecome to Covid-19 Automated Information System',
                trigger: '2',
            },

            {
                id: '2',
                message: 'Please tell me your name?',
                trigger: 'name',
            },
            {
                id: 'name',
                user: true,
                trigger: '3'
            },
            {
                id: '3',
                message: 'Hello {previousValue}, tell me what kind of information you need on Covid Today. ',
                trigger: 'options',
            },
            {
                id: 'options',
                options: [
                    { value: 'stats', label: 'stats', trigger: 'stats' },
                    { value: 'about', label: 'About Corona', trigger: 'about' },
                    { value: 'loctaion', label: 'Stats of Your State', trigger: 'end-message' },
                ],
            },
            {
                id: 'stats',
                message: this.state.stat_message,
                trigger: 'further-message',
            },
            {
                id: 'about',
                component: (
                    <a href={'https://www.who.int/health-topics/coronavirus#tab=tab_1'}>For further details please visit Website of WHO at </a>
                ),
                message: this.state.aboutMessage,
                trigger: 'further-message',
            },
            {
                id: 'further-message',
                message: 'Do you want any other information ?',
                trigger: 'otheroptions-message'
            },
            {
                id: 'otheroptions-message',
                message: 'Please select one of below',
                trigger: 'otheroptions'
            },
            {
                id: 'otheroptions',
                options: [
                    { value: 'yes', label: 'Yes', trigger: 'yes' },
                    { value: 'no', label: 'No', trigger: 'end-message' },
                ],
            },
            {
                id: 'yes',
                options: [
                    { value: 'detailstats', label: 'Detail Stats', trigger: 'detailstats' },
                    { value: 'about', label: 'About Corona Testing', trigger: 'about' },
                ],
            },
            {
                id: 'detailstats',
                message: this.state.detailed_message,
                trigger: 'further-message',
            },
            {
                id: 'end-message',
                message: 'Thank you and stay safe and remeber to "Wear Mask and Maintain Social Distancing"!',
                end: true,
            },
        ]
        this.setState({
            steps: steps2
        })
    }
    handleClose = () => this.setState({ showMaps: false, mapMessage: 'Show Map' })
    openHelp() {
        console.log(this.state.stat_message, this.state.max_confirmed_date)
        this.get_PageLoadInfo();

        var showChat = !(this.state.showHelp)
        this.setState({
            showHelp: showChat

        })
        if (showChat === true) {
            this.setState({
                chatMessage: 'Hide Chat'
            })
        }
        else {
            this.setState({
                chatMessage: 'Help'
            })
        }
    }
    openMap() {
        var showMap = !(this.state.showMaps)
        this.setState({
            showMaps: showMap

        })
        if (showMap === true) {
            this.setState({
                mapMessage: 'Hide Map'
            })
        }
        else {
            this.setState({
                mapMessage: 'Show Map'
            })
        }
    }
    componentDidMount() {

        this.getalldata(true)


    }
    render() {
       
        var label_list = this.state.dates
        var case_confirmed = this.state.case_confirmed
        var main_data = this.state.dataset
        var death_counts = this.state.deathcount
        var datamain = {
            labels:
                label_list, datasets: [
                    {
                        label: 'Confirmed Cases of Last 15 Days',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        type: 'bar',
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: case_confirmed,
                        //onAnimationComplete: {
                        onAnimationComplete: function () {

                            var ctx = this.chart.ctx;
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";

                            this.chart.config.data.datasets.forEach(function (dataset) {
                                ctx.fillStyle = dataset.strokeColor;
                                dataset.metaDataset._points.forEach(function (p) {
                                    ctx.fillText(p.value, p.x, p.y - 10);
                                });
                            })
                        }
                        //}
                    }
                ]
        };
        var datadeaths = {
            labels:
                label_list, datasets: [
                    {
                        label: 'Number of Deaths in Last 15 Days',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: ' rgba(229, 2, 148, 1)',
                        borderColor: ' rgba(229, 2, 148, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        type: 'bar',
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: ' rgba(229, 2, 148, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: ' rgba(229, 2, 148, 1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: death_counts,
                        //onAnimationComplete: {
                        onAnimationComplete: function () {

                            var ctx = this.chart.ctx;
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";

                            this.chart.config.data.datasets.forEach(function (dataset) {
                                ctx.fillStyle = dataset.strokeColor;
                                dataset.metaDataset._points.forEach(function (p) {
                                    ctx.fillText(p.value, p.x, p.y - 10);
                                });
                            })
                        }
                        //}
                    }
                ]
        };





        return (

            <Container width="810px" id="Chart">
                <link rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous" />
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={10}>
                        <div style={{ textDecoration: 'underline' }} className="mx-auto"><h2>National Wise Data</h2></div>
                    </Col>
                    <Col xs={1} >

                    </Col>
                </Row>
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={9}>
                    </Col>
                    <Col xs={2} >
                        <img style={{ width: '40px', flex: 1 }}  alt="Have a Chat with our Bot"
                            src={chatpic}
                            onClick={() => this.openHelp()}  //updateFilter is wierd name
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={10}>

                    </Col>
                    <Col xs={1} >

                    </Col>
                </Row>
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={8}>
                        {main_data
                            ? <Container>
                                <Row className="mt-5">
                                    <Col xs={10}>
                                        <button className="chngbuttons" onClick={() => this.openMap()}
                                            aria-controls="example-collapse-text">  {this.state.mapMessage}</button>

                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Col xs={10}>
                                        <Line data={datamain} />
                                    </Col>

                                </Row>
                            </Container>
                            /*:<img src={loaderImg}></img> */
                            : <span>No Data Availablet</span>
                        }

                    </Col>
                    <Col xs={3} >
                        {this.state.showHelp === true
                            ?
                            <div>
                                <ChatBot
                                    steps={this.state.steps}

                                />
                            </div> :
                            ''
                        }

                    </Col>
                </Row>
                <Row>
                    <Col xs={1}  >

                    </Col>
                    <Col xs={10}>
                        {main_data
                            ? <Container>
                                <Row className="mt-5">

                                </Row>
                                <Row className="mt-5">
                                    <Col xs={10}>
                                        <Line data={datadeaths} />
                                    </Col>

                                </Row>
                            </Container>
                            /*:<img src={loaderImg}></img> */
                            : <span>No Data Available</span>
                        }

                    </Col>
                    <Col xs={1} >

                    </Col>
                </Row>
                <Modal size="lg" style={{ height: 'auto' }} show={this.state.showMaps} onHide={this.handleClose} centered>

                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>

                        <Maps />



                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>

                </Modal>
            </Container>
        );
    }
});


export default Analytics