import React from 'react'
import styled from 'styled-components/native'

const Wrapper = styled.TouchableOpacity``
const Text = styled.Text`
  text-align: center;
  padding: 10px;
  color: #f00;
`

export default function ErrorPresent({ error, onReload }) {
  return (
    <Wrapper onPress={onReload}>
      <Text>{error.message}</Text>
    </Wrapper>
  )
}
