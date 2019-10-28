import React, { Component } from 'react'
import { placeholderContent } from './placeholderContent'
import './Content.css'

export default class Content extends Component {
  render() {
    return <div
      className="content-container"
      dangerouslySetInnerHTML={{__html: placeholderContent}}
    />
  }
}