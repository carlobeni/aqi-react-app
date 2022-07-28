import React from 'react'
import {INTRODUCTION_PARAGRAPH,TITLE_INTRODUCTION} from '../../untils/consts'
import './IntroductionLayout.css'

const IntroductionLayout = () => {
  return (
    <div className='introduction-layout'>
      <h2 className='introduction-title'>{TITLE_INTRODUCTION}</h2>
      <p className='introduction-paragraph'>
        {INTRODUCTION_PARAGRAPH}
      </p>
    </div>
  )
}

export default IntroductionLayout
