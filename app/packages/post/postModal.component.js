import React, { useState } from 'react';
import { ActivityIndicator, Modal, SafeAreaView as OriginalSafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import useApi from '../../hooks/api';
import handleError from '../../utils/handleError';


const SafeArea = styled(OriginalSafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`
const Wrapper = styled.View`
  position: relative;
  margin: 15px;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 2px 0 30px rgba(150,150,150,0.3);
  elevation: 1;
`

const ScrollView = styled.ScrollView`
  flex: 1;
  padding: 30px;
`

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`

const Body = styled.Text`
  padding-top: 20px;
  font-size: 16px;
`

const Buttons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px;
`
const Button = styled.TouchableOpacity`
  padding: 15px 15px 15px 15px;
`
const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  text-align: right;
`

export default function PostModal({ post, onClose, onRefreshNecessary, ...props }) {
  const api = useApi()
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDelete = () => {
    setDeleteIsLoading(true)
    api.delete(`/posts/${post.id}`)
      .then(onClose)
      .then(onRefreshNecessary)
      .catch(handleError)
      .finally(() => setDeleteIsLoading(false))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={Boolean(post)}
      onRequestClose={onClose}
    >
      <SafeArea>
        <Wrapper {...props}>
          <ScrollView>
            <Title>{post?.title}</Title>
            <Body>{post?.body}</Body>
          </ScrollView>

          <Buttons>
            <Button onPress={handleDelete} disabled={deleteIsLoading}>
              {deleteIsLoading ? <ActivityIndicator size='small' /> : <ButtonText style={{ color: '#c0392b' }}>EXCLUIR</ButtonText>}

            </Button>

            <Button onPress={onClose}>
              <ButtonText style={{ color: '#2980b9' }}>SAIR</ButtonText>
            </Button>
          </Buttons>
        </Wrapper>
      </SafeArea>
    </Modal>
  )
}
