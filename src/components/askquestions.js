import React, { Component } from 'react'


import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ChatBot from 'react-simple-chatbot'

import  { observer } from 'mobx-react'

import Review from './Review';


const steps = [
    {
        id: '0',
        message: 'Welecome to Covid-19 Automated Information System',
        trigger: '1',
    },
    {
        id: '1',
        message: 'Thank you Have Great Day Ahead!',
        end: true,
    },
];


const AskQuestion = observer(class AskQuestion extends Component{
    chartRef = React.createRef();
  constructor(props) {

   
    super(props);
    this.get_PageLoadInfo = this.get_PageLoadInfo.bind(this)
    this.state={
        steps: [
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
              message: 'Hello {previousValue}, before we go further ',
              trigger: 'info',
            },
            {
              id: 'info',
              message: 'Tell me what kind of information you need on Covid Today.',
              trigger: '7',
            },
            {
              id: '7',
              user: true,
              trigger: 'review',
            },
            {
              id: 'review',
              component: <Review />,
              asMessage: true,
              trigger: 'update',
            },
            {
              id: 'update',
              message: 'Would you like to update some field?',
              trigger: 'update-question',
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: 'update-fields',
            },
            {
              id: 'update-fields',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                { value: 'age', label: 'Age', trigger: 'update-age' },
              ],
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '7',
            },
            {
              id: 'update-gender',
              update: 'gender',
              trigger: '7',
            },
            {
              id: 'update-age',
              update: 'age',
              trigger: '7',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ],
    }
  }
  get_PageLoadInfo(){
    var steps2 = [
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
          message: 'Hello {previousValue}, before we go further ',
          trigger: 'info',
        },
        {
          id: 'info',
          message: 'Tell me what kind of information you need on Covid Today.',
          trigger: '7',
        },
        {
          id: '7',
          user: true,
          trigger: 'review',
        },
        {
          id: 'review',
          component: <Review />,
          asMessage: true,
          trigger: 'update',
        },
        {
          id: 'update',
          message: 'Would you like to update some field?',
          trigger: 'update-question',
        },
        {
          id: 'update-question',
          options: [
            { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            { value: 'no', label: 'No', trigger: 'end-message' },
          ],
        },
        {
          id: 'update-yes',
          message: 'What field would you like to update?',
          trigger: 'update-fields',
        },
        {
          id: 'update-fields',
          options: [
            { value: 'name', label: 'Name', trigger: 'update-name' },
            { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            { value: 'age', label: 'Age', trigger: 'update-age' },
          ],
        },
        {
          id: 'update-name',
          update: 'name',
          trigger: '7',
        },
        {
          id: 'update-gender',
          update: 'gender',
          trigger: '7',
        },
        {
          id: 'update-age',
          update: 'age',
          trigger: '7',
        },
        {
          id: 'end-message',
          message: 'Thanks! Your data was submitted successfully!',
          end: true,
        },
      ]
    this.setState({
        steps : steps2
    })
  }
  componentDidMount() {
      this.get_PageLoadInfo();
    
  };

   
    render(){
        return(
            <div>
               <ChatBot
          steps={this.state.steps}
        
        />
            </div>
        )
    }

})
export default AskQuestion;
