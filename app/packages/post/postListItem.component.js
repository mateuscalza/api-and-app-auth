import React from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'

const Wrapper = styled.TouchableOpacity`
  padding: 15px;
  margin: 15px;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 2px 0 6px rgba(0,0,0,0.1);
  elevation: 1;
  
`
const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`
const Body = styled.Text``

export default function Post({ id, title, body, ...props }) {
  return (
    <Wrapper {...props}>
      <Title numberOfLines={1}>{title}</Title>
      <Body numberOfLines={1}>{body}</Body>
    </Wrapper>
  )
}
