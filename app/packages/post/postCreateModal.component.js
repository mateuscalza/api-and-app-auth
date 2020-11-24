import React, { useState } from 'react';
import { ActivityIndicator, Modal, KeyboardAvoidingView, SafeAreaView as OriginalSafeAreaView, Platform } from 'react-native';
import styled from 'styled-components/native';
import useApi from '../../hooks/api';
import handleError from '../../utils/handleError';

const SafeArea = styled(OriginalSafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`
const Wrapper = styled(KeyboardAvoidingView).attrs({
  behavior: 'padding'
})`
  width: 100%;
  flex: 1;
  position: relative;
  margin: 15px;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 2px 0 30px rgba(150,150,150,0.3);
  elevation: 1;
`

const Form = styled.View`
  padding: 20px;
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
  text-align: right;
`

const Field = styled.TextInput`
  font-size: 16px;
  padding: 14px;
  margin-top: 10px;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 14px;
  max-height: 300px;
`
const Separator = styled.View`
  flex: 1;
`

export default function PostCreateModal({ isVisible, onClose, onRefreshNecessary, ...props }) {
  const api = useApi()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    api.post('/posts', {
      title,
      body,
    })
      .then(() => {
        onRefreshNecessary()
        onClose()
        setTitle('')
        setBody('')
      })
      .catch(handleError)
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeArea>
        <Wrapper {...props}>
          <Form>
            <Field placeholder='Título' value={title} maxLength={200} onChangeText={setTitle} keyboardType='default' autoCapitalize='sentences' />
            <Field placeholder='Conteúdo' value={body} multiline maxLength={1000} onChangeText={setBody} returnKeyType='default' autoCapitalize='sentences' />
          </Form>

          {isLoading ? <ActivityIndicator size='small' /> : null}
          <Separator />

          <Buttons>
            <Button onPress={onClose}>
              <ButtonText style={{ color: '#e67e22' }}>CANCELAR</ButtonText>
            </Button>

            <Button onPress={handleSubmit}>
              <ButtonText style={{ color: '#2980b9' }}>CADASTRAR</ButtonText>
            </Button>
          </Buttons>
        </Wrapper>
      </SafeArea>
    </Modal>
  )
}
