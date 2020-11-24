import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView as OriginalSafeAreaView, LogBox } from 'react-native';
import PostList from './packages/post/postList.component';
import FloatingButton from './components/floatingButton';
import UserAuthModal from './packages/user/userAuthModal.component';
import useAuth from './hooks/auth';

const SafeArea = styled(OriginalSafeAreaView)`
  flex: 1;
  background-color: #ecf0f1;
`

const Header = styled.View`
  height: 60px;
  align-items: center;
  flex-direction: row;
`

const Left = styled.View`
  flex: 1;
`

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const Right = styled.View`
  flex: 1;
  align-items: flex-end;
`

const AuthButton = styled.TouchableOpacity`
  padding: 0 15px;
`

export default function App() {
  const [auth, setAuth] = useAuth()
  const [isUserAuthModalVisible, setIsUserAuthModalVisible] = useState(false)

  return (
    <SafeArea>
      <Header>
        <Left />
        <Title>POSTS</Title>
        <Right>
          <AuthButton onPress={() => auth.token ? setAuth({ token: null, user: null }) : setIsUserAuthModalVisible(true)}>
            <MaterialCommunityIcons name={auth.token ? 'logout' : 'login'} size={32} color='#000' />
          </AuthButton>
        </Right>
      </Header>

      <PostList />
      <UserAuthModal isVisible={isUserAuthModalVisible} onClose={() => setIsUserAuthModalVisible(false)} />
      <StatusBar style="dark" />
    </SafeArea>
  );
}

LogBox.ignoreLogs(['Cannot update a component from inside the function body of a different component.'])
