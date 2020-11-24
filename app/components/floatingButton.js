import React from 'react'
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const Wrapper = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 15px;
  border-radius: 14px;
  box-shadow: 2px 0 9px rgba(0,0,0,0.35);
  elevation: 2;
`

export default function FloatingButton({ icon, backgroundColor = '#2d3436', iconColor = '#fff', ...props }) {

  return (
    <SafeAreaView>
      <Wrapper style={{ backgroundColor }} {...props}>
        <MaterialCommunityIcons name={icon} size={32} color={iconColor} />
      </Wrapper>
    </SafeAreaView>
  )
}
