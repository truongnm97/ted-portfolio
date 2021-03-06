import React from 'react'
import styled from 'styled-components'
import Buttons from './Buttons'
import { colors } from '../config'

const CardComponent = styled.section`
  margin: 15px 0;
  background: ${(props) => props.background ?? colors.cardBackground};
  box-shadow: 0px 25px 60px rgba(25, 11, 57, 0.25);
  border-radius: 20px;
  padding: 50px 30px;
  font-weight: normal;
  font-size: 1rem;
  position: relative;
  transform: translate(0, 0);

  a {
    color: ${colors.link};
    &:visited {
      color: #8d92df;
    }
  }
`

const Heading = styled.h2`
  display: inline;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
  color: ${colors.primary};

  :before {
    color: ${colors.text2};
    content: '${(props) =>
      props.isExportDefault ? `export default ` : props.isExport ? `export const ` : `const `}';
  }
  :after {
    content: '${(props) => (props.isExportDefault ? '' : ' = ')}';
  }
`

const Space = styled.span`
  :before {
    color: ${colors.text2};
    content: '() ';
    font-size: 1.25rem;
  }
  :after {
    color: ${colors.primary};
    content: '${(props) => (props.isArray ? `=> [` : `=> (`)}';

    font-size: 1.25rem;
  }
`

const Code = styled.code`
  color: ${colors.text};
  :after {
    content: '${(props) => (props.isArray ? `];` : `);`)}';
    color: ${colors.primary};
    font-size: 1.25rem;
  }
`

const HeaderButtons = styled(Buttons)`
  position: absolute;
  left: 15px;
  top: 15px;
`

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  cursor: move;
`

const Card = ({ header, children, background, isArray, isExportDefault, isExport }) => {
  const onDragStart = (e) => {
    const { parentNode } = e.target
    if (parentNode) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/html', parentNode)
      e.dataTransfer.setDragImage(parentNode, parentNode.clientWidth / 2, 20)
    }
  }

  const getRandomColor = () => {
    const min = 0
    const max = 100
    const number = Math.floor(Math.random() * (max - min + 1)) + min
    const color = colors.cardBackground
    const regex = /(rgb\((\s*\d{2},?)*)(\s*\d{2},?)\)/g
    const subst = `$1 ${number})`
    return color.replace(regex, subst)
  }

  return (
    <CardComponent
      background={background ?? getRandomColor()}
      className='animate__animated animate__fadeInUp animate__backOutDown'>
      <Header onDragStart={onDragStart} draggable />
      <HeaderButtons />
      <Heading isExport={isExport} isExportDefault={isExportDefault}>
        {isExportDefault ? '' : header}
      </Heading>
      <Space isArray={isArray} />
      <Code isArray={isArray}>{children}</Code>
    </CardComponent>
  )
}

export default Card
