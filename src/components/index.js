import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
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
import loaderImg from "../assets/image/loader2.gif";




const Analytics = observer(class Analytics extends React.Component {
    constructor(props) {
        super(props);
        this.get_PageLoadInfo = this.get_PageLoadInfo.bind(this)
        this.setdata = this.setdata.bind(this)
        this.state = {
            url: 'http://127.0.0.1:5000/',
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
            Recovery_rate: '',
            max_confirmed_date: '',
            stat_message: '',
            detailed_message: '',
            aboutMessage: 'Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus. Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness. ',
            stateName: '',
            state_data: [],
            state_stats: [],
            showstats: "none",
            active: "Not Available",
            confirmed: "Not Available",
            deaths: "Not Available",
            deltaconfirmed: "Not Available",
            deltadeaths: "Not Available",
            deltarecovered: "Not Available",
            lastupdatedtime: "Not Available",
            migratedother: "Not Available",
            recovered: "Not Available",
            stats_message: "Not Available",
            tot_stats: "Not Available",
            tot_date: "Not Available",
            errorMessage: "",
        }
    }

    getalldata(pgload) {
        fetch(this.state.url)

            .then(res => res.json())
            .then(
                (result) => {
                    if (Object.keys(result).length > 0 && result.constructor === Object) {
                        if (Object.keys(result['main_data']).length > 0 && result['main_data'].constructor === Object) {
                            this.setState({
                                dataset: result['main_data'],
                                case_confirmed: result['main_data']['case_confirmed'],
                                deathcount: result['main_data']['deaths'],
                                dates: result['main_data']['dates'],
                                loading: false,
                                imgloading: false,
                                state_name: result['State_Name'],
                                stat_message: 'As on date ' + result['main_data']['confirmed_data']['confirmed_max_date'] + ' there are ' + result['main_data']['confirmed_data']['totalconfirmed'] + ' confirmed cases',
                                detailed_message: 'As on date ' + result['main_data']['confirmed_data']['confirmed_max_date'] + ' Number of Recovered Cases = ' + result['main_data']['Detailed_data']['totalrecovered'] + ', Number of Deaths =' + result['main_data']['Detailed_data']['totalrecovered'] + ', and Recovery Rate = ' + result['main_data']['recovery_rate']['rate'] + '.',
                                tot_stats: result['main_data']['confirmed_data']['totalconfirmed'],
                                tot_date: result['main_data']['confirmed_data']['confirmed_max_date']
                            });
                            if (Object.keys(result['statewise']).length > 0) {
                                this.setState({ state_data: result['statewise'] })
                            }
                            this.setState({

                                loading: false,
                                imgloading: false,
                                errorMessage: ""
                            });

                        }
                        else {
                            this.setState({
                                dataset: [],
                                case_confirmed: [],
                                loading: false,
                                imgloading: false,
                                errorMessage: "No Data Found or error in getting data"
                            });
                        }

                    }
                    else {
                        this.setState({
                            dataset: [],
                            case_confirmed: [],
                            loading: false,
                            errorMessage: "No Data Found or error in getting data"
                        });
                    }
                },
                (error) => {
                    this.setState({
                        dataset: [],
                        case_confirmed: [],
                        loading: false,
                        imgloading: false,
                        errorMessage: "No Data Found or error in getting data"
                    });
                }

            )
    }
    setdata(value) {
        return true
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
                    { value: 'loctaion', label: 'Stats of Your State', trigger: 'print' },
                ],
            },
            {
                id: 'stats',
                message: this.state.stat_message,
                trigger: 'further-message',
            },
            {
                id: 'about',
                message: this.state.aboutMessage,
                trigger: 'further-message',
            },
            {
                id: 'print',
                message: 'Please enter the state name',
                trigger: 'location',
            },

            {
                id: 'location',
                user: true,
                validator: (value) => {
                    var dataset = []
                    value = value.toLowerCase()
                    console.log(value, "value")
                    if (value === '') {

                        return 'Please enter the state name';
                    } else {
                        if (this.state.state_data.length > 0) {
                            this.state.state_data.forEach(function (obj) { value.toLowerCase() in obj ? dataset = obj[value] : console.log("obj") })
                        }

                    }
                    if (dataset.length === 0) {
                        console.log(this.state.state_stats.length)
                        this.setState({ stat_message: "No data available for given state, please see if you have enetred correct state name." })
                        this.setState({ showstats: 'block' }, function () {

                            this.setdata(dataset)
                        });


                    }
                    else {
                        this.setState({ state_stats: dataset, showstats: 'block' }, function () {
                            this.setState({ stats_message: "Below Is the stastics of your State" })
                            if ('active' in dataset) {
                                this.setState({ active: dataset['active'] })
                            }
                            if ('confirmed' in dataset) {
                                this.setState({ confirmed: dataset['confirmed'] })
                            }
                            if ('deaths' in dataset) {
                                this.setState({ deaths: dataset['deaths'] })
                            }
                            if ('deltaconfirmed' in dataset) {
                                this.setState({ deltaconfirmed: dataset['deltaconfirmed'] })
                            }
                            if ('deltadeaths' in dataset) {
                                this.setState({ deltadeaths: dataset['deltadeaths'] })
                            }
                            if ('deltarecovered' in dataset) {
                                this.setState({ deltarecovered: dataset['deltarecovered'] })
                            }
                            if ('lastupdatedtime' in dataset) {
                                this.setState({ lastupdatedtime: dataset['lastupdatedtime'] })
                            }
                            if ('migratedother' in dataset) {
                                this.setState({ migratedother: dataset['migratedother'] })
                            }
                            if ('recovered' in dataset) {
                                this.setState({ recovered: dataset['recovered'] })
                            }



                            this.setdata(dataset)
                        });

                    }


                    return true;
                },

                trigger: "printstate",
            },
            {
                id: 'printstate',
                message: "Please see opned window for stats",
                trigger: 'further-message'
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
                    { value: 'about', label: 'About Corona Testing', trigger: 'abouttesting' },
                ],
            },
            {
                id: 'abouttesting',
                message: "There are different types of coronavirus tests that can be done: ",
                trigger: 'continue-message1',
            },
            {
                id: 'continue-message1',
                message: "1. Swab Test – In this case, a special swab is used to take a sample from your nose or throat ",
                trigger: 'continue-message2',
            },
            {
                id: 'continue-message2',
                message: "2.Nasal aspirate – In this case, a saline solution will be injected into your nose and, then a sample is taken with a light suction",
                trigger: 'continue-message3',
            },
            {
                id: 'continue-message3',
                message: "3. Tracheal aspirate – In this case, a thin tube with a torch, also known as a bronchoscope, is put into your mouth to reach your lungs from where a sample is collected. ",
                trigger: 'continue-message4',
            },
            {
                id: 'continue-message4',
                message: "4. Sputum Test – Sputum is thick mucus that gets accumulated in the lungs and comes out with a cough. During this test, you’re required to cough up sputum in a special cup or a swab is used to take a sample from your nose.",
                trigger: 'continue-message5',
            },
            {
                id: 'continue-message5',
                message: "5. Blood test – In this case, a blood sample is taken from a vein in the arm. ",
                trigger: 'further-message',
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
    handleClosestats = () => this.setState({ showstats: "none" })
    handleClose = () => this.setState({ showMaps: false, mapMessage: 'Show Map' })
    openHelp() {
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
                        backgroundColor: 'rgba(27, 138, 221, 1)',
                        borderColor: 'rgba(27, 138, 221, 1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        type: 'bar',
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(27, 138, 221, 1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(27, 138, 221, 1)',
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

            <Container width="100%" id="Chart">
                <link rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous" />
                {this.state.loading === false ?
                    <div>
                                <Row>
                                    <Col xs={1}  >

                                    </Col>
                                    <Col xs={9}>
                                        <div className="navbar">
                                            Total Count:- {this.state.tot_stats} {" "}
                             As on Date:- {this.state.tot_date}

                                        </div>
                                    </Col>
                                    <Col xs={2} >
                                        <img style={{ width: '40px', flex: 1 }} alt="Have a Chat with our Bot"
                                            src={chatpic}
                                            onClick={() => this.openHelp()}  //updateFilter is wierd name
                                        />
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
                                            : <span>No Data Available</span>
                                        }

                                    </Col>
                                    <Col xs={3} >
                                        {this.state.showHelp === true
                                            ?
                                            <div className='chatclass'>
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
                            </div>

                           
                    : <span><img alt="Loading" src={loaderImg}></img></span>
                }
                <Modal size="lg" style={{ height: 'auto' }} show={this.state.showMaps} onHide={this.handleClosestats} centered>

                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>

                        <Maps />



                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>

                </Modal>
                <div id="myModal" style={{ display: this.state.showstats }} className="cmppopup">
                    <div className="cmppopupcontent">
                        <p style={{ color: "#fdfdfd" }}>
                            Result:- {this.state.stats_message}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Active:- {this.state.active}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Confirmed:- {this.state.confirmed}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Deaths:- {this.state.deaths}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Delta Confirmed:- {this.state.deltaconfirmed}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Delta Deaths:- {this.state.deltadeaths}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Delta Recovered:- {this.state.deltarecovered}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Last Updated Time:- {this.state.lastupdatedtime}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Migrated Other:- {this.state.migratedother}

                        </p>
                        <p style={{ color: "#fdfdfd" }}>
                            Recovered:- {this.state.active}

                        </p>


                        <p>
                            <Button style={{ backgroundColor: "#0c0c0c" }} onClick={this.handleClosestats}>Close</Button>
                        </p>

                    </div>
                </div>

            </Container>
        );
    }
});



export default Analytics