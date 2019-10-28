import React, { Component } from 'react'
import { placeholderContent } from './placeholderContent'
import '../../styles/content_style.css'

export default class superAdmin_content extends Component {
  render() {
    return <div
      className="contentContainer"
      dangerouslySetInnerHTML={{__html: placeholderContent}}
    />
  }
}